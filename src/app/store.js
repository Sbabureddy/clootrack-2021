import { configureStore } from "@reduxjs/toolkit";
import barReducer from "../features/bar/barSlice";

export const store = configureStore({
  reducer: {
    bar: barReducer,
  },
});
