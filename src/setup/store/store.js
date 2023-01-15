import { configureStore } from "@reduxjs/toolkit";

// Import reducers here
import appReducer from "@/setup/slices/app/appSlice";
import authReducer from "@/setup/slices/auth/authSlice";
import userReducer from "@/setup/slices/user/userSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userReducer,
  },
});
