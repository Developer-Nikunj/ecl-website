import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface blogCatResponse {
  status: number;
  message: string;
}
export interface blogCatPayload {
  name: string;
  description: string;
}

// CREATE BLOG CATEGORY

export const createCategory = createAsyncThunk<
  blogCatResponse,
  blogCatPayload,
  { rejectValue: string }
>("blogCat/create", async ({ name, description }, { rejectWithValue }) => {
  try {
    const res = await api.post<blogCatResponse>("blog/category", {
      name,
      description,
    });
    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
      
    }
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Blog Category creation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export interface blogCatItem {
    id:number;
    img?:string;
    name:string;
    description:string;
    active:boolean;
}
export interface blogCatMeta {
  total: number;
  limit: number;
  offset: number;
}
export interface blogCatAllRes {
  status: 1 | 0;
  message: string;
  data: blogCatItem[];
  meta: blogCatMeta;
}
export interface getblogCatPayload {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

// GET ALL BLOG CATEGORY

export const getAllBlogCat = createAsyncThunk<blogCatAllRes, getblogCatPayload,
{rejectValue:string}>(
    "blogCat/All",
    async({
        limit=10,offset = 0,startDate,endDate
    },
{rejectWithValue})=>{
    try {
        let url = `/blog/category?limit=${limit}&offset=${offset}`;
        if (startDate) url += `&startDate=${startDate}`;
        if (endDate) url += `&endDate=${endDate}`;
        const res = await api.get<blogCatAllRes>(url);
        if (res.data.status === 0) 
            return rejectWithValue(res.data.message);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message =
          err.response?.data?.message || "Blog Category fetch all failed";
        return rejectWithValue(message);
    }
}
)

// Update BLOG CATEGORY

interface blogCatUpPayload {
  id: number;
  data: blogCatPayload;
}

export const updateCategory = createAsyncThunk<
  blogCatResponse,
  blogCatUpPayload,
  { rejectValue: string }
>("blogCat/create", async ({ id,data }, { rejectWithValue }) => {
  try {
    const res = await api.put<blogCatResponse>(`blog/category/${id}`, {
      data
    });
    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
      
    }
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Blog Category updation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const deleteCategory = createAsyncThunk<
  blogCatResponse,
  number,
  { rejectValue: string }
>("blogCat/create", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<blogCatResponse>(`blog/category/${id}`);
    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
      
    }
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || "Blog Category deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});