import { combineReducers } from "@reduxjs/toolkit";
import windowReducer from "./windowReducer";
import itemReducer from "./itemReducer";
import userReducer from "./userReducer";

export default combineReducers({
    windowReducer,
    itemReducer,
    userReducer
})