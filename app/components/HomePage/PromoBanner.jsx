"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/animations.js";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-gradient-to-r from-[#6B1F3A] via-[#7D2945] to-[#6B1F3A] py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.p
          variants={fadeInUp}
          className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 text-[#E8D5C4] font-light"
        >
          LIMITED TIME OFFER
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-normal mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Flat 30% Off on Bridal Collection
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-sm md:text-base mb-8 text-gray-100 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Celebrate your special day with our handpicked bridal sarees. Use code{" "}
          <span className="font-semibold">BRIDE30</span> at checkout.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <Link
            href="/collections?category=bridal"
            className="inline-block bg-[#C4A962] hover:bg-[#B39952] text-[#2C1810] px-10 py-3.5 rounded-sm font-semibold text-sm md:text-base transition-all duration-300 uppercase tracking-wider"
          >
            Shop Bridal Collection
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
