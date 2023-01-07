import axios from "axios";
import { getToken, setToken } from "../handler/auth";

// Create an axios instance
const BASE_TIMEOUT = 5000;
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: BASE_TIMEOUT,
});

// request interceptor
api.interceptors.request.use((config) => {
  // Do something before request is sent
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// response interceptor
api.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res?.error) {
      throw new Error(res.error);
      alert(res.error);
    }
    return res;
  },
  (error) => {
    alert(error);
    if (error.response) {
      const data = error.response;
      const token = getToken();
      // check if token is expired
      if (data?.message === "Unauthorized" && token) {
        api
          .post(
            "/auth/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${getRefreshToken()}`,
              },
            }
          )
          .then((res) => {
            if (res) {
              setToken(res.accessToken);
            }
          });
      }
    }
    return Promise.reject(error || "Error");
  }
);

export default api;
