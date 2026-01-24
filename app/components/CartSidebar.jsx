
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { FiX, FiTrash2 } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import { useCart } from "../providers/CartProvider";
// import { useAuth } from "./context/AuthProvider";
// import { AuthAPI } from "../api/AuthAPI"; // adjust if needed

// export default function CartSidebar({ open, onClose }) {
//   const router = useRouter();
//   const {
//     items,
//     setItems,
//     clearCart,
//     updateQty,
//     removeFromCart,
//     total
//   } = useCart();


//   const auth = useAuth?.() ?? {};
//   const isAuthenticated = auth?.isAuthenticated ?? auth?.isAuth ?? Boolean(auth?.user);

//   const [dealProducts, setDealProducts] = useState([]);
//   const [loadingDeals, setLoadingDeals] = useState(false);

//   const [finalTotal, setFinalTotal] = useState(total);

//   const cartItems = Object.values(items || {});

//   // Coupons state
//   const [couponInput, setCouponInput] = useState("");
//   const [showCoupons, setShowCoupons] = useState(false);
//   const [coupons, setCoupons] = useState([]); // fetched coupons
//   const [loadingCoupons, setLoadingCoupons] = useState(false);
//   const [couponsError, setCouponsError] = useState("");
//   const [fetchedSinceLogin, setFetchedSinceLogin] = useState(false); // fetch once after login
//   // map couponIdOrCode -> true
//   const menuRef = useRef(null);


//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [payableAmount, setPayableAmount] = useState(null);
//   const [applied, setApplied] = useState({});
//   const appliedCouponCode = Object.keys(applied)[0] || null;
//   const [addresses, setAddresses] = useState([]);
//   const [showAddresses, setShowAddresses] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddAddressForm, setShowAddAddressForm] = useState(false);
//   const [addressForm, setAddressForm] = useState({
//     address: "",
//     pincode: "",
//     city: "",
//     phone: "",
//     state: "",
//     country: "India",
//     is_default: false,
//   });

//   useEffect(() => {
//     if (addresses.length > 0 && !selectedAddress) {
//       const def = addresses.find(a => a.is_default);
//       setSelectedAddress(def || addresses[0]);
//     }
//   }, [addresses]);


//   useEffect(() => {
//     setFinalTotal(Math.max(0, total - discountAmount));
//   }, [total, discountAmount]);


//   useEffect(() => {
//     async function loadDeals() {
//       try {
//         setLoadingDeals(true);

//         const res = await AuthAPI.getproducts({
//           page: 1,
//           limit: 10,
//           sort: "latest",
//         });

//         const apiProducts = res?.data?.data || [];

//         const formatted = apiProducts.map((p) => ({
//           id: p.id,
//           title: p.name,
//           price: Number(p.variant?.price || 0),
//           img: p.image,
//         }));

//         setDealProducts(formatted);
//       } catch (err) {
//         console.error("Failed to load steal deals", err);
//         setDealProducts([]);
//       } finally {
//         setLoadingDeals(false);
//       }
//     }

//     loadDeals();
//   }, []);

//   // If user becomes authenticated, fetch coupons once automatically.
//   useEffect(() => {
//     if (!isAuthenticated) {
//       // Clear coupons when logged out
//       setCoupons([]);
//       setFetchedSinceLogin(false);
//       setCouponsError("");
//       return;
//     }
//     // if authenticated and not fetched yet, fetch
//     if (isAuthenticated && !fetchedSinceLogin) {
//       (async () => {
//         setLoadingCoupons(true);
//         setCouponsError("");
//         try {
//           const resp = await AuthAPI.getcoupons();
//           const data = resp?.data?.data ?? resp?.data ?? resp;
//           const list = Array.isArray(data) ? data : data?.coupons ?? [];
//           setCoupons(list);
//         } catch (err) {
//           console.error("Failed to fetch coupons", err);
//           setCouponsError(err?.response?.data?.message || err?.message || "Failed to fetch coupons");
//         } finally {
//           setLoadingCoupons(false);
//           setFetchedSinceLogin(true);
//         }
//       })();
//     }

//   }, [isAuthenticated]);


//   const saveGuestCart = (cart) => {
//     const payload = Object.values(cart).map((i) => ({
//       product_variant_id: i.variantId || i.id,
//       qty: i.qty,
//     }));
//     localStorage.setItem("cart_items", JSON.stringify(payload));
//   };




//   async function handleCartPostalChange(value) {
//     setAddressForm((prev) => ({ ...prev, pincode: value }));

//     if (value.length !== 6) return;

