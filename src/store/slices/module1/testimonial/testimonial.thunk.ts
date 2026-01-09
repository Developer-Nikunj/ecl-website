import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface testimonialResponse {
  status: number;
  message: string;
}
export type testimonialPayload = FormData;
export interface updatetestimonialArgs {
  id: number;
  data: FormData;
}
export interface gettestimonialPayload {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}
export interface testimonialItem {
  id: number;
  img: string;
  name: string;
  description: string;
  active: string;
}
export interface testimonialAllResponse {
  status: 1 | 0;
  message?: string;
  data?: testimonialItem[];
  meta: testimonialMeta;
}
export interface testimonialMeta {
  total: number;
  limit: number;
  offset: number;
}

// CREATE testimonial
export const createtestimonial = createAsyncThunk<
  testimonialResponse,
  testimonialPayload,
  { rejectValue: string }
>("testimonial/create", async (payload: testimonialPayload, { rejectWithValue }) => {
  try {
    const res = await api.post<testimonialResponse>("/testimonial", payload);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "testimonial creation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// UPDATE testimonial
export const updatetestimonial = createAsyncThunk<
  testimonialResponse,
  updatetestimonialArgs,
  { rejectValue: string }
>("testimonial/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    // send name & active directly
    const res = await api.put<testimonialResponse>(`/testimonial/${id}`, data);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "testimonial updation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// DELETE testimonial
export const deletetestimonial = createAsyncThunk<
  testimonialResponse,
  number,
  { rejectValue: string }
>("testimonial/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<testimonialResponse>(`/testimonial/${id}`);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "testimonial deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// GET ALL testimonialS WITH PAGINATION
export const getAlltestimonial = createAsyncThunk<
  testimonialAllResponse,
  gettestimonialPayload,
  { rejectValue: string }
>(
  "testimonial/getAll",
  async (
    { limit = 10, offset = 0, startDate, endDate },
    { rejectWithValue }
  ) => {
    try {
      let url = `/testimonial?limit=${limit}&offset=${offset}`;

      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const res = await api.get<testimonialAllResponse>(
        url
      );
      if (res.data.status === 0) return rejectWithValue(res.data.message);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || "testimonial fetch all failed";
      return rejectWithValue(message);
    }
  }
);
