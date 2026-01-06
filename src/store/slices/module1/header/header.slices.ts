import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createHeader,
  updateHeader,
  deleteHeader,
  getHeader,
  getAllHeader,
  HeaderItem,
  HeaderAllResponse,
  HeaderSingleResponse,
} from "./header.thunk";

interface HeaderState {
  items: HeaderItem[];
  total: number;
  limit: number;
  offset: number;
  single?: HeaderItem;
  loading: boolean;
  error?: string;
}

const initialState: HeaderState = {
  items: [],
  total: 0,
  limit: 10,
  offset: 0,
  single: undefined,
  loading: false,
  error: undefined,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    clearHeaderError(state) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // CREATE
    builder.addCase(createHeader.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(createHeader.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // UPDATE
    builder.addCase(updateHeader.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateHeader.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // DELETE
    builder.addCase(deleteHeader.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteHeader.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // GET SINGLE
    builder.addCase(getHeader.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      getHeader.fulfilled,
      (state, action: PayloadAction<HeaderSingleResponse>) => {
        state.loading = false;
        state.single = action.payload.data;
      }
    );
    builder.addCase(getHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // GET ALL
    builder.addCase(getAllHeader.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      getAllHeader.fulfilled,
      (state, action: PayloadAction<HeaderAllResponse>) => {
        state.loading = false;
        state.items = action.payload.data ?? [];
        state.total = action.payload.meta.total;
        state.limit = action.payload.meta.limit;
        state.offset = action.payload.meta.offset;
      }
    );
    builder.addCase(getAllHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearHeaderError } = headerSlice.actions;
export default headerSlice.reducer;
