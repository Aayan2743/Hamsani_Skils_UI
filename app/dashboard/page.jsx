"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  ShoppingCartIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- STATIC UI DATA ---------- */
  const stats = [
    {
      title: "Products in Cart",
      value: "03",
      icon: ShoppingCartIcon,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      link: "/cart"
    },
    {
      title: "Wishlist Items",
      value: "05",
      icon: HeartIcon,
      color: "bg-rose-50",
      iconColor: "text-rose-600",
      link: "/dashboard/wishlist"
    },
    {
      title: "Total Orders",
      value: "12",
      icon: ShoppingBagIcon,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
      link: "/dashboard/purchase-history"
    }
  ];

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      date: "Feb 10, 2026",
      status: "Delivered",
      amount: "₹4,299",
      items: 2,
      statusColor: "text-green-600",
      statusBg: "bg-green-50"
    },
    {
      id: "#ORD-2024-002",
      date: "Feb 08, 2026",
      status: "In Transit",
      amount: "₹6,899",
      items: 1,
      statusColor: "text-blue-600",
      statusBg: "bg-blue-50"
    },
    {
      id: "#ORD-2024-003",
      date: "Feb 05, 2026",
      status: "Processing",
      amount: "₹3,499",
      items: 3,
      statusColor: "text-amber-600",
      statusBg: "bg-amber-50"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#8B4513] to-[#C4A962] rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome Back!
          </h1>
          <p className="text-white/90">Manage your orders, wishlist, and profile from your dashboard</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <Link href={stat.link}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                    <p className="text-4xl font-bold text-[#2C1810]">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Orders */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#2C1810]">Recent Orders</h2>
              <Link href="/dashboard/purchase-history" className="text-sm text-[#8B4513] hover:text-[#C4A962] font-medium">
                View All →
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-[#2C1810]">{order.id}</p>
                      <span className={`${order.statusBg} ${order.statusColor} text-xs px-3 py-1 rounded-full font-medium`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {order.date}
                      </span>
                      <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#2C1810]">{order.amount}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Banner */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-[400px] group">
            <img
              src="https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492&width=1920"
              alt="Featured Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Exclusive Silk Collection
              </h3>
              <p className="text-white/90 mb-4">Discover our handpicked selection of premium silk sarees</p>
              <Link href="/collections" className="inline-block bg-white text-[#8B4513] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Shop Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionCard
            icon={ShoppingBagIcon}
            title="Browse Products"
            link="/collections"
          />
          <QuickActionCard
            icon={HeartIcon}
            title="My Wishlist"
            link="/dashboard/wishlist"
          />
          <QuickActionCard
            icon={TruckIcon}
            title="Track Orders"
            link="/dashboard/purchase-history"
          />
          <QuickActionCard
            icon={CheckCircleIcon}
            title="My Profile"
            link="/dashboard/profile"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function QuickActionCard({ icon: Icon, title, link }) {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
      >
        <div className="bg-[#F5F5DC] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon className="w-6 h-6 text-[#8B4513]" />
        </div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
      </motion.div>
    </Link>
  );
}
