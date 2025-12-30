// roles.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";

interface createRolePayload {
  name: string;
  description: string;
  status: string;
}
interface createRoleResponse {
  status: boolean;
  message: string;
}

export const createRole = createAsyncThunk<
  createRoleResponse,
  createRolePayload,
  { rejectValue: string }
>(
  "roles/create",
  async ({ name, description, status }, { rejectWithValue }) => {
    try {
      const res = await api.post("/roles/create", {
        name,
        description,
        status,
      });
      console.log("res", res);
      if (res.status === 0) {
        toast.error(String(res.data.message));
        return rejectWithValue(res.data.message);
      }
      toast.success(String(res.data.message));
      return res.data;
    } catch (err) {
      toast.error(String(err));
      return rejectWithValue(
        err.response?.data?.message || "Role Creation failed"
      );
    }
  }
);
