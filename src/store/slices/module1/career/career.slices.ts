import { createSlice } from "@reduxjs/toolkit";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "./career.thunk";
import { jobData } from "./career.thunk";

interface JobState {
  jobs: jobData[];
  selectedJob: jobData | null;
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  total: 0,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================
      // CREATE JOB
      // ======================

      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Create job failed";
      })

      // ======================
      // GET ALL JOBS
      // ======================

      .addCase(getJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        state.total = action.payload.meta.total;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch jobs failed";
      })

      // ======================
      // GET JOB BY ID
      // ======================

      .addCase(getJobById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload.data;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch job failed";
      })

      // ======================
      // UPDATE JOB
      // ======================

      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update job failed";
      })

      // ======================
      // DELETE JOB
      // ======================

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Delete job failed";
      });
  },
});

export const { clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