//     try {
//       const res = await fetch(
//         `https://api.postalpincode.in/pincode/${value}`
//       );
//       const data = await res.json();

//       if (
//         Array.isArray(data) &&
//         data[0]?.Status === "Success" &&
//         data[0]?.PostOffice?.length
//       ) {
//         const po = data[0].PostOffice[0];
//         setAddressForm((prev) => ({
//           ...prev,
//           city: po.District,
//           state: po.State,
//         }));
//       }
//     } catch {
//       // silent fail
//     }
//   }

//   useEffect(() => {
//     if (!isAuthenticated) return;

//     async function syncAfterLogin() {
//       try {
//         // 1️⃣ Read guest cart
//         const guestRaw = localStorage.getItem("guest_cart");
//         const guestItems = guestRaw ? JSON.parse(guestRaw) : {};

//         const payload = Object.values(guestItems).map((i) => ({
//           product_variant_id: i.variantId,
//           qty: i.qty,
//         }));


//         if (payload.length > 0) {
//           const syncRes = await AuthAPI.withlogincart(payload);
//           console.log("680", payload)

//           if (!(syncRes?.status === 200 || syncRes?.status === 201)) {
//             console.error("Guest cart sync failed");
//             return;
//           }
//         }

//         // 3️⃣ Fetch server cart
//         const cartRes = await AuthAPI.afterlogincart();
//         const apiItems = cartRes?.data?.data;

//         if (!Array.isArray(apiItems)) {
//           console.error("Invalid server cart");
//           return;
//         }

//         // 4️⃣ Map server cart → CartProvider format
//         const mapped = {};
//         apiItems.forEach((i) => {
//           mapped[i.variant_id] = {
//             variantId: i.variant_id,
//             cartItemId: i.cart_item_id,
//             productId: i.product_id,
//             title: i.product_name,
//             price: Number(i.price),
//             img: i.product_image,
//             qty: i.qty,
//           };
//         });

//         // 5️⃣ Update cart context
//         setItems(mapped);

//         // 6️⃣ ✅ CLEAR guest cart ONLY AFTER SUCCESS
//         localStorage.removeItem("guest_cart");
//         console.log("✅ Guest cart removed after successful login sync");
//       } catch (err) {
//         console.error("❌ Cart sync failed", err);
//         // ❗ DO NOTHING — guest_cart remains safe
//       }
//     }

//     syncAfterLogin();
//   }, [isAuthenticated]);



//   async function handleViewAllAddresses() {
//     if (!isAuthenticated) {
//       router.push("/account/login");
//       return;
//     }

//     setShowAddresses((s) => !s);

//     if (addresses.length === 0) {
//       const res = await AuthAPI.getaddress();
//       const list = res?.data?.data || [];

//       setAddresses(list);

//       // ⭐ auto-select newly added default address
//       const def = list.find(a => a.is_default);
//       setSelectedAddress(def || list[0]);

//     }
//   }



//   // const increaseQty = async (item) => {
//   //   updateQty(item.variantId, item.qty + 1);

//   //   if (isAuthenticated) {
//   //     await AuthAPI.updatecart(item.cartItemId, {
//   //       qty: item.qty + 1,
//   //     });
//   //   }
//   // };


// const increaseQty = async (item) => {
//   const stock = Number(item.stock);

//   // ⛔ Block ONLY if stock exists and limit reached
//   if (Number.isFinite(stock) && item.qty >= stock) {
//     return;
//   }

//   const newQty = item.qty + 1;
//   updateQty(item.variantId, newQty);

//   if (isAuthenticated) {
//     await AuthAPI.updatecart(item.cartItemId, {
//       qty: newQty,
//     });
//   }
// };



//   const decreaseQty = async (item) => {
//     if (item.qty <= 1) return;

//     updateQty(item.variantId, item.qty - 1);

//     if (isAuthenticated) {
//       await AuthAPI.updatecart(item.cartItemId, {
//         qty: item.qty - 1,
//       });
//     }
//   };

//   const removeItem = async (item) => {
//     removeFromCart(item.variantId);

//     if (isAuthenticated) {
//       await AuthAPI.deletecart(item.cartItemId);
//     }
//   };

//   async function handleViewAllOffers(e) {
//     e?.preventDefault();
//     if (!isAuthenticated) {
//       router.push(`/account/login`);
//       return;
//     }
//     setShowCoupons((s) => !s);
//     // If not fetched (rare if automatic fetch failed earlier), fetch now
//     if (isAuthenticated && !fetchedSinceLogin) {
//       setLoadingCoupons(true);
//       setCouponsError("");
//       try {
//         const resp = await AuthAPI.getcoupons();
//         const data = resp?.data?.data ?? resp?.data ?? resp;
//         const list = Array.isArray(data) ? data : data?.coupons ?? [];
//         setCoupons(list);
//       } catch (err) {
//         console.error("Failed to fetch coupons", err);
//         setCouponsError(err?.response?.data?.message || err?.message || "Failed to fetch coupons");
//       } finally {
//         setLoadingCoupons(false);
//         setFetchedSinceLogin(true);
//       }
//     }
//   }

