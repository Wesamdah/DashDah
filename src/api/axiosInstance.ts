import axios, { AxiosError, type AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: "https://dahdashboard.onrender.com/api/v1",
  allowAbsoluteUrls: true,
  withCredentials: true,
  transformRequest: [
    (data, headers) => {
      if (data instanceof FormData) {
        return data;
      } else {
        headers["Content-Type"] = "application/json";
        return JSON.stringify(data);
      }
    },
  ],
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error("Error:", error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.warn("Unauthorized");
      }
    } else if (error.request) {
      console.error("No response received");
    } else {
      console.error("Request config error:", error.message);
    }
    return Promise.reject(error);
  },
);
