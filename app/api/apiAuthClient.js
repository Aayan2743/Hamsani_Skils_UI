// src/api/apiAuthClient.js
import axios from "axios";
import { clearToken, getToken, isTokenExpired, clearAllAuthData } from "../utils/auth";

const apiAuthClient = axios.create({
    //  baseURL: "https://api.9nutz.com/api/web",
  //baseURL: "http://192.168.29.46:8083/api/web",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiAuthClient.interceptors.request.use(
  (config) => {
    // Check if token has expired before making request
    if (isTokenExpired()) {
      clearAllAuthData();
      alert("Session expired. Please login again.");
      window.location.href = "/account/login";
      return Promise.reject(new Error("Token expired"));
    }

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
      clearAllAuthData();
      alert("Session expired. Please login again.");
      window.location.href = "/account/login";
    }
    return Promise.reject(err);
  }
);

export default apiAuthClient;
