import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRole, getallRoles, deleteRole } from "./roles.thunk";


interface Role {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

interface Meta {
  total: number;
  limit: number;
  offset: number;
}

interface RoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  roles: Role[];
  meta: Meta | null;
}

const initialState: RoleState = {
  loading: false,
  success: false,
  error: null,
  roles: [],
  meta: null,
};


const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    clearRoleState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= CREATE ROLE ================= */

      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(createRole.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Role creation failed";
      })

      /* ================= GET ALL ROLES ================= */

      .addCase(getallRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getallRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.roles = action.payload.data;
        state.meta = action.payload.meta;
      })

      .addCase(getallRoles.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Roles fetching failed";
      })


      /* ---------------- DELETE ROLE ---------------- */
    .addCase(deleteRole.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteRole.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      // ❌ Do NOT remove role here
      // ✔ Re-fetch list after delete (best practice)
    })
    .addCase(deleteRole.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        (action.payload as string) || "Role deletion failed";
    })

  },
});

export const { clearRoleState } = roleSlice.actions;
export default roleSlice.reducer;
