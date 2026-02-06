import { createSlice } from "@reduxjs/toolkit";
import {
  createService,
  deleteService,
  getAllService,
  updateService,
  serviceItem,
} from "./service.thunk";

interface ServiceState {
  list: serviceItem[];
  loading: boolean;
  error: string | null;
  meta: {
    limit: number;
    offset: number;
    total: number;
  } | null;
}

const initialState: ServiceState = {
  list: [],
  loading: false,
  error: null,
  meta: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(getAllService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllService.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getAllService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch services";
      })

      // CREATE
      .addCase(createService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createService.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Create failed";
      })

      // UPDATE
      .addCase(updateService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateService.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Update failed";
      })

      // DELETE
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteService.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete failed";
      });
  },
});

export default serviceSlice.reducer;
