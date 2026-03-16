"use client";
import { useState, useEffect } from "react";
import api from "../../utils/apiInstance";
import ProductCarousel from "../ProductCarousel";
export default function DynamicSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeSections = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get("ecom/home-sections");
        
        let sectionsArray = [];
        
        if (response.data) {
          if (Array.isArray(response.data)) {
            sectionsArray = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            sectionsArray = response.data.data;
          }
        }
        
        const validSections = sectionsArray.filter(
          section => section && section.products && Array.isArray(section.products) && section.products.length > 0
        );
        
        setSections(validSections);
      } catch (err) {
        setError(err.message);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeSections();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-none w-[calc(50%-12px)] md:w-[calc(25%-18px)]">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8 max-w-7xl mx-auto">
        <h3 className="text-red-800 font-semibold mb-2">Error loading sections</h3>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        const formattedProducts = section.products.map(product => ({
          id: product.id,
          title: product.name,
          slug: product.slug,
          price: product.final_price,
          image: product.images?.[0]?.image_url,
          raw: product
        }));

        return (
          <ProductCarousel
            key={section.id}
            title={section.name}
            products={formattedProducts}
          />
        );
      })}
    </>
  );
}


