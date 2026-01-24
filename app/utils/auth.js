// // src/utils/auth.js
// export const getToken = () => localStorage.getItem("token");
// export const setToken = (token) => localStorage.setItem("token", token);
// export const clearToken = () => localStorage.removeItem("token");




// src/utils/auth.js
export const TOKEN_KEY = "token";
export const USER_KEY = "user";

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
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

export const CART_KEY = "cart_items";