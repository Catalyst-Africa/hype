import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  emailVerified: "",
  photoURL: "",
  displayName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.id = action.payload.uid;
      state.email = action.payload.email;
      state.emailVerified = action.payload.emailVerified;
      state.photoURL = action.payload.photoURL;
      state.displayName = action.payload.displayName;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
