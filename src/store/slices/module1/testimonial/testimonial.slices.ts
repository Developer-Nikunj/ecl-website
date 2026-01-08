import { createSlice } from "@reduxjs/toolkit";
import {
  createtestimonial,
  updatetestimonial,
  deletetestimonial,
  getAlltestimonial,
  testimonialItem,
} from "./testimonial.thunk";

interface testimonialState {
  list: testimonialItem[];
  loading: boolean;
  error: string | null;
  total: number;
  limit: number;
  offset: number;
}

const initialState: testimonialState = {
  list: [],
  loading: false,
  error: null,
  total: 0,
  limit: 10,
  offset: 0,
};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    resettestimonialState: () => initialState,
  },
  extraReducers: (builder) => {
    /* ---------------- CREATE ---------------- */
    builder
      .addCase(createtestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createtestimonial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createtestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "testimonial creation failed";
      });

    /* ---------------- UPDATE ---------------- */
    builder
      .addCase(updatetestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatetestimonial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatetestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "testimonial updation failed";
      });

    /* ---------------- DELETE ---------------- */
    builder
      .addCase(deletetestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletetestimonial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletetestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "testimonial deletion failed";
      });

    /* ---------------- GET ALL ---------------- */
    builder
      .addCase(getAlltestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlltestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || [];
        state.total = action.payload.meta.total;
        state.limit = action.payload.meta.limit;
        state.offset = action.payload.meta.offset;
      })
      .addCase(getAlltestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "testimonial fetch failed";
      });
  },
});

export const { resettestimonialState } = testimonialSlice.actions;
export default testimonialSlice.reducer;
