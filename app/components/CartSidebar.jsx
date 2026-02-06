
// "use client";
// import React, { useEffect, useState } from "react";
// import { FiX, FiTrash2, FiEdit } from "react-icons/fi";
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

//   /* ================= ADDRESS STATES ================= */
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddresses, setShowAddresses] = useState(false);
//   const [showAddAddress, setShowAddAddress] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);
//   const [loadingAddresses, setLoadingAddresses] = useState(false);

//   const finalTotal = total;

//   /* ================= RAZORPAY SDK ================= */
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) return resolve(true);
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   /* ================= FETCH ADDRESSES ================= */
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
//         json.data.find((a) => a.is_default === 1) || json.data[0] || null
//       );
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoadingAddresses(false);
//     }
//   };

//   useEffect(() => {
//     if (open && isLoggedIn) fetchAddresses();
//   }, [open, isLoggedIn]);

//   /* ================= RAZORPAY PAYMENT ================= */
//   const handleRazorpayPayment = async () => {
//     if (!isLoggedIn) {
//       toast.error("Please login or register to place your order");
//       router.push("/account/login");
//       return;
//     }

//     if (!selectedAddress) {
//       toast.error("Please select delivery address");
//       return;
//     }

//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       toast.error("Razorpay SDK failed to load");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const orderRes = await fetch(
//         "http://192.168.1.3:8000/api/user-dashboard/cart/create-order",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             amount: 500,
//           }),
//         }
//       );
//       console.log("RESP",orderRes)
//       const orderJson = await orderRes.json();

//       const order = orderJson.order;
//       const options = {
//         key: "rzp_test_RywTw9KUnaPKxd",
//         amount:500,
//         currency: "INR",
//         name: "Sridevi Herbal & Co",
//         description: "Order Payment",
//         order_id:order.id,

//         handler: async function (response) {
//           console.log("Razorpay Response:", response);
//           try {
//             const verifyRes = await fetch(
//               "http://192.168.1.3:8000/api/user-dashboard/cart/verify-payment",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
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
//           } catch (err) {
//             toast.error(err.message || "Payment verification failed");
//           }
//         },

//         modal: {
//           ondismiss: () => toast.error("Payment cancelled"),
//         },

//         theme: { color: "#7f1d1d" },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       toast.error(err.message || "Payment failed");
//     }
//   };

//   return (
//     <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] md:w-[450px] lg:w-[480px] max-w-full bg-white p-4 sm:p-6 transition-all overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"}`}>
//         <div className="flex justify-between border-b pb-3">
//           <h2 className="text-xl font-semibold">
//             Your Cart ({cartItems.length})
//           </h2>
//           <button onClick={onClose}><FiX size={22} /></button>
//         </div>
//         {/* CART ITEMS */}
//         <div className="mt-4 space-y-3">
//           {cartItems.map((it) => (
//             <div key={it.variantId} className="flex gap-3 border p-3 rounded">
//               <img src={it.img} className="w-16 h-16 rounded" />
//               <div className="flex-1">
//                 <div className="flex justify-between">
//                   <h3 className="text-sm font-medium">{it.title}</h3>
//                   <button onClick={() => removeFromCart(it.variantId)}>
//                     <FiTrash2 />
//                   </button>
//                 </div>
//                 <div className="flex gap-3 mt-2">
//                   <button onClick={() => it.qty > 1 && updateQty(it.variantId, it.qty - 1)}>−</button>
//                   <span>{it.qty}</span>
//                   <button onClick={() => updateQty(it.variantId, it.qty + 1)}>+</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* DELIVERY ADDRESS */}
//         {isLoggedIn && (
//           <div className="mt-4 border rounded-lg p-3">
//             <h3 className="font-semibold mb-2">Delivery Address</h3>

//             {selectedAddress ? (
//               <div className="border p-3 rounded bg-gray-50">
//                 <p className="text-sm font-semibold">
//                   {selectedAddress.name} • {selectedAddress.phone}
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   {selectedAddress.address}, {selectedAddress.city},{" "}
//                   {selectedAddress.state} - {selectedAddress.pincode}
//                 </p>
//               </div>
//             ) : (
//               <p className="text-xs text-gray-500">No address selected</p>
//             )}

