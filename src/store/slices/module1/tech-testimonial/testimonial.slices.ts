import { createSlice } from "@reduxjs/toolkit";
import {
  createTestimonial,
  allTechTestimonial,
  getOneTechTestimonial,
  updateTechTestimonial,
  deleteTechTestimonial,
} from "./testimonial.thunk";

interface Testimonial {
  id: number;
  icon: string;
  image: string;
  title: string;
  designation: string;
  slug: string;
  description: string;
  rating: number;
  categories: string;
  active: boolean;
}

interface TestimonialState {
  loading: boolean;
  error: string | null;
  list: Testimonial[];
  single: Testimonial | null;
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
}

const initialState: TestimonialState = {
  loading: false,
  error: null,
  list: [],
  single: null,
  meta: {
    total: 0,
    offset: 0,
    limit: 10,
  },
};

const techTestimonialSlice = createSlice({
  name: "techTestimonial",
  initialState,
  reducers: {
    clearSingleTestimonial: (state) => {
      state.single = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ CREATE
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTestimonial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Create failed";
      })

      // ✅ GET ALL
      .addCase(allTechTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(allTechTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(allTechTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch failed";
      })

      // ✅ GET ONE
      .addCase(getOneTechTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneTechTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.single = action.payload.data;
      })
      .addCase(getOneTechTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch single failed";
      })

      // ✅ UPDATE
      .addCase(updateTechTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTechTestimonial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTechTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
      })

      // ✅ DELETE
      .addCase(deleteTechTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTechTestimonial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTechTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Delete failed";
      });
  },
});

export const { clearSingleTestimonial } = techTestimonialSlice.actions;

export default techTestimonialSlice.reducer;
