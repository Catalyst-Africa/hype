import { fakeBaseQuery } from "@reduxjs/toolkit/dist/query";
import { hypeApi } from "../hypeApi";
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
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

import { auth } from "@/setup/firebase/firebase";
import { extractErrorMessage } from "@/helpers/helpers";
import { db } from "@/setup/firebase/firebase";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/setup/firebase/firebase";

const authApi = hypeApi.injectEndpoints({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    googleAuth: builder.mutation({
      queryFn: async () => {
        try {
          const response = await signInWithPopup(
            auth,
            new GoogleAuthProvider(),
          );

          // Admin default admin role to 'control@catalyst.africa'
          if (
            auth.currentUser.email.toLowerCase() === "control@catalyst.africa"
          ) {
            const addAdmin = httpsCallable(functions, "addAdminRole");
            await addAdmin({ email: auth.currentUser.email.toLowerCase() });
          }

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
              username: `@${
                auth.currentUser?.displayName.toLowerCase().split(" ")[0]
              }`,
              phonenumber: "",
              bio: "Hey there, I am active on Hype!",
              streak: 0,
            });

            toast.success("Successfully signed in!");
            return reponse;
          } else return docSnap.data();
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
    }),
    signUp: builder.mutation({
      queryFn: async (formData) => {
        // try {
        const { email, password, name } = formData;

        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await sendEmailVerification(auth.currentUser);

        // Admin default admin role to 'control@catalyst.africa'
        if (
          auth.currentUser.email.toLowerCase() === "control@catalyst.africa"
        ) {
          const addAdmin = httpsCallable(functions, "addAdminRole");
          addAdmin({ email: auth.currentUser.email.toLowerCase() });
        }

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
            username: `@${name.toLowerCase().split(" ")[0]}`,
            phonenumber: "",
            bio: "Hey there, I am active on Hype!",
            streak: 0,
          });
        }

        return true;

        // } catch (err) {
        //   toast.error(extractErrorMessage(err.message));
        // }
      },
    }),
    sendEmailVerificationLink: builder.mutation({
      queryFn: async () => {
        // try {
        const response = await sendEmailVerification(auth.currentUser);
        toast.success("Verification link resent to your email");
        return true;
        // } catch (err) {
        //   toast.error(extractErrorMessage(err.message));
        // }
      },
    }),
    signIn: builder.mutation({
      queryFn: async (formData) => {
        try {
          const { email, password } = formData;
          const response = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          return response;
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
    }),
    logOut: builder.mutation({
      queryFn: async () => {
        try {
          const response = await signOut(auth);
          toast.success("Successfully signed out");
          return response;
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
    }),
    forgotPassword: builder.mutation({
      queryFn: async (email) => {
        try {
          const response = await sendPasswordResetEmail(auth, email);
          toast.success("password reset link sent");
          return response;
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
    }),
    resetPassword: builder.mutation({
      queryFn: async (oobCode, password) => {
        try {
          const response = await confirmPasswordReset(auth, oobCode, password);
          auth.currentUser && (await signOut(auth));
          toast.success("Password reset successful. You can proceed to login");
          return response;
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
    }),
    updatePassword: builder.mutation({
      queryFn: async (formData) => {
        try {
          const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            formData.oldpassword,
          );
          const result = await reauthenticateWithCredential(
            auth.currentUser,
            credential,
          );
          result && (await updatePassword(auth.currentUser, formData.password));
          toast.success("Your password has been changed successfully");
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
    }),
  }),
});

export const {
  useGoogleAuthMutation,
  useSignUpMutation,
  useSendEmailVerificationLinkMutation,
  useVerifyEmailMutation,
  useSignInMutation,
  useLogOutMutation,
  useForgotePasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = authApi;
