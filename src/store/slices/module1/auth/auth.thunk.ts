// auth.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";

interface LoginPayload {
  email: string;
  password: string;
}
interface AuthResponse {
  status: boolean;
  accessToken: string;
  message: string;
}

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await api.post(
      "/auth/login",
      { email, password },
      {
        withCredentials: true,
      }
    );
    console.log("res", res);
    toast.success(String(res.data.message));
    return res.data;
  } catch (err) {
    toast.error(String(err));
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}
interface RegisterResponse {
  status: boolean;
  message: string;
}

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/register",
  async ({ email, name, password }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/auth/register",
        { email, name, password },
        { withCredentials: true }
      );
      console.log("res", res);
      toast.success(String(res.data.message));
      return res.data;
    } catch (err) {
      toast.error(String(err));
      return rejectWithValue(err.response?.data?.message || "Registeration failed");
    }
  }
);
