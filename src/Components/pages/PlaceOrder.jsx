import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/place-order.scss";
import { MdOutlineMyLocation } from "react-icons/md";
import { currentTimeGenerator } from "../../utils/dayjs";
import Order from "../Order/Order";
import { useGeolocated } from "react-geolocated";
import {
  getCurrentLocation,
  getLocationAutocompleteData,
} from "../../utils/locationAPI";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateUserDataInDb } from "../../actions/customerActions";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(
    (state) => state.userReducer.currentUserData.cart
  );
  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const placeOrderHandler = () => {
    if (deliveryLocation) {
      let userDataCopy = JSON.parse(JSON.stringify(currentUserData));

      const { orderItems, orderTime, subtotal } = order;
      userDataCopy.orders.push({
        orderItems,
        orderTime,
        subtotal,
        deliveryLocation: deliveryLocation,
      });

      if (delLocationType === "address-box") {
        let pointerIndex = 0;
        let len = userDataCopy.previousDeliveryLocations.length;
        for (pointerIndex = 0; pointerIndex < len; pointerIndex++) {
          if (
            userDataCopy.previousDeliveryLocations[pointerIndex].label ===
            deliveryLocation.label
          ) {
            break;
          }
        }
        if (pointerIndex === len) {
          userDataCopy.previousDeliveryLocations.push(deliveryLocation);
        }
      }
      userDataCopy.cart = [];
      console.log("Modified User data copy: ", userDataCopy);

      dispatch({
        type: "PLACE_ORDER",
        payload: userDataCopy,
      });

      dispatch(updateUserDataInDb(currentUserData, userDataCopy));

      navigate("/order-placed");
      toast.success("Order placed successfully", {
        toastId: "order-placed",
      });
    } else {
      toast.warn("Delivery location not entered");
    }
  };
  const [order, setOrder] = useState({});
  const [delLocationType, setDelLocationType] = useState("address-box");
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [locationSearchText, setLocationSearchText] = useState("");
  const [autocompleteFeatures, setAutocompleteFeatures] = useState([]);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  useEffect(() => {
    if (cartItems) {
      let subtotal = 0;
      const orderTime = currentTimeGenerator();

      cartItems.forEach((item) => {
        subtotal += Number(item.totalPrice);
      });
      subtotal = subtotal.toFixed(2);

      setOrder({
        subtotal: subtotal,
        orderItems: cartItems,
        orderTime: orderTime,
      });
    }
  }, [cartItems]);

  useEffect(() => {
    if (locationSearchText) {
      getLocationAutocompleteData(locationSearchText)
        .then((res) => {
          setAutocompleteFeatures(res.data.features);
        })
        .catch((err) => console.log(err));
    }
  }, [locationSearchText]);

  useEffect(() => {
    // console.log("autocompleteFeatures: ", autocompleteFeatures);
    let options = [];
    autocompleteFeatures.forEach((feature, insex) => {
      options.push({
        label: feature.properties.formatted,
        value: feature,
      });
    });
    setAutoCompleteOptions(options);
  }, [autocompleteFeatures]);

  return (
    <>
      <div className="place-order-container">
        <div>
          <h3>Order details:</h3>

          {order.orderItems && order.orderItems.length > 0 ? (
            <>
              <div className="order-det">
                <div className="order-det-ord">
                  <Order orderDetails={order} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>You don't have any item in your cart</div>
            </>
          )}
        </div>

        <div>
          <h3>Delivery Address:</h3>
          <div className="del-add-box">
            {delLocationType === "address-box" && (
              <>
                <div className="add-srch-box">
                  <ReactSelect
                    className="add-select-search"
                    isSearchable
                    placeholder="Enter a new location"
                    options={autoCompleteOptions}
                    onInputChange={(e) => setLocationSearchText(e)}
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e)}
                  />

                  <button
                    className="del-addr-btn"
                    onClick={() => {
                      if (!isGeolocationAvailable) {
                        toast.warn(
                          "Your browser does not support Geolocation",
                          {
                            toastId: "geolocation-not-supported",
                          }
                        );
                      }

                      if (!isGeolocationEnabled) {
                        toast.error(
                          "Please enable browsers' location permission",
                          {
                            toastId: "geoLocationNotEnabled",
                          }
                        );
                      } else {
                        console.log("lat: ", coords.latitude);
                        console.log("lon: ", coords.longitude);
                        getCurrentLocation(coords.latitude, coords.longitude)
                          .then((res) => {
                            // console.log("res: ", res);

                            setDeliveryLocation({
                              label: res.data.features[0].properties.formatted,
                              value: res.data.features[0],
                            });
                          })
                          .catch((err) => console.log(err));
                      }
                    }}
                  >
                    Locate Me <MdOutlineMyLocation />
                  </button>
                </div>

                <div className="addressTypeSwapper">
                  <span onClick={() => setDelLocationType("prev-addr")}>
                    OR, Deliver to any of my previously added locations
                  </span>
                </div>
              </>
            )}

            {delLocationType === "prev-addr" && (
              <>
                <div className="prev-loc-chooser-cont">
                  <div>Select a location from the mentioned list: </div>
                  <select
                    value={deliveryLocation ? deliveryLocation : ""}
                    className="prev-loc-cont"
                    onChange={(e) =>
                      setDeliveryLocation(JSON.parse(e.target.value))
                    }
                  >
                    {currentUserData.previousDeliveryLocations.map(
                      (loc, index) => {
                        return (
                          <>
                            <option key={index} value={JSON.stringify(loc)}>
                              {loc.label}
                            </option>
                          </>
                        );
                      }
                    )}
                  </select>
                </div>
                <div className="addressTypeSwapper">
                  <span onClick={() => setDelLocationType("address-box")}>
                    OR, Choose a new location
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="plc-order-bottom">
          <button className="btn" onClick={placeOrderHandler}>
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
