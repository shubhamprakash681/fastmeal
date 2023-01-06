import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../firebase/logoutHandler";
import "../../styles/modal.scss";

const AvatarMenu = ({ isAdmin = false, setProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatarModalRef = useRef();

  useEffect(() => {
    const avatarMenuMouseDownHandler = (e) => {
      if (avatarModalRef.current) {
        if (!avatarModalRef.current.contains(e.target)) {
          if (setProfile) {
            setProfile(false);
          }
        }
      }
    };
    document.addEventListener("mousedown", avatarMenuMouseDownHandler);
  });

  return (
    <>
      <div
        ref={avatarModalRef}
        className="avatar-modal-container"
        onClick={() => {
          if (setProfile) {
            setProfile(false);
          }
        }}
      >
        <div>
          <Link className="avt-modal-opt-link-div" to={"/profile"}>
            Update Profile
          </Link>
        </div>

        <div>
          <Link className="avt-modal-opt-link-div" to={"/orders"}>
            Your Orders
          </Link>
        </div>

        {isAdmin && (
          <>
            <div>
              <Link className="avt-modal-opt-link-div" to={"/add"}>
                Add Item
              </Link>
            </div>
            <div>
              <Link className="avt-modal-opt-link-div" to={"/allitems"}>
                All Items
              </Link>
            </div>
            <div>
              <Link className="avt-modal-opt-link-div" to={"/allusers"}>
                All Users
              </Link>
            </div>
          </>
        )}

        <div
          className="avt-modal-opt-div"
          onClick={() => {
            logoutHandler();

            dispatch({
              type: "DELETE_CURRENT_USER_DATA",
            });

            navigate("/");
          }}
        >
          Logout
        </div>
      </div>
    </>
  );
};

export default AvatarMenu;
