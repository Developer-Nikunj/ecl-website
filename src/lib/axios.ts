import axios from "axios";
import { clearAuth, setAuth } from "@/store/slices/module1/auth/auth.slices";

let storeRef: any;
export const injectStore = (store: any) => {
  storeRef = store;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = storeRef.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// this interceptor cuurently handle one rwuest withpout queue, we can implement like down in this if needed

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    console.log("res interceptor 1 started", error.response);
    if (
      error.response?.status === 401 &&
      error.response?.data?.message == "Invalid or expired token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");
        console.log("res interceptor", res);
        storeRef.dispatch(
          setAuth({
            token: res.data.token,
            status: res.data.status,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;

        return api(originalRequest);
      } catch (err) {
        storeRef.dispatch(clearAuth());
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ✅ Only refresh on 402
    if (
      error.response?.status === 402 &&
      error.response?.data?.message == "Access token missing" &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/newToken")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post(
          "/auth/newToken",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.token;

        storeRef.dispatch(
          setAuth({
            token: newToken,
            status: res.data.status,
          })
        );

        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        storeRef.dispatch(clearAuth());

        // 🔥 client-side navigation only
        window.location.replace("/signin");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
