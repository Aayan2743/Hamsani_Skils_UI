"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/apiInstance";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlistFromAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setWishlist([]);
        setWishlistProducts([]);
        return;
      }

      const res = await api.get("/user-dashboard/get-wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        const products = res.data.data || [];
        setWishlistProducts(products);
        setWishlist(products.map(p => p.id));
      }
    } catch (error) {
      // Silent fail
    }
  };

  useEffect(() => {
    fetchWishlistFromAPI();
  }, []);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      fetchWishlistFromAPI();
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistProducts, toggleWishlist, fetchWishlistFromAPI, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
