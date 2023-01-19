import { createSlice } from "@reduxjs/toolkit";

import {
  signup,
  signin,
  sendEmailVerificationLink,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateUser,
  googleAuth,
} from "./extraReducers";

const initialState = {
  loading: false,
  user: {
    uid: "",
    email: "",
    emailVerified: "",
    photoURL: "",
    displayName: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(googleAuth.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailVerificationLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendEmailVerificationLink.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailVerificationLink.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user.emailVerified = action.payload;
      })
      .addCase(verifyEmail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.uid = action.payload.uid;
        state.user.email = action.payload.email;
        state.user.emailVerified = action.payload.emailVerified;
        state.user.photoURL = action.payload.photoURL;
        state.user.displayName = action.payload.displayName;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
