import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createSeo,
  updateSeo,
  getAllSeo,
  getSeoById,
  deleteSeo,
  seoItem,
} from "./seo.thunk";

interface SeoState {
  list: seoItem[];
  selected: null;
  loading: boolean;
  error: string | null;
  total: number;
  limit: number;
  offset: number;
}

const initialState: SeoState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
  total: 0,
  limit: 10,
  offset: 0
};

const seoSlice = createSlice({
  name: "seo",
  initialState,
  reducers: {
    clearSeoError(state) {
      state.error = null;
    },
    clearSelectedSeo(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    /* ---------------- CREATE ---------------- */
    builder
      .addCase(createSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSeo.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload.data);
      })
      .addCase(createSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "SEO creation failed";
      });

    /* ---------------- UPDATE ---------------- */
    builder
      .addCase(updateSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSeo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );

        if (state.selected?.id === action.payload.data.id) {
          state.selected = action.payload.data;
        }
      })
      .addCase(updateSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "SEO update failed";
      });

    /* ---------------- GET ALL ---------------- */
    builder
      .addCase(getAllSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSeo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.offset = action.payload.offset;
      })
      .addCase(getAllSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch SEO list";
      });

    /* ---------------- GET BY ID ---------------- */
    builder
      .addCase(getSeoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSeoById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload.data;
      })
      .addCase(getSeoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch SEO";
      });

    /* ---------------- DELETE ---------------- */
    builder
      .addCase(deleteSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((item) => item.id !== action.meta.arg);
        state.total -= 1;
      })
      .addCase(deleteSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "SEO delete failed";
      });
  },
});

export const { clearSeoError, clearSelectedSeo } = seoSlice.actions;
export default seoSlice.reducer;
