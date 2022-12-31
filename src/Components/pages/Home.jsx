import React, { useRef } from "react";
import Banner from "../Section/Banner";
import BottomSection from "../Section/BottomSection";
import MidSection from "../Section/MidSection";

const Home = () => {
  const midSectionRef = useRef(null);
  const orderNowOnClickHandler = (e) => {
    midSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  return (
    <>
      <div className="home-container">
        <Banner orderNowOnClickHandler={orderNowOnClickHandler} />
        <MidSection useRef_ref={midSectionRef} />
        <BottomSection />
      </div>
    </>
  );
};

export default Home;
