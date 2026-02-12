

"use client";

import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";

export default function WishlistPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // if auth required
        const res = await api.get(
          "/user-dashboard/get-wishlist",
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
        );

        if (res.data.success) {
          setProducts(res.data.data || []);
        } else {
          toast.error("Failed to load wishlist");
        }
      } catch (error) {
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Remove item from wishlist locally
  const removeWishlist = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-600">Loading wishlist...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-600 mb-4">Your wishlist is empty</p>
        <button
          onClick={() => router.push("/")}
          className="bg-red-600 text-white px-6 py-3 rounded-full"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="relative bg-white rounded-2xl border shadow-sm overflow-hidden"
        >
          {/* ❤️ Remove */}
          <button
            onClick={() => removeWishlist(p.id)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
          >
            <FiHeart className="text-red-500 fill-current" />
          </button>

          {/* Image */}
          <div className="h-56 bg-gray-100 overflow-hidden">
            <img
              src={p.image || "/placeholder.svg"}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-base">{p.name}</h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">₹{p.price}</span>
            </div>

            {/* <button
              onClick={() => router.push(`/product?id=${p.slug}`)}
              className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold"
            >
              VIEW DETAILS
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}

