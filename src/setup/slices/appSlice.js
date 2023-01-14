import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: {},
  isLoggedIn: false,
  loading: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.loading = false;
    },
  },
});

export const { changeTheme, setIsLoggedIn } = appSlice.actions;

export default appSlice.reducer;
