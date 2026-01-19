import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCategory,
  getAllBlogCat,
  updateCategory,
  deleteCategory,
  blogCatItem,
  blogCatMeta,
} from "./blogCategory.thunk"; 

interface BlogCategoryState {
  loading: boolean;
  error: string | null;

  // list
  categories: blogCatItem[];
  meta: blogCatMeta | null;

  // actions status
  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
}

const initialState: BlogCategoryState = {
  loading: false,
  error: null,

  categories: [],
  meta: null,

  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const blogCategorySlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {
    resetStatus(state) {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ---------------- CREATE ---------------- */
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
        state.createSuccess = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Create category failed";
      });

    /* ---------------- GET ALL ---------------- */
    builder
      .addCase(getAllBlogCat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogCat.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getAllBlogCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch categories failed";
      });

    /* ---------------- UPDATE ---------------- */
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update category failed";
      });

    /* ---------------- DELETE ---------------- */
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Delete category failed";
      });
  },
});

export const { resetStatus } = blogCategorySlice.actions;
export default blogCategorySlice.reducer;
