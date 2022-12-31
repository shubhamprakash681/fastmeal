import React, { useEffect, useState } from "react";
import "../../styles/cart.scss";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CartEmpty from "./CartEmpty";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { updateUserDataInDb } from "../../actions/customerActions";
import { useNavigate } from "react-router-dom";
import { currentTimeGenerator } from "../../utils/dayjs";

const Cart = ({ setCartOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );

  useEffect(() => {
    if (currentUserData.cart) {
      setCartItems(currentUserData.cart);

      let st = 0;
      currentUserData.cart.forEach((item) => {
        st = st + Number(item.totalPrice);
      });
      setSubtotal(st.toFixed(2));
    }
  }, [currentUserData]);

  const orderPlaceHandler = () => {
    let userDataCopy = JSON.parse(JSON.stringify(currentUserData));

    let subtotal = 0;
    currentUserData.cart.forEach((it) => {
      subtotal += Number(it.totalPrice);
    });

    userDataCopy.orders.push({
      orderTime: currentTimeGenerator(),
      orderItems: [...currentUserData.cart],
      subtotal: Number(subtotal),
    });

    userDataCopy.cart = [];

    dispatch({
      type: "PLACE_ORDER",
      payload: userDataCopy,
    });

    dispatch(updateUserDataInDb(currentUserData, userDataCopy));

    navigate("/order-placed");

    setCartOpen(false);
  };

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0.0);
  return (
    <>
      {/* {console.log("cartItems: ", cartItems)} */}
      <div className="cart-container">
        <div className="cart-header">
          <WestOutlinedIcon
            onClick={(ev) => {
              ev.preventDefault();
              setCartOpen(false);
            }}
            sx={{
              cursor: "pointer",
            }}
            fontSize="large"
          />
          <span>Cart</span>
          <button
            onClick={(e) => {
              let userDataCopy = JSON.parse(JSON.stringify(currentUserData));

              dispatch({
                type: "UPDATE_USER_CART",
                payload: [],
              });

              // updating cart in DB on each state change
              userDataCopy.cart = [];
              dispatch(updateUserDataInDb(userDataCopy, userDataCopy));
            }}
            className="cart-btn"
          >
            Clear
            <CancelOutlinedIcon />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <>
            {/* if cart is empty -> render this */}
            <CartEmpty />
          </>
        ) : (
          <>
            {/* else */}
            <div className="cart-section">
              <div className="cart-content-section">
                {cartItems.map((item, index) => {
                  return (
                    <CartItem
                      key={index}
                      itemData={item}
                      currentUserData={currentUserData}
                    />
                  );
                })}
              </div>
              <div className="cart-footer">
                <div className="c-f-subtotal">
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <button className="btn" onClick={orderPlaceHandler}>
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
