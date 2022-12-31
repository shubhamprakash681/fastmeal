import React, { useEffect, useState } from "react";
import "../../styles/midsection.scss";
import ItemCard from "./ItemCard";

import { useSelector } from "react-redux";

const MidSection = ({ useRef_ref }) => {
  const allProducts = useSelector((state) => state.itemReducer.allProducts);
  const [displayItems, setDisplayItems] = useState(allProducts);

  useEffect(() => {
    let filteredItems = [];
    allProducts.forEach((item, index) => {
      const cat = item.selectedCategory.value;
      if (cat === "fruits") {
        filteredItems.push(item);
      }
    });

    setDisplayItems(filteredItems);
  }, [allProducts]);

  return (
    <>
      <div ref={useRef_ref}>
        <div className="title">Fresh Fruits Available</div>
        <div className="midsection-container">
          {displayItems.map((item, index) => {
            return <ItemCard item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MidSection;
