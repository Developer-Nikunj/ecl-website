import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRole,
  getallRoles,
  deleteRole,
  getRoleById,
  updateRole,
} from "./roles.thunk";


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
  selectedRole: Role | null;
  meta: Meta | null;
}

const initialState: RoleState = {
  loading: false,
  success: false,
  error: null,
  roles: [],
  selectedRole: null,
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
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Role deletion failed";
      })

      /* ---------------- GET SINGLE ROLE ---------------- */
      .addCase(getRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedRole = null; // clear previous
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRole = action.payload.data; // store single role
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch role";
        state.selectedRole = null;
      })

      /* ---------------- UPDATE SINGLE ROLE ---------------- */

      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // Update role → fulfilled
      .addCase(updateRole.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      // Update role → rejected
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Role update failed";
      });

  },
});

export const { clearRoleState } = roleSlice.actions;
export default roleSlice.reducer;
