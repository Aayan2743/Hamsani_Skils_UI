import { useState, useEffect } from "react";
import api from "../utils/apiInstance";

export function useProducts(page = 1, perPage = 12, searchQuery = "") {
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
        
        // Build query params
        let url = `ecom/products?page=${page}&per_page=${perPage}`;
        
        // Add search query if provided
        if (searchQuery && searchQuery.trim()) {
          url += `&search=${encodeURIComponent(searchQuery.trim())}`;
        }
        
        // Fetch products with server-side pagination and search
        const res = await api.get(url);

        if (!isMounted) return;

        const data = res.data?.data;
        
        // Extract products array
        const productsData = data?.data || [];
        const validProducts = Array.isArray(productsData) ? productsData : [];
        
        setProducts(validProducts);
        
        // Set pagination info from API response
        setPagination({
          current_page: data?.current_page || 1,
          last_page: data?.last_page || 1,
          per_page: data?.per_page || perPage,
          total: data?.total || 0,
          from: data?.from || 0,
          to: data?.to || 0,
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
  }, [page, perPage, searchQuery]);

  return { products, loading, error, pagination };
}

