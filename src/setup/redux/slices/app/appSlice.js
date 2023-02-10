import { createSlice } from "@reduxjs/toolkit";
import { light, dark } from "@/styles/global/Theme";
import { getAllUsers } from "./extraReducers";

const initialState = {
  theme: light,
  loggedIn: false,
  loading: true,
  users: [],
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
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      });
  },
});

export const { updateTheme, updateAuth } = appSlice.actions;

export default appSlice.reducer;
