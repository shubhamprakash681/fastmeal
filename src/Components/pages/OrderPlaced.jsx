import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/order-placed.scss";
import Order from "../Order/Order";

const OrderPlaced = () => {
  const navigate = useNavigate();

  const allOrders = useSelector(
    (state) => state.userReducer.currentUserData.orders
  );

  let allOrdersCopy = "";

  const [latestOrder, setLatestOrder] = useState("");

  useEffect(() => {
    if (allOrders) {
      allOrdersCopy = JSON.parse(JSON.stringify(allOrders));

      allOrdersCopy.sort((a, b) => {
        const d1 = dayjs(a.orderTime);
        const d2 = dayjs(b.orderTime);

        return d2.diff(d1);
      });

      setLatestOrder(allOrdersCopy[0]);
    }
  }, [allOrders]);

  useEffect(() => {
    console.log("Latest order: ", latestOrder);
  }, [latestOrder]);

  return (
    <>
      {/* {console.log("all orders: ", allOrders)} */}

      <div className="order-placed-container">
        <h2>Your Order Has Been Placed!</h2>
        <div className="order-det">
          <h3>Order details:</h3>
          <div className="order-det-ord">
            {allOrders && allOrders.length === 0 ? (
              <>
                <div>You haven't placed any orders till today</div>
              </>
            ) : (
              <> {latestOrder && <Order orderDetails={latestOrder} />} </>
            )}
          </div>
        </div>
        <div className="rec-msg">
          You Will Receive Your Meal Soon! Enjoy your day.
        </div>

        <div className="deliv-track-box">
          <button
            className="btn"
            onClick={() => {
              navigate("/track-delivery");
            }}
          >
            Track Delivery
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderPlaced;
