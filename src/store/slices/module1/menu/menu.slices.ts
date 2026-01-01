import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createMenu, getAllMenus } from "./menu.thunk";

/* =======================
   Types
======================= */

export interface MenuItem {
  slug: string;
  permissions: string[];
}

interface MenuState {
  menus: MenuItem[];
  loading: boolean;
  creating: boolean;
  error: string | null;
}

/* =======================
   Initial State
======================= */

const initialState: MenuState = {
  menus: [],
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

    builder.addCase(getAllMenus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch menus";
    });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
