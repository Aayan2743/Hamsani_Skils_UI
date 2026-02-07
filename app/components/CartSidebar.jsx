
// "use client";
// import React, { useEffect, useState } from "react";
// import { FiX, FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { useCart } from "../providers/CartProvider";
// import AddAddessModal from "./AddAddressModal";
// import api from "../utils/apiInstance";

// export default function CartSidebar({ open, onClose }) {
//   const { items, updateQty, removeFromCart, total, clearCart } = useCart();
//   const cartItems = Object.values(items || {});
//   const router = useRouter();
//   const isLoggedIn =
//     typeof window !== "undefined" && localStorage.getItem("token");

//   /* ADDRESS STATES */
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddAddress, setShowAddAddress] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);
//    const [placingOrder, setPlacingOrder] = useState(false);

//   /* COUPON */
//   const [coupon, setCoupon] = useState("");
//   const [couponData, setCouponData] = useState(null);
//   const finalTotal = couponData
//     ? Math.max(0, total - couponData.discount)
//     : Number(total);
//   /* LOAD RAZORPAY */
//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       if (window.Razorpay) return resolve(true);
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   /* FETCH ADDRESS */
//  const fetchAddresses = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) return;

//   try {
//     const res = await api.get(
//       "/user-dashboard/cart/get-address",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const data = res?.data?.data || [];

//     setAddresses(data);
//     setSelectedAddress(
//       data.find((a) => a.is_default === 1) || data[0] || null
//     );
//   } catch (error) {
//     console.error("Address API error:", error);
//     toast.error("Failed to load addresses");
//   }
// };


//   useEffect(() => {
//     if (open && isLoggedIn) fetchAddresses();
//   }, [open, isLoggedIn]);

//   /* APPLY COUPON */
//   const handleApplyCoupon = async () => {
//   if (!coupon.trim()) return toast.error("Enter coupon code");

//   const token = localStorage.getItem("token");

//   try {
//     const res = await api.post(
//       "/user-dashboard/cart/apply-coupon",
//       {
//         code: coupon.trim(),
//         amount: Number(total),
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const json = res.data;

//     if (!json?.success) {
//       throw new Error("Invalid coupon");
//     }

//     setCouponData(json);
//     toast.success(`Coupon ${json.coupon_code} applied`);
//   } catch (error) {
//     console.error("Apply coupon error:", error);
//     toast.error("Failed to apply coupon",error);
//     setCouponData(null);
//   }
// };


//   /* PAYMENT */
//   // const handleRazorpayPayment = async () => {
//   //   if (!isLoggedIn) {
//   //     toast.error("Please login first");
//   //     router.push("/account/login");
//   //     return;
//   //   }

//   //   if (!selectedAddress) {
//   //     toast.error("Select delivery address");
//   //     return;
//   //   }

//   //   const loaded = await loadRazorpayScript();
//   //   if (!loaded) return toast.error("Razorpay SDK failed");

//   //   const token = localStorage.getItem("token");

//   //   try {
//   //     const createOrderRes = await fetch(
//   //       "http://192.168.1.3:8000/api/user-dashboard/cart/create-order",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //         body: JSON.stringify({ amount: finalTotal }),
//   //       }
//   //     );

//   //     const createOrderJson = await createOrderRes.json();

//   //     const options = {
//   //       key: "rzp_test_RywTw9KUnaPKxd",
//   //       amount: createOrderJson.order.amount,
//   //       currency: "INR",
//   //       name: "Hamsani Silks",
//   //       order_id: createOrderJson.order.id,

//   //       handler: async (response) => {
//   //         await fetch(
//   //           "http://192.168.1.3:8000/api/user-dashboard/cart/verify-payment",
//   //           {
//   //             method: "POST",
//   //             headers: {
//   //               "Content-Type": "application/json",
//   //               Authorization: `Bearer ${token}`,
//   //             },
//   //             body: JSON.stringify(response),
//   //           }
//   //         );

//   //         toast.success("Payment successful 🎉");
//   //         clearCart();
//   //         onClose();
//   //         router.push("/");
//   //       },
//   //     };

