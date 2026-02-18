import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRecentWork,
  getAllRecentWork,
  getRecentWorkById,
  updateRecentWork,
  deleteRecentWork,
} from "./recentwork.thunk";

/* ---------- TYPES ---------- */

interface recentWork {
  id: number;
  title: string;
  slug: string;
  image: string;
  active: boolean;
  icon: string;
  description: string;
  categories: string[];
}

interface Meta {
  total: number;
  limit: number;
  offset: number;
}

interface RecentWorkState {
  works: recentWork[];
  selectedWork: recentWork | null;
  meta: Meta | null;

  loading: boolean;
  actionLoading: boolean; // create/update/delete
  error: string | null;
}

/* ---------- INITIAL STATE ---------- */

const initialState: RecentWorkState = {
  works: [],
  selectedWork: null,
  meta: null,

  loading: false,
  actionLoading: false,
  error: null,
};

/* ---------- SLICE ---------- */

const recentWorkSlice = createSlice({
  name: "recentWork",
  initialState,
  reducers: {
    clearSelectedWork: (state) => {
      state.selectedWork = null;
    },
  },

  extraReducers: (builder) => {
    /* ========================
       CREATE
    ======================== */
    builder
      .addCase(createRecentWork.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createRecentWork.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(createRecentWork.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Create failed";
      });

    /* ========================
       GET ALL
    ======================== */
    builder
      .addCase(getAllRecentWork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRecentWork.fulfilled, (state, action) => {
        state.loading = false;
        state.works = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getAllRecentWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch failed";
      });

    /* ========================
       GET ONE
    ======================== */
    builder
      .addCase(getRecentWorkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentWorkById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWork = action.payload.data;
      })
      .addCase(getRecentWorkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch failed";
      });

    /* ========================
       UPDATE
    ======================== */
    builder
      .addCase(updateRecentWork.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateRecentWork.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(updateRecentWork.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Update failed";
      });

    /* ========================
       DELETE
    ======================== */
    builder
      .addCase(deleteRecentWork.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteRecentWork.fulfilled, (state, action) => {
        state.actionLoading = false;
      })
      .addCase(deleteRecentWork.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Delete failed";
      });
  },
});

/* ---------- EXPORTS ---------- */

export const { clearSelectedWork } = recentWorkSlice.actions;

export default recentWorkSlice.reducer;
