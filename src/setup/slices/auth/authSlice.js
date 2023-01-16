import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  signInWithGoogle,
  signupUser,
  sendEmailVerificationLink,
  verifyEmail,
  signIn,
  signOutUser,
  forgotPassword,
  resetPassword,
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
    if (await verifyEmail(oobCode)) {
      return true;
    }
    return false;
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

export const handleForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    await forgotPassword(email);
  },
);

export const handleResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    console.log("boy");
    const response = await resetPassword(data);
    console.log(response);
  },
);

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
      })
      .addCase(handleForgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleForgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleForgotPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleResetPassword.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