//             <button
//               onClick={() => setShowAddresses((s) => !s)}
//               className="text-blue-600 text-sm mt-2"
//             >
//               {showAddresses ? "Hide Addresses ←" : "View All Addresses →"}
//             </button>
//           </div>
//         )}

//         {showAddresses && (
//           <div className="mt-3 space-y-3">
//             {loadingAddresses && <p className="text-sm">Loading...</p>}

//             {addresses.map((addr) => (
//               <div
//                 key={addr.id}
//                 onClick={() => setSelectedAddress(addr)}
//                 className={`border p-3 rounded cursor-pointer ${
//                   selectedAddress?.id === addr.id
//                     ? "border-green-500 bg-green-50"
//                     : "border-gray-300"
//                 }`}
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="text-sm font-semibold">
//                       {addr.name} • {addr.phone}
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
//                     </p>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setEditAddress(addr);
//                       setShowAddAddress(true);
//                     }}
//                   >
//                     <FiEdit />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               onClick={() => {
//                 setEditAddress(null);
//                 setShowAddAddress(true);
//               }}
//               className="w-full border border-dashed py-3 rounded text-sm"
//             >
//               + Add New Address
//             </button>
//           </div>
//         )}

//         {/* TOTAL */}
//         <div className="mt-6 p-4">
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


// "use client";
// import React, { useEffect, useState } from "react";
// import { FiX, FiTrash2, FiEdit } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { useCart } from "../providers/CartProvider";
// import AddAddessModal from "./AddAddressModal";
// import api from "../utils/api";

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

//   const finalTotal = total;

//   /* RAZORPAY SDK */
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) return resolve(true);
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   /* FETCH ADDRESSES */
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
//         json.data.find((a) => a.is_default === 1) || json.data[0] || null
//       );
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoadingAddresses(false);
//     }
//   };

//   useEffect(() => {
//     if (open && isLoggedIn) fetchAddresses();
//   }, [open, isLoggedIn]);

//   /* PAYMENT */
//   const handleRazorpayPayment = async () => {
//     if (!isLoggedIn) {
//       toast.error("Please login or register to place your order");
//       router.push("/account/login");
//       return;
//     }

//     if (!selectedAddress) {
//       toast.error("Please select delivery address");
//       return;
//     }

//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       toast.error("Razorpay SDK failed to load");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const orderPayload = {
//         amount: finalTotal,
//         items: cartItems,
//         address: selectedAddress,
//         userToken: token,
//       };

//       console.log("ORDER PAYLOAD SENT TO BACKEND:", orderPayload);

//       const orderRes = await fetch(
//         "http://192.168.1.3:8000/api/user-dashboard/cart/create-order",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(orderPayload),
//         }
//       );

//       const orderJson = await orderRes.json();
//       const order = orderJson.order;

//       const options = {
//         key: "rzp_test_RywTw9KUnaPKxd",
//         amount: order.amount,
//         currency: "INR",
//         name: "Sridevi Herbal & Co",
//         description: "Order Payment",
//         order_id: order.id,

//         handler: async function (response) {
//           console.log("RAZORPAY RESPONSE:", response);

//           try {
//             const verifyPayload = {
//               ...response,
//               items: cartItems,
//               address: selectedAddress,
//               amount: finalTotal,
//               userToken: token,
//             };

//             console.log("VERIFY PAYLOAD SENT:", verifyPayload);

//             const verifyRes = await fetch(
//               "http://192.168.1.3:8000/api/user-dashboard/cart/verify-payment",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(verifyPayload),
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
//           } catch (err) {
//             toast.error(err.message || "Payment verification failed");
//           }
//         },

//         modal: {
//           ondismiss: () => toast.error("Payment cancelled"),
//         },

//         theme: { color: "#7f1d1d" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       toast.error(err.message || "Payment failed");
//     }
//   };

//   return (
//     <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] md:w-[450px] lg:w-[480px] max-w-full bg-white p-4 sm:p-6 transition-all overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"}`}>
        
//         <div className="flex justify-between border-b pb-3">
//           <h2 className="text-xl font-semibold">
//             Your Cart ({cartItems.length})
//           </h2>
//           <button onClick={onClose}><FiX size={22} /></button>
//         </div>

