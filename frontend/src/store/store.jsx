import apiSlice from "./apiSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: {
        api: apiSlice,
    },
});
export default store;