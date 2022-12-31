import LocalMallOutlined from "@mui/icons-material/LocalMallOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDataInDb } from "../../actions/customerActions";

const ItemCard = ({ item }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  if (item) {
    var image = item.image.secure_url;
    var title = item.title;
    var calCount = item.calorieCount;
    var price = item.price;
  }

  const dispatch = useDispatch();
  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );

  const addCartHandler = () => {
    let userDataCopy = JSON.parse(JSON.stringify(currentUserData));

    userDataCopy.cart.push({
      item: item,
      count: 1,
      totalPrice: item.price,
    });
    // console.log("userDataCopy: ", userDataCopy);

    // updating cart in DB on each state change
    dispatch(updateUserDataInDb(currentUserData, userDataCopy));

    dispatch({
      type: "GET_CURRENT_USER_DATA",
      payload: userDataCopy,
    });
  };

  useEffect(() => {
    if (currentUserData.cart) {
      let i = 0;
      let len = currentUserData.cart.length;

      for (i = 0; i < len; i++) {
        if (currentUserData.cart[i].item.image.secure_url === image) {
          setIsAddedToCart(true);
          break;
        }
      }
      if (i === len) {
        setIsAddedToCart(false);
      }
    }
  }, [currentUserData]);

  return (
    <>
      <div className="m-card-container">
        <div className="m-card-left">
          <img src={image} alt="foodImg" />
        </div>

        <div className="m-card-right">
          <div className="cart-circle-container">
            {isAddedToCart ? (
              <>
                <DoneOutlinedIcon style={{ color: "green" }} />
              </>
            ) : (
              <>
                <LocalMallOutlined onClick={addCartHandler} />
              </>
            )}
          </div>
          <h3>{title}</h3>
          <h4>{calCount} Calories</h4>
          <h2>Rs. {price}</h2>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
