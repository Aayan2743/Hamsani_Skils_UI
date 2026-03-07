// // src/utils/auth.js
// export const getToken = () => localStorage.getItem("token");
// export const setToken = (token) => localStorage.setItem("token", token);
// export const clearToken = () => localStorage.removeItem("token");

// src/utils/auth.js
export const TOKEN_KEY = "token";
export const USER_KEY = "user";
export const TOKEN_EXPIRY_KEY = "tokenExpiry";
export const CART_KEY = "hamsini_cart_items";
export const TOKEN_EXPIRY_TIME = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  // Set expiry time to 6 hours from now
  const expiryTime = Date.now() + TOKEN_EXPIRY_TIME;
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
};

export const clearToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return raw;
  }
};

export const setUser = (user) => {
  if (typeof window === "undefined") return;
  if (typeof user === "string") localStorage.setItem(USER_KEY, JSON.stringify({ name: user }));
  else localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
};

export const isTokenExpired = () => {
  if (typeof window === "undefined") return false;
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiryTime) return false;
  return Date.now() > parseInt(expiryTime);
};

export const clearAllAuthData = () => {
  if (typeof window === "undefined") return;
  clearToken();
  clearUser();
  // Clear all auth and cart related data from localStorage
  localStorage.removeItem("nineNutzAuth");
  localStorage.removeItem("nineNutzUser");
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem("hamsini_wishlist");
  localStorage.removeItem("zp_checkout_anon_id");
  localStorage.removeItem("zp_device_id");
  localStorage.removeItem("rzp_checkout_anon_id");
  localStorage.removeItem("rzp_device_id");
};