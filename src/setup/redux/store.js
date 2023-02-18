import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// Import reducers here
import appReducer from "@/setup/redux/slices/app/appSlice";
import authReducer from "@/setup/redux/slices/auth/authSlice";
import { hypeApi } from "./slices/api/hypeApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [hypeApi.reducerPath]: hypeApi.reducer,
    app: appReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      hypeApi.middleware,
    ),
  // middleware: [thunk],
});

setupListeners(store.dispatch);
