import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createBlog,
  getAllBlog,
  updateBlog,
  getOneBlog,
  deleteBlog,
  blogItem,
} from "./blog.thunk"; 

interface BlogState {
  loading: boolean;
  error: string | null;

  blogs: blogItem[];
  selectedBlog: blogItem | null;

  meta: {
    limit: number;
    offset: number;
    total: number;
  } | null;

  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
}

const initialState: BlogState = {
  loading: false,
  error: null,

  blogs: [],
  selectedBlog: null,
  meta: null,

  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlogStatus(state) {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
      state.error = null;
    },
    clearSelectedBlog(state) {
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    /* ---------------- CREATE ---------------- */
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.createSuccess = false;
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.loading = false;
        state.createSuccess = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Blog creation failed";
      });

    /* ---------------- GET ALL ---------------- */
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlog.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch blogs failed";
      });

    /* ---------------- GET ONE ---------------- */
    builder
      .addCase(getOneBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneBlog.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selectedBlog = action.payload.data ?? null;
      })
      .addCase(getOneBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch blog failed";
      });

    /* ---------------- UPDATE ---------------- */
    builder
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(updateBlog.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update blog failed";
      });

    /* ---------------- DELETE ---------------- */
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.deleteSuccess = false;
      })
      .addCase(deleteBlog.fulfilled, (state) => {
        state.loading = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Delete blog failed";
      });
  },
});

export const { resetBlogStatus, clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