//   async function toggleApplyCoupon(e, coupon) {
//     e.stopPropagation();

//     if (!isAuthenticated) {
//       router.push("/account/login");
//       return;
//     }

//     const code = coupon.code || coupon.id;

//     // 🔴 REMOVE COUPON
//     if (applied[code]) {
//       setApplied({});
//       setDiscountAmount(0);
//       setPayableAmount(null);
//       return;
//     }

//     try {
//       const res = await AuthAPI.couponapply({
//         coupon_code: code,
//       });

//       const summary = res?.data?.data?.summary;

//       setDiscountAmount(Number(summary?.discount_amount || 0));
//       setPayableAmount(Number(summary?.payable_amount));
//       setApplied({ [code]: true });
//     } catch (err) {
//       setDiscountAmount(0);
//       setPayableAmount(null);
//     }
//   }


//   async function applyByCode() {
//     if (!couponInput) return;

//     if (!isAuthenticated) {
//       router.push(`/account/login`);
//       return;
//     }

//     try {
//       setCouponsError("");

//       const res = await AuthAPI.couponapply({
//         coupon_code: couponInput,
//       });

//       const data = res?.data?.data || res?.data;

//       // 🔹 CASE 1: backend gives final total directly
//       if (data?.final_total !== undefined) {
//         const discount = total - Number(data.final_total);
//         setDiscountAmount(discount > 0 ? discount : 0);
//       }

//       // 🔹 CASE 2: backend gives discount amount
//       else if (data?.discount_amount !== undefined) {
//         setDiscountAmount(Number(data.discount_amount));
//       }

//       // 🔹 CASE 3: percentage discount
//       else if (data?.discount && data?.discount_type === "percentage") {
//         const percentDiscount = Math.round(
//           (total * Number(data.discount)) / 100
//         );
//         setDiscountAmount(percentDiscount);
//       }

//       setApplied({ [couponInput]: true });
//       setCouponInput("");
//     } catch (err) {
//       setDiscountAmount(0);
//       setFinalTotal(total);
//       setCouponsError(
//         err?.response?.data?.message || "Invalid coupon code"
//       );
//     }
//   }
//   useEffect(() => {
//   cartItems.forEach((item) => {
//     if (
//       item.stock !== undefined &&
//       Number(item.qty) > Number(item.stock)
//     ) {
//       updateQty(item.variantId, Number(item.stock));
//     }
//   });
// }, [cartItems]);


//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   async function handlePlaceOrder() {
//     async function handlePlaceOrder() {

//       if (!isAuthenticated) {
//         router.push("/account/login");
//         return;
//       }

//       // 2️⃣ No address selected → stop
//       if (!selectedAddress) {
//         alert("Please select or add an address");
//         return;
//       }

//       try {
//         // 3️⃣ Call CREATE ORDER API
//         const res = await AuthAPI.createorder({
//           coupon_code: appliedCouponCode, // can be null
//           address_id: selectedAddress.id,
//         });

//         const orderData = res?.data?.data;

//         if (!orderData?.razorpay_order_id) {
//           alert("Failed to create order");
//           return;
//         }

//         // 4️⃣ Open Razorpay
//         const options = {
//           key: orderData.key,
//           // from backend
//           amount: orderData.amount, // in paise
//           currency: "INR",
//           name: "Your Store",
//           description: "Order Payment",
//           order_id: orderData.razorpay_order_id,

//           handler: async function (response) {
//             // 5️⃣ VERIFY PAYMENT
//             await AuthAPI.verifypayment({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             // 6️⃣ SUCCESS

//             // alert("Payment successful!");


//             router.push("/dashboard/purchase-history");

//             onClose?.();
//             clearCart?.();
//             localStorage.removeItem("guest_cart");
//             localStorage.removeItem("cart_items");


//           },

//           prefill: {
//             contact: selectedAddress.phone,
//           },

//           theme: {
//             color: "#22c55e",
//           },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } catch (err) {
//         console.error("Order failed", err);
//         alert("Something went wrong while placing order");
//       }
//       for (const item of cartItems) {
//         if (item.stock !== undefined && item.qty > item.stock) {
//           alert(
//             `${item.title}: Only ${item.stock} items available. Please reduce quantity.`
//           );
//           return;
//         }
//       }
//     }


