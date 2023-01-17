import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  applyActionCode,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

import { db, auth } from "@/setup/firebase/firebase";
import { extractErrorMessage } from "@/helpers/helpers";

export const updateUser = createAsyncThunk("auth/updateUser", async (user) => {
  try {
    const { uid, email, emailVerified, photoURL, displayName } = user;

    return {
      uid,
      email,
      emailVerified,
      photoURL,
      displayName,
    };
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
});

export const googleAuth = createAsyncThunk("auth/googleAuth", async () => {
  try {
    // Initiate google signin
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = result.user;

    //Check for user
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    // If there are no user, create user
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        timeStamp: serverTimestamp(),
      });
    }
    toast.success("Successfully signed in!");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
});

export const signup = createAsyncThunk("auth/signup", async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    );
    const { user } = userCredential;

    await updateProfile(auth.currentUser, {
      displayName: formData.name,
      photoURL: `https://avatars.dicebear.com/api/bottts/${user.email}.svg`,
    });

    // Make a copy of the formData
    const copyOfFormData = {
      uid: user.uid,
      email: formData.email,
      name: formData.name,
      timestamp: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), copyOfFormData);
    toast.success("Successfully created an account!");
    await sendEmailVerification(user);
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
  "auth/emailVerification",
  async (oobCode) => {
    try {
      await applyActionCode(auth, oobCode);
      toast.success("Email verified successfully");
      return true;
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
      return false;
    }
  },
);

export const signin = createAsyncThunk("auth/signin", async (formData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    );

    if (userCredential.user) {
      toast.success("Successfully signed in");
    }
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
});

export const signout = createAsyncThunk("auth/signout", async () => {
  try {
    await signOut(auth);
    toast.success("Successfully signed out");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (formData) => {
    try {
      await sendPasswordResetEmail(auth, formData.email);

      toast.success("Sent password reset link");
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
      await confirmPasswordReset(auth, data.oobCode, data.password);

      toast.success("Password reset successful. You can proceed to login");
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  },
);
