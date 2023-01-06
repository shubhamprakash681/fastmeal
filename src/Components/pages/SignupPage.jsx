import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IoLogoGoogle } from "react-icons/io";
import { CgFacebook } from "react-icons/cg";
import { Link } from "react-router-dom";
import {
  facebookLoginHandler,
  googleLoginHandler,
} from "../../firebase/loginHandler";
import { signUpHandler } from "../../firebase/signupHandler";

const SignupPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPsk, setUserPsk] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* {console.log('On signup page, ')}
            {console.log('userEmail: ', userEmail)}
            {console.log('userPsk: ', userPsk)} */}
      <div className="login-page-container">
        <div className="login-box">
          <h2>SIGN UP</h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();

              signUpHandler(userEmail, userPsk);
            }}
          >
            <div className="form-el">
              <label htmlFor="email">Email:</label>
              <br />
              <input
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                name="email"
                id="email"
                type="text"
              />
            </div>

            <div className="form-el">
              <label htmlFor="psk">Password:</label>
              <br />
              <div className="pswd-field">
                <input
                  value={userPsk}
                  onChange={(e) => {
                    setUserPsk(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  name="psk"
                  id="psk"
                />
                <div
                  className="vis-icon"
                  onClick={(e) => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </div>
              </div>
            </div>

            <button className="btn" id="login-btn" type="submit">
              SIGN UP
            </button>
          </form>

          <div className="separator">Or Continue With</div>

          <div className="logo-cont">
            <span onClick={googleLoginHandler} className="logo-out">
              <IoLogoGoogle />
            </span>
            <span onClick={facebookLoginHandler} className="logo-out">
              <CgFacebook />
            </span>
          </div>

          <div className="sup-div">
            Already a user?
            <span>
              &nbsp;
              <Link to="/login">LOGIN</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