//     if (!isAuthenticated) {
//       router.push("/account/login");
//       return;
//     }

//     // 2️⃣ No address selected → stop
//     if (!selectedAddress) {
//       alert("Please select or add an address");
//       return;
//     }

//     try {
//       // 3️⃣ Call CREATE ORDER API
//       const res = await AuthAPI.createorder({
//         coupon_code: appliedCouponCode, // can be null
//         address_id: selectedAddress.id,
//       });

//       const orderData = res?.data?.data;

//       if (!orderData?.razorpay_order_id) {
//         alert("Failed to create order");
//         return;
//       }

//       // 4️⃣ Open Razorpay
//       const options = {
//         key: orderData.key,
//         // from backend
//         amount: orderData.amount, // in paise
//         currency: "INR",
//         name: "Your Store",
//         description: "Order Payment",
//         order_id: orderData.razorpay_order_id,

//         handler: async function (response) {
//           // 5️⃣ VERIFY PAYMENT
//           await AuthAPI.verifypayment({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           // 6️⃣ SUCCESS

//           // alert("Payment successful!");


//           router.push("/dashboard/purchase-history");

//           onClose?.();
//           clearCart?.();
//           localStorage.removeItem("guest_cart");
//           localStorage.removeItem("cart_items");


//         },

//         prefill: {
//           contact: selectedAddress.phone,
//         },

//         theme: {
//           color: "#22c55e",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Order failed", err);
//       alert("Something went wrong while placing order");
//     }

//   }



//   function openProduct(e, productId, { close = true } = {}) {
//     e?.stopPropagation();
//     onClose?.();
//     router.push(`/product?id=${productId}`);
//   }

//   // UI
//   return (
//     <div className={`fixed inset-0 z-[9999] text-black transition-all ${open ? "visible" : "invisible"}`}>
//       <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />

//       <div
//         className={`absolute right-0 top-0 h-full w-[380px] cart-sidebar-width bg-white shadow-xl p-4 overflow-y-auto transition-all duration-300 ${open ? "translate-x-0" : "translate-x-full"
//           }`}
//         role="dialog"
//         aria-modal="true"
//       >
//         <div className="flex items-center justify-between pb-3 border-b">
//           <h2 className="text-xl font-semibold">
//             Your Cart <span className="text-sm font-normal text-gray-500">({cartItems.length} items)</span>
//           </h2>
//           <button onClick={onClose} aria-label="Close cart" className="p-1">
//             <FiX size={22} />
//           </button>
//         </div>

//         <div className="bg-yellow-100 text-center text-sm py-2 mt-3 rounded">
//           Ordering first time? Use <b>FREESHIPPING</b> for free delivery
//         </div>

//         <div className="mt-4 space-y-3">
//           {cartItems.length === 0 && <div className="text-sm text-gray-500">Your cart is empty.</div>}

//           {cartItems.map((it) => (
//             <div
//               key={it.variantId}
//               className="flex gap-3 border p-3 rounded-lg items-center"
//             >
//               {/* IMAGE */}
//               <button
//                 onClick={(e) => openProduct(e, it.productId, { close: true })}
//                 className="flex-shrink-0"
//               >
//                 <img
//                   src={it.img || "/sample-product.jpg"}
//                   alt={it.title}
//                   className="w-16 h-16 rounded object-cover"
//                 />
//               </button>

//               {/* INFO */}
//               <div className="flex-1">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3
//                       className="font-medium text-sm cursor-pointer"
//                       onClick={(e) => openProduct(e, it.productId, { close: true })}
//                     >
//                       {it.title}
//                     </h3>

//                     <div className="text-sm text-gray-600">
//                       ₹{it.price.toFixed(2)}
//                     </div>
//                   </div>

//                   {/* ❌ DELETE */}
//                   <button
//                     onClick={() => removeItem(it)}
//                     className="text-red-500 ml-2"
//                     title="Remove"
//                   >
//                     <FiTrash2 />
//                   </button>
//                 </div>

//                 {/* ➕➖ QTY */}
//                 <div className="mt-2 flex items-center gap-3">
//                   <button onClick={() => decreaseQty(it)}>−</button>

//                   <span className="font-semibold">{it.qty}</span>
//                   <button
//                     onClick={() => increaseQty(it)}
//                     disabled={
//                       it.stock !== undefined && Number(it.qty) >= Number(it.stock)
//                     }
//                     className={`px-2 ${it.stock !== undefined && Number(it.qty) >= Number(it.stock)
//                         ? "opacity-40 cursor-not-allowed"
//                         : ""
//                       }`}
//                   >
//                     +
//                   </button>

