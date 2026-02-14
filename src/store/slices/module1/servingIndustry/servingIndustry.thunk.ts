import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

/* ================= TYPES ================= */

export interface servingIndustryResponse {
  status: number;
  message: string;
}

export interface servingIndustryPayload {
  data:FormData
}

export interface servingIndustryItem {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  active: boolean;
}

export interface servingIndustryMeta {
  total: number;
  limit: number;
  offset: number;
}

export interface servingIndustryAllRes {
  status: 1 | 0;
  message: string;
  data: servingIndustryItem[];
  meta: servingIndustryMeta;
}

export interface getServingIndustryPayload {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

/* ================= CREATE ================= */

export const createServingIndustry = createAsyncThunk<
  servingIndustryResponse,
  FormData,
  { rejectValue: string }
>("servingIndustry/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.post<servingIndustryResponse>(
      "servingIndustry",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Serving Industry creation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

/* ================= GET ALL ================= */

export const getAllServingIndustry = createAsyncThunk<
  servingIndustryAllRes,
  getServingIndustryPayload,
  { rejectValue: string }
>(
  "servingIndustry/getAll",
  async (
    { limit = 10, offset = 0, startDate, endDate },
    { rejectWithValue },
  ) => {
    try {
      let url = `/servingIndustry?limit=${limit}&offset=${offset}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const res = await api.get<servingIndustryAllRes>(
        `/servingIndustry?limit=${limit}&offset=${offset}`,
      );
        console.log("res",res)
      if (res.data.status === 0) return rejectWithValue(res.data.message);

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || "Serving Industry fetch failed";
      return rejectWithValue(message);
    }
  },
);

/* ================= GET BY ID ================= */

export const getServingIndustryById = createAsyncThunk<
  servingIndustryItem,
  number,
  { rejectValue: string }
>("servingIndustry/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<{
      status: number;
      data: servingIndustryItem;
      message: string;
    }>(`servingIndustry/${id}`);

    if (res.data.status === 0) return rejectWithValue(res.data.message);

    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Serving Industry fetch by id failed";
    return rejectWithValue(message);
  }
});

/* ================= UPDATE ================= */

interface servingIndustryUpdatePayload {
  id: number;
  data: servingIndustryPayload;
}

export const updateServingIndustry = createAsyncThunk<
  servingIndustryResponse,
  servingIndustryUpdatePayload,
  { rejectValue: string }
>("servingIndustry/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put<servingIndustryResponse>(
      `servingIndustry/${id}`,
      {
        name: data.name,
        description: data.description,
      },
    );

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Serving Industry update failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

/* ================= DELETE ================= */

export const deleteServingIndustry = createAsyncThunk<
  servingIndustryResponse,
  number,
  { rejectValue: string }
>("servingIndustry/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<servingIndustryResponse>(
      `servingIndustry/${id}`,
    );

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Serving Industry deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});
