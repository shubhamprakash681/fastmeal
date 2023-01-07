import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import {
  fetchAllCityList_User,
  updateUserDataInDb,
} from "../../actions/customerActions";
import "../../styles/userprofile.scss";
import AvatarEditor from "../Modal/AvatarEditor";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userAvtar, setUserAvtar] = useState("");
  const [openAvatarEditor, setOpenAvatarEditor] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  // address
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );
  const stateOptions = useSelector(
    (state) => state.itemReducer.allSatesOptions
  );
  const cityOptions = useSelector((state) => state.itemReducer.allCityOptions);

  const loadInitialData = () => {
    if (currentUserData.profile) {
      setUserAvtar(currentUserData.profile.avtar);
      if (currentUserData.profile.name) {
        setName(currentUserData.profile.name);
      }
      if (currentUserData.profile.email) {
        setEmail(currentUserData.profile.email);
      }
      if (currentUserData.profile.phoneNumber) {
        setPhoneNumber(currentUserData.profile.phoneNumber);
      }
      if (currentUserData.profile.gender) {
        setGender(currentUserData.profile.gender);
      }

      if (currentUserData.profile.address.line1) {
        setLine1(currentUserData.profile.address.line1);
      }
      if (currentUserData.profile.address.line2) {
        setLine2(currentUserData.profile.address.line2);
      }
      if (currentUserData.profile.address.pinCode) {
        setPinCode(currentUserData.profile.address.pinCode);
      }
      if (currentUserData.profile.address.city) {
        setCity(currentUserData.profile.address.city);
      }
      if (currentUserData.profile.address.state) {
        setState(currentUserData.profile.address.state);
      }
      if (currentUserData.profile.address.country) {
        setCountry(currentUserData.profile.address.country);
      }
    }
  };

  const formSubmissionHandler = async (e) => {
    e.preventDefault();

    let modData = JSON.parse(JSON.stringify(currentUserData));
    modData.profile.name = name;
    modData.profile.email = email;
    modData.profile.phoneNumber = phoneNumber;
    modData.profile.gender = gender;

    modData.profile.address.line1 = line1;
    modData.profile.address.line2 = line2;
    modData.profile.address.pinCode = pinCode;
    modData.profile.address.city = city;
    modData.profile.address.state = state;
    modData.profile.address.country = country;

    // console.log("parsedObject: ", modData);

    dispatch(updateUserDataInDb(currentUserData, modData));

    toast.success("Profile Updated", {
      toastId: "profile-upd-success",
    });
  };

  useEffect(() => {
    loadInitialData();
  }, [currentUserData]);

  useEffect(() => {
    if (state.value) {
      dispatch(fetchAllCityList_User("IN", state.value));
    }
  }, [state]);

  return (
    <>
      {/* {console.log(userAvtar)} */}
      {/* {console.log("name: ", name)}
      {console.log("email: ", email)}
      {console.log("phoneNumber: ", phoneNumber)}
      {console.log("gender: ", gender)}
      {console.log("line1: ", line1)}
      {console.log("line2: ", line2)}
      {console.log("pinCode: ", pinCode)}
      {console.log("city: ", city)}
      {console.log("state: ", state)}
      {console.log("country: ", country)} */}

      {/* {console.log(currentUserData)} */}

      <div className="user-profile-container">
        <div className="user-avtar-cont">
          <div className="frame">
            {userAvtar ? (
              <>
                <img
                  src={userAvtar}
                  alt="avtar"
                  onClick={(e) => {
                    setOpenAvatarEditor(!openAvatarEditor);
                  }}
                />
              </>
            ) : (
              <>
                <img
                  src="https://res.cloudinary.com/dfoi3evcp/image/upload/v1671870102/fastmeal/asset/userAvtar/man_fhanrx.png"
                  alt="avtar"
                  onClick={(e) => {
                    setOpenAvatarEditor(!openAvatarEditor);
                  }}
                />
              </>
            )}

            {openAvatarEditor && (
              <AvatarEditor setOpenAvtarEditor={setOpenAvatarEditor} />
            )}
          </div>
        </div>
        <form id="add-item-form" action="">
          <div className="hor-form-el">
            <label htmlFor="name">Name:</label>
            <input
              placeholder="Enter your name"
              name="name"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
          <div className="hor-form-el">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="Enter your E-mail"
              name="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </div>

          <div id="phone-no-cont" className="hor-form-el">
            <label htmlFor="phoneno">Contact No.:</label>
            <PhoneInput
              required
              placeholder="Enter your phone number"
              value={phoneNumber}
              defaultCountry="IN"
              id="phoneno"
              onChange={(e) => {
                setPhoneNumber(e);
              }}
            />
          </div>

          <div className="hor-form-el">
            <label htmlFor="gender-sel">Gender:</label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="gender-sel"
              name="gender"
              id="gender-sel"
            >
              <option value="null">---Select your gender---</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
            </select>
          </div>

          <div className="addr-hdr">Address</div>

          <div className="hor-form-el">
            <label htmlFor="line1">Line 1:</label>
            <input
              placeholder="Address line 1"
              name="line1"
              id="line1"
              value={line1}
              required
              onChange={(e) => setLine1(e.target.value)}
              type="text"
            />
          </div>

          <div className="hor-form-el">
            <label htmlFor="line2">Line 2:</label>
            <input
              placeholder="Address line 2"
              name="line2"
              id="line2"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              type="text"
            />
          </div>

          <div id="address-footer">
            <div className="add-footer-form-el">
              <label className="add-footer-form-el-label" htmlFor="country">
                Country:
              </label>
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                name="country"
                id="country"
              >
                <option value="">--Country--</option>
                <option value="IN">India</option>
              </select>
            </div>

            <div className="add-footer-form-el">
              <label className="add-footer-form-el-label" htmlFor="state">
                State:
              </label>
              {stateOptions.length > 0 && (
                <>
                  <ReactSelect
                    placeholder="Choose your state"
                    id="state"
                    className="react-select"
                    value={state}
                    required
                    options={stateOptions}
                    onChange={(e) => setState(e)}
                  />
                </>
              )}
            </div>

            <div className="add-footer-form-el">
              <label className="add-footer-form-el-label" htmlFor="city">
                City:
              </label>
              {cityOptions.length > 0 && (
                <>
                  <ReactSelect
                    placeholder="Choose your city"
                    id="city"
                    className="react-select"
                    value={city}
                    required
                    options={cityOptions}
                    onChange={(e) => setCity(e)}
                  />
                </>
              )}
            </div>

            <div className="add-footer-form-el">
              <label className="add-footer-form-el-label" htmlFor="pincode">
                Pin code:
              </label>
              <input
                placeholder="Enter Pincode"
                name="pincode"
                id="pincode"
                value={pinCode}
                required
                onChange={(e) => setPinCode(e.target.value)}
                type="text"
              />
            </div>
          </div>

          <div className="use-pro-sub-div">
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();

                loadInitialData();

                navigate("/");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              onClick={formSubmissionHandler}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
