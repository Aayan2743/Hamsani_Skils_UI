import { useState, useEffect } from "react";
import api from "../utils/apiInstance";

// Shared products cache
let productsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      // Check if cache is valid
      if (
        productsCache &&
        cacheTimestamp &&
        Date.now() - cacheTimestamp < CACHE_DURATION
      ) {
        setProducts(productsCache);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get("ecom/products");

        if (!isMounted) return;

        const data = res.data;
        const productsData = data?.data?.data || data?.data || data || [];
        const validProducts = Array.isArray(productsData) ? productsData : [];

        // Update cache
        productsCache = validProducts;
        cacheTimestamp = Date.now();

        setProducts(validProducts);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Failed to load products");
        setProducts([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}

// Clear cache function
export function clearProductsCache() {
  productsCache = null;
  cacheTimestamp = null;
}
