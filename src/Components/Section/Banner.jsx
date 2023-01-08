import React, { useEffect, useState } from "react";
import "../../styles/banner.scss";
import BannerCard from "./BannerCard";

import foodImg from "../../assets/images/c2.png";
import { useSelector } from "react-redux";

const Banner = ({ orderNowOnClickHandler }) => {
  const allProducts = useSelector((state) => state.itemReducer.allProducts);
  const [randomIndices, setRandomIndices] = useState(null);

  useEffect(() => {
    if (allProducts.length >= 9) {
      setRandomIndices(
        Array.from({ length: 4 }, () => {
          return Math.floor(Math.random() * 9.1212);
        })
      );
    }
  }, [allProducts]);

  return (
    <>
      <div className="banner-container">
        <div className="banner-div1">
          <p>
            The Fastest Food Delivery in
            <span> Your City</span>
          </p>

          <h2>Ask Me Anything Before Life, Healthy And Safety!</h2>

          <button className="btn" onClick={orderNowOnClickHandler}>
            Order Now
          </button>
        </div>

        <div className="banner-div2">
          {allProducts &&
            (allProducts.length >= 9 ? (
              <>
                {/* {console.log(allProducts)}
                {console.log("randomIndices: ", randomIndices)} */}
                {randomIndices &&
                  randomIndices.map((ranNum, index) => {
                    const foodItem = allProducts[ranNum];
                    return (
                      <BannerCard
                        key={index}
                        image={foodItem.image.secure_url}
                        title={foodItem.title}
                        category={foodItem.selectedCategory.label}
                        price={foodItem.price}
                      />
                    );
                  })}
              </>
            ) : (
              <>
                {allProducts.length >= 4 ? (
                  <>
                    {[0, 1, 2, 3].map((ranNum, index) => {
                      const foodItem = allProducts[ranNum];
                      return (
                        <BannerCard
                          key={index}
                          image={foodItem.image.secure_url}
                          title={foodItem.title}
                          category={foodItem.selectedCategory.label}
                          price={foodItem.price}
                        />
                      );
                    })}
                  </>
                ) : (
                  <>
                    <BannerCard image={foodImg} />
                    <BannerCard image={foodImg} />
                    <BannerCard image={foodImg} />
                    <BannerCard image={foodImg} />
                  </>
                )}
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Banner;
