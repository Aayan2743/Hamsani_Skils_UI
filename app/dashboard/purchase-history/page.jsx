// "use client";

// import React, { useState } from "react";
// import { FaBars } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function PurchaseHistory() {
//   const router = useRouter();

//   // 🌸 STATIC PURCHASE DATA – HAMSINI SILKS
//   const [orders] = useState([
//     {
//       id: "HS-1001",
//       payable_amount: 12499,
//       order_status: "Delivered",
//       items: [
//         {
//           variant: {
//             image:
//               "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg",
//             product: {
//               name: "Pure Kanchipuram Silk Saree – Ruby Red",
//             },
//           },
//         },
//       ],
//     },
//     {
//       id: "HS-1002",
//       payable_amount: 18999,
//       order_status: "Shipped",
//       items: [
//         {
//           variant: {
//             image:
//               "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg",
//             product: {
//               name: "Traditional Banarasi Silk Saree – Royal Blue",
//             },
//           },
//         },
//       ],
//     },
//     {
//       id: "HS-1003",
//       payable_amount: 9999,
//       order_status: "Processing",
//       items: [
//         {
//           variant: {
//             image:
//               "https://images.pexels.com/photos/247287/pexels-photo-247287.jpeg",
//             product: {
//               name: "Soft Silk Saree – Elegant Peach",
//             },
//           },
//         },
//       ],
//     },
//   ]);

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-sm border">
//       <h2 className="text-xl font-semibold mb-6">Purchase History</h2>

//       {orders.length === 0 && (
//         <p className="text-gray-500 text-sm">No orders found</p>
//       )}

//       {/* 📱 MOBILE + TABLET */}
//       <div className="grid grid-cols-1 gap-4 lg:hidden">
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="border rounded-lg p-4 flex gap-3"
//           >
//             <img
//               src={order.items?.[0]?.variant?.image}
//               className="w-20 h-20 rounded object-cover"
//               alt={order.items?.[0]?.variant?.product?.name}
//             />

//             <div className="flex-1">
//               <h3 className="text-sm font-semibold text-orange-600 line-clamp-2">
//                 {order.items?.[0]?.variant?.product?.name}
//               </h3>

//               <div className="text-xs text-gray-500 mt-1">
//                 Order #{order.id}
//               </div>

//               <div className="flex justify-between mt-3 text-sm">
//                 <span>₹{order.payable_amount}</span>
//                 <span className="text-gray-600">{order.order_status}</span>
//               </div>

//               <button
//                 onClick={() =>
//                   router.push(
//                     `/dashboard/purchase-history/order?id=${order.id}`
//                   )
//                 }
//                 className="mt-3 text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded"
//               >
//                 <FaBars className="inline mr-1" />
//                 Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 🖥️ DESKTOP TABLE */}
//       <div className="hidden lg:block">
//         <table className="w-full">
//           <thead className="border-b text-sm text-gray-500">
//             <tr>
//               <th className="py-3 text-left pl-2">Order ID</th>
//               <th className="text-left">Product</th>
//               <th className="text-left">Amount</th>
//               <th className="text-left">Status</th>
//               <th className="text-left">Order Details</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="border-b">
//                 <td className="py-4 pl-2">{order.id}</td>
//                 <td className="py-4">
//                   {order.items?.[0]?.variant?.product?.name}
//                 </td>
//                 <td className="py-4">₹{order.payable_amount}</td>
//                 <td className="py-4">{order.order_status}</td>
//                 <td className="py-4">
//                   <button
//                     onClick={() =>
//                       router.push(
//                         `/dashboard/purchase-history/order?id=${order.id}`
//                       )
//                     }
//                     className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center"
//                   >
//                     <FaBars />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/utils/apiInstance";

export default function OrderDetailsPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;

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

        const res = await api.get(`/user-dashboard/orders/?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (res.status === 200 && res.data?.success) {
          setOrders(res.data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  // Loading
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl border">
        <p className="text-sm text-gray-500">Loading orders...</p>
      </div>
    );
  }

  // Empty
  if (!orders.length) {
    return (
      <div className="p-6 bg-white rounded-xl border">
        <p className="text-sm text-gray-500">No orders found</p>
      </div>
    );
  }

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="space-y-6">
      {currentOrders.map((order) => (
        <div
          key={order.id}
          className="p-6 bg-white rounded-xl shadow-sm border space-y-4"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Order #{order.id}
            </h2>
            <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 capitalize">
              {order.status}
            </span>
          </div>

          {/* DATE */}
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.created_at).toDateString()}
          </p>

          {/* AMOUNT SUMMARY */}
          <div className="border rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{order.discount}</span>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>

          {/* ITEMS */}
          <div>
            <h3 className="text-md font-semibold mb-2">Items</h3>

            <div className="space-y-3">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border rounded-lg p-3"
                >
                  <img
                    src={item.product?.images?.[0]?.image_url}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-medium">
                      {item.product?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">
                    ₹{item.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

