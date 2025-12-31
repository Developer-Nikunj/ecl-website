// roles.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Meta {
  total: number;
  limit: number;
  offset: number;
}

interface GetUsersResponse {
  status: number;
  message: string;
  data: User[];
  meta: Meta;
}
interface GetUsersPayload {
  limit: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export const getallUsers = createAsyncThunk<
  GetUsersResponse,
  GetUsersPayload,
  { rejectValue: string }
>(
  "users/all",
  async ({ limit, offset = 0, startDate, endDate }, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/allUsers", {
        params: {
          limit,
          offset,
          startDate,
          endDate,
        },
        withCredentials: true,
      });
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
        err.response?.data?.message || "Users fetching failed"
      );
    }
  }
);