// src/store/slices/module1/auth/auth.slices.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./auth.thunk";
import { registerUser } from "./auth.thunk";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  status: boolean | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  status: null,
  loading: false,
  error: null,
};

interface AuthPayload {
  accessToken: string;
  status: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthPayload>) {
      state.accessToken = action.payload.accessToken;
      state.status = action.payload.status;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.status = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.accessToken = action.payload.token;
        state.status = action.payload.status;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