//                  {it.stock !== undefined && Number(it.qty) >= Number(it.stock) && (
//   <p className="text-xs text-red-500 mt-1">
//     Only {it.stock} left in stock
//   </p>
// )}



//                 </div>
//               </div>
//             </div>
//           ))}

//         </div>

//         {/* coupon input & view all */}
//         <div className="mt-4 border rounded-lg p-3">
//           <div className="flex items-center gap-2">
//             <input
//               value={couponInput}
//               onChange={(e) => setCouponInput(e.target.value)}
//               className="flex-grow min-w-0 border p-2 rounded outline-none"
//               placeholder="Enter Coupon Code"
//               aria-label="Coupon code"
//             />
//             <button onClick={applyByCode} className="flex-shrink-0 bg-gray-900 text-white px-3 py-2 rounded ml-1">
//               Apply
//             </button>
//           </div>

//           {/* show login CTA before auth; otherwise show View All */}
//           {!isAuthenticated ? (
//             <div className="mt-3">
//               <button className="text-blue-600 text-sm" >
//                 Login to view offers
//               </button>
//             </div>
//           ) : (
//             <button className="text-blue-600 mt-3 text-sm" onClick={handleViewAllOffers}>
//               {showCoupons ? "Hide Offers ←" : "View All Offers →"}
//             </button>
//           )}
//         </div>

//         {/* Coupons panel */}
//         {showCoupons && (
//           <div className="mt-4">
//             <h3 className="font-semibold mb-3">Available Coupons</h3>

//             {loadingCoupons && <div className="text-sm text-gray-500">Loading coupons…</div>}
//             {couponsError && <div className="text-sm text-red-600">{couponsError}</div>}

//             {/* If authenticated & not loading: show actual coupons or "No coupons available." */}
//             {!loadingCoupons && !couponsError && (
//               <>
//                 {coupons.map((c) => {
//                   const key = c.code || c.id;
//                   const isApplied = Boolean(applied[key]);

//                   return (
//                     <div
//                       key={key}
//                       onClick={(e) => toggleApplyCoupon(e, c)}
//                       className={`cursor-pointer border rounded-lg p-2 transition
//         ${isApplied ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"}
//       `}
//                     >
//                       <div className="flex justify-between items-start ">
//                         <div>
//                           <p className="text-sm font-semibold">
//                             {c.title ?? c.name ?? "Coupon"}
//                           </p>
//                           <p className="text-xs text-gray-600 mt-1">
//                             {c.description ?? c.desc ?? ""}
//                           </p>
//                         </div>

//                         {isApplied && (
//                           <span className="text-xs text-green-600 font-semibold">
//                             Applied
//                           </span>
//                         )}
//                       </div>

//                       {c.code && (
//                         <p className="text-xs mt-2 text-gray-500">
//                           Code: <b>{c.code}</b>
//                         </p>
//                       )}
//                     </div>
//                   );
//                 })}

//               </>
//             )}
//           </div>
//         )}

//         {/*address*/}
//         <div className="mt-4 border rounded-lg p-3">
//           {!isAuthenticated ? (
//             <button
//               onClick={() => router.push("/account/login")}
//               className="text-blue-600 text-sm"
//             >
//               Login to select address
//             </button>
//           ) : (
//             <button
//               onClick={handleViewAllAddresses}
//               className="text-blue-600 text-sm"
//             >
//               {showAddresses ? "Hide Addresses ←" : "View All Addresses →"}
//             </button>
//           )}
//         </div>
//         {showAddresses && (
//           <div className="mt-4 space-y-3">
//             {addresses.map((addr) => (
//               <div
//                 key={addr.id}
//                 onClick={() => setSelectedAddress(addr)}
//                 className={`border rounded-lg p-3 cursor-pointer
//           ${selectedAddress?.id === addr.id
//                     ? "border-green-500 bg-green-50"
//                     : "border-gray-300 bg-white"}
//         `}
//               >
//                 <p className="text-sm font-semibold">
//                   {addr.name} • {addr.phone}
//                 </p>

//                 <p className="text-xs text-gray-600 mt-1">
//                   {addr.address_line_1}
//                   {addr.address_line_2 && `, ${addr.address_line_2}`}
//                 </p>

//                 <p className="text-xs text-gray-600">
//                   {addr.city}, {addr.state} – {addr.pincode}
//                 </p>

//                 {addr.is_default && (
//                   <span className="text-xs text-green-600 font-semibold">
//                     Default Address
//                   </span>
//                 )}
//               </div>
//             ))}

