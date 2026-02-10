// src/api/apiAuthClient.js
import axios from "axios";
import { clearToken, getToken } from "../utils/auth";

const apiAuthClient = axios.create({
     baseURL: "https://api.9nutz.com/api/web",
  //baseURL: "http://192.168.29.46:8083/api/web",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiAuthClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

apiAuthClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default apiAuthClient;
