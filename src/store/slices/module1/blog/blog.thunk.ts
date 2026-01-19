import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { title } from '../../../../../public/assets/backend/libs/chart.js/plugins/plugin.tooltip';


export interface blogResponse {
    status:number;
    message:string;
}
export type blogPayload = FormData;

// create blog

export const createBlog = createAsyncThunk<
  blogResponse,
  blogPayload,
  { rejectValue: string }
>("blog/create",async(payload:blogPayload,{
    rejectWithValue
})=>{
    try {
        const res = await api.post<blogResponse>("/blog",payload);
        if (res.data.status === 0) return rejectWithValue(res.data.message);
        toast.success(res.data.message);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Blog creation failed";
        toast.error(message);
        return rejectWithValue(message);
    }
})
export interface categoryItem{
    id:number;name:string;
}
export interface blogItem {
  id: number;
  img: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: boolean;
  active: boolean;
  views: number;
  createdAt: string;
  category: categoryItem;
}
export interface blogAllResponse{
    status:1|0;
    message:string;
    data:blogItem[];
    meta:{
        limit:number;
        offset:number;
        total:number;
    }
}
export interface getBlogPayload {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

// GET BLOG
export const getAllBlog = createAsyncThunk<
  blogAllResponse,
  getBlogPayload,
  { rejectValue: string }
>(
  "blog/getAll",
  async (
    { limit = 10, offset = 0, startDate, endDate },
    { rejectWithValue }
  ) => {
    try {
      let url = `/blog?limit=${limit}&offset=${offset}`;

      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const res = await api.get<blogAllResponse>(url);

      if (res.data.status === 0) return rejectWithValue(res.data.message);

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Blog fetch all failed";
      return rejectWithValue(message);
    }
  }
);

export interface blogUpPayload {
    id:number;
    data:FormData;
}

// update BLOG
export const updateBlog = createAsyncThunk<
  blogResponse,
  blogUpPayload,
  { rejectValue: string }
>("blog/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    // send name & active directly
    const res = await api.put<blogResponse>(`/blog/${id}`, data);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "blog updation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// Get one BLOG
export const getOneBlog = createAsyncThunk<
  blogResponse,
  number,
  { rejectValue: string }
>("blog/getOne", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<blogResponse>(`/blog/${id}`);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    // toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "blog single Get failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// Delete BLOG
export const deleteBlog = createAsyncThunk<
  blogResponse,
  number,
  { rejectValue: string }
>("blog/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<blogResponse>(`/blog/${id}`);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "blog Deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});
