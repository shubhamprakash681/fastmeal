import React from "react";
import { useSelector } from "react-redux";

import "../../styles/yourOrders.scss";
import Order from "../Order/Order";

const YourOrders = () => {
  const allOrders = useSelector(
    (state) => state.userReducer.currentUserData.orders
  );
  return (
    <>
      {/* {console.log("here, allOrders: ", allOrders)} */}
      <div className="your-orders-container">
        {allOrders &&
          allOrders.map((order, index) => {
            return (
              <>
                <div className="each-order-wrapper">
                  <Order orderDetails={order} key={index} />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default YourOrders;
