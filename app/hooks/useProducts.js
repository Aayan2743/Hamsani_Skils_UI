import { useState, useEffect } from "react";
import api from "../utils/apiInstance";

export function useProducts(page = 1, perPage = 8) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 8,
    total: 0,
    from: 0,
    to: 0,
  });

  // Fetch all products once
  useEffect(() => {
    let isMounted = true;

    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch all products by requesting a large per_page or fetching all pages
        const res = await api.get(`ecom/products?per_page=100`);

        if (!isMounted) return;

        const data = res.data?.data;
        const productsData = data?.data || [];
        const validProducts = Array.isArray(productsData) ? productsData : [];
        
        setAllProducts(validProducts);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Failed to load products");
        setAllProducts([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAllProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle client-side pagination
  useEffect(() => {
    if (allProducts.length === 0) {
      setProducts([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        per_page: perPage,
        total: 0,
        from: 0,
        to: 0,
      });
      return;
    }

    const total = allProducts.length;
    const lastPage = Math.ceil(total / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    setProducts(paginatedProducts);
    setPagination({
      current_page: page,
      last_page: lastPage,
      per_page: perPage,
      total: total,
      from: startIndex + 1,
      to: Math.min(endIndex, total),
    });
  }, [allProducts, page, perPage]);

  return { products, loading, error, pagination };
}
