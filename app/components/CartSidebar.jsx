

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
//     } catch (err) {
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

//   /* PAYMENT */
//      const handleRazorpayPayment = async () => {
//   if (!isLoggedIn) {
//     toast.error("Please login first");
//     router.push("/account/login");
//     return;
//   }

//   if (!selectedAddress) {
//     toast.error("Select delivery address");
//     return;
//   }

//   const loaded = await loadRazorpayScript();
//   if (!loaded) {
//     toast.error("Razorpay SDK failed to load");
//     return;
//   }

//   const token = localStorage.getItem("token");

//   try {
//     /* 1️⃣ CREATE RAZORPAY ORDER (via backend) */
//     const createOrderRes = await fetch(
//       "http://192.168.1.3:8000/api/user-dashboard/cart/create-order",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           amount: Number(finalTotal),
//         }),
//       }
//     );

//     const createOrderJson = await createOrderRes.json();

//     if (!createOrderRes.ok || !createOrderJson?.order?.id) {
//       throw new Error(
//         createOrderJson?.message || "Failed to create Razorpay order"
//       );
//     }

//     const razorpayOrderId = createOrderJson.order.id;
//     const razorpayAmount = createOrderJson.order.amount;

//     /* 2️⃣ OPEN RAZORPAY */
//     const options = {
//       key: "rzp_test_RywTw9KUnaPKxd",
//       amount: razorpayAmount,
//       currency: "INR",
//       name: "Sridevi Herbal & Co",
//       description: "Order Payment",
//       order_id: razorpayOrderId,

//       handler: async (response) => {
//         try {
//           /* 3️⃣ VERIFY PAYMENT */
//           const verifyRes = await fetch(
//             "http://192.168.1.3:8000/api/user-dashboard/cart/verify-payment",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               }),
//             }
//           );

//           const verifyJson = await verifyRes.json();

//           if (!verifyRes.ok || verifyJson.success === false) {
//             throw new Error(
//               verifyJson.message || "Payment verification failed"
//             );
//           }

//           toast.success("Payment successful 🎉");
//           clearCart();
//           onClose();
//           router.push("/");
//         } catch (err) {
//           toast.error(err.message || "Payment verification failed");
//         }
//       },

//       modal: {
//         ondismiss: () => toast.error("Payment cancelled"),
//       },

//       theme: { color: "#7f1d1d" },
//     };

//     new window.Razorpay(options).open();
//   } catch (err) {
//     toast.error(err.message || "Payment failed");
//   }
// };

   
//   return (
//     <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-5 overflow-y-auto transition-all ${open ? "translate-x-0" : "translate-x-full"}`}>
//         <div className="flex justify-between border-b pb-3">
//           <h2 className="text-xl font-semibold">Your Cart ({cartItems.length})</h2>
//           <button onClick={onClose}><FiX size={22} /></button>
//         </div>

//         {/* CART */}
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

  /* COUPON */
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const finalTotal = Number(total);

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

    setLoadingAddresses(true);
    try {
      const res = await fetch(
        "http://192.168.1.3:8000/api/user-dashboard/cart/get-address",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      setAddresses(json.data || []);
      setSelectedAddress(
        json.data?.find((a) => a.is_default === 1) || json.data?.[0] || null
      );
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (open && isLoggedIn) fetchAddresses();
  }, [open, isLoggedIn]);

  /* APPLY COUPON */
  const handleApplyCoupon = () => {
    if (!coupon.trim()) return toast.error("Enter coupon code");
    setAppliedCoupon(coupon.trim());
    toast.success("Coupon applied");
  };

  /* PAYMENT (UNCHANGED) */
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
    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const createOrderRes = await fetch(
        "http://192.168.1.3:8000/api/user-dashboard/cart/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Number(finalTotal),
          }),
        }
      );

      const createOrderJson = await createOrderRes.json();
      if (!createOrderRes.ok || !createOrderJson?.order?.id) {
        throw new Error("Failed to create Razorpay order");
      }

      const options = {
        key: "rzp_test_RywTw9KUnaPKxd",
        amount: createOrderJson.order.amount,
        currency: "INR",
        name: "Sridevi Herbal & Co",
        description: "Order Payment",
        order_id: createOrderJson.order.id,

        handler: async (response) => {
          try {
            const verifyRes = await fetch(
              "http://192.168.1.3:8000/api/user-dashboard/cart/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(response),
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
          } catch {
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => toast.error("Payment cancelled"),
        },

        theme: { color: "#7f1d1d" },
      };

      new window.Razorpay(options).open();
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-5 overflow-y-auto transition-all ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between border-b pb-3">
          <h2 className="text-xl font-semibold">Your Cart ({cartItems.length})</h2>
          <button onClick={onClose}><FiX size={22} /></button>
        </div>

        {/* ADDRESS */}
        <div className="mt-4 border p-3 rounded">
          <div className="flex justify-between">
            <h3 className="font-semibold">Delivery Address</h3>
            <button onClick={() => setShowAddAddress(true)} className="text-red-700 flex items-center gap-1">
              <FiPlus /> Add
            </button>
          </div>

          {selectedAddress && (
            <div className="mt-2 text-sm">
              <p>{selectedAddress.address}</p>
              <p>{selectedAddress.city}, {selectedAddress.state}</p>
              <button
                className="text-red-700 mt-1 flex items-center gap-1"
                onClick={() => {
                  setEditAddress(selectedAddress);
                  setShowAddAddress(true);
                }}
              >
                <FiEdit /> Edit
              </button>
            </div>
          )}
        </div>

        {/* COUPON */}
        <div className="mt-4">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="border w-full p-2 rounded"
          />
          <button
            onClick={handleApplyCoupon}
            className="w-full mt-2 border border-red-800 text-red-800 py-2 rounded"
          >
            Apply Coupon
          </button>
          {appliedCoupon && (
            <p className="text-green-600 text-sm mt-1">
              Applied: {appliedCoupon}
            </p>
          )}
        </div>

        {/* TOTAL */}
        <div className="mt-6">
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


