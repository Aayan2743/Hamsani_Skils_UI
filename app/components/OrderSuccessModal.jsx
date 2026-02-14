"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function OrderSuccessModal({ open, onClose }) {
  const router = useRouter();

  const handleViewOrders = () => {
    onClose();
    router.push("/dashboard/purchase-history");
  };

  const handleContinueShopping = () => {
    onClose();
    router.push("/collections");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                {/* Outer Circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
                >
                  {/* Inner Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    {/* Checkmark */}
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="w-12 h-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </motion.div>
                </motion.div>

                {/* Confetti Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * Math.PI) / 4) * 60,
                      y: Math.sin((i * Math.PI) / 4) * 60,
                    }}
                    transition={{
                      delay: 0.5 + i * 0.05,
                      duration: 0.8,
                    }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: [
                        "#8B4513",
                        "#C4A962",
                        "#F5F5DC",
                        "#8B4513",
                      ][i % 4],
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been confirmed and
                will be delivered soon.
              </p>

              {/* Order Details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-[#F5F5DC] rounded-lg p-4 mb-6"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-[#8B4513]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>You will receive an email confirmation shortly</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="space-y-3"
              >
                <button
                  onClick={handleViewOrders}
                  className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  View My Orders
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="w-full border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
