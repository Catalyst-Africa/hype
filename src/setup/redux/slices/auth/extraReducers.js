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
  await signInWithPopup(auth, new GoogleAuthProvider());
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
    await sendEmailVerification(auth.currentUser);
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (oobCode) => {
    // try {
    await applyActionCode(auth, oobCode);
    await signOut(auth);

    //   } catch (err) {
    //     toast.error(extractErrorMessage(err.message));
    //   }
  },
);

export const signIn = createAsyncThunk("auth/signIn", async (formData) => {
  const { email, password } = formData;
  await signInWithEmailAndPassword(auth, email, password);
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
    await sendPasswordResetEmail(auth, email);
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (oobCode, password) => {
    await confirmPasswordReset(auth, oobCode, password);
    auth.currentUser && (await signOut(auth));
  },
);
