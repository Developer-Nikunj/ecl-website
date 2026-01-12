import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";



export interface userdata {
  id:number,
  name:string,
  email:string,
  img:string,
  role:string,
}

export interface userActivityData {
  action: string;
  requestMethod: string;
  endPoint: string;
  status: string;
}

export interface profileResponse {
  status: number;
  message: string;
  data: userdata;
  userActivity: userActivityData[];
}

export const getUserProfile = createAsyncThunk<
  profileResponse,
  void,
  { rejectValue: string }
>("user/profile", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/profile", {
      withCredentials: true,
    });

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    const { status, message, data, userActivity } = res.data;

    return { status, message, data, userActivity };
  } catch (err: any) {
    const message =
      err.response?.data?.message || "Failed to fetch user profile";
    toast.error(message);
    return rejectWithValue(message);
  }
});



export interface userCreateResponse {
  message: string;
  status: number;
  data: userdata;
}
export interface userCreatePayload {
  name: string;
  email: string;
  role: string;
  password: string;
}

export const userCreateAdmin = createAsyncThunk<
  userCreateResponse,
  userCreatePayload,
  { rejectValue: string }
>("user/createAdmin", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/users/admin", payload, {
      withCredentials: true,
    });

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    // ✅ return exactly what backend sends
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to create user";
    toast.error(message);
    return rejectWithValue(message);
  }
});