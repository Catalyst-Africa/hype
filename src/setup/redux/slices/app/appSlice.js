import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: {},
  loggedIn: false,
  loading: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateAuth: (state, action) => {
      state.loggedIn = action.payload;
      state.loading = false;
    },
  },
});

export const { updateTheme, updateAuth } = appSlice.actions;

export default appSlice.reducer;