import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

/* ===================== TYPES ===================== */

export interface ServiceResponse {
  status: number;
  message: string;
}

export interface serviceItem {
  id: number;
  category: string;
  img: string;
  name: string;
  description: string;
  details: string;
  active: boolean;
}

export interface ServiceAllResponse {
  status: 1 | 0;
  message: string;
  data: serviceItem[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface GetServicePayload {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export interface UpdateServicePayload {
  id: number;
  data: FormData;
}

/* ===================== THUNKS ===================== */

// CREATE
export const createService = createAsyncThunk<
  ServiceResponse,
  FormData,
  { rejectValue: string }
>("service/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<ServiceResponse>("/services/service", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === 0) {
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Service creation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// GET ALL
export const getAllService = createAsyncThunk<
  ServiceAllResponse,
  GetServicePayload,
  { rejectValue: string }
>(
  "service/getAll",
  async (
    { limit = 10, offset = 0, startDate, endDate },
    { rejectWithValue },
  ) => {
    try {
      let url = `/services/service?limit=${limit}&offset=${offset}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const res = await api.get<ServiceAllResponse>(url);

      if (res.data.status === 0) {
        return rejectWithValue(res.data.message);
      }

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        err.response?.data?.message || "Service fetch failed",
      );
    }
  },
);

// UPDATE
export const updateService = createAsyncThunk<
  ServiceResponse,
  UpdateServicePayload,
  { rejectValue: string }
>("service/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put<ServiceResponse>(
      `/services/service/${id}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    if (res.data.status === 0) {
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Service update failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// DELETE
export const deleteService = createAsyncThunk<
  ServiceResponse,
  number,
  { rejectValue: string }
>("service/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<ServiceResponse>(`/services/service/${id}`);

    if (res.data.status === 0) {
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Service deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});
