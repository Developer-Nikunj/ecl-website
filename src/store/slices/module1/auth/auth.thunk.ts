// auth.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuth } from "./auth.slices";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { dispatch }) => {
    const res = await axios.post("/auth/login", payload, {
      withCredentials: true, 
    });

    dispatch(
      setAuth({
        accessToken: res.data.accessToken,
        user: res.data.user,
      })
    );

    return res.data;
  }
);
