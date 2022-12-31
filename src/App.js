import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/pages/Home";
import LoginPage from "./Components/pages/LoginPage";
import PasswordRecovery from "./Components/pages/PasswordRecovery";
import SignupPage from "./Components/pages/SignupPage";
import "./styles/app.scss";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/loginHandler";
import UserProfile from "./Components/pages/UserProfile";
import AddItem from "./Components/pages/AddItem";
import AllItems from "./Components/pages/AllItems";
import AllUsers from "./Components/pages/AllUsers";
import {
  fetchAllCityList,
  fetchAllUsersDataFromDb,
} from "./actions/adminActions";
import {
  fetchAllStateList,
  fetchCurrentUserDataFromDB,
  getAllProductsFromDb,
  testAdd,
  testRead,
} from "./actions/customerActions";
import OrderPlaced from "./Components/pages/OrderPlaced";
import TrackDelivery from "./Components/pages/TrackDelivery";
import YourOrders from "./Components/pages/YourOrders";

function App() {
  const dispatch = useDispatch();
  const currentUserdata = useSelector(
    (state) => state.userReducer.currentUserData
  );

  const [user, setUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;

    return { innerWidth, innerHeight };
  };

  useEffect(() => {
    const handleWindowResize = () => {
      // setWindowSize(getWindowSize())

      dispatch({
        type: "SET_WINDOW_SIZE",
        payload: getWindowSize(),
      });
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProductsFromDb());
    dispatch(fetchAllStateList("IN"));

    // dispatch(testAdd)
    // dispatch(testRead);

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    // to run on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchCurrentUserDataFromDB(user));
    }
  }, [user]);

  useEffect(() => {
    if (currentUserdata.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUserdata]);

  useEffect(() => {
    if (isAdmin) {
      // action dispatching for admins only
      dispatch(fetchAllUsersDataFromDb());
      dispatch(fetchAllCityList("IN"));
    }
  }, [isAdmin]);

  return (
    <>
      {console.log("user: ", user)}

      <Routes>
        {/* authenticated ? (yes) : (no) */}
        {user ? (
          <>
            <Route
              path="/"
              element={
                <>
                  <NavBar isAdmin={isAdmin} />
                  <Home />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <NavBar isAdmin={isAdmin} />
                  <UserProfile />
                </>
              }
            />

            <Route
              path="/orders"
              element={
                <>
                  <NavBar isAdmin={isAdmin} />
                  <YourOrders />
                </>
              }
            />

            <Route
              path="/order-placed"
              element={
                <>
                  <NavBar isAdmin={isAdmin} />
                  <OrderPlaced />
                </>
              }
            />

            <Route
              path="/track-delivery"
              element={
                <>
                  <NavBar isAdmin={isAdmin} />
                  <TrackDelivery />
                </>
              }
            />

            {isAdmin && (
              <>
                <Route
                  path="/add"
                  element={
                    <>
                      <NavBar isAdmin={isAdmin} />
                      <AddItem />
                    </>
                  }
                />

                <Route
                  path="/allitems"
                  element={
                    <>
                      <NavBar isAdmin={isAdmin} />
                      <AllItems />
                    </>
                  }
                />

                <Route
                  path="/allusers"
                  element={
                    <>
                      <NavBar isAdmin={isAdmin} />
                      <AllUsers />
                    </>
                  }
                />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotpassword" element={<PasswordRecovery />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
