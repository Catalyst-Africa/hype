import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  signInWithGoogle,
  signupUser,
  sendEmailVerificationLink,
  verifyEmail,
  signIn,
  signOutUser,
} from "@/handlers/auth/auth";

const initialState = {
  loading: false,
};

export const handleGoogleAuth = createAsyncThunk(
  "auth/signinWithGoogle",
  async () => {
    await signInWithGoogle();
  },
);

export const handleSignup = createAsyncThunk(
  "auth/signup",
  async (formData) => {
    await signupUser(formData);
  },
);

export const handleEmailVerificationLink = createAsyncThunk(
  "auth/sendEmailVerifcationLink",
  async () => {
    await sendEmailVerificationLink();
  },
);

export const handleEmailVerification = createAsyncThunk(
  "auth/emailVerification",
  async (oobCode) => {
    await verifyEmail(oobCode);
  },
);

export const handleSignin = createAsyncThunk(
  "auth/signin",
  async (formData) => {
    await signIn(formData);
  },
);

export const handleSignout = createAsyncThunk("auth/signout", async (auth) => {
  await signOutUser(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGoogleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleGoogleAuth.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleGoogleAuth.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSignup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleSignup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleEmailVerificationLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleEmailVerificationLink.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleEmailVerificationLink.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleEmailVerification.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleEmailVerification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleEmailVerification.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleSignin.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSignin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleSignin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
