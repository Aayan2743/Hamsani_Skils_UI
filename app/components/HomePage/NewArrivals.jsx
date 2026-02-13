"use client";
import { motion } from "framer-motion";
import { staggerContainer, productCard } from "../../utils/animations.js";
import { useProducts } from "../../hooks/useProducts";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function NewArrivals() {
  const { products, loading } = useProducts();
  
  // Take first 4 products as new arrivals
  const newArrivals = products.slice(0, 4);

  if (loading) {
    return <NewArrivalsLoading />;
  }

  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 
              className="text-2xl md:text-3xl font-normal text-[#2C1810] mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              New Arrivals
            </h2>
            {/* <p className="text-xs md:text-sm text-gray-600 font-light">
              Fresh additions to our collection
            </p> */}
          </div>
          <Link
            href="/collections?filter=new"
            className="text-xs md:text-sm font-medium text-[#2C1810] hover:text-[#8B4513] transition-colors flex items-center gap-1"
          >
            View All
            <span>→</span>
          </Link>
        </div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const variant = product.variant_combinations?.[0];
  const imageUrl = product.images?.find((img) => img.is_primary)?.image_url || 
                   product.images?.[0]?.image_url || 
                   "/placeholder.svg";
  const price = Number(variant?.extra_price || 0);
  const discount = variant?.discount || 0;

  return (
    <motion.div variants={productCard}>
      <div className="group relative bg-white rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Image Container */}
        <Link href={`/products/details?id=${product.slug}`}>
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F6F0]">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span className="bg-[#C4A962] text-white text-xs font-bold px-2 py-1 uppercase">
                NEW
              </span>
              {discount > 0 && (
                <span className="bg-[#D84315] text-white text-xs font-bold px-2 py-1">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300"
            >
              {isWishlisted ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <Link href={`/products/details?id=${product.slug}`}>
            <h3 className="font-medium text-[#2C1810] mb-2 line-clamp-2 text-sm md:text-base hover:text-[#8B4513] transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold text-[#2C1810]">
              ₹{price.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ₹{Math.round(price / (1 - discount / 100)).toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {variant?.quantity > 0 ? (
            <p className="text-xs text-green-600 font-medium">In Stock</p>
          ) : (
            <p className="text-xs text-red-600 font-medium">Out of Stock</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function NewArrivalsLoading() {
  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-48 bg-gray-200 rounded mb-8 skeleton" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-sm overflow-hidden">
              <div className="aspect-[3/4] bg-gray-200 skeleton" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded skeleton" />
                <div className="h-4 w-2/3 bg-gray-200 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
