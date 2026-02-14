


// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/app/utils/apiInstance";

// export default function OrderDetailsPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 2;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const userStr = localStorage.getItem("user");
//         const token = localStorage.getItem("token");

//         if (!userStr || !token) {
//           router.push("/account/login");
//           return;
//         }

//         const user = JSON.parse(userStr);
//         const userId = user?.id;
//         if (!userId) {
//           setLoading(false);
//           return;
//         }
//        console.log(userId)
//         const res = await api.get(`/user-dashboard/orders/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           }
//         );
//         console.log("test",res)
//         if (res.status === 200 && res.data?.success) {
//           setOrders(res.data.data || []);
//         }
//       } catch (error) {
//         console.error("Failed to fetch orders", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [router]);

//   // Loading
//   if (loading) {
//     return (
//       <div className="p-6 bg-white rounded-xl border">
//         <p className="text-sm text-gray-500">Loading orders...</p>
//       </div>
//     );
//   }

//   // Empty
//   if (!orders.length) {
//     return (
//       <div className="p-6 bg-white rounded-xl border">
//         <p className="text-sm text-gray-500">No orders found</p>
//       </div>
//     );
//   }

//   // Pagination Logic
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(orders.length / ordersPerPage);

//   return (
//     <div className="space-y-6">
//       {currentOrders.map((order) => (
//         <div
//           key={order.id}
//           className="p-6 bg-white rounded-xl shadow-sm border space-y-4"
//         >
//           {/* HEADER */}
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold">
//               Order #{order.id}
//             </h2>
//             <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 capitalize">
//               {order.status}
//             </span>
//           </div>

//           {/* DATE */}
//           <p className="text-sm text-gray-500">
//             Placed on {new Date(order.created_at).toDateString()}
//           </p>

//           {/* AMOUNT SUMMARY */}
//           <div className="border rounded-lg p-4 space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{order.subtotal}</span>
//             </div>

//             <div className="flex justify-between text-green-600">
//               <span>Discount</span>
//               <span>- ₹{order.discount}</span>
//             </div>

//             <div className="flex justify-between font-semibold text-base border-t pt-2">
//               <span>Total</span>
//               <span>₹{order.total_amount}</span>
//             </div>
//           </div>

//           {/* ITEMS */}
//           <div>
//             <h3 className="text-md font-semibold mb-2">Items</h3>

//             <div className="space-y-3">
//               {order.items?.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-4 border rounded-lg p-3"
//                 >
//                   <img
//                     src={item.product?.images?.[0]?.image_url}
//                     alt={item.product?.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />

//                   <div className="flex-1">
//                     <p className="font-medium">
//                       {item.product?.name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Qty: {item.quantity}
//                     </p>
//                   </div>

//                   <div className="font-semibold">
//                     ₹{item.total}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-2 mt-6">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-40"
//         >
//           Previous
//         </button>

//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentPage(index + 1)}
//             className={`px-3 py-1 border rounded ${
//               currentPage === index + 1
//                 ? "bg-blue-600 text-white"
//                 : ""
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBagIcon,
  CalendarIcon,
  CreditCardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import api from "@/app/utils/apiInstance";

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

const getStatusConfig = (status) => {
  const configs = {
    delivered: {
      icon: CheckCircleIcon,
      color: "text-green-600",
      bg: "bg-green-50",
      label: "Delivered"
    },
    "in transit": {
      icon: TruckIcon,
      color: "text-blue-600",
      bg: "bg-blue-50",
      label: "In Transit"
    },
    processing: {
      icon: ClockIcon,
      color: "text-amber-600",
      bg: "bg-amber-50",
      label: "Processing"
    },
    cancelled: {
      icon: XCircleIcon,
      color: "text-red-600",
      bg: "bg-red-50",
      label: "Cancelled"
    }
  };
  
  return configs[status?.toLowerCase()] || configs.processing;
};

export default function OrderDetailsPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!userStr || !token) {
          router.push("/account/login");
          return;
        }
        const user = JSON.parse(userStr);
        const userId = user?.id;
        if (!userId) {
          setLoading(false);
          return;
        }
        const res = await api.get(`/user-dashboard/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (res.status === 200 && res.data?.success) {
          const ordersData = res.data.data || [];
          setOrders(ordersData);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }
  if (!orders.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-12 shadow-md text-center"
      >
        <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
        <button
          onClick={() => router.push("/collections")}
          className="bg-[#8B4513] text-white px-6 py-3 rounded-lg hover:bg-[#C4A962] transition-colors"
        >
          Browse Products
        </button>
      </motion.div>
    );
  }

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Purchase History
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} in total
          </p>
        </div>
      </motion.div>

      {/* Orders List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <AnimatePresence mode="wait">
          {currentOrders.map((order, index) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={order.id}
                variants={itemVariants}
                layout
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Compact Order Header */}
                <div className="bg-gradient-to-r from-[#F5F5DC] to-white px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <ShoppingBagIcon className="w-5 h-5 text-[#8B4513]" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#2C1810]">
                          Order #{order.id}
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-0.5">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className={`${statusConfig.bg} ${statusConfig.color} px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.label}
                    </div>
                  </div>
                </div>

                {/* Compact Order Content */}
                <div className="p-4 space-y-3">
                  {/* Items */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Order Items
                    </h3>
                    <div className="space-y-2">
                      {order.items?.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg"
                        >
                          <div className="w-14 h-14 rounded-md overflow-hidden bg-white shadow-sm flex-shrink-0">
                            <img
                              src={item.product?.images?.[0]?.image_url || '/placeholder.svg'}
                              alt={item.product?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[#2C1810] truncate">
                              {item.product?.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-sm text-[#2C1810]">
                              ₹{Number(item.total).toLocaleString()}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Compact Price Summary */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-medium">₹{Number(order.subtotal).toLocaleString()}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">- ₹{Number(order.discount).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-dashed">
                      <span className="font-bold text-[#2C1810]">Total</span>
                      <span className="text-xl font-bold text-[#8B4513]">
                        ₹{Number(order.total_amount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center gap-2 mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 rounded-lg bg-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </motion.button>

          {[...Array(totalPages)].map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(i + 1)}
              className={`min-w-[36px] h-9 rounded-lg font-medium transition-all text-sm ${
                currentPage === i + 1
                  ? "bg-[#8B4513] text-white shadow-lg"
                  : "bg-white text-gray-700 shadow-md hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 rounded-lg bg-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}


