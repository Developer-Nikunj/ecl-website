import axios from "axios";
import { clearAuth, setAuth } from "@/store/slices/module1/auth/auth.slices"

let storeRef:any;
export const injectStore = (store:any) => {
  storeRef = store;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = storeRef.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");

        storeRef.dispatch(
          setAuth({
            accessToken: res.data.accessToken,
            user: res.data.user,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        storeRef.dispatch(clearAuth());
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