//   //     new window.Razorpay(options).open();
//   //   } catch {
//   //     toast.error("Payment failed");
//   //   }
//   // };


//     const handleRazorpayPayment = async () => {
//   if (!isLoggedIn) {
//     toast.error("Please login first");
//      onClose();
//     router.push("/account/login");
//     return;
//   }

//   if (!selectedAddress) {
//     toast.error("Select delivery address");
//     return;
//   }

//   setPlacingOrder(true); // <-- start loader

//   const loaded = await loadRazorpayScript();
//   if (!loaded) {
//     toast.error("Razorpay SDK failed");
//     setPlacingOrder(false); // stop loader
//     return;
//   }

//   const token = localStorage.getItem("token");

//   try {
//     const createOrderRes = await api.post(
//       "/user-dashboard/cart/create-order",
//       { amount: finalTotal },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const order = createOrderRes.data.order;

//     const options = {
//       key: "rzp_test_RywTw9KUnaPKxd",
//       amount: order.amount,
//       currency: "INR",
//       name: "Hamsani Silks",
//       order_id: order.id,

//       handler: async (response) => {
//         try {
//           await api.post("/user-dashboard/cart/verify-payment", response, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           toast.success("Payment successful 🎉");
//           clearCart();
//           onClose();
//           router.push("/");
//         } catch (verifyError) {
//           console.error("Payment verification failed:", verifyError);
//           toast.error("Payment verification failed");
//         } finally {
//           setPlacingOrder(false); // stop loader
//         }
//       },
//     };

//     new window.Razorpay(options).open();
//   } catch (error) {
//     console.error("Payment failed:", error);
//     toast.error("Payment failed");
//     setPlacingOrder(false); // stop loader
//   }
// };


//   return (
//     <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-5 overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-3">
//           Your Cart ({cartItems.length})
//         </h2>
//         {/* CART ITEMS */}
//         {cartItems.map((item,i) => (
//           <div key={i} className="flex gap-3 border p-2 rounded mb-2">
//             <img
//               src={item.img}
//               alt={item.name}
//               className="w-16 h-16 object-cover rounded"
//             />

//             <div className="flex-1">
//               <p className="font-medium">{item.name}</p>
//               <p className="text-sm">
//                 ₹{item.price} × {item.qty}
//               </p>

//               <div className="flex gap-2 mt-1">
//                 <button onClick={() => updateQty(item.id, item.qty - 1)}>
//                   -
//                 </button>
//                 <span>{item.qty}</span>
//                 <button onClick={() => updateQty(item.id, item.qty + 1)}>
//                   +
//                 </button>
//               </div>
//             </div>
//             <button onClick={() => removeFromCart(item.id)}>
//               <FiTrash2 />
//             </button>
//           </div>
//         ))}
//         {/* ADDRESS SECTION */}
//             {cartItems.length > 0 ? (
//   <div className="mt-5 border rounded p-3">
//     <div className="flex justify-between items-center">
//       <h3 className="font-semibold">Delivery Address</h3>
//       <button
//         onClick={() => {
//           setEditAddress(null);
//           setShowAddAddress(true);
//         }}
//         className="text-red-700 flex items-center gap-1 text-sm"
//       >
//         <FiPlus /> Add
//       </button>
//     </div>

//     {addresses.length === 0 ? (
//       <p className="text-sm text-gray-500 mt-2">
//         No address found. Please add one.
//       </p>
//     ) : (
//       <div className="mt-3 space-y-2">
//         {addresses.map((addr) => (
//           <label
//             key={addr.id}
//             className={`block border rounded p-2 cursor-pointer ${
//               selectedAddress?.id === addr.id
//                 ? "border-red-700 bg-red-50"
//                 : ""
//             }`}
//           >
//             <div className="flex gap-2">
//               <input
//                 type="radio"
//                 checked={selectedAddress?.id === addr.id}
//                 onChange={() => setSelectedAddress(addr)}
//               />

