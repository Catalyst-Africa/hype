import { createSlice } from "@reduxjs/toolkit";

import {
  signUp,
  signIn,
  sendEmailVerificationLink,
  verifyEmail,
  forgotPassword,
  resetPassword,
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
  reducers: {
    updateUser: (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
      state.user.emailVerified = action.payload.emailVerified;
      state.user.photoURL = action.payload.photoURL;
      state.user.displayName = action.payload.displayName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.fulfilled || googleAuth.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled || signUp.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailVerificationLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        sendEmailVerificationLink.fulfilled ||
          sendEmailVerificationLink.rejected,
        (state) => {
          state.loading = false;
        },
      )
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
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled || signIn.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled || forgotPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled || resetPassword.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