//             {/* ADD ADDRESS */}
//             <button
//               onClick={() => setShowAddAddressForm(true)}
//               className="w-full border border-dashed border-gray-400 py-3 rounded-lg text-sm text-gray-600"
//             >
//               + Add New Address
//             </button>


//           </div>
//         )}
//         {showAddAddressForm && (
//           <form
//             onSubmit={async (e) => {
//               e.preventDefault();

//               const payload = {
//                 address: addressForm.address,
//                 pincode: addressForm.pincode,
//                 city: addressForm.city,
//                 phone: addressForm.phone,
//                 state: addressForm.state,
//                 country: addressForm.country,
//                 is_default: true,
//               };

//               await AuthAPI.createaddress(payload);

//               const res = await AuthAPI.getaddress();
//               const list = res?.data?.data || [];
//               setAddresses(list);

//               setShowAddAddressForm(false);
//               setAddressForm({
//                 address: "",
//                 pincode: "",
//                 city: "",
//                 phone: "",
//                 state: "",
//                 country: "India",
//                 is_default: true,
//               });
//             }}
//             className="mt-4 space-y-3 border p-3 rounded-lg bg-gray-50"
//           >
//             <input
//               placeholder="Address"
//               className="w-full border p-2 rounded"
//               value={addressForm.address}
//               onChange={(e) =>
//                 setAddressForm({ ...addressForm, address: e.target.value })
//               }
//             />

//             <input
//               placeholder="Pincode"
//               className="w-full border p-2 rounded"
//               value={addressForm.pincode}
//               onChange={(e) => handleCartPostalChange(e.target.value)}
//             />


//             <input
//               placeholder="City"
//               className="w-full border p-2 rounded"
//               value={addressForm.city}
//               onChange={(e) =>
//                 setAddressForm({ ...addressForm, city: e.target.value })
//               }
//             />

//             <input
//               placeholder="State"
//               className="w-full border p-2 rounded"
//               value={addressForm.state}
//               onChange={(e) =>
//                 setAddressForm({ ...addressForm, state: e.target.value })
//               }
//             />

//             <input
//               placeholder="Phone"
//               className="w-full border p-2 rounded"
//               value={addressForm.phone}
//               onChange={(e) =>
//                 setAddressForm({ ...addressForm, phone: e.target.value })
//               }
//             />

//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowAddAddressForm(false)}
//                 className="flex-1 border py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="flex-1 bg-emerald-600 text-white py-2 rounded"
//               >
//                 Save Address
//               </button>
//             </div>
//           </form>
//         )}




//         <h3 className="font-semibold mt-6 mb-2">Steal Deals for you</h3>

//         <div className="flex gap-4 overflow-x-auto py-2 pb-4">
//           {loadingDeals && (
//             <div className="text-sm text-gray-500">Loading deals...</div>
//           )}

//           {!loadingDeals && dealProducts.length === 0 && (
//             <div className="text-sm text-gray-500">No deals available.</div>
//           )}

//           {dealProducts.map((p) => {
//             const inCart = Boolean(items?.[p.id]);

//             return (
//               <div
//                 key={p.id}
//                 className="min-w-[180px] bg-white border border-gray-200 rounded-lg p-3 flex-shrink-0 shadow-sm"
//               >
//                 <button
//                   onClick={(e) => openProduct(e, p.id, { close: true })}
//                   className="w-full h-28 bg-gray-100 rounded-md mb-3 overflow-hidden"
//                 >
//                   <img
//                     src={p.img}
//                     alt={p.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>

//                 <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
//                   {p.title}
//                 </p>

//                 <div className="text-sm font-semibold text-gray-700 mb-3">
//                   ₹{p.price.toFixed(2)}
//                 </div>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     router.push(`/product?id=${p.id}`);

//                   }}
//                   className="no-nav px-6 py-3 rounded-full shadow font-semibold transition-colors w-full bg-green-600 text-white hover:bg-green-700"
//                 >
//                   VIEW
//                 </button>
//               </div>
//             );
//           })}
//         </div>


//         <div className="mt-3 p-4">
//           <h2 className="flex justify-between font-semibold text-base"> Estimated Total</h2>
//           <div className="mt-2 p-2  border-t  bg-gray-50 text-sm space-y-2">
//             <div className="flex justify-between">
//               <span>MRP Total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>

//             {discountAmount > 0 && (
//               <div className="flex justify-between text-green-600">
//                 <span>Coupon Discount</span>
//                 <span>−₹{discountAmount.toFixed(2)}</span>
//               </div>
//             )}

