

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartIcon,
  ShoppingBagIcon,
  TrashIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

export default function WishlistPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get("/user-dashboard/get-wishlist", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });

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

  const removeWishlist = async (id) => {
    setRemovingId(id);
    
    // Optimistic update
    setProducts((prev) => prev.filter((p) => p.id !== id));
    
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/user-dashboard/wishlist-toggle",
        { product_id: id },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
      // Revert on error
      const res = await api.get("/user-dashboard/get-wishlist", {
        headers: {
          Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : undefined,
        },
      });
      if (res.data.success) {
        setProducts(res.data.data || []);
      }
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-md"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-full mb-6"
        >
          <HeartIcon className="w-20 h-20 text-rose-400" />
        </motion.div>
        <h3 className="text-2xl font-bold text-[#2C1810] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Wishlist is Empty
        </h3>
        <p className="text-gray-600 mb-6">Save your favorite items here</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/collections")}
          className="bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
        >
          <SparklesIcon className="w-5 h-5" />
          Start Shopping
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810] flex items-center gap-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            <HeartSolidIcon className="w-8 h-8 text-rose-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {products.length} {products.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              layout
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Remove Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeWishlist(product.id)}
                disabled={removingId === product.id}
                className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-rose-50 transition-colors"
              >
                {removingId === product.id ? (
                  <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <TrashIcon className="w-5 h-5 text-rose-500" />
                )}
              </motion.button>

              {/* Image */}
              <div 
                onClick={() => router.push(`/products/details?id=${product.slug}`)}
                className="relative aspect-[3/4] bg-[#F5F5DC] overflow-hidden cursor-pointer"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#8B4513] px-6 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                    View Details
                  </motion.button>
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
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => router.push(`/products/details?id=${product.slug}`)}
                    className="bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

