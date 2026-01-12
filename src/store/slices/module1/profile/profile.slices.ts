import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserProfile, userdata, userActivityData } from "./profile.thunk"; // adjust path


interface UserState {
  profile: userdata | null;
  activity: userActivityData[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  activity: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.activity = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH PROFILE */
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.profile = action.payload.data;
          state.activity = action.payload.userActivity;
        }
      )
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load profile";
      });
  },
});

/* ---------------- EXPORTS ---------------- */

export const { clearUser } = profileSlice.actions;
export default profileSlice.reducer;