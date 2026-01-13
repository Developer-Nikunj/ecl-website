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
  token: string;
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
    if (res.data.status === 0) {
      toast.error(String(res.data.message));
      return rejectWithValue(res.data.message);
    }
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
      if (res.data.status === 0) {
        toast.error(String(res.data.message));
        return rejectWithValue(res.data.message);
      }
      toast.success(String(res.data.message));
      return res.data;
    } catch (err) {
      toast.error(String(err));
      return rejectWithValue(err.response?.data?.message || "Registeration failed");
    }
  }
);



interface verifyUserPayload {
  email: string;
  otp: string;
}
interface verifyUserResponse {
  status: boolean;
  message: string;
}

export const verifyUser = createAsyncThunk<
  verifyUserResponse,
  verifyUserPayload,
  { rejectValue: string }
>("auth/verify-email", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const res = await api.post(
      "/auth/verify-email",
      { email, otp },
      { withCredentials: true }
    );
    console.log("res", res);
    if (res.data.status === 0) {
      toast.error(String(res.data.message));
      return rejectWithValue(res.data.message);
    }
    toast.success(String(res.data.message));
    return res.data;
  } catch (err) {
    toast.error(String(err));
    return rejectWithValue(
      err.response?.data?.message || "verify email failed"
    );
  }
});


interface logoutUserResponse {
  status: boolean;
  message: string;
}

export const logoutUser = createAsyncThunk<
  logoutUserResponse,void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post(
      "/auth/logout",
      { withCredentials: true }
    );
    console.log("res", res);
    if (res.data.status === 0) {
      toast.error(String(res.data.message));
      return rejectWithValue(res.data.message);
    }
    toast.success("please Sign In");
    return res.data;
  } catch (error:any) {
    const message ="Logout failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

interface forgPassResponse {
  status:number;
  message:string;
}
interface forgPassPayload {
  email:string;
}

export const forgotPasswordOtp = createAsyncThunk<
  forgPassResponse,
  forgPassPayload,
  { rejectValue: string }
>("auth/forgPass", async(email, { rejectWithValue })=>{
  try {
    const res = await api.post("/auth/forgPass", { withCredentials: true });
    console.log("res", res);
    if (res.data.status === 0) {
      toast.error(String(res.data.message));
      return rejectWithValue(res.data.message);
    }
    toast.success(String(res.data.message));
    return res.data;
  } catch (error: any) {
    const message = "Forgot password failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});
