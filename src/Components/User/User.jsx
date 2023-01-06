import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserDataInDb_Admin } from "../../actions/adminActions";
import UserDetails from "./UserDetails";

const User = ({ allUsers, userData }) => {
  const dispatch = useDispatch();
  const userAvtar = userData.profile.avtar;

  const [openUserDetail, setOpenserDetail] = useState(false);

  const updateRole = (newRole) => {
    let modData = JSON.parse(JSON.stringify(userData));
    modData.role = newRole;

    dispatch(updateUserDataInDb_Admin(allUsers, userData, modData));
  };

  return (
    <>
      <div className="user-container">
        <div
          className="us-left"
          onClick={(e) => {
            setOpenserDetail(true);
          }}
        >
          <div className="us-av">
            {userAvtar ? (
              <>
                <img src={userAvtar} alt="av" />
              </>
            ) : (
              <>
                <img
                  src="https://res.cloudinary.com/dfoi3evcp/image/upload/v1671870102/fastmeal/asset/userAvtar/man_fhanrx.png"
                  alt="avtar"
                />
              </>
            )}
          </div>

          <div className="us-email">{userData.profile.email}</div>
          <div className="us-role">{userData.role}</div>
        </div>

        {/* <div className="us-btn"> */}
          {userData.role === "admin" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                updateRole("customer");
              }}
              className="btn"
            >
              Make User
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                updateRole("admin");
              }}
              className="btn"
            >
              Make Admin
            </button>
          )}
        {/* </div> */}
      </div>

      {openUserDetail && (
        <UserDetails user={userData} setOpenserDetail={setOpenserDetail} />
      )}
    </>
  );
};

export default User;
