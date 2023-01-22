import { createSlice } from "@reduxjs/toolkit";
import { light, dark } from "@/styles/global/Theme";

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
        JSON.stringify(theme) === JSON.stringify(light) ? dark : light;
    },
    updateAuth: (state, action) => {
      state.loggedIn = action.payload;
      state.loading = false;
    },
  },
});

export const { updateTheme, updateAuth } = appSlice.actions;

export default appSlice.reducer;
