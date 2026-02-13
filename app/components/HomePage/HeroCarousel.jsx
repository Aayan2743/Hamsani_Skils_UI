"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const slides = [
  {
    id: 1,
    image: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440",
    tag: "NEW COLLECTION 2026",
    title: "The Art of",
    titleHighlight: "Handwoven",
    titleEnd: "Elegance",
    description: "Discover our curated collection of pure silk sarees, handcrafted by master weavers from the heart of India.",
    primaryBtn: "Explore Collection",
    secondaryBtn: "New Arrivals",
    primaryLink: "/collections",
    secondaryLink: "/collections?filter=new",
  },
  {
    id: 2,
    image: "https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920",
    tag: "BRIDAL COLLECTION",
    title: "Timeless",
    titleHighlight: "Bridal",
    titleEnd: "Splendor",
    description: "Exquisite bridal sarees that blend tradition with contemporary elegance for your special day.",
    primaryBtn: "Shop Bridal",
    secondaryBtn: "View Collection",
    primaryLink: "/collections?category=bridal",
    secondaryLink: "/collections",
  },
  {
    id: 3,
    image: "https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492",
    tag: "KANJIVARAM COLLECTION",
    title: "Heritage",
    titleHighlight: "Kanjivaram",
    titleEnd: "Silk",
    description: "Authentic Kanjivaram silk sarees woven with intricate designs and rich zari work.",
    primaryBtn: "Explore Collection",
    secondaryBtn: "Learn More",
    primaryLink: "/collections?category=kanjivaram",
    secondaryLink: "/about",
  },
  {
    id: 4,
    image: "/softsilk_saree.webp",
    tag: "SOFT SILK COLLECTION",
    title: "Luxurious",
    titleHighlight: "Soft Silk",
    titleEnd: "Drapes",
    description: "Lightweight and elegant soft silk sarees perfect for any occasion.",
    primaryBtn: "Shop Now",
    secondaryBtn: "View All",
    primaryLink: "/collections?category=soft-silk",
    secondaryLink: "/collections",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-[#2C1810]">
      {/* Background Image with Overlay */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl text-white"
            >
              {/* Tag */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 text-[#C4A962] font-medium"
              >
                {slide.tag}
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {slide.title}
                <br />
                <span className="text-[#C4A962]">{slide.titleHighlight}</span>
                <br />
                {slide.titleEnd}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-base mb-8 text-gray-200 max-w-xl leading-relaxed"
              >
                {slide.description}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href={slide.primaryLink}
                  className="bg-[#C4A962] hover:bg-[#B39952] text-white px-8 py-3 rounded-sm font-semibold text-sm md:text-base transition-all duration-300 flex items-center gap-2"
                >
                  {slide.primaryBtn}
                  <span>→</span>
                </Link>

                <Link
                  href={slide.secondaryLink}
                  className="border-2 border-white text-white hover:bg-white hover:text-[#2C1810] px-8 py-3 rounded-sm font-semibold text-sm md:text-base transition-all duration-300"
                >
                  {slide.secondaryBtn}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#C4A962] w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
