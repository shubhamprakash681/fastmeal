import React, { useEffect, useState } from "react";
import "../../styles/bottomsection.scss";
import FilterCard from "./FilterCard";
import ItemCard from "./ItemCard";

import { useDispatch, useSelector } from "react-redux";

const BottomSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.itemReducer.categories);
  const allProducts = useSelector((state) => state.itemReducer.allProducts);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayItems, setDisplayItems] = useState(allProducts);

  let filteredItems = [];

  useEffect(() => {
    if (selectedCategory === "all") {
      setDisplayItems(allProducts);
    } else {
      filteredItems = [];

      allProducts.forEach((item, index) => {
        const cat = item.selectedCategory.value;
        if (cat === "all" || cat === selectedCategory) {
          filteredItems.push(item);
        }
      });

      setDisplayItems(filteredItems);
    }
  }, [allProducts, selectedCategory]);

  return (
    <>
      {/* {console.log("selectedCategory: ", selectedCategory)} */}
      {/* {console.log("allProducts: ", allProducts)} */}
      {/* {console.log("displayItems: ", displayItems)} */}
      <div>
        <div className="title">Hot Dishes Near You</div>

        <div className="filter-container">
          <div className="filter-inner-cont">
            {categories.map((item, index) => {
              return (
                <>
                  <button
                    key={item}
                    onClick={(e) => {
                      setSelectedCategory(item.value);
                    }}
                  >
                    <FilterCard
                      key={index}
                      Icon={item.icon}
                      category={item.label}
                    />
                  </button>
                </>
              );
            })}
          </div>
        </div>

        <div className="bottom-item-container">
          {displayItems.map((item, index) => {
            return (
              <>
                <ItemCard key={index} item={item} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomSection;
