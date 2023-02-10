import { extractErrorMessage } from "@/helpers/helpers";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import {
  signUp,
  signIn,
  sendEmailVerificationLink,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleAuth,
  updateUserPassword,
  updateUserData,
  updateUserDP,
} from "./extraReducers";

const initialState = {
  loading: false,
  rerender: false,
  user: {
    uid: "",
    email: "",
    emailVerified: "",
    photoURL: "",
    displayName: "",
    phoneNumber: "",
    bio: "",
    createdAt: "",
    username: "",
    isAdmin: "",
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
      state.user.photoURL = action.payload?.data?.photoUrl;
      state.user.displayName = action.payload?.data?.name;
      state.user.phoneNumber = action.payload?.data?.phonenumber;
      state.user.bio = action.payload.data?.bio;
      state.user.createdAt = action.payload?.data?.timeStamp;
      state.user.username = action.payload?.data?.username;
      state.user.isAdmin = action.payload?.adminRole;
    },
    updateLoading: (state) => {
      state.rerender = !state.rerender;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.fulfilled, (state) => {
        state.loading = false;
        toast.success("Successfully signed in!");
      })

      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      })

      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        toast.success("Successfully created an account!");
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(sendEmailVerificationLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendEmailVerificationLink.fulfilled, (state) => {
        state.loading = false;
        toast.success("Verification link resent to your email");
      })
      .addCase(sendEmailVerificationLink.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user.emailVerified = action.payload;
        toast.success("Email verified successfully");
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false;
        toast.success("Successfully signed in");
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        toast.success("Sent password reset link");
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        toast.success("Password reset successful. You can proceed to login");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.loading = false;
        toast.success("Your password has been changed successfully");
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserData.fulfilled, (state) => {
        state.loading = false;
        toast.success("Profile Successfully Updated");
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error);
        toast.error(extractErrorMessage(action.error.message));
      })
      .addCase(updateUserDP.pending, (state) => {})
      .addCase(updateUserDP.fulfilled, (state) => {
        toast.success("Profile Picture Successfully Updated");
      })
      .addCase(updateUserDP.rejected, (state, action) => {
        console.log(action.error);
        toast.error(extractErrorMessage(action.error.message));
      });
  },
});

export const { updateUser, updateLoading } = authSlice.actions;
export default authSlice.reducer;
