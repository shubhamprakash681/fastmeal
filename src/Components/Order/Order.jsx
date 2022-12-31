import React from "react";
import "../../styles/order.scss";

const Order = ({ orderDetails }) => {
  return (
    <>
      {/* {console.log("orderItem: ", orderDetails)} */}
      <div className="order-container">
        {orderDetails.orderItems.map((item, index) => {
          return (
            <>
              <div key={index} className="list-item">
                <img src={item.item.image.secure_url} alt="" />
                <div>
                  <div>{item.item.title}</div>
                  <div className="list-it-lb">
                    <span>
                      <span>Price: {item.item.price}</span>
                      <span className="list-it-lb-count">
                        Item count: {item.count}
                      </span>
                    </span>
                    <span>Subtotal: {item.totalPrice}</span>
                  </div>
                </div>
              </div>
            </>
          );
        })}

        <div className="order-bot">
          <span>Total: {orderDetails.subtotal}</span>
        </div>
      </div>
    </>
  );
};

export default Order;
