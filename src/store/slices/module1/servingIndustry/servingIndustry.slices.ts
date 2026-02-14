import { createSlice } from "@reduxjs/toolkit";
import {
  createServingIndustry,
  getAllServingIndustry,
  getServingIndustryById,
  updateServingIndustry,
  deleteServingIndustry,
  servingIndustryItem,
  servingIndustryMeta,
} from "./servingIndustry.thunk";

interface ServingIndustryState {
  items: servingIndustryItem[];
  selectedItem: servingIndustryItem | null;
  meta: servingIndustryMeta | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ServingIndustryState = {
  items: [],
  selectedItem: null,
  meta: null,
  loading: false,
  error: null,
  successMessage: null,
};

const servingIndustrySlice = createSlice({
  name: "servingIndustry",
  initialState,
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    /* ================= CREATE ================= */

    builder
      .addCase(createServingIndustry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createServingIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createServingIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Creation failed";
      });

    /* ================= GET ALL ================= */

    builder
      .addCase(getAllServingIndustry.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServingIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getAllServingIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch failed";
      });

    /* ================= GET BY ID ================= */

    builder
      .addCase(getServingIndustryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServingIndustryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(getServingIndustryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch by id failed";
      });

    /* ================= UPDATE ================= */

    builder
      .addCase(updateServingIndustry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateServingIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updateServingIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
      });

    /* ================= DELETE ================= */

    builder
      .addCase(deleteServingIndustry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteServingIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteServingIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Delete failed";
      });
  },
});

export const { clearSelectedItem, clearMessages } =
  servingIndustrySlice.actions;

export default servingIndustrySlice.reducer;
