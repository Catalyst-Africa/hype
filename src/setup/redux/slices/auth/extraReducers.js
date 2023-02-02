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
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";

import { auth } from "@/setup/firebase/firebase";
import { extractErrorMessage } from "@/helpers/helpers";
import { db } from "@/setup/firebase/firebase";

export const googleAuth = createAsyncThunk("auth/googleAuth", async () => {
  await signInWithPopup(auth, new GoogleAuthProvider());
  //Check for user
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  // If there are no user, create user
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      timeStamp: serverTimestamp(),
      photoUrl: `https://avatars.dicebear.com/api/bottts/${auth.currentUser.uid}.svg`,
      username: auth.currentUser?.displayName.split(" ")[0],
      phonenumber: "",
      bio: "Hey there, I am active on Hype!",
    });
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (formData) => {
  const { email, password, name } = formData;

  console.log(formData);

  await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(auth.currentUser);

  //Check for user
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  // If there are no user, create user
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: name,
      email: email,
      timeStamp: serverTimestamp(),
      photoUrl: `https://avatars.dicebear.com/api/bottts/${auth.currentUser.uid}.svg`,
      username: name.split(" ")[0],
      phonenumber: "",
      bio: "Hey there, I am active on Hype!",
    });
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
    try {
      await applyActionCode(auth, oobCode);
      await signOut(auth);
      return true;
    } catch (error) {
      toast.error(extractErrorMessage(error.msg));
    }
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
