import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../firebase/logoutHandler";
import "../../styles/modal.scss";

const AvatarMenu = ({ isAdmin = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="avatar-modal-container">
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
