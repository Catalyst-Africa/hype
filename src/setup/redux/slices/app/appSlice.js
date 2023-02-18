import { createSlice } from "@reduxjs/toolkit";
import { light, dark } from "@/styles/global/Theme";
import {
  addHypeCategories,
  getAllHypeCategories,
  getAllUsers,
  addHype,
  getAllHype,
  updateHype,
  deleteHype,
  getSentHypeByUser,
  receiveSentHypeByUser,
  getAdminStatistics,
  getAllHypeReceived,
  getAllHypeSent,
  deleteHypeCategories,
} from "./extraReducers";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/helpers/helpers";

const initialState = {
  theme: light,
  loggedIn: false,
  loading: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateTheme: (state) => {
      state.theme =
        JSON.stringify(theme) === JSON.stringify(light)
          ? JSON.stringify(dark)
          : JSON.stringify(light);
    },
    updateAuth: (state, action) => {
      state.loggedIn = action.payload;
      state.loading = false;
    },
  },
});

export const { updateTheme, updateAuth } = appSlice.actions;

export default appSlice.reducer;
