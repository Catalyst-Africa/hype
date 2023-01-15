import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithGoogle } from "@/handlers/auth/auth";

const initialState = {
  loading: false,
};

export const handlegGoogleAuth = createAsyncThunk(
  "auth/signInWithGoogle",
  async () => {
    const response = await signInWithGoogle();
    return response.data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handlegGoogleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(handlegGoogleAuth.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handlegGoogleAuth.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
