// recent work thunk . ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import {toast} from "react-toastify"

interface RecentWorkResponse {
    status:boolean;
    message:string;
}


export const createRecentWork = createAsyncThunk<
  RecentWorkResponse,
  FormData,
  { rejectValue: string }
>("recent-work/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.post("/recentWork", formData);
    console.log("res", res);
    if (res.data.status === 0) {
      toast.error(String(res.data.message));
      return rejectWithValue(res.data.message);
    }
    toast.success(String(res.data.message));
    return res.data;
  } catch (error) {
    toast.error(String(error));
    return rejectWithValue(
      error.response?.data?.message || "Recent work creation failed",
    );
  }
});


interface recentWork {
    id:number;
    title:string;
    slug:string;
    image:string;
    active:boolean;
    icon:string;
    description:string;
    categories:string[];
}

interface Meta {
  total: number;
  limit: number;
  offset: number;
}

interface getRecentWorkResponse {
    status:number;
    message:string;
    data:recentWork[];
    meta:Meta;
}

interface getRecentWorkPayload {
    limit:number;
    offset?:number;
    startDate?:string;
    endDate?:string;
}

export const getAllRecentWork = createAsyncThunk<
    getRecentWorkResponse,
    getRecentWorkPayload,
    {rejectValue:string}
>(
    "recentWork/allRecentWork",
    async ({limit,offset=0,startDate,endDate},{rejectWithValue})=>{
        try {
            const res = await api.get("recentWork",{
                params:{
                    limit,
                    offset,
                    startDate,
                    endDate,
                },
                withCredentials:true,
            });
            if (res.data.status === 0) {
              toast.error(res.data.message);
              return rejectWithValue(res.data.message);
            }

            // toast.success(res.data.message);
            return res.data;
        } catch (err) {
             const message =
               err.response?.data?.message || "Recent Works Fetching failed";
             toast.error(message);
             return rejectWithValue(message);
        }
    }
)


interface getOneRecentWorkResponse {
  status: number;
  message: string;
  data: recentWork;
}

export const getRecentWorkById = createAsyncThunk<
  getOneRecentWorkResponse,
  number,
  { rejectValue: string }
>("recentWork/getOne", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`recentWork/${id}`, {
      withCredentials: true,
    });

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    return res.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.message || "Fetching recent work failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});


interface updateRecentWorkPayload {
  id: number;
  formData: FormData;
}

interface updateRecentWorkResponse {
  status: boolean;
  message: string;
}

export const updateRecentWork = createAsyncThunk<
  updateRecentWorkResponse,
  updateRecentWorkPayload,
  { rejectValue: string }
>("recentWork/update", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const res = await api.put(`recentWork/${id}`, formData);

    if (!res.data.status) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Recent work update failed";

    toast.error(message);
    return rejectWithValue(message);
  }
});


interface deleteRecentWorkResponse {
  status: boolean;
  message: string;
}

export const deleteRecentWork = createAsyncThunk<
  deleteRecentWorkResponse,
  number,
  { rejectValue: string }
>("recentWork/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete(`recentWork/${id}`, { withCredentials: true });

    if (!res.data.status) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.message || "Recent work deletion failed";

    toast.error(message);
    return rejectWithValue(message);
  }
});
