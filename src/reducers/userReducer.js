import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  currentUserData: "",
  allUsers: [],
};

const userReducer = createReducer(initialState, {
  GET_CURRENT_USER_DATA: (state, actions) => {
    state.currentUserData = actions.payload;
  },

  DELETE_CURRENT_USER_DATA: (state, actions) => {
    state.currentUserData = "";
  },

  UPDATE_USER_CART: (state, actions) => {
    state.currentUserData.cart = actions.payload;
  },

  PLACE_ORDER: (state, actions) => {
    state.currentUserData = actions.payload;
  },

  GET_ALL_USERS_DATA: (state, actions) => {
    state.allUsers = actions.payload;
  },
});

export default userReducer;
