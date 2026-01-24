"use client";

import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";

const STATIC_WISHLIST = [
  {
    id: 1,
    title: "Kanchipuram Pure Silk Saree",
    description: "Traditional Kanchipuram silk saree with rich zari border.",
    img: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=1920",
    price: 24999,
    oldPrice: 29999,
  },
  {
    id: 2,
    title: "Banarasi Silk Saree",
    description: "Elegant Banarasi silk saree perfect for weddings.",
    img: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=1920",
    price: 18999,
    oldPrice: 22999,
  },
  {
    id: 3,
    title: "Soft Silk Saree",
    description: "Lightweight soft silk saree for festive occasions.",
    img: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=1920",
    price: 12999,
    oldPrice: 15999,
  },
];

export default function WishlistPage() {
  const router = useRouter();
  const [products, setProducts] = useState(STATIC_WISHLIST);

  const removeWishlist = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

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
              src={p.img}
              alt={p.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-base">{p.title}</h3>

            <p className="text-xs text-gray-500 line-clamp-2">
              {p.description}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">₹{p.price}</span>
              <span className="text-sm line-through text-gray-400">
                ₹{p.oldPrice}
              </span>
            </div>

            <button
              onClick={() => router.push(`/product?id=${p.id}`)}
              className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold"
            >
              VIEW DETAILS
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
