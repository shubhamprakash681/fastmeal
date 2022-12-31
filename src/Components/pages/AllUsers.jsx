import React from "react";
import { useSelector } from "react-redux";
import "../../styles/allUser.scss";
import User from "../User/User";

const AllUsers = () => {
  const allUsers = useSelector((state) => state.userReducer.allUsers);
  return (
    <>
      <div className="all-user-container">
        {allUsers.length > 0 &&
          allUsers.map((user, index) => {
            return <User allUsers={allUsers} userData={user} key={index} />;
          })}
      </div>
    </>
  );
};

export default AllUsers;
