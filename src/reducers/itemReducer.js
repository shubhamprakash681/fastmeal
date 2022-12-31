import { createReducer } from "@reduxjs/toolkit";
import { categoryIcon } from "../assets/constants/categoryIcons";

const initialState = {
  categories: [
    { label: "All", value: "all", icon: categoryIcon.allIcon },
    { label: "Chicken", value: "chicken", icon: categoryIcon.chickenIcon },
    { label: "Curry", value: "curry", icon: categoryIcon.curryIcon },
    { label: "Rice", value: "rice", icon: categoryIcon.friedRiceIcon },
    { label: "Fish", value: "fish", icon: categoryIcon.fishIcon },
    { label: "Fruits", value: "fruits", icon: categoryIcon.fruitIcon },
    { label: "Icecreams", value: "icecreams", icon: categoryIcon.iceCreamIcon },
    {
      label: "Soft drinks",
      value: "soft_drinks",
      icon: categoryIcon.softDrinkIcon,
    },
  ],

  allCityOptions: [],
  allSatesOptions: [],
  allProducts: [],
};

const itemReducer = createReducer(initialState, {
  FETCH_CITY_LIST: (state, actions) => {
    state.allCityOptions = actions.payload;
  },

  FETCH_STATE_LIST: (state, actions) => {
    state.allSatesOptions = actions.payload;
  },

  FETCH_CITY_LIST_USER: (state, actions) => {
    state.allCityOptions = actions.payload;
  },
  FETCH_ALL_PRODUCTS: (state, actions) => {
    state.allProducts = actions.payload;
  },
});

export default itemReducer;
