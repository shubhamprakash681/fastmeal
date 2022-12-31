import React from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useDispatch } from "react-redux";
import { updateUserDataInDb } from "../../actions/customerActions";
const CartItem = ({ itemData, currentUserData }) => {
  const { count, item, totalPrice } = itemData;

  const dispatch = useDispatch();

  const itemDeleteHandler = () => {
    let userDataCopy = JSON.parse(JSON.stringify(currentUserData));

    let newCart = [];

    currentUserData.cart.forEach((it) => {
      if (it.item.image.asset_id !== itemData.item.image.asset_id) {
        newCart.push(it);
      }
    });

    dispatch({
      type: "UPDATE_USER_CART",
      payload: newCart,
    });

    // updating cart in DB on each state change
    userDataCopy.cart = newCart;
    dispatch(updateUserDataInDb(userDataCopy, userDataCopy));
  };

  const incrementCountHandler = () => {
    let userDataCopy = JSON.parse(JSON.stringify(currentUserData));
    let newCart = [];

    currentUserData.cart.forEach((it) => {
      if (it.item.image.asset_id !== itemData.item.image.asset_id) {
        newCart.push(it);
      } else {
        newCart.push({
          count: it.count + 1,
          item: it.item,
          totalPrice: (it.count + 1) * it.item.price,
        });
      }
    });
    userDataCopy.cart = newCart;

    dispatch({
      type: "UPDATE_USER_CART",
      payload: newCart,
    });

    // updating cart in DB on each state change
    dispatch(updateUserDataInDb(userDataCopy, userDataCopy));
  };

  const decrementCountHandler = () => {
    let userDataCopy = JSON.parse(JSON.stringify(currentUserData));

    let newCart = [];

    currentUserData.cart.forEach((it) => {
      if (it.item.image.asset_id !== itemData.item.image.asset_id) {
        newCart.push(it);
      } else {
        const currCount = it.count;
        if (currCount > 1) {
          newCart.push({
            count: currCount - 1,
            item: it.item,
            totalPrice: (it.count - 1) * it.item.price,
          });
        }
      }
    });
    userDataCopy.cart = newCart;

    dispatch({
      type: "UPDATE_USER_CART",
      payload: newCart,
    });

    // updating cart in DB on each state change
    dispatch(updateUserDataInDb(userDataCopy, userDataCopy));
  };

  return (
    <>
      {/* {console.log("here, itemData: ", itemData)} */}
      <div className="cart-item-container">
        <div className="cart-it-left">
          <img src={item.image.secure_url} alt="" />
        </div>
        <div className="cart-it-right">
          <div className="cart-it-right-top">
            <div className="cart-it-right-top-left">{item.title}</div>
            <span className="cart-it-right-top-right">Rs. {totalPrice}</span>
          </div>
          <div className="cart-it-right-bottom">
            <div className="it-units">
              <AddOutlinedIcon
                onClick={incrementCountHandler}
                className="it-units-icon"
                fontSize="small"
              />
              <span>{count}</span>
              <RemoveOutlinedIcon
                onClick={decrementCountHandler}
                className="it-units-icon"
                fontSize="small"
              />
            </div>
            <HighlightOffOutlinedIcon
              onClick={itemDeleteHandler}
              className="it-remove-icon"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
