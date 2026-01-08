import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface footerResponse {
  status: number;
  message: string;
}

export interface footerPayload {
  name: string;
  active: boolean;
}

export interface updateFooterArgs {
  id: number;
  data: footerPayload;
}

export interface getFooterPayload {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export interface FooterItem {
  id: number;
  name: string;
  active: boolean;
}

export interface FooterSingleResponse {
  status: 1 | 0;
  message?: string;
  data?: FooterItem;
}

export interface FooterAllResponse {
  status: 1 | 0;
  message?: string;
  data?: FooterItem[];
  meta: FooterMeta;
}

export interface FooterMeta {
  total: number;
  limit: number;
  offset: number;
}

// CREATE FOOTER
export const createFooter = createAsyncThunk<
  footerResponse,
  footerPayload,
  { rejectValue: string }
>("footer/create", async ({ name, active }, { rejectWithValue }) => {
  try {
    const res = await api.post<footerResponse>("/footer", { name, active });
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Footer creation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// UPDATE FOOTER
export const updateFooter = createAsyncThunk<
  footerResponse,
  updateFooterArgs,
  { rejectValue: string }
>("footer/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    // send name & active directly
    const res = await api.put<footerResponse>(`/footer/${id}`, data);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Footer updation failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// DELETE FOOTER
export const deleteFooter = createAsyncThunk<
  footerResponse,
  number,
  { rejectValue: string }
>("footer/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<footerResponse>(`/footer/${id}`);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Footer deletion failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// GET SINGLE FOOTER BY ID
export const getFooter = createAsyncThunk<
  FooterSingleResponse,
  number,
  { rejectValue: string }
>("footer/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<FooterSingleResponse>(`/footer/${id}`);
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Footer fetch failed";
    return rejectWithValue(message);
  }
});

// GET ALL FOOTERS WITH PAGINATION
export const getAllFooter = createAsyncThunk<
  FooterAllResponse,
  getFooterPayload,
  { rejectValue: string }
>("footer/getAll", async ({ limit = 10, offset = 0 }, { rejectWithValue }) => {
  try {
    const res = await api.get<FooterAllResponse>(
      `/footer?limit=${limit}&offset=${offset}`
    );
    if (res.data.status === 0) return rejectWithValue(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Footer fetch all failed";
    return rejectWithValue(message);
  }
});