//             <div className="flex justify-between">
//               <span>Shipping Charges</span>
//               <span className="text-green-600">FREE</span>
//             </div>

//             <div className="flex justify-between font-semibold text-base border-t pt-2">
//               <span>Estimated Total</span>
//               <span>
//                 ₹{(payableAmount ?? total).toFixed(2)}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             className="w-full bg-yellow-400 py-3 rounded-xl text-xl mt-3"
//           >
//             Place My Order
//           </button>


//           <p className="text-xs mt-2 text-center text-gray-500">Delivery within 5–7 days for domestic orders.</p>
//         </div>
//       </div>

//       <style jsx>{`
//         @media (max-width: 320px) {
//           .cart-sidebar-width {
//             width: 315px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
















"use client";

import React, { useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { useCart } from "../providers/CartProvider";
const stealDeals = [
  {
    id: 1,
    title: "Kanchipuram Pure Silk Saree",
    price: 7999,
    img: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=1920",
  },
  {
    id: 2,
    title: "Soft Silk Saree – Bridal Collection",
    price: 4599,
    img: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=1920",
  },
  {
    id: 3,
    title: "Banarasi Silk Saree",
    price: 6999,
    img: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=1920",
  },
  {
    id: 4,
    title: "Gadwal Silk Saree",
    price: 3899,
    img: "https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440&width=1920",
  },
];
/* ================= ADDRESS UI STATE ================= */


export default function CartSidebar({ open, onClose }) {
  const {
    items,
    updateQty,
    removeFromCart,
    total,
  } = useCart();

  const cartItems = Object.values(items || {});

  /* ================= UI-ONLY STATES ================= */
  const [couponInput, setCouponInput] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const finalTotal = Math.max(0, total - discountAmount);

  const [showAddresses, setShowAddresses] = useState(false);
const router = useRouter();
const isLoggedIn =
  typeof window !== "undefined" &&
  localStorage.getItem("isLoggedIn") === "true";

const [addresses] = useState([
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "9876543210",
    address: "12, MG Road, Anna Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600040",
    is_default: true,
  },
  {
    id: 2,
    name: "Suresh Kumar",
    phone: "9123456789",
    address: "45, Temple Street",
    city: "Kanchipuram",
    state: "Tamil Nadu",
    pincode: "631501",
    is_default: false,
  },
]);


const [selectedAddress, setSelectedAddress] = useState(
  addresses.find((a) => a.is_default) || addresses[0]
);
  /* ================= UI HANDLERS ================= */
  const applyCouponUI = () => {
    if (!couponInput) return;
    // fake flat discount just for UI
    setDiscountAmount(100);
    setCouponInput("");
  };

  /* ================= UI ================= */
  return (
    <div className={`fixed inset-0 z-[9999] text-black ${open ? "visible" : "invisible"}`}>
      {/* OVERLAY */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <div
        className={`absolute right-0 top-0 h-full w-[380px] cart-sidebar-width bg-white shadow-xl p-4 overflow-y-auto transition-all duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between pb-3 border-b">
          <h2 className="text-xl font-semibold">
            Your Cart{" "}
            <span className="text-sm font-normal text-gray-500">
              ({cartItems.length} items)
            </span>
          </h2>
          <button onClick={onClose} aria-label="Close cart">
            <FiX size={22} />
          </button>
        </div>

        {/* INFO BANNER */}
        <div className="bg-red-200 text-center text-sm py-2 mt-3 rounded">
          Ordering first time? Use <b>FREESHIPPING</b> for free delivery
        </div>

        {/* CART ITEMS */}
        <div className="mt-4 space-y-3">
          {cartItems.length === 0 && (
            <div className="text-sm text-gray-500">Your cart is empty.</div>
          )}

          {cartItems.map((it) => (
            <div
              key={it.variantId}
              className="flex gap-3 border p-3 rounded-lg items-center"
            >
              <img
                src={it.img || "/sample-product.jpg"}
                alt={it.title}
                className="w-16 h-16 rounded object-cover"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{it.title}</h3>
                    <div className="text-sm text-gray-600">
                      ₹{it.price.toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(it.variantId)}
                    className="text-red-500"
                    title="Remove"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                {/* QTY */}
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() =>
                      it.qty > 1 &&
                      updateQty(it.variantId, it.qty - 1)
                    }
                  >
                    −
                  </button>

                  <span className="font-semibold">{it.qty}</span>

                  <button
                    onClick={() =>
                      updateQty(it.variantId, it.qty + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
{isLoggedIn && (
  <>
        {/* COUPON UI */}
        <div className="mt-4 border rounded-lg p-3">
          <div className="flex items-center gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="flex-grow border p-2 rounded outline-none"
              placeholder="Enter Coupon Code"
            />
            <button
              onClick={applyCouponUI}
              className="bg-gray-900 text-white px-1 py-2 rounded"
            >
              Apply
            </button>
          </div>

          <button
            onClick={() => setShowCoupons((s) => !s)}
            className="text-blue-600 mt-3 text-sm"
          >
            {showCoupons ? "Hide Offers ←" : "View All Offers →"}
          </button>
        </div>

        {showCoupons && (
          <div className="mt-4 space-y-2">
            <div className="border p-3 rounded">
              <p className="text-sm font-semibold">FLAT100</p>
              <p className="text-xs text-gray-600">
                Flat ₹100 off on your order
              </p>
            </div>
            <div className="border p-3 rounded">
              <p className="text-sm font-semibold">SAVE10</p>
              <p className="text-xs text-gray-600">
                Save extra on festive sale
              </p>
            </div>
          </div>
        )}
        {/* ================= ADDRESS ================= */}
<div className="mt-4 border rounded-lg p-3">
  <h3 className="font-semibold mb-2">Delivery Address</h3>

  {selectedAddress && (
    <div className="border rounded-lg p-3 bg-gray-50">
      <p className="text-sm font-semibold">
        {selectedAddress.name} • {selectedAddress.phone}
      </p>

      <p className="text-xs text-gray-600 mt-1">
        {selectedAddress.address}
      </p>

      <p className="text-xs text-gray-600">
        {selectedAddress.city}, {selectedAddress.state} –{" "}
        {selectedAddress.pincode}
      </p>

      {selectedAddress.is_default && (
        <span className="text-xs text-green-600 font-semibold">
          Default Address
        </span>
      )}
    </div>
  )}

  <button
    onClick={() => setShowAddresses((s) => !s)}
    className="text-blue-600 text-sm mt-2"
  >
    {showAddresses ? "Hide Addresses ←" : "View All Addresses →"}
  </button>
</div>
{showAddresses && (
  <div className="mt-3 space-y-3">
    {addresses.map((addr) => (
      <div
        key={addr.id}
        onClick={() => setSelectedAddress(addr)}
        className={`border rounded-lg p-3 cursor-pointer transition
          ${
            selectedAddress?.id === addr.id
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-white"
          }`}
      >
        <p className="text-sm font-semibold">
          {addr.name} • {addr.phone}
        </p>

        <p className="text-xs text-gray-600 mt-1">
          {addr.address}
        </p>

        <p className="text-xs text-gray-600">
          {addr.city}, {addr.state} – {addr.pincode}
        </p>

        {addr.is_default && (
          <span className="text-xs text-green-600 font-semibold">
            Default Address
          </span>
        )}
      </div>
    ))}

    {/* ADD NEW ADDRESS – UI ONLY */}
    <button className="w-full border border-dashed border-gray-400 py-3 rounded-lg text-sm text-gray-600">
      + Add New Address
    </button>
  </div>
)}
</>
)}
{/* ================= STEAL DEALS – SILK ================= */}
<h3 className="font-semibold mt-6 mb-2">
  You may also like
</h3>


<div className="flex gap-4 overflow-x-auto py-2 pb-4">
  {stealDeals.map((p) => (
    <div
      key={p.id}
      className="min-w-[200px] bg-white border border-gray-200 rounded-xl p-3 flex-shrink-0 shadow-sm"
    >
      <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-sm font-medium text-gray-800 line-clamp-2">
        {p.title}
      </p>

      <div className="text-sm font-semibold text-gray-900 mt-1">
        ₹{p.price.toLocaleString()}
      </div>

      <button
  onClick={() => {
    onClose(); // close cart sidebar first
    setTimeout(() => {
      router.push(`/product?id=${p.id}`);
    }, 0);
  }}
  className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold"
>
  VIEW DETAILS
</button>

    </div>
  ))}
</div>

        {/* TOTAL */}
        <div className="mt-6 p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>MRP Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span>−₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping Charges</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Estimated Total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
  onClick={() => {
    if (isLoggedIn) {
      router.push("/"); // success / home / thank-you later
    } else {
      router.push("/account/login");
    }
  }}
  className="w-full bg-red-800 py-3 rounded-xl text-xl mt-3 text-white"
>
  Place My Order
</button>


          <p className="text-xs mt-2 text-center text-gray-500">
            Delivery within 5–7 days for domestic orders.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 320px) {
          .cart-sidebar-width {
            width: 315px !important;
          }
        }
      `}</style>
    </div>
  );
}
