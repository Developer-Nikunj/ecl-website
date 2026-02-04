import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createServCat,
  getAllServCat,
  deleteServCat,
  updateServCat,
} from "./services.thunk";
import { ServCat } from "./services.thunk";

/* =======================
   STATE TYPE
======================= */

interface ServCatState {
  list: ServCat[];
  loading: boolean;
  error: string | null;

  total: number;
  limit: number;
  offset: number;
}

/* =======================
   INITIAL STATE
======================= */

const initialState: ServCatState = {
  list: [],
  loading: false,
  error: null,
  total: 0,
  limit: 10,
  offset: 0,
};

/* =======================
   SLICE
======================= */

const servCatSlice = createSlice({
  name: "servCat",
  initialState,
  reducers: {
    clearServCatError(state) {
      state.error = null;
    },
    resetServCatState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    /* ===== CREATE ===== */
    builder
      .addCase(createServCat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServCat.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(...action.payload.data);
      })
      .addCase(createServCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create service category";
      });

    /* ===== GET ALL ===== */
    builder
      .addCase(getAllServCat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServCat.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.offset = action.payload.offset;
      })
      .addCase(getAllServCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch service categories";
      });

    /* ===== DELETE ===== */
    builder
      .addCase(deleteServCat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServCat.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.list = state.list.filter((item) => item.id !== Number(deletedId));
      })
      .addCase(deleteServCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete service category";
      });

    /* ===== UPDATE ===== */
    builder
      .addCase(updateServCat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServCat.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data[0];

        const index = state.list.findIndex((item) => item.id === updated.id);

        if (index !== -1) {
          state.list[index] = updated;
        }
      })
      .addCase(updateServCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update service category";
      });
  },
});

/* =======================
   EXPORTS
======================= */

export const { clearServCatError, resetServCatState } = servCatSlice.actions;

export default servCatSlice.reducer;
