import React, { useEffect, useState } from "react";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "../../styles/navbar.scss";
import defAvatar from "../../assets/images/avatar.png";
import { useSelector } from "react-redux";
import AvatarMenu from "../Modal/AvatarMenu";
import Cart from "../Cart/Cart";

const NavBar = ({ isAdmin = false }) => {
  const windowSize = useSelector((state) => state.windowReducer);
  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );

  const [menuON, setMenuON] = useState(false);
  const [profile, setProfile] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [avatar, setAvtar] = useState(defAvatar);

  useEffect(() => {
    if (currentUserData.cart) {
      setCartItemCount(currentUserData.cart.length);
    }

    if (currentUserData.profile) {
      if (currentUserData.profile.avtar) {
        setAvtar(currentUserData.profile.avtar);
      }
    }
  }, [currentUserData]);

  // console.log(windowSize);
  // console.log('menuON: ', menuON);
  // console.log('profile: ', profile);

  return (
    <>
      <div className="navbar-container">
        <Link to={"/"} className="nav-left">
          <h1>FastMeal</h1>
        </Link>
        <div
          className="hbg-menu"
          onClick={(e) => {
            e.preventDefault();

            if (windowSize.windowWidth < 900) {
              if (menuON) {
                setProfile(false);
              }
              setMenuON(!menuON);
            }
          }}
        >
          {menuON && <CloseOutlinedIcon fontSize="large" />}
          {!menuON && <MenuOutlinedIcon fontSize="large" />}
        </div>

        {/* for bigger screen */}
        <div className="nav-right">
          <Link className="nav-right-item" to="/">
            Home
          </Link>
          <Link className="nav-right-item" to="/">
            Menu
          </Link>
          <Link className="nav-right-item" to="/">
            Services
          </Link>
          <Link className="nav-right-item" to="/about">
            About Us
          </Link>
          <div
            onClick={(e) => {
              e.preventDefault();

              setCartOpen(!cartOpen);
            }}
            className="cart"
          >
            <LocalMallOutlinedIcon fontSize="large" />
            <div className="cart-number">{cartItemCount}</div>
          </div>
          <Avatar
            className="nav-avtar"
            src={avatar}
            alt="A"
            onClick={(e) => {
              e.preventDefault();

              setProfile(!profile);
            }}
          />
        </div>
      </div>

      {/* for smaller screen */}
      {menuON && windowSize.windowWidth < 900 && (
        <div className="dropdown">
          <div className="cart">
            <div
              onClick={(e) => {
                e.preventDefault();

                setCartOpen(!cartOpen);
              }}
              className="cart-l"
            >
              <LocalMallOutlinedIcon fontSize="large" />
              <div className="cart-number">{cartItemCount}</div>
            </div>
            <div className="cart-r">
              <Avatar
                className="avatar-drop"
                src={avatar}
                alt="A"
                onClick={(e) => {
                  e.preventDefault();

                  setProfile(!profile);
                }}
              />
            </div>
          </div>
          {profile && <AvatarMenu isAdmin={isAdmin} />}
          <Link className="nav-right-item" to="/">
            Home
          </Link>
          <Link className="nav-right-item" to="/menu">
            Menu
          </Link>
          <Link className="nav-right-item" to="/services">
            Services
          </Link>
          <Link className="nav-right-item" to="about">
            About Us
          </Link>
        </div>
      )}

      {/* for bigger screen */}
      {profile && windowSize.windowWidth > 900 && (
        <AvatarMenu isAdmin={isAdmin} />
      )}

      {cartOpen && <Cart setCartOpen={setCartOpen} />}
    </>
  );
};

export default NavBar;
