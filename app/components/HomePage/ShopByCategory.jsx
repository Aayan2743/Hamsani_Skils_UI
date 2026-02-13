"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../../utils/animations.js";
import Link from "next/link";

const categories = [
  {
    name: "Silk Sarees",
    icon: "🪡",
    href: "/collections?category=silk-sarees",
  },
  {
    name: "Kanjivaram",
    icon: "✨",
    href: "/collections?category=kanjivaram",
  },
  {
    name: "Bridal Collection",
    icon: "💍",
    href: "/collections?category=bridal",
  },
  {
    name: "Soft Silk",
    icon: "🌸",
    href: "/collections?category=soft-silk",
  },
  {
    name: "Designer Sarees",
    icon: "👗",
    href: "/collections?category=designer",
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          {/* <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-3">
            Shop by Category
          </h2> */}
          <h2 
              className="text-3xl md:text-4xl font-normal text-[#2C1810] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop by Category
            </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Explore our curated collections
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link
                href={category.href}
                className="group block bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-[#2C1810] text-sm md:text-base">
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
