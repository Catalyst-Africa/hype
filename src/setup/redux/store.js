import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// Import reducers here
import appReducer from "@/setup/redux/slices/app/appSlice";
import authReducer from "@/setup/redux/slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
  middleware: [thunk],
});
