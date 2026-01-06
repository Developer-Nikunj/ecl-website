import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createFooter,
  updateFooter,
  deleteFooter,
  getFooter,
  getAllFooter,
  FooterItem,
  FooterAllResponse,
  FooterSingleResponse,
} from "./footer.thunk"; // import your thunks

interface FooterState {
  items: FooterItem[];
  total: number;
  limit: number;
  offset: number;
  single?: FooterItem;
  loading: boolean;
  error?: string;
}

const initialState: FooterState = {
  items: [],
  total: 0,
  limit: 10,
  offset: 0,
  single: undefined,
  loading: false,
  error: undefined,
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    clearFooterError(state) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // ------------------ CREATE ------------------
    builder.addCase(createFooter.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(createFooter.fulfilled, (state, action) => {
      state.loading = false;
      // optional: refresh list elsewhere
    });
    builder.addCase(createFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ------------------ UPDATE ------------------
    builder.addCase(updateFooter.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateFooter.fulfilled, (state, action) => {
      state.loading = false;
      // optional: refresh item in items array
    });
    builder.addCase(updateFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ------------------ DELETE ------------------
    builder.addCase(deleteFooter.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteFooter.fulfilled, (state, action) => {
      state.loading = false;
      // optional: remove from items array
    });
    builder.addCase(deleteFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ------------------ GET SINGLE ------------------
    builder.addCase(getFooter.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      getFooter.fulfilled,
      (state, action: PayloadAction<FooterSingleResponse>) => {
        state.loading = false;
        state.single = action.payload.data;
      }
    );
    builder.addCase(getFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ------------------ GET ALL ------------------
    builder.addCase(getAllFooter.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      getAllFooter.fulfilled,
      (state, action: PayloadAction<FooterAllResponse>) => {
        state.loading = false;
        state.items = action.payload.data ?? [];
        state.total = action.payload.meta.total;
        state.limit = action.payload.meta.limit;
        state.offset = action.payload.meta.offset;
      }
    );
    builder.addCase(getAllFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearFooterError } = footerSlice.actions;
export default footerSlice.reducer;
