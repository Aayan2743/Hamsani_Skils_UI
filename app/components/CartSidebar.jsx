
// "use client";
// import React, { useEffect, useState } from "react";
// import { FiX, FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { useCart } from "../providers/CartProvider";
// import AddAddessModal from "./AddAddressModal";

// export default function CartSidebar({ open, onClose }) {
//   const { items, updateQty, removeFromCart, total, clearCart } = useCart();
//   const cartItems = Object.values(items || {});
//   const router = useRouter();

//   const isLoggedIn =
//     typeof window !== "undefined" && localStorage.getItem("token");

//   /* ADDRESS STATES */
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddresses, setShowAddresses] = useState(false);
//   const [showAddAddress, setShowAddAddress] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);
//   const [loadingAddresses, setLoadingAddresses] = useState(false);

//   /* COUPON */
//   const [coupon, setCoupon] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);

//   const finalTotal = Number(total);

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
//   const fetchAddresses = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     setLoadingAddresses(true);
//     try {
//       const res = await fetch(
//         "http://192.168.1.3:8000/api/user-dashboard/cart/get-address",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const json = await res.json();
//       setAddresses(json.data || []);
//       setSelectedAddress(
//         json.data?.find((a) => a.is_default === 1) || json.data?.[0] || null
//       );
//     } catch {
//       toast.error("Failed to load addresses");
//     } finally {
//       setLoadingAddresses(false);
//     }
//   };

//   useEffect(() => {
//     if (open && isLoggedIn) fetchAddresses();
//   }, [open, isLoggedIn]);

//   /* APPLY COUPON */
//   const handleApplyCoupon = () => {
//     if (!coupon.trim()) return toast.error("Enter coupon code");
//     setAppliedCoupon(coupon.trim());
//     toast.success("Coupon applied");
//   };

//   /* PAYMENT (UNCHANGED) */
//   const handleRazorpayPayment = async () => {
//     if (!isLoggedIn) {
//       toast.error("Please login first");
//       router.push("/account/login");
//       return;
//     }

//     if (!selectedAddress) {
//       toast.error("Select delivery address");
//       return;
//     }

//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       toast.error("Razorpay SDK failed to load");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     try {
//       const createOrderRes = await fetch(
//         "http://192.168.1.3:8000/api/user-dashboard/cart/create-order",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             amount: Number(finalTotal),
//           }),
//         }
//       );

//       const createOrderJson = await createOrderRes.json();
//       if (!createOrderRes.ok || !createOrderJson?.order?.id) {
//         throw new Error("Failed to create Razorpay order");
//       }

//       const options = {
//         key: "rzp_test_RywTw9KUnaPKxd",
//         amount: createOrderJson.order.amount,
//         currency: "INR",
//         name: "Sridevi Herbal & Co",
//         description: "Order Payment",
//         order_id: createOrderJson.order.id,

//         handler: async (response) => {
//           try {
//             const verifyRes = await fetch(
//               "http://192.168.1.3:8000/api/user-dashboard/cart/verify-payment",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Accept: "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(response),
//               }
//             );

//             const verifyJson = await verifyRes.json();
//             if (!verifyRes.ok || verifyJson.success === false) {
//               throw new Error("Payment verification failed");
//             }

//             toast.success("Payment successful 🎉");
//             clearCart();
//             onClose();
//             router.push("/");
//           } catch {
//             toast.error("Payment verification failed");
//           }
//         },

//         modal: {
//           ondismiss: () => toast.error("Payment cancelled"),
//         },

//         theme: { color: "#7f1d1d" },
//       };

//       new window.Razorpay(options).open();
//     } catch {
//       toast.error("Payment failed");
//     }
//   };

//   return (
//     <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       <div
//         className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-5 overflow-y-auto transition-all ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between border-b pb-3">
//           <h2 className="text-xl font-semibold">
//             Your Cart ({cartItems.length})
//           </h2>
//           <button onClick={onClose}>
//             <FiX size={22} />
//           </button>
//         </div>

//         {/* CART ITEMS (ADDED) */}
//         <div className="mt-4 space-y-3">
//           {cartItems.length === 0 ? (
//             <p className="text-sm text-gray-500">Your cart is empty</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between border rounded p-2"
//               >
//                 <div className="flex-1">
//                   <p className="font-medium text-sm">{item.name}</p>
//                   <p className="text-xs text-gray-500">
//                     ₹{item.price} × {item.qty}
//                   </p>

//                   <div className="flex items-center gap-2 mt-1">
//                     <button
//                       onClick={() => updateQty(item.id, item.qty - 1)}
//                       className="px-2 border rounded"
//                     >
//                       -
//                     </button>
//                     <span className="text-sm">{item.qty}</span>
//                     <button
//                       onClick={() => updateQty(item.id, item.qty + 1)}
//                       className="px-2 border rounded"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-600 ml-3"
//                 >
//                   <FiTrash2 />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ADDRESS */}
//         <div className="mt-4 border p-3 rounded">
//           <div className="flex justify-between">
//             <h3 className="font-semibold">Delivery Address</h3>
//             <button
//               onClick={() => setShowAddAddress(true)}
//               className="text-red-700 flex items-center gap-1"
//             >
//               <FiPlus /> Add
//             </button>
//           </div>
//           {selectedAddress && (
//             <div className="mt-2 text-sm">
//               <p>{selectedAddress.address}</p>
//               <p>
//                 {selectedAddress.city}, {selectedAddress.state}
//               </p>
//               <button
//                 className="text-red-700 mt-1 flex items-center gap-1"
//                 onClick={() => {
//                   setEditAddress(selectedAddress);
//                   setShowAddAddress(true);
//                 }}
//               >
//                 <FiEdit /> Edit
//               </button>
//             </div>
//           )}
//         </div>

//         {/* COUPON */}
//         <div className="mt-4">
//           <input
//             value={coupon}
//             onChange={(e) => setCoupon(e.target.value)}
//             placeholder="Enter coupon code"
//             className="border w-full p-2 rounded"
//           />
//           <button
//             onClick={handleApplyCoupon}
//             className="w-full mt-2 border border-red-800 text-red-800 py-2 rounded"
//           >
//             Apply Coupon
//           </button>
//           {appliedCoupon && (
//             <p className="text-green-600 text-sm mt-1">
//               Applied: {appliedCoupon}
//             </p>
//           )}
//         </div>

//         {/* TOTAL */}
//         <div className="mt-6">
//           <div className="flex justify-between font-semibold">
//             <span>Total</span>
//             <span>₹{finalTotal.toFixed(2)}</span>
//           </div>

//           <button
//             onClick={handleRazorpayPayment}
//             className="w-full bg-red-800 py-3 rounded-xl text-xl mt-3 text-white"
//           >
//             Place My Order
//           </button>
//         </div>
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
  const { items, updateQty, removeFromCart, total, clearCart } = useCart();
  const cartItems = Object.values(items || {});
  const router = useRouter();

  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");

  /* ADDRESS STATES */
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  /* COUPON */
  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState(null);
  const finalTotal = couponData
    ? Math.max(0, total - couponData.discount)
    : Number(total);
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
    const res = await api.get(
      "/user-dashboard/cart/get-address",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res?.data?.data || [];

    setAddresses(data);
    setSelectedAddress(
      data.find((a) => a.is_default === 1) || data[0] || null
    );
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
      {
        code: coupon.trim(),
        amount: Number(total),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = res.data;

    if (!json?.success) {
      throw new Error("Invalid coupon");
    }

    setCouponData(json);
    toast.success(`Coupon ${json.coupon_code} applied`);
  } catch (error) {
    console.error("Apply coupon error:", error);
    toast.error("Failed to apply coupon",error);
    setCouponData(null);
  }
};


  /* PAYMENT */
  const handleRazorpayPayment = async () => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      router.push("/account/login");
      return;
    }

    if (!selectedAddress) {
      toast.error("Select delivery address");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) return toast.error("Razorpay SDK failed");

    const token = localStorage.getItem("token");

    try {
      const createOrderRes = await fetch(
        "http://192.168.1.3:8000/api/user-dashboard/cart/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: finalTotal }),
        }
      );

      const createOrderJson = await createOrderRes.json();

      const options = {
        key: "rzp_test_RywTw9KUnaPKxd",
        amount: createOrderJson.order.amount,
        currency: "INR",
        name: "Sridevi Herbal & Co",
        order_id: createOrderJson.order.id,

        handler: async (response) => {
          await fetch(
            "http://192.168.1.3:8000/api/user-dashboard/cart/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(response),
            }
          );

          toast.success("Payment successful 🎉");
          clearCart();
          onClose();
          router.push("/");
        },
      };

      new window.Razorpay(options).open();
    } catch {
      toast.error("Payment failed");
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
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3 border p-2 rounded mb-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm">
                ₹{item.price} × {item.qty}
              </p>

              <div className="flex gap-2 mt-1">
                <button onClick={() => updateQty(item.id, item.qty - 1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>
                  +
                </button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)}>
              <FiTrash2 />
            </button>
          </div>
        ))}
        {/* ADDRESS SECTION */}
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

        {/* COUPON */}
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

        {couponData && (
          <p className="text-green-600 text-sm mt-1">
            Discount ₹{couponData.discount}
          </p>
        )}

        {/* TOTAL */}
        <div className="mt-5 font-semibold flex justify-between">
          <span>Total</span>
          <span>₹{finalTotal.toFixed(2)}</span>
        </div>

        <button
          onClick={handleRazorpayPayment}
          className="w-full bg-red-800 text-white py-3 mt-3"
        >
          Place My Order
        </button>
      </div>

      <AddAddessModal
        open={showAddAddress}
        editData={editAddress}
        onClose={() => {
          setShowAddAddress(false);
          setEditAddress(null);
        }}
        onSuccess={fetchAddresses}
      />
    </div>
  );
}
