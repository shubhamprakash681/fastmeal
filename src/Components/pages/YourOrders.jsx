import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import "../../styles/yourOrders.scss";
import Order from "../Order/Order";

const YourOrders = () => {
  const allOrders = useSelector(
    (state) => state.userReducer.currentUserData.orders
  );
  dayjs.extend(LocalizedFormat);
  return (
    <>
      {/* {console.log("here, allOrders: ", allOrders)} */}
      <div className="your-orders-container">
        {allOrders &&
          allOrders.map((order, index) => {
            const orderTime = dayjs(order.orderTime).format("LLLL");
            return (
              <>
                <div className="each-order-wrapper">
                  <div>Order Date: {orderTime}</div>
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
