import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRole } from "./roles.thunk";

interface RoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: RoleState = {
  loading: false,
  success: false,
  error: null,
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
      // CREATE ROLE → pending
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // CREATE ROLE → success
      .addCase(createRole.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      // CREATE ROLE → failed
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        // ⭐ IMPORTANT PART
        state.error = (action.payload as string) || "Role creation failed";
      });
  },
});

export const { clearRoleState } = roleSlice.actions;
export default roleSlice.reducer;
