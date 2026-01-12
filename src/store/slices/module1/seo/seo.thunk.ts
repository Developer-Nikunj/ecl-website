import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface SeoResponse {
  status: number;
  message: string;
  data: never;
}

export type SeoPayload = FormData;

export interface UpdateSeoArgs {
  id: number | string;
  data: FormData;
}

export interface GetSeoParams {
  search?: string;
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export const createSeo = createAsyncThunk<
  SeoResponse,
  SeoPayload,
  { rejectValue: string }
>("Seo/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<SeoResponse>("/seo", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log("res", res);
    if (res.data.status === 0) {
      toast.warn("Creating Seo Failed");
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "SEO creation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const updateSeo = createAsyncThunk<
  SeoResponse,
  UpdateSeoArgs,
  { rejectValue: string }
>("Seo/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put<SeoResponse>(`/seo/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === 0) return rejectWithValue(res.data.message);

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "SEO update failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const getAllSeo = createAsyncThunk<
  { data: never[]; total: number },
  GetSeoParams,
  { rejectValue: string }
>("seo/getAll", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get("/seo", { params });

    if (res.data.status === 0) return rejectWithValue(res.data.message);
    console.log(res.data.data);
    return {
      data: res.data.data,
      total: res.data.total,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Failed to fetch SEO";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const getSeoById = createAsyncThunk<
  SeoResponse,
  number | string,
  { rejectValue: string }
>("Seo/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<SeoResponse>(`/seo/${id}`);

    if (res.data.status === 0) return rejectWithValue(res.data.message);

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Failed to fetch SEO";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const deleteSeo = createAsyncThunk<
  SeoResponse,
  number | string,
  { rejectValue: string }
>("Seo/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<SeoResponse>(`/seo/${id}`);

    if (res.data.status === 0) return rejectWithValue(res.data.message);

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "SEO delete failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});
