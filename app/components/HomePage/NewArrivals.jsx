"use client";
import { useState, useEffect } from "react";
import api from "../../utils/apiInstance";
import ProductCard from "../ProductCard";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const res = await api.get("ecom/products?filter=new&per_page=8");
        const data = res.data?.data;
        const productsData = data?.data || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F5F5DC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  const formattedProducts = products.map(product => ({
    id: product.id,
    title: product.name,
    slug: product.slug,
    price: product.final_price || Number(product.variant_combinations?.[0]?.extra_price || 0),
    image: product.images?.find(img => img.is_primary)?.image_url || product.images?.[0]?.image_url,
    raw: product
  }));

  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-normal text-[#2C1810] font-display">
            New Arrivals
          </h2>
          <p className="text-sm text-gray-600 mt-2">Discover our latest collection</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {formattedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