//         {/* CART ITEMS */}
//         <div className="mt-4 space-y-3">
//           {cartItems.map((it) => (
//             <div key={it.variantId} className="flex gap-3 border p-3 rounded">
//               <img src={it.img} className="w-16 h-16 rounded" />
//               <div className="flex-1">
//                 <div className="flex justify-between">
//                   <h3 className="text-sm font-medium">{it.title}</h3>
//                   <button onClick={() => removeFromCart(it.variantId)}>
//                     <FiTrash2 />
//                   </button>
//                 </div>
//                 <div className="flex gap-3 mt-2">
//                   <button onClick={() => it.qty > 1 && updateQty(it.variantId, it.qty - 1)}>−</button>
//                   <span>{it.qty}</span>
//                   <button onClick={() => updateQty(it.variantId, it.qty + 1)}>+</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* DELIVERY ADDRESS */}
//         {isLoggedIn && (
//           <div className="mt-4 border rounded-lg p-3">
//             <h3 className="font-semibold mb-2">Delivery Address</h3>

//             {selectedAddress ? (
//               <div className="border p-3 rounded bg-gray-50">
//                 <p className="text-sm font-semibold">
//                   {selectedAddress.name} • {selectedAddress.phone}
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   {selectedAddress.address}, {selectedAddress.city},{" "}
//                   {selectedAddress.state} - {selectedAddress.pincode}
//                 </p>
//               </div>
//             ) : (
//               <p className="text-xs text-gray-500">No address selected</p>
//             )}

//             <button
//               onClick={() => setShowAddresses((s) => !s)}
//               className="text-blue-600 text-sm mt-2"
//             >
//               {showAddresses ? "Hide Addresses ←" : "View All Addresses →"}
//             </button>
//           </div>
//         )}

//         {/* ADDRESS LIST */}
//         {showAddresses && (
//           <div className="mt-3 space-y-3">
//             {loadingAddresses && <p className="text-sm">Loading...</p>}

//             {addresses.map((addr) => (
//               <div
//                 key={addr.id}
//                 onClick={() => setSelectedAddress(addr)}
//                 className={`border p-3 rounded cursor-pointer ${
//                   selectedAddress?.id === addr.id
//                     ? "border-green-500 bg-green-50"
//                     : "border-gray-300"
//                 }`}
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="text-sm font-semibold">
//                       {addr.name} • {addr.phone}
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
//                     </p>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setEditAddress(addr);
//                       setShowAddAddress(true);
//                     }}
//                   >
//                     <FiEdit />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               onClick={() => {
//                 setEditAddress(null);
//                 setShowAddAddress(true);
//               }}
//               className="w-full border border-dashed py-3 rounded text-sm"
//             >
//               + Add New Address
//             </button>
//           </div>
//         )}

