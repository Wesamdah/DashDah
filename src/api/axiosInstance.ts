import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";

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
      // console.error("Error:", error.response.status, error.response.data);

      const data = error.response.data as { msg: string };

      if (error.response.status === 400) {
        toast.error(data.msg);
      }
      if (error.response.status === 401) {
        toast.error(data.msg);
      }
    } else if (error.request) {
      toast.error("No response received");
    } else {
      toast.error("error.message");
    }

    return Promise.reject(error);
  },
);
