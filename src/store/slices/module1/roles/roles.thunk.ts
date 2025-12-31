// roles.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { object } from "zod";

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
      if (res.data.status === 0) {
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

interface Role {
  id: number;
  name: string;
  description: string;
  status: boolean;
}
interface Meta {
  total: number;
  limit: number;
  offset: number;
}


interface GetRolesResponse {
  status: number;
  message: string;
  data: Role[];
  meta: Meta;
}

interface GetRolePayload {
  limit: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export const getallRoles = createAsyncThunk<
  GetRolesResponse,
  GetRolePayload,
  { rejectValue: string }
>(
  "roles/allRoles",
  async ({ limit, offset = 0, startDate, endDate }, { rejectWithValue }) => {
    try {
      const res = await api.get("roles/allRoles", {
        params: {
          limit,
          offset,
          startDate,
          endDate,
        },
        withCredentials: true,
      });

      if (res.data.status === 0) {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }

      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Roles Fetching failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


interface DeleteRoleResponse {
  status: number;
  message: string;
}
export const deleteRole = createAsyncThunk<
  DeleteRoleResponse,
  number,
  { rejectValue: string }
>("roles/delete", async (roleId, { rejectWithValue }) => {
  try {
    const res = await api.delete("roles/delete", {
      data: { roleId }, // ✅ BODY goes here
      withCredentials: true,
    });

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.message || "Role deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});