//         {/* TOTAL */}
//         <div className="mt-6 p-4">
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
import { FiX, FiTrash2, FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "../providers/CartProvider";
import AddAddessModal from "./AddAddressModal";

export default function CartSidebar({ open, onClose }) {
  const { items, updateQty, removeFromCart, total, clearCart } = useCart();
  const cartItems = Object.values(items || {});
  const router = useRouter();

  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");

  /* ADDRESS STATES */
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  /* COUPON STATE */
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const finalTotal = total;

  /* RAZORPAY SDK */
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* FETCH ADDRESSES */
  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingAddresses(true);
    try {
      const res = await fetch(
        "http://192.168.1.3:8000/api/user-dashboard/cart/get-address",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const json = await res.json();

      setAddresses(json.data || []);
      setSelectedAddress(
        json.data.find((a) => a.is_default === 1) || json.data[0] || null
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (open && isLoggedIn) fetchAddresses();
  }, [open, isLoggedIn]);

  /* APPLY COUPON */
  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      toast.error("Enter a coupon code");
      return;
    }
    setAppliedCoupon(coupon.trim());
    console.log("Coupon Applied:", coupon.trim());
    toast.success("Coupon applied");
  };

  /* PAYMENT */
  const handleRazorpayPayment = async () => {
    if (!isLoggedIn) {
      toast.error("Please login or register to place your order");
      router.push("/account/login");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select delivery address");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const orderPayload = {
        amount: finalTotal,
        items: cartItems,
        address: selectedAddress,
        coupon: appliedCoupon || null,
        userToken: token,
      };

      console.log("ORDER PAYLOAD SENT TO BACKEND:", orderPayload);

      const orderRes = await fetch(
        "http://192.168.1.3:8000/api/user-dashboard/cart/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderPayload),
        }
      );

      const orderJson = await orderRes.json();
      const order = orderJson.order;

      const options = {
        key: "rzp_test_RywTw9KUnaPKxd",
        amount: order.amount,
        currency: "INR",
        name: "Sridevi Herbal & Co",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          console.log("RAZORPAY RESPONSE:", response);

          try {
            const verifyPayload = {
              ...response,
              items: cartItems,
              address: selectedAddress,
              amount: finalTotal,
              coupon: appliedCoupon || null,
              userToken: token,
            };

            console.log("VERIFY PAYLOAD SENT:", verifyPayload);

            const verifyRes = await fetch(
              "http://192.168.1.3:8000/api/user-dashboard/cart/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(verifyPayload),
              }
            );

            const verifyJson = await verifyRes.json();
            if (!verifyRes.ok || verifyJson.success === false) {
              throw new Error("Payment verification failed");
            }

            toast.success("Payment successful 🎉");
            clearCart();
            onClose();
            router.push("/");
          } catch (err) {
            toast.error(err.message || "Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => toast.error("Payment cancelled"),
        },

        theme: { color: "#7f1d1d" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Payment failed");
    }
  };

  return (
    <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] md:w-[450px] lg:w-[480px] max-w-full bg-white p-4 sm:p-6 transition-all overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"}`}>

        <div className="flex justify-between border-b pb-3">
          <h2 className="text-xl font-semibold">
            Your Cart ({cartItems.length})
          </h2>
          <button onClick={onClose}><FiX size={22} /></button>
        </div>

        {/* CART ITEMS */}
        <div className="mt-4 space-y-3">
          {cartItems.map((it) => (
            <div key={it.variantId} className="flex gap-3 border p-3 rounded">
              <img src={it.img} className="w-16 h-16 rounded" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">{it.title}</h3>
                  <button onClick={() => removeFromCart(it.variantId)}>
                    <FiTrash2 />
                  </button>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => it.qty > 1 && updateQty(it.variantId, it.qty - 1)}>−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => updateQty(it.variantId, it.qty + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DELIVERY ADDRESS */}
        {isLoggedIn && (
          <div className="mt-4 border rounded-lg p-3">
            <h3 className="font-semibold mb-2">Delivery Address</h3>

            {selectedAddress ? (
              <div className="border p-3 rounded bg-gray-50">
                <p className="text-sm font-semibold">
                  {selectedAddress.name} • {selectedAddress.phone}
                </p>
                <p className="text-xs text-gray-600">
                  {selectedAddress.address}, {selectedAddress.city},{" "}
                  {selectedAddress.state} - {selectedAddress.pincode}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500">No address selected</p>
            )}

            <button
              onClick={() => setShowAddresses((s) => !s)}
              className="text-blue-600 text-sm mt-2"
            >
              {showAddresses ? "Hide Addresses ←" : "View All Addresses →"}
            </button>
          </div>
        )}

        {/* ADDRESS LIST */}
        {showAddresses && (
          <div className="mt-3 space-y-3">
            {loadingAddresses && <p className="text-sm">Loading...</p>}

            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr)}
                className={`border p-3 rounded cursor-pointer ${
                  selectedAddress?.id === addr.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {addr.name} • {addr.phone}
                    </p>
                    <p className="text-xs text-gray-600">
                      {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditAddress(addr);
                      setShowAddAddress(true);
                    }}
                  >
                    <FiEdit />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setEditAddress(null);
                setShowAddAddress(true);
              }}
              className="w-full border border-dashed py-3 rounded text-sm"
            >
              + Add New Address
            </button>
          </div>
        )}

        {/* COUPON */}
        <div className="mt-4 border rounded-lg p-3">
          <h3 className="font-semibold mb-2">Apply Coupon</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-black text-white px-4 py-2 text-sm rounded"
            >
              Apply
            </button>
          </div>
        </div>

        {/* TOTAL */}
        <div className="mt-6 p-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handleRazorpayPayment}
            className="w-full bg-red-800 py-3 rounded-xl text-xl mt-3 text-white"
          >
            Place My Order
          </button>
        </div>
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
