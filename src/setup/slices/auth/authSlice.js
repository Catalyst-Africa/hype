import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithGoogle,
  signupUser,
  sendEmailVerificationLink,
  verifyEmail,
  signIn,
} from "@/handlers/auth/auth";

const initialState = {
  loading: false,
};

export const handleGoogleAuth = createAsyncThunk(
  "auth/signinWithGoogle",
  async () => {
    const response = await signInWithGoogle();
    return response.data;
  },
);

export const handleSignup = createAsyncThunk(
  "auth/signup",
  async (formData) => {
    const response = await signupUser(formData);
    return response.data;
  },
);

export const handleEmailVerificationLink = createAsyncThunk(
  "auth/sendEmailVerifcationLink",
  async () => {
    const response = await sendEmailVerificationLink();
    return response.data;
  },
);

export const handleEmailVerification = createAsyncThunk(
  "auth/emailVerification",
  async (oobCode) => {
    const response = await verifyEmail(oobCode);
    return response.data;
  },
);

export const handleSignin = createAsyncThunk(
  "auth/signin",
  async (formData) => {
    const response = await signIn(formData);
    return response.data;
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
      });
  },
});

export default authSlice.reducer;
