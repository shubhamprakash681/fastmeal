import { configureStore } from "@reduxjs/toolkit";
import myReducers from './reducers/index'

const reduxStore = configureStore({
    reducer: myReducers
})

export default reduxStore;