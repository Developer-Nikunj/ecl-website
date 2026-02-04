import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface servCatResponse {
  status: number;
  message: string;
  data: [];
}

export interface servCatPayload {
  name: string;
  description: string;
  active: string;
}

export const createServCat = createAsyncThunk<
  servCatResponse,
  servCatPayload,
  { rejectValue: string }
>(
  "ServCat/create",
  async ({ name, description, active }, { rejectWithValue }) => {
    try {
      const res = await api.post<servCatResponse>("/services/category", {
        name,
        description,
        active,
      });

      if (res.data.status === 0) {
        toast.warn("Creating Service Category Failed");
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
  },
);

export interface GetServCatParams {
  search?: string;
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export const getAllServCat = createAsyncThunk<
  { data: []; total: number; limit: number; offset: number },
  GetServCatParams,
  { rejectValue: string }
>("servCat/all", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get("/services/category", { params });
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
      err.response?.data?.message || "Service Category fetching failed !!!";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const deleteServCat = createAsyncThunk<
    servCatResponse,
    number|string,
    {rejectValue:string}
>
 ("servCat/delete",async(id,{rejectWithValue})=>{
    try {
        const res = await api.delete(`services/category/${id}`);

        if (res.data.status === 0) return rejectWithValue(res.data.message);

        toast.success(res.data.message);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Service Category deletion failed";
        toast.error(message);
        return rejectWithValue(message);
    }
 })

interface updateServCatPayload {
  id: number | string;
  data: servCatPayload;
}

 export const updateServCat = createAsyncThunk<
    servCatResponse,
    updateServCatPayload,
    {rejectValue:string}
 >
 ("servCat/update",async({id,data},{rejectWithValue})=>{
    try {
        const res = await api.put<servCatResponse>(
          `services/category/${id}`,data
        );
        console.log("res", res);

        if (res.data.status === 0) {
          toast.warn("Service Category Update Failed");
          return rejectWithValue(res.data.message);
        }

        toast.success(res.data.message);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Service Category update failed";
        toast.error(message);
        return rejectWithValue(message);
    }
 })