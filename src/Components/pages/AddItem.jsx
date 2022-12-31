import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../../styles/addItems.scss";
import ReactSelect from "react-select";
import { getCloudImgURI } from "../../utils/cloudinary";
import { addFoodToDb } from "../../actions/adminActions";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageCloudURI, setImageCloudURI] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [calorieCount, setCalorieCount] = useState("");
  const [stock, setStock] = useState([]);

  const allCategories = useSelector((state) => state.itemReducer.categories);
  const allCityList = useSelector((state) => state.itemReducer.allCityOptions);

  const handleStockChange = (index) => (e) => {
    const linSearch = (arr = [], cityCode) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].cityCode === cityCode) {
          return i;
        }
      }

      return -1;
    };

    let currStockData = stock;
    let presentAt = linSearch(currStockData, selectedCity[index].value);
    if (presentAt === -1) {
      currStockData.push({
        cityCode: selectedCity[index].value,
        stockCount: e.target.value,
      });
    } else {
      currStockData[presentAt] = {
        cityCode: selectedCity[index].value,
        stockCount: e.target.value,
      };
    }

    setStock(currStockData);

    // console.log("stock", stock);
  };

  useEffect(() => {
    // console.log("here, imageCloudURI: ", imageCloudURI);

    if (imageCloudURI.asset_id) {
      try {
        addFoodToDb(
          title,
          imageCloudURI,
          calorieCount,
          price,
          selectedCategory,
          selectedCity,
          stock
        );
        console.log("Added successfully");

        setTitle("");
        setImage("");
        setCalorieCount("");
        setImageCloudURI("");
        setPrice("");
        setSelectedCategory([]);
        setSelectedCity([]);
        setStock([]);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  }, [imageCloudURI]);

  const formSubmissionHandler = async (e) => {
    e.preventDefault();

    getCloudImgURI(image, 1080).then((res) => {
      //   console.log("fetchedData: ", res);

      setImageCloudURI({
        asset_id: res.data.asset_id,
        secure_url: res.data.secure_url,
      });
    });
  };

  return (
    <>
      <div className="add-item-container">
        <h2 className="add-it-tit">Add A Food</h2>
        <form id="add-item-form" onSubmit={formSubmissionHandler}>
          <div className="hor-form-el">
            <label htmlFor="title">Food Title:</label>
            <input
              placeholder="Enter food title"
              type="text"
              name="title"
              id="title"
              value={title}
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="hor-form-el">
            <label htmlFor="img">Food Image:</label>
            <input
              required
              type="file"
              name="img"
              id="img"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="hor-form-el">
            <label htmlFor="calCount">Calories:</label>
            <input
              type="number"
              name="calCount"
              id="calCount"
              placeholder="Enter in digits"
              value={calorieCount}
              required
              onChange={(e) => setCalorieCount(e.target.value)}
            />
          </div>

          <div id="hor-for-sel-cont">
            <label htmlFor="category">Category:</label>
            {allCategories.length > 0 && (
              <>
                <ReactSelect
                  placeholder="Select a category"
                  id="category"
                  className="react-select"
                  value={selectedCategory}
                  required
                  options={allCategories}
                  defaultValue={[]}
                  onChange={(e) => {
                    setSelectedCategory(e);
                  }}
                />
              </>
            )}
          </div>

          <div className="hor-form-el">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter in digits"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div id="hor-for-sel-cont">
            <label htmlFor="city_code">City Code:</label>
            {allCityList.length > 0 && (
              <>
                <ReactSelect
                  placeholder="Select all cities where you want to add this food"
                  id="city_code"
                  className="react-select"
                  isMulti
                  value={selectedCity}
                  required
                  options={allCityList}
                  defaultValue={[]}
                  onChange={(e) => {
                    setSelectedCity(e);
                  }}
                />
              </>
            )}
          </div>

          <div className="hor-form-el">
            <label htmlFor="">Stock:</label>
            {selectedCity.length > 0 && (
              <>
                <ul id="stock-list-cont">
                  {selectedCity.map((item, index) => {
                    return (
                      <li key={index}>
                        <label htmlFor="stick-inp">{item.label}:</label>
                        <input
                          required
                          id="stockinp"
                          type="number"
                          placeholder={`Enter number of stocks to add in "${item.label}"`}
                          onChange={handleStockChange(index)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
          <div className="add-item-bottom">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddItem;
