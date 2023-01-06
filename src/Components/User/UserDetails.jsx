import dayjs from "dayjs";
import React from "react";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Order from "../Order/Order";

const UserDetails = ({ user, setOpenserDetail }) => {
  dayjs.extend(LocalizedFormat);
  const userAvtar = user.profile.avtar;

  return (
    <>
      <div className="us-detail-container">
        <div className="us-contents">
          <div className="us-content-header">
            <button className="btn" onClick={() => setOpenserDetail(false)}>
              Close
            </button>
          </div>
          <div className="us-cont-upper">
            <div className="frame">
              {userAvtar ? (
                <>
                  <img src={userAvtar} alt="avtar" />
                </>
              ) : (
                <>
                  <img
                    src="https://res.cloudinary.com/dfoi3evcp/image/upload/v1671870102/fastmeal/asset/userAvtar/man_fhanrx.png"
                    alt="avtar"
                  />
                </>
              )}
            </div>

            <div>
              <div>
                <span className="cont-label">Role: </span>
                <span>{user.role}</span>
              </div>
              <div>
                <span className="cont-label">Name: </span>
                <span>{user.profile.name}</span>
              </div>

              <div>
                <span className="cont-label">Email: </span>
                <span>{user.profile.email}</span>
              </div>
              <div>
                <span className="cont-label">Gender: </span>
                <span>{user.profile.gender}</span>
              </div>

              <div>
                <span className="cont-label">Phone No: </span>
                <span>{user.profile.phoneNumber}</span>
              </div>
            </div>
          </div>

          <div className="us-cont-lower">
            <div>
              <span className="cont-label">Joining Date: </span>
              <span>
                {dayjs(user.joiningDate).format("DD MMM YYYY (dddd)")}
              </span>
            </div>
            <div>
              <span className="cont-label">Last Login Time: </span>
              <span>{dayjs(user.lastLogin).format("LLLL")}</span>
            </div>

            <div className="us-cont-lower-sep">
              <span>Address</span>
            </div>
            {user.profile.address && (
              <>
                <div>
                  <span className="cont-label">Line 1: </span>
                  {user.profile.address.line1 && (
                    <>
                      <span>{user.profile.address.line1}</span>
                    </>
                  )}
                </div>

                <div>
                  <span className="cont-label">Line 2: </span>
                  {user.profile.address.line2 && (
                    <>
                      <span>{user.profile.address.line2}</span>
                    </>
                  )}
                </div>

                <div className="us-cont-lower-last-addr">
                  <span>
                    <span className="cont-label">Pin code: </span>
                    {user.profile.address.pinCode && (
                      <>
                        <span>{user.profile.address.pinCode}</span>
                      </>
                    )}
                  </span>

                  <span>
                    <span className="cont-label">City: </span>
                    {user.profile.address.city && (
                      <>
                        <span>{user.profile.address.city.label}</span>
                      </>
                    )}
                  </span>

                  <span>
                    <span className="cont-label">State: </span>
                    {user.profile.address.state && (
                      <>
                        <span>{user.profile.address.state.label}</span>
                      </>
                    )}
                  </span>
                  <span>
                    <span className="cont-label">Country: </span>
                    {user.profile.address.country && (
                      <>
                        <span>{user.profile.address.country}</span>
                      </>
                    )}
                  </span>
                </div>
              </>
            )}

            <div className="us-cont-lower-sep">
              <span>Orders</span>
            </div>
            <div className="order-list">
              {user.orders &&
                (user.orders.length > 0 ? (
                  <>
                    {user.orders.map((order, index) => {
                      return (
                        <>
                          <div className="each-order-list">
                            <Order orderDetails={order} key={index} />
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>No orders has been placed by the customer till now</>
                ))}
            </div>

            <div className="us-cont-lower-sep">
              <span>Cart</span>
            </div>
            <div className="cart-list">
              {user.cart &&
                (user.cart.length > 0 ? (
                  <>
                    {user.cart.map((item, insex) => {
                      return (
                        <>
                          <div className="list-item">
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
                  </>
                ) : (
                  <>
                    <span>User's cart is empty</span>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
