import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/module1/auth/auth.slices"
import roleReducer from "./slices/module1/roles/roles.slices";
import { injectStore } from "@/lib/axios";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    role:roleReducer
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;