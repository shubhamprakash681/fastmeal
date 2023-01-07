import React from "react";

const BannerCard = ({
  image,
  title = "Food Title",
  category = "Food Category",
  price = "200",
}) => {
  return (
    <>
      <div className="banner-card-container">
        <div>
          <img src={image} alt="img" />
        </div>
        <div>
          <h3>{title}</h3>
          <h4>{category}</h4>
          <h3>Rs.{price}</h3>
        </div>
      </div>
    </>
  );
};

export default BannerCard;
