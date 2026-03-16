// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token =
//       typeof window !== "undefined" &&
//       localStorage.getItem("nineNutzAuth");

//     const name =
//       typeof window !== "undefined" &&
//       localStorage.getItem("nineNutzUser");

//     if (token) {
//       setUser({ name: name || "User", token });
//     }

//     setLoading(false);
//   }, []);

//   const login = ({ token = "1", name = "User" }) => {
//     localStorage.setItem("nineNutzAuth", token);
//     localStorage.setItem("nineNutzUser", name);
//     setUser({ name, token });
//   };

//   const logout = () => {
//     localStorage.removeItem("nineNutzAuth");
//     localStorage.removeItem("nineNutzUser");
//     setUser(null);
//     // ❌ NO router.push here
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTokenExpiry } from "../../hooks/useTokenExpiry";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check token expiry periodically
  useTokenExpiry();

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      
      let userData = null;
      if (userStr) {
        try {
          userData = JSON.parse(userStr);
        } catch {
          userData = { name: userStr };
        }
      }

      if (token && userData) {
        setUser({ ...userData, token });
      }

      setLoading(false);
    };

    initializeAuth();
    // Listen for storage changes (for cross-tab sync and immediate updates)
    const handleStorageChange = () => {
      initializeAuth();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    if (user?.id) {
      localStorage.setItem("user_id", user.id.toString());
    }
    setUser({ ...user, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
