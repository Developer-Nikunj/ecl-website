import { createSlice } from "@reduxjs/toolkit";
import {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBanner,
  bannerItem,
} from "./banner.thunk";

interface BannerState {
  list: bannerItem[];
  loading: boolean;
  error: string | null;
  total: number;
  limit: number;
  offset: number;
}

const initialState: BannerState = {
  list: [],
  loading: false,
  error: null,
  total: 0,
  limit: 10,
  offset: 0,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    resetBannerState: () => initialState,
  },
  extraReducers: (builder) => {
    /* ---------------- CREATE ---------------- */
    builder
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Banner creation failed";
      });

    /* ---------------- UPDATE ---------------- */
    builder
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Banner updation failed";
      });

    /* ---------------- DELETE ---------------- */
    builder
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Banner deletion failed";
      });

    /* ---------------- GET ALL ---------------- */
    builder
      .addCase(getAllBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || [];
        state.total = action.payload.meta.total;
        state.limit = action.payload.meta.limit;
        state.offset = action.payload.meta.offset;
      })
      .addCase(getAllBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Banner fetch failed";
      });
  },
});

export const { resetBannerState } = bannerSlice.actions;
export default bannerSlice.reducer;
