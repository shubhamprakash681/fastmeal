import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import React from "react";
import { useSelector } from "react-redux";
import "../../styles/allItems.scss";

const AllItems = () => {
  dayjs.extend(LocalizedFormat);
  const allProduts = useSelector((state) => state.itemReducer.allProducts);
  return (
    <>
      {console.log("allProduts:, ", allProduts)}
      <div className="allitems-container">
        {allProduts.map((product, index) => {
          return (
            <>
              <div className="it-cont">
                <div className="it-cont-l">
                  <img src={product.image.secure_url} alt="" />
                  <div className="it-cont-l-detail">
                    <div>
                      <span>{product.title}, </span>
                      <span>Category: {product.selectedCategory.label}, </span>
                      <span>
                        Added on: {dayjs(product.timeStamp).format("LLL")}
                      </span>
                    </div>
                    <div>
                      <span>Rs. {product.price}</span>
                    </div>
                  </div>
                </div>

                <div className="it-btn-cont">
                  <button className="item-btn">Update</button>
                  <button className="item-btn">Delete</button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default AllItems;
