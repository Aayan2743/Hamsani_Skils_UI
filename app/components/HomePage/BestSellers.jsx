"use client";
import { motion } from "framer-motion";
import { staggerContainer, productCard } from "../../utils/animations.js";
import { useProducts } from "../../hooks/useProducts";
import Link from "next/link";

export default function BestSellers() {
  const { products, loading } = useProducts();
  
  // Take first 4 products as bestsellers
  const bestsellers = products.slice(0, 4);

  if (loading) {
    return <BestSellersLoading />;
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 
              className="text-3xl md:text-4xl font-normal text-[#2C1810] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Bestsellers
            </h2>
            {/* <p className="text-gray-600">Handpicked favorites loved by our customers</p> */}
          </div>
          <Link
            href="/collections"
            className="hidden md:block text-[#8B4513] font-semibold hover:underline"
          >
            View All →
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
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/collections"
            className="text-[#8B4513] font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const variant = product.variant_combinations?.[0];
  const imageUrl = product.images?.find((img) => img.is_primary)?.image_url || 
                   product.images?.[0]?.image_url || 
                   "/placeholder.svg";
  const price = Number(variant?.extra_price || 0);

  return (
    <motion.div variants={productCard}>
      <Link
        href={`/products/details?id=${product.slug}`}
        className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {variant?.discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {variant.discount}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-[#2C1810] mb-2 line-clamp-2 text-sm md:text-base">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#8B4513]">
              ₹{price.toLocaleString()}
            </span>
          </div>

          {/* Stock Status */}
          {variant?.quantity > 0 ? (
            <p className="text-xs text-green-600 mt-1">In Stock</p>
          ) : (
            <p className="text-xs text-red-600 mt-1">Out of Stock</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function BestSellersLoading() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-48 bg-gray-200 rounded mb-12 skeleton" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden">
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
