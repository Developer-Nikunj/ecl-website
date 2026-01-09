import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";


export interface bannerResponse {
    status:number; message:string;
}
export type bannerPayload = FormData;
export interface updateBannerArgs{
    id:number,data:FormData;
}
export interface getBannerPayload {
  limit?: number;offset?: number;startDate?: string;endDate?: string;
}
export interface bannerItem{
    id:number;img:string;name:string;description:string;active:string;
}
export interface bannerAllResponse{
    status:1|0;message?:string;data?:bannerItem[];meta:BannerMeta;
}
export interface BannerMeta {total: number;limit: number;offset: number;
}

// CREATE BANNER
export const createBanner = createAsyncThunk<
  bannerResponse,
  bannerPayload,
  { rejectValue: string }
>("banner/create", async (payload: bannerPayload, { rejectWithValue }) => {
  try {
    const res = await api.post<bannerResponse>("/banner", payload);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Banner creation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// UPDATE BANNER
export const updateBanner = createAsyncThunk<
  bannerResponse,
  updateBannerArgs,
  { rejectValue: string }
>("banner/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    // send name & active directly
    const res = await api.put<bannerResponse>(`/banner/${id}`, data);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Banner updation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// DELETE Banner
export const deleteBanner = createAsyncThunk<
  bannerResponse,
  number,
  { rejectValue: string }
>("banner/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<bannerResponse>(`/banner/${id}`);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Banner deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});


export const getAllBanner = createAsyncThunk<
  bannerAllResponse,
  getBannerPayload,
  { rejectValue: string }
>(
  "Banner/getAll",
  async (
    { limit = 10, offset = 0, startDate, endDate },
    { rejectWithValue }
  ) => {
    try {
      let url = `/banner?limit=${limit}&offset=${offset}`;

      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const res = await api.get<bannerAllResponse>(url);

      if (res.data.status === 0) return rejectWithValue(res.data.message);

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Banner fetch all failed";
      return rejectWithValue(message);
    }
  }
);