//               <div className="flex-1 text-sm">
//                 <p className="font-medium">{addr.name}</p>
//                 <p>{addr.address}</p>
//                 <p>
//                   {addr.city}, {addr.state} - {addr.pincode}
//                 </p>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setEditAddress(addr);
//                     setShowAddAddress(true);
//                   }}
//                   className="text-red-700 flex items-center gap-1 mt-1 text-xs"
//                 >
//                   <FiEdit /> Edit
//                 </button>
//               </div>
//             </div>
//           </label>
//         ))}
//       </div>
//     )}
//   </div>
// ) : (
//   <p className="mt-5 text-center text-gray-500">
//     Cart is empty. Please add products to continue.
//   </p>
// )}


//         {/* COUPON */}
//         {cartItems.length > 0 && (
//   <>
//     <input
//       value={coupon}
//       onChange={(e) => setCoupon(e.target.value)}
//       placeholder="Enter coupon"
//       className="border w-full p-2 mt-4"
//     />
//     <button
//       onClick={handleApplyCoupon}
//       className="w-full border mt-2 py-2"
//     >
//       Apply Coupon
//     </button>
//   </>
// )}


//         {couponData && (
//           <p className="text-green-600 text-sm mt-1">
//             Discount ₹{couponData.discount}
//           </p>
//         )}

//         {/* TOTAL */}
//         <div className="mt-5 font-semibold flex justify-between">
//           <span>Total</span>
//           <span>₹{finalTotal.toFixed(2)}</span>
//         </div>

//         {cartItems.length>0&&<button
//           onClick={handleRazorpayPayment}
//           className="w-full bg-red-800 text-white py-3 mt-3"
//         >
//           Place My Order
//         </button>}
//       </div>

