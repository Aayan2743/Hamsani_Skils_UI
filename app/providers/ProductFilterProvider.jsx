 "use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../api/AuthAPI";

const ProductFilterContext = createContext(null);

export function ProductFilterProvider({ children }) {
  const [filters, setFilters] = useState({
    search: "",
    category_id: null,
    min_price: 0,
    max_price: 999999,
    sort: "latest",
    page: 1,
    limit: 10,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const params = {
        min_price: filters.min_price,
        max_price: filters.max_price,
        sort: filters.sort,
        page: filters.page,
        limit: filters.limit,
      };

      // ✅ IMPORTANT: explicitly attach category_id
      if (filters.category_id !== null) {
        params.category_id = filters.category_id;
      }

      if (filters.search) {
        params.search = filters.search;
      }

      try {
        const res = await AuthAPI.getproducts(params);
        setProducts(res?.data?.data || []);
      } catch (err) {
  
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters]);

  return (
    <ProductFilterContext.Provider
      value={{ filters, setFilters, products, loading }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}

export function useProductFilters() {
  const ctx = useContext(ProductFilterContext);
  if (!ctx) {
    throw new Error("useProductFilters must be used inside ProductFilterProvider");
  }
  return ctx;
}
