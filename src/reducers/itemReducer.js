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
  editItemData: null,
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

  ADD_FOOD: (state, actions) => {
    if (actions.payload[1] === true) {
      // updating food
      let newAllProd = [];
      state.allProducts.forEach((item, index) => {
        if (item.image.asset_id !== actions.payload[0].image.asset_id) {
          newAllProd.push(item);
        }
      });

      state.allProducts = [...newAllProd, actions.payload[0]];
    } else {
      // adding new food
      state.allProducts = [...state.allProducts, actions.payload[0]];
    }
  },

  UPDATE_EDIT_ITEM_DATA: (state, actions) => {
    state.editItemData = actions.payload;
  },
});

export default itemReducer;
