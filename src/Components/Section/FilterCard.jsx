import React from "react";
import SetMealIcon from "@mui/icons-material/SetMeal";

const FilterCard = ({ Icon = { SetMealIcon }, category = "Chicken" }) => {
  return (
    <>
      <div className="f-card-container">
          <img src={Icon} />
        <div>{category}</div>
      </div>
    </>
  );
};

export default FilterCard;
