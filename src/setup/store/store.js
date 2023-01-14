import { configureStore } from "@reduxjs/toolkit";

// Import reducers here
import appReducer from "@/setup/slices/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
