import React, { useState } from "react";
import "../../styles/login.scss";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IoLogoGoogle } from "react-icons/io";
import { CgFacebook } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import {
  emailLoginHandler,
  facebookLoginHandler,
  googleLoginHandler,
} from "../../firebase/loginHandler";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPsk, setUserPsk] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // { console.log('On signup page, ') }
  // { console.log('userEmail: ', userEmail) }
  // { console.log('userPsk: ', userPsk) }

  return (
    <>
      <div className="login-page-container">
        <div className="login-box">
          <h2>LOGIN</h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();

              emailLoginHandler(userEmail, userPsk);

              navigate("/");
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
              LOGIN
            </button>
            <Link to={"/forgotpassword"} className="fgt-psk">
              Forgot Password?
            </Link>
          </form>

          <div className="separator">OR</div>

          <div className="logo-cont">
            <span
              onClick={(e) => {
                googleLoginHandler();

                navigate("/");
              }}
              className="logo-out"
            >
              <IoLogoGoogle />
            </span>
            <span
              onClick={(e) => {
                facebookLoginHandler();

                navigate("/");
              }}
              className="logo-out"
            >
              <CgFacebook />
            </span>
          </div>

          <div className="sup-div">
            Need an account?
            <span>
              &nbsp;
              <Link to="/">SIGN UP</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
