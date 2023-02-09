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
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

import { auth } from "@/setup/firebase/firebase";
import { extractErrorMessage } from "@/helpers/helpers";
import { db } from "@/setup/firebase/firebase";

export const googleAuth = createAsyncThunk("auth/googleAuth", async () => {
  await signInWithPopup(auth, new GoogleAuthProvider());
  //Check for user
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  let isAdmin;

  // Check user's email to set Admin to true if it is catalyst admin's email

  if (auth.currentUser.email.toLowerCase() === "control@catalyst.africa") {
    isAdmin = true;
  }

  // If there are no user, create user
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      timeStamp: serverTimestamp(),
      photoUrl: `https://avatars.dicebear.com/api/bottts/${auth.currentUser.uid}.svg`,
      username: `@${auth.currentUser?.displayName.toLowerCase().split(" ")[0]}`,
      phonenumber: "",
      bio: "Hey there, I am active on Hype!",
      isAdmin,
    });
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (formData) => {
  const { email, password, name } = formData;

  await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(auth.currentUser);

  //Check for user
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  // Check user's email to set Admin to true if it is catalyst admin's email
  if (auth.currentUser.email.toLowerCase() === "control@catalyst.africa") {
    isAdmin = true;
  }

  // If there are no user, create user
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: name,
      email: email,
      timeStamp: serverTimestamp(),
      photoUrl: `https://avatars.dicebear.com/api/bottts/${auth.currentUser.uid}.svg`,
      username: `@${name.toLowerCase().split(" ")[0]}`,
      phonenumber: "",
      bio: "Hey there, I am active on Hype!",
      isAdmin,
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

export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (formData) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      formData.oldpassword,
    );
    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential,
    );

    result && (await updatePassword(auth.currentUser, formData.password));
  },
);

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async ({ user, bio, username, phonenumber }) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, {
      bio: bio || user?.bio,
      username:
        username?.[0] === "@" ? username : `@${username}` || user.username,
      phonenumber: phonenumber || user?.phonenumber || "",
    });
  },
);

export const updateUserDP = createAsyncThunk(
  "auth/updateUserDP",
  async (imgUrl) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, {
      photoUrl: imgUrl,
    });
  },
);
