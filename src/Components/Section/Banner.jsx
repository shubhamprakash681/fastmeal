import React from "react";
import "../../styles/banner.scss";
import BannerCard from "./BannerCard";

import foodImg from "../../assets/images/c2.png";

const Banner = ({orderNowOnClickHandler}) => {
  return (
    <>
      <div className="banner-container">
        <div className="banner-div1">
          <p>
            The Fastest Food Delivery in
            <span> Your City</span>
          </p>

          <h2>Ask Me Anything Before Life, Health And Safety!</h2>

          <button className="btn" onClick={orderNowOnClickHandler} >Order Now</button>
        </div>

        <div className="banner-div2">
          <BannerCard image={foodImg} />
          <BannerCard image={foodImg} />
          <BannerCard image={foodImg} />
          <BannerCard image={foodImg} />
        </div>
      </div>
    </>
  );
};

export default Banner;
