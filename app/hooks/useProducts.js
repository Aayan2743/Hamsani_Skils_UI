import { useState, useEffect } from "react";
import api from "../utils/apiInstance";

export function useProducts(page = 1, perPage = 12, searchQuery = "", categorySlug = "") {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
    from: 0,
    to: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        let url;
        
        // If category is provided, use collections endpoint
        if (categorySlug && categorySlug.trim()) {
          url = `ecom/collections?category=${encodeURIComponent(categorySlug.trim())}&page=${page}&per_page=${perPage}`;
        } else {
          // Otherwise use products endpoint
          url = `ecom/products?page=${page}&per_page=${perPage}`;
          
          // Add search query if provided
          if (searchQuery && searchQuery.trim()) {
            url += `&search=${encodeURIComponent(searchQuery.trim())}`;
          }
        }
        
        // Fetch products with server-side pagination
        const res = await api.get(url);

        if (!isMounted) return;

        const responseData = res.data;
        
        // Handle different response structures
        // Collections endpoint: { success: true, data: [...], pagination: {...} }
        // Products endpoint: { data: { data: [...], current_page: ..., ... } }
        
        let productsData;
        let paginationData;
        
        if (responseData.success && Array.isArray(responseData.data)) {
          // Collections endpoint response
          productsData = responseData.data;
          paginationData = responseData.pagination || {};
        } else if (responseData.data) {
          // Products endpoint response
          productsData = responseData.data.data || [];
          paginationData = responseData.data;
        } else {
          productsData = [];
          paginationData = {};
        }
        
        const validProducts = Array.isArray(productsData) ? productsData : [];
        
        setProducts(validProducts);
        
        // Set pagination info from API response
        setPagination({
          current_page: paginationData.current_page || 1,
          last_page: paginationData.last_page || paginationData.total_pages || 1,
          per_page: paginationData.per_page || perPage,
          total: paginationData.total || 0,
          from: paginationData.from || 0,
          to: paginationData.to || 0,
        });
        
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
  }, [page, perPage, searchQuery, categorySlug]);

  return { products, loading, error, pagination };
}

