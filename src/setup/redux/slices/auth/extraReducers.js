import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  applyActionCode,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-hot-toast";

import { auth } from "@/setup/firebase/firebase";
import { extractErrorMessage } from "@/helpers/helpers";

export const googleAuth = createAsyncThunk("auth/googleAuth", async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    toast.success("Successfully signed in!");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (formData) => {
  try {
    const { email, password } = formData;
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    toast.success("Successfully created an account!");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
});

export const sendEmailVerificationLink = createAsyncThunk(
  "auth/sendEmailVerifcationLink",
  async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification link resent to your email");
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (oobCode) => {
    try {
      await applyActionCode(auth, oobCode);
      await signOut(auth);
      toast.success("Email verified successfully");
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  },
);

export const signIn = createAsyncThunk("auth/signIn", async (formData) => {
  try {
    const { email, password } = formData;
    await signInWithEmailAndPassword(auth, email, password);

    toast.success("Successfully signed in");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
});

export const logOut = createAsyncThunk("auth/logOut", async () => {
  try {
    await signOut(auth);
    toast.success("Successfully signed out");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Sent password reset link");
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (oobCode, password) => {
    try {
      await confirmPasswordReset(auth, oobCode, password);
      auth.currentUser && (await signOut(auth));
      toast.success("Password reset successful. You can proceed to login");
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  },
);
