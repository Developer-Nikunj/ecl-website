import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getallUsers, grantPermision } from "./user.thunk";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Meta {
  total: number;
  limit: number;
  offset: number;
}

interface UserState {
  loading: boolean;
  success: boolean;
  error: string | null;
  users: User[];
  selectedUser: User | null;
  meta: Meta | null;
}

const initialState: UserState = {
  loading: false,
  success: false,
  error: null,
  users: [],
  selectedUser: null,
  meta: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ================= GET ALL ROLES ================= */

    builder
      .addCase(getallUsers.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(getallUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
        state.meta = action.payload.meta;
      })

      .addCase(getallUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Users fetching failed";
      })

      .addCase(grantPermision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(grantPermision.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(grantPermision.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Permission granting failed";
      });
  },
});

export const { clearUserState }=userSlice.actions;
export default userSlice.reducer;