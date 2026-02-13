import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { start } from "repl";

// =============================
// TYPES
// =============================

export interface jobResponse {
  status: number;
  message: string;
}

export interface jobPayload {
  title: string;
  type: string;
  category: string;
  active: boolean;
  salary: string;
  location: string;
  description: string;
}

export interface jobData extends jobPayload {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface jobListResponse {
  status: number;
  data: jobData[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}

// =============================
// CREATE JOB
// =============================

export const createJob = createAsyncThunk<
  jobResponse,
  jobPayload,
  { rejectValue: string }
>("job/create", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<jobResponse>("career", data);

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Job creation failed";

    toast.error(message);
    return rejectWithValue(message);
  }
});

// =============================
// GET ALL JOBS (Pagination)
// =============================

export const getJobs = createAsyncThunk<
  jobListResponse,
  { limit?: number; offset?: number;},
  { rejectValue: string }
>(
  "job/getAll",
  async ({ limit = 10, offset = 0 }, { rejectWithValue }) => {
    try {
      const res = await api.get<jobListResponse>(
        `career?limit=${limit}&offset=${offset}`,
      );
      console.log(res)

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Fetching jobs failed";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

// =============================
// GET JOB BY ID
// =============================

export const getJobById = createAsyncThunk<
  { status: number; data: jobData },
  number,
  { rejectValue: string }
>("job/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`career/${id}`);
    // console.log("getJobById",res);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Job not found";

    toast.error(message);
    return rejectWithValue(message);
  }
});

// =============================
// UPDATE JOB
// =============================

export const updateJob = createAsyncThunk<
  jobResponse,
  { id: number; data: jobPayload },
  { rejectValue: string }
>("job/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put<jobResponse>(`career/${id}`, data);

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Job update failed";

    toast.error(message);
    return rejectWithValue(message);
  }
});

// =============================
// DELETE JOB
// =============================

export const deleteJob = createAsyncThunk<
  jobResponse,
  number,
  { rejectValue: string }
>("job/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<jobResponse>(`career/${id}`);

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Job deletion failed";

    toast.error(message);
    return rejectWithValue(message);
  }
});
