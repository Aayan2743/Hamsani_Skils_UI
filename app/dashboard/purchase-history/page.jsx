


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
import api from "@/app/utils/apiInstance";

export default function OrderDetailsPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const res = await api.get(`/user-dashboard/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        console.log("🟢 API RESPONSE:", res.data);

        if (res.status === 200 && res.data?.success) {
          const apiData = res.data.data;

          // 🔥 FIX: force array
          const ordersArray = Array.isArray(apiData)
            ? apiData
            : [apiData];

          console.log("🟢 Orders normalized:", ordersArray);
          setOrders(ordersArray);
        }
      } catch (error) {
        console.error("❌ Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl border">
        <p className="text-sm text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="p-6 bg-white rounded-xl border">
        <p className="text-sm text-gray-500">No orders found</p>
      </div>
    );
  }

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
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Order #{order.id}
            </h2>
            <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 capitalize">
              {order.status}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Placed on {new Date(order.created_at).toDateString()}
          </p>

          <div className="border rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{order.discount}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>

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

      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}


