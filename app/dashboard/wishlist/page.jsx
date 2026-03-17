"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HeartIcon,
  ShoppingBagIcon,
  TrashIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";



export default function WishlistPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const res = await api.get("/user-dashboard/get-wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.success) {
        setProducts(res.data.data || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [refreshTrigger]);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, []);

  const removeWishlist = async (id) => {
    setRemovingId(id);
    
    try {
      const token = localStorage.getItem("token");
      
      await api.post(
        "/user-dashboard/wishlist-toggle",
        { product_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Removed from wishlist");
      
      // Remove from local state immediately
      setProducts((prev) => prev.filter((p) => p.id !== id));
      
      // Fetch fresh data after a short delay
      setTimeout(() => {
        fetchWishlist();
      }, 300);
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-md">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-full mb-6">
          <HeartIcon className="w-20 h-20 text-rose-400" />
        </div>
        <h3 className="text-2xl font-bold text-[#2C1810] mb-2 font-display">
          Your Wishlist is Empty
        </h3>
        <p className="text-gray-600 mb-6">Save your favorite items here</p>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/collections")}
            className="bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
          >
            <SparklesIcon className="w-5 h-5" />
            Start Shopping
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#8B4513] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810] flex items-center gap-3 font-display">
            <HeartSolidIcon className="w-8 h-8 text-rose-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {products.length} {products.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#6D3410] transition-colors text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Remove Button */}
            <button
              onClick={() => removeWishlist(product.id)}
              disabled={removingId === product.id}
              className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-rose-50 transition-colors"
            >
              {removingId === product.id ? (
                <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <TrashIcon className="w-5 h-5 text-rose-500" />
              )}
            </button>

            {/* Image */}
            <div 
              onClick={() => router.push(`/products/details?id=${product.slug}`)}
              className="relative aspect-[3/4] bg-[#F5F5DC] overflow-hidden cursor-pointer"
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <button
                  className="bg-white text-[#8B4513] px-6 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  View Details
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-xs text-[#8B7355] uppercase tracking-wide mb-2">
                SILK SAREES
              </p>
              
              <h3 
                onClick={() => router.push(`/products/details?id=${product.slug}`)}
                className="font-semibold text-[#2C1810] mb-3 line-clamp-2 cursor-pointer hover:text-[#8B4513] transition-colors"
              >
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#8B4513]">
                  ₹{Number(product.price).toLocaleString()}
                </span>
                
                <button
                  onClick={() => router.push(`/products/details?id=${product.slug}`)}
                  className="bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
