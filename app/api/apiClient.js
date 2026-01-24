
import axios from "axios";

const apiClient = axios.create({
 baseURL: "https://api.9nutz.com/api/web",
 // baseURL: "http://192.168.29.46:8083/api/web",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

let requestCount = 0;
let setGlobalLoading;

export const setLoadingHandler = (setter) => {
  setGlobalLoading = setter;
};

apiClient.interceptors.request.use(
  (config) => {
    requestCount++;
    if (setGlobalLoading) setGlobalLoading(true);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    requestCount--;
    if (requestCount <= 0 && setGlobalLoading) setGlobalLoading(false);
    return response;
  },
  (error) => {
    requestCount--;
    if (requestCount <= 0 && setGlobalLoading) setGlobalLoading(false);
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default apiClient;
