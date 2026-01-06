    import { createAsyncThunk } from "@reduxjs/toolkit";
    import api from "@/lib/axios";
    import { toast } from "react-toastify";
    import { AxiosError } from "axios";

    // Types
    export interface headerResponse {
      status: number;
      message: string;
    }

    export interface headerPayload {
      name: string;
      active: boolean;
    }

    export interface updateHeaderArgs {
      id: number;
      data: headerPayload;
    }

    export interface getHeaderPayload {
      limit?: number;
      offset?: number;
    }

    export interface HeaderItem {
      id: number;
      name: string;
      active: boolean;
    }

    export interface HeaderSingleResponse {
      status: 1 | 0;
      message?: string;
      data?: HeaderItem;
    }

    export interface HeaderAllResponse {
      status: 1 | 0;
      message?: string;
      data?: HeaderItem[];
      meta: {
        total: number;
        limit: number;
        offset: number;
      };
    }

    // -------------------- CREATE --------------------
    export const createHeader = createAsyncThunk<
      headerResponse,
      headerPayload,
      { rejectValue: string }
    >("header/create", async ({ name, active }, { rejectWithValue }) => {
      try {
        const res = await api.post<headerResponse>("/header", { name, active });
        if (res.data.status === 0) {
          toast.error(res.data.message);
          return rejectWithValue(res.data.message);
        }
        toast.success(res.data.message);
        return res.data;
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Header creation failed";
        toast.error(message);
        return rejectWithValue(message);
      }
    });

    // -------------------- UPDATE --------------------
    export const updateHeader = createAsyncThunk<
      headerResponse,
      updateHeaderArgs,
      { rejectValue: string }
    >("header/update", async ({ id, data }, { rejectWithValue }) => {
      try {
        const res = await api.put<headerResponse>(`/header/${id}`, data);
        if (res.data.status === 0) {
          toast.error(res.data.message);
          return rejectWithValue(res.data.message);
        }
        toast.success(res.data.message);
        return res.data;
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Header update failed";
        toast.error(message);
        return rejectWithValue(message);
      }
    });

    // -------------------- DELETE --------------------
    export const deleteHeader = createAsyncThunk<
      headerResponse,
      number,
      { rejectValue: string }
    >("header/delete", async (id, { rejectWithValue }) => {
      try {
        const res = await api.delete<headerResponse>(`/header/${id}`);
        if (res.data.status === 0) {
          toast.error(res.data.message);
          return rejectWithValue(res.data.message);
        }
        toast.success(res.data.message);
        return res.data;
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Header deletion failed";
        toast.error(message);
        return rejectWithValue(message);
      }
    });

    // -------------------- GET SINGLE --------------------
    export const getHeader = createAsyncThunk<
      HeaderSingleResponse,
      number,
      { rejectValue: string }
    >("header/get", async (id, { rejectWithValue }) => {
      try {
        const res = await api.get<HeaderSingleResponse>(`/header/${id}`);
        if (res.data.status === 0) {
          toast.error(res.data.message);
          return rejectWithValue(res.data.message);
        }
        return res.data;
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message =
          err.response?.data?.message || "Header get by Id failed";
        toast.error(message);
        return rejectWithValue(message);
      }
    });

    // -------------------- GET ALL --------------------
    export const getAllHeader = createAsyncThunk<
      HeaderAllResponse,
      getHeaderPayload,
      { rejectValue: string }
    >("header/getAll", async (payload, { rejectWithValue }) => {
      try {
        const res = await api.get<HeaderAllResponse>(
          `/header?limit=${payload.limit ?? 10}&offset=${payload.offset ?? 0}`
        );
        if (res.data.status === 0) {
          toast.error(res.data.message);
          return rejectWithValue(res.data.message);
        }
        return res.data;
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Header fetch failed";
        toast.error(message);
        return rejectWithValue(message);
      }
    });
