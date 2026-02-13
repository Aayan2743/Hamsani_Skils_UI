"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../../utils/animations.js";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// Sample Instagram videos/posts - Replace with your actual Instagram content
const instagramPosts = [
  {
    id: 1,
    type: "image",
    url: "https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=600",
    thumbnail: "https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=600",
  },
  {
    id: 2,
    type: "image",
    url: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=600",
    thumbnail: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=600",
  },
  {
    id: 3,
    type: "image",
    url: "https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492&width=600",
    thumbnail: "https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492&width=600",
  },
  {
    id: 4,
    type: "image",
    url: "https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543&width=600",
    thumbnail: "https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543&width=600",
  },
  {
    id: 5,
    type: "image",
    url: "/softsilk_saree.webp",
    thumbnail: "/softsilk_saree.webp",
  },
];

export default function InstagramCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4; // Show 4 items at a time on desktop

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < instagramPosts.length - itemsPerView;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 
            className="text-3xl md:text-4xl font-normal text-[#2C1810] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Follow Us on Instagram
          </h2>
          <h2 
            className="text-3xl md:text-4xl font-normal text-[#2C1810] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
              @hamsinisilks
          </h2>
 
          <a
            href="https://www.instagram.com/hamsinisilks/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-[#8B4513] hover:text-[#C4A962] transition-colors"
          >
            Follow Us →
          </a>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 transition-all duration-300 -ml-4 ${
              !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Previous"
            disabled={!canScrollLeft}
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 transition-all duration-300 -mr-4 ${
              !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Next"
            disabled={!canScrollRight}
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {instagramPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <a
                    href="https://www.instagram.com/hamsinisilks/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative aspect-square overflow-hidden rounded-sm bg-gray-100"
                  >
                    <img
                      src={post.thumbnail}
                      alt="Instagram post"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile: Show 2 columns */}
        <div className="md:hidden mt-8">
          <div className="grid grid-cols-2 gap-4">
            {instagramPosts.slice(0, 4).map((post) => (
              <a
                key={post.id}
                href="https://www.instagram.com/hamsinisilks/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square overflow-hidden rounded-sm bg-gray-100"
              >
                <img
                  src={post.thumbnail}
                  alt="Instagram post"
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewArrivalsLoading() {
  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-48 bg-gray-200 rounded mb-8 skeleton" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
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
