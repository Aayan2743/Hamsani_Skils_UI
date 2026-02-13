"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../../utils/animations.js";

const features = [
  {
    icon: "🚚",
    title: "Free Shipping",
    description: "On orders above ₹5000",
  },
  {
    icon: "🔄",
    title: "Easy Returns",
    description: "7-day return policy",
  },
  {
    icon: "✓",
    title: "100% Authentic",
    description: "Certified silk sarees",
  },
  {
    icon: "💳",
    title: "Secure Payment",
    description: "Safe & encrypted",
  },
];

export default function Features() {
  return (
    <section className="bg-[#F5F5DC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-[#2C1810] mb-1 text-sm md:text-base">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
