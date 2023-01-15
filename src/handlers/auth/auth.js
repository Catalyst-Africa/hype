import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  applyActionCode,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";

import { db, auth } from "@/setup/firebase/firebase";
import { extractErrorMessage } from "@/helpers/helpers";

// Google signin

export const signInWithGoogle = async () => {
  try {
    // Initiate google signin
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
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
    toast.success("Successfully signed in");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
};

//  Sign Up User

export const signupUser = async (formData) => {
  try {
    // Destructure details needed from the form data received
    const { email, password } = formData;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;

    // Make a copy of the formData
    const copyOfFormData = { ...formData, displayName: null };
    delete copyOfFormData.password;
    copyOfFormData.timeStamp = serverTimestamp();

    await setDoc(doc(db, "users", user.uid), copyOfFormData);

    toast.success("Successfully created an account!");

    // Send Email verification link to users email.
    await sendEmailVerification(user);
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
};

//  Send Email Verification Link

export const sendEmailVerificationLink = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success("Verification link resent to your email");
  } catch (err) {
    console.log(err.message);
    toast.error(extractErrorMessage(err.message));
  }
};

// Verify Email

export const verifyEmail = async (oobCode) => {
  try {
    await applyActionCode(auth, oobCode);

    window.location.href = "/email-verification";
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
};

//  Sign Out

export const signOutUser = async (auth) => {
  try {
    await signOut(auth);
    toast.success("Successfully signed out");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
};

//  Sign In

export const signIn = async (formData) => {
  try {
    // Destructure details needed from the form data received
    const { email, password } = formData;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (userCredential.user) {
      toast.success("Successfully signed in");
    }
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
};

//  Forgot Password

export const forgotPassword = async (formData) => {
  try {
    // Destructure details needed from the form data received
    const { email } = formData;
    await sendPasswordResetEmail(auth, email);

    toast.success("Sent password reset link");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
};

//  Reset Password

export const resetPassword = async (data) => {
  try {
    const { password, oobCode } = data;
    if (auth.currentUser) {
      await signOut(auth);
    }
    await confirmPasswordReset(auth, oobCode, password);

    toast.success("Password reset successful. You can proceed to login");
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
};
