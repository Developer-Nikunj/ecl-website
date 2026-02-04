import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

/* =======================
   TYPES
======================= */

export interface ServCat {
  id: number;
  name: string;
  description: string;
  active: string;
  createdAt?: string;
}

export interface ServCatResponse {
  status: number;
  message: string;
  data: ServCat[];
}

export interface ServCatPayload {
  name: string;
  description: string;
  active: string;
}

export interface GetServCatParams {
  search?: string;
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

interface UpdateServCatPayload {
  id: number | string;
  data: ServCatPayload;
}

/* =======================
   CREATE
======================= */

export const createServCat = createAsyncThunk<
  ServCatResponse,
  ServCatPayload,
  { rejectValue: string }
>("servCat/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<ServCatResponse>("/services/category", payload);

    if (res.data.status === 0) {
      toast.warn(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Service Category creation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

/* =======================
   GET ALL
======================= */

export const getAllServCat = createAsyncThunk<
  { data: ServCat[]; total: number; limit: number; offset: number },
  GetServCatParams,
  { rejectValue: string }
>("servCat/all", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get<{
      status: number;
      message: string;
      data: ServCat[];
      total: number;
    }>("/services/category", { params });

    if (res.data.status === 0) {
      return rejectWithValue(res.data.message);
    }

    return {
      data: res.data.data,
      total: res.data.total,
      limit: params.limit ?? 10,
      offset: params.offset ?? 0,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Service Category fetching failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

/* =======================
   DELETE
======================= */

export const deleteServCat = createAsyncThunk<
  ServCatResponse,
  number | string,
  { rejectValue: string }
>("servCat/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<ServCatResponse>(`/services/category/${id}`);

    if (res.data.status === 0) {
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Service Category deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

/* =======================
   UPDATE
======================= */

export const updateServCat = createAsyncThunk<
  ServCatResponse,
  UpdateServCatPayload,
  { rejectValue: string }
>("servCat/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put<ServCatResponse>(
      `/services/category/${id}`,
      data,
    );

    if (res.data.status === 0) {
      toast.warn(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Service Category update failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});
