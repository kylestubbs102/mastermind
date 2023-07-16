import { configureStore } from "@reduxjs/toolkit";
import updateGameReducer from "./slices/updateGameSlice";

export default configureStore({
  reducer: {
    updateGame: updateGameReducer
  },
});