//       <AddAddessModal
//         open={showAddAddress}
//         editData={editAddress}
//         onClose={() => {
//           setShowAddAddress(false);
//           setEditAddress(null);
//         }}
//         onSuccess={fetchAddresses}
//       />
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { FiX, FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "../providers/CartProvider";
import AddAddessModal from "./AddAddressModal";
import api from "../utils/apiInstance";

export default function CartSidebar({ open, onClose }) {
  const { items, updateQty, removeFromCart, clearCart } = useCart();
  const cartItems = Object.values(items || {});
  const router = useRouter();
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");

  /* ADDRESS STATES */
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  /* COUPON STATES */
  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState(null);

  /* ORDER LOADER */
  const [placingOrder, setPlacingOrder] = useState(false);

  /* TOTAL CALCULATION */
  const total = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.qty) || 0),
    0
  );

  const discount = Number(couponData?.discount) || 0;
  const finalTotal = Math.max(0, total - discount);

  /* LOAD RAZORPAY */
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  /* FETCH ADDRESS */
  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/user-dashboard/cart/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.data || [];
      setAddresses(data);
      setSelectedAddress(data.find((a) => a.is_default === 1) || data[0] || null);
    } catch (error) {
      console.error("Address API error:", error);
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    if (open && isLoggedIn) fetchAddresses();
  }, [open, isLoggedIn]);

  /* APPLY COUPON */
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return toast.error("Enter coupon code");
    const token = localStorage.getItem("token");

    try {
      const res = await api.post(
        "/user-dashboard/cart/apply-coupon",
        { code: coupon.trim(), amount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const json = res.data;
      if (!json?.success) throw new Error("Invalid coupon");

      setCouponData(json);
      toast.success(`Coupon ${json.coupon_code} applied`);
    } catch (error) {
      console.error("Apply coupon error:", error);
      toast.error("Failed to apply coupon");
      setCouponData(null);
    }
  };

  /* PLACE ORDER / RAZORPAY */
  const handleRazorpayPayment = async () => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      onClose();
      router.push("/account/login");
      return;
    }

    if (!selectedAddress) {
      toast.error("Select delivery address");
      return;
    }

    setPlacingOrder(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay SDK failed");
      setPlacingOrder(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const createOrderRes = await api.post(
        "/user-dashboard/cart/create-order",
        { amount: finalTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = createOrderRes.data.order;

      const options = {
        key: "rzp_test_RywTw9KUnaPKxd",
        amount: order.amount,
        currency: "INR",
        name: "Hamsani Silks",
        order_id: order.id,
        handler: async (response) => {
          try {
            await api.post("/user-dashboard/cart/verify-payment", response, {
              headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Payment successful 🎉");
            clearCart();
            onClose();
            router.push("/");
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            toast.error("Payment verification failed");
          } finally {
            setPlacingOrder(false);
          }
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed");
      setPlacingOrder(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-5 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3">
          Your Cart ({cartItems.length})
        </h2>

        {/* CART ITEMS */}
        {cartItems.map((item, i) => (
          <div key={i} className="flex gap-3 border p-2 rounded mb-2">
            <img
              src={item.img || "/placeholder.png"}
              alt={item.name || "Product"}
              className="w-16 h-16 object-cover rounded"
            />

            <div className="flex-1">
              <p className="font-medium">{item.name || "Product"}</p>
              <p className="text-sm">
                ₹{item.price || 0} × {item.qty || 1}
              </p>

              <div className="flex gap-2 mt-1">
                <button onClick={() => updateQty(item.id, (item.qty || 1) - 1)}>
                  -
                </button>
                <span>{item.qty || 1}</span>
                <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)}>
                  +
                </button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)}>
              <FiTrash2 />
            </button>
          </div>
        ))}

        {/* ADDRESS */}
        {cartItems.length > 0 ? (
          <div className="mt-5 border rounded p-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Delivery Address</h3>
              <button
                onClick={() => {
                  setEditAddress(null);
                  setShowAddAddress(true);
                }}
                className="text-red-700 flex items-center gap-1 text-sm"
              >
                <FiPlus /> Add
              </button>
            </div>

            {addresses.length === 0 ? (
              <p className="text-sm text-gray-500 mt-2">
                No address found. Please add one.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block border rounded p-2 cursor-pointer ${
                      selectedAddress?.id === addr.id
                        ? "border-red-700 bg-red-50"
                        : ""
                    }`}
                  >
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        checked={selectedAddress?.id === addr.id}
                        onChange={() => setSelectedAddress(addr)}
                      />
                      <div className="flex-1 text-sm">
                        <p className="font-medium">{addr.name}</p>
                        <p>{addr.address}</p>
                        <p>
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setEditAddress(addr);
                            setShowAddAddress(true);
                          }}
                          className="text-red-700 flex items-center gap-1 mt-1 text-xs"
                        >
                          <FiEdit /> Edit
                        </button>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-5 text-center text-gray-500">
            Cart is empty. Please add products to continue.
          </p>
        )}

        {/* COUPON */}
        {cartItems.length > 0 && (
          <>
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon"
              className="border w-full p-2 mt-4"
            />
            <button
              onClick={handleApplyCoupon}
              className="w-full border mt-2 py-2"
            >
              Apply Coupon
            </button>
          </>
        )}

        {couponData && (
          <p className="text-green-600 text-sm mt-1">
            Discount ₹{discount}
          </p>
        )}

        {/* TOTAL */}
        <div className="mt-5 font-semibold flex justify-between">
          <span>Total</span>
          <span>₹{finalTotal.toFixed(2)}</span>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={handleRazorpayPayment}
            className="w-full bg-red-800 text-white py-3 mt-3 flex justify-center items-center gap-2"
            disabled={placingOrder}
          >
            {placingOrder ? (
              <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Place My Order"
            )}
          </button>
        )}
      </div>

      {/* ADD ADDRESS MODAL */}
      <AddAddessModal
        open={showAddAddress}
        editData={editAddress}
        onClose={() => {
          setShowAddAddress(false);
          setEditAddress(null);
        }}
        onSuccess={fetchAddresses}
      />

      {/* LOADER CSS */}
      <style jsx global>{`
        .loader {
          border-width: 2px;
          border-style: solid;
          border-color: white transparent white transparent;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
