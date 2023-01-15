import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
