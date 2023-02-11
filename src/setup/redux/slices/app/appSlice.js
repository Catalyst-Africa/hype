import { createSlice } from "@reduxjs/toolkit";
import { light, dark } from "@/styles/global/Theme";
import {
  addHypeCategories,
  getAllHypeCategories,
  getAllUsers,
} from "./extraReducers";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/helpers/helpers";

const initialState = {
  theme: light,
  loggedIn: false,
  loading: true,
  adminLoading: false,
  users: [],
  hypeCategories: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateTheme: (state) => {
      state.theme =
        JSON.stringify(theme) === JSON.stringify(light) ? dark : light;
    },
    updateAuth: (state, action) => {
      state.loggedIn = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.adminLoading = false;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.adminLoading = false;
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(addHypeCategories.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(addHypeCategories.fulfilled, (state) => {
        state.adminLoading = false;
        toast.success("Hype category created successfully");
      })
      .addCase(addHypeCategories.rejected, (state, action) => {
        state.adminLoading = false;
        console.log(action.error.message);
        toast.error(action.error.message);
      })
      .addCase(getAllHypeCategories.pending, (state) => {
        // state.adminLoading = true;
      })
      .addCase(getAllHypeCategories.fulfilled, (state, { payload }) => {
        state.adminLoading = false;
        state.hypeCategories = payload;
      })
      .addCase(getAllHypeCategories.rejected, (state, action) => {
        state.adminLoading = false;
        toast.error(action.error.message);
      });
  },
});

export const { updateTheme, updateAuth } = appSlice.actions;

export default appSlice.reducer;
