import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createMenu,
  getAllMenus,
  getMenuBySlug,
  updateMenu,
  deleteMenuBySlug,
} from "./menu.thunk";

/* =======================
   Types
======================= */

export interface MenuItem {
  slug: string;
  permissions: string[];
}

interface MenuState {
  menus: MenuItem[];
  selectedMenu: MenuItem | null;
  loading: boolean;
  creating: boolean;
  error: string | null;
}

/* =======================
   Initial State
======================= */

const initialState: MenuState = {
  menus: [],
  selectedMenu: null,
  loading: false,
  creating: false,
  error: null,
};

/* =======================
   Slice
======================= */

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearMenuError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* -------- CREATE MENU -------- */
    builder.addCase(createMenu.pending, (state) => {
      state.creating = true;
      state.error = null;
    });

    builder.addCase(createMenu.fulfilled, (state) => {
      state.creating = false;
    });

    builder.addCase(createMenu.rejected, (state, action) => {
      state.creating = false;
      state.error = action.payload || "Menu creation failed";
    });

    /* -------- GET ALL MENUS -------- */
    builder.addCase(getAllMenus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      getAllMenus.fulfilled,
      (state, action: PayloadAction<MenuItem[]>) => {
        state.loading = false;
        state.menus = action.payload;
      }
    );

    builder
      .addCase(getAllMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch menus";
      })

      /* -------- GET MENUS BY SLUG-------- */
      .addCase(getMenuBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMenuBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMenu = action.payload.data;
      })

      .addCase(getMenuBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch menu by slug";
      })

      /* ================= UPDATE ================= */

      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ================= DELETE ================= */

      .addCase(deleteMenuBySlug.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(deleteMenuBySlug.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMenuBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
