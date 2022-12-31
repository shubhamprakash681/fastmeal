import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
}

const windowReducer = createReducer(initialState, {
    SET_WINDOW_SIZE: (state, action) => {
        state.windowHeight = action.payload.innerHeight
        state.windowWidth = action.payload.innerWidth
    },
});

export default windowReducer;