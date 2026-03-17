"use client";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "../providers/CartProvider";
import { useAuth } from "./context/AuthProvider";
import AddAddessModal from "./AddAddressModal";
import OTPAuthModal from "./OTPAuthModal";
import PaymentLoader from "./PaymentLoader";
import OrderSuccessModal from "./OrderSuccessModal";
import PaymentMethodModal from "./PaymentMethodModal";
import api from "../utils/apiInstance";

export default function TestComponent({ open, onClose }) {
  const { items, updateQty, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const cartItems = Object.values(items ?? {});
  const router = useRouter();

  const [userId, setUserId] = useState(null);

  /* OTP AUTH MODAL */
  const [showOTPAuth, setShowOTPAuth] = useState(false);

  /* PAYMENT METHOD MODAL */
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  /* PAYMENT GATEWAY CONFIG */
  const [paymentGateways, setPaymentGateways] = useState(null);

  /* ADDRESS STATES */
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressRefreshTrigger, setAddressRefreshTrigger] = useState(0);

  /* COUPON STATES */
  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState(null);

  /* PAYMENT LOADING STATES */
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* LOAD TOKEN ON MOUNT */
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get user_id from localStorage
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  /* FETCH PAYMENT GATEWAYS CONFIG */
  useEffect(() => {
    const fetchPaymentGateways = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          return;
        }

        const response = await api.get("/user-dashboard/list-payment-gateways", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const gatewayData = response.data.data || response.data;
        setPaymentGateways(gatewayData);
      } catch (error) {
      }
    };

    if (open) {
      fetchPaymentGateways();
    }
  }, [open]);

  /* TOTAL CALCULATION */
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  const discount = Number(couponData?.discount) || 0;
  const finalTotal = Math.max(0, subtotal - discount);

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
    if (!user) return;

    try {
      setAddressLoading(true);
      
      // Add cache busting parameter
      const timestamp = new Date().getTime();
      const res = await api.get(`/user-dashboard/cart/get-address?_t=${timestamp}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const data = res?.data?.data || [];
      
      // Limit to only 2 addresses
      const limitedAddresses = data.slice(0, 2);
      
      // Force state update by creating new array
      setAddresses([...limitedAddresses]);
      
      // Update selected address if it exists in the new list, otherwise select first or default
      if (selectedAddress) {
        const stillExists = limitedAddresses.find(a => a.id === selectedAddress.id);
        if (stillExists) {
          setSelectedAddress({...stillExists});
        } else {
          setSelectedAddress(
            limitedAddresses.find((a) => a.is_default === 1) || limitedAddresses[0] || null
          );
        }
      } else {
        setSelectedAddress(
          limitedAddresses.find((a) => a.is_default === 1) || limitedAddresses[0] || null
        );
      }
    } catch (error) {
      toast.error("Failed to load addresses");
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    if (open && user) {
      fetchAddresses();
    }
  }, [open, user, addressRefreshTrigger]);

  /* APPLY COUPON */
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return toast.error("Enter coupon code");

    try {
      const res = await api.post(
        "/user-dashboard/cart/apply-coupon",
        { code: coupon.trim(), amount: subtotal },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setCouponData(res.data);
      toast.success("Coupon applied");
    } catch {
      toast.error("Invalid coupon");
      setCouponData(null);
    }
  };

  /* HANDLE PLACE ORDER BUTTON */
  const handlePlaceOrder = () => {
    // First check if user is logged in
    if (!user) {
      setShowOTPAuth(true);
      return;
    }

    // Then check if address is selected
    if (!selectedAddress) {
      // toast.error("Please select a delivery address");
      return;
    }

    // If logged in and address selected, show payment method modal
    setShowPaymentMethod(true);
  };

  /* HANDLE PAYMENT METHOD SELECTION */
  const handlePaymentMethodSelect = async (method) => {
    setShowPaymentMethod(false);

    switch (method) {
      case "razorpay":
        await handleRazorpayPayment();
        break;
      case "phonepe":
        await handlePhonePePayment();
        break;
      case "cashfree":
        await handleCashfreePayment();
        break;
      case "payu":
        await handlePayUPayment();
        break;
      case "cod":
        await handleCODPayment();
        break;
      default:
        toast.error("Invalid payment method");
    }
  };

  /* RAZORPAY PAYMENT */
  const handleRazorpayPayment = async () => {
    setPaymentLoading(true);
    setLoadingMessage("Initializing Razorpay...");

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setPaymentLoading(false);
      return toast.error("Razorpay failed to load");
    }

    try {
      setLoadingMessage("Creating order...");
      
      const token = localStorage.getItem("token");
      
      const createRes = await api.post(
        "/user-dashboard/cart/create-order",
        { amount: finalTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = createRes.data.order;
      setPaymentLoading(false);

      // Use Razorpay key from API or fallback to env variable
      const razorpayKey = paymentGateways?.razorpay_key
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: "INR",
        name: "Hamsani Silks",
        order_id: order.id,

        handler: async (response) => {
          setPaymentLoading(true);
          setLoadingMessage("Verifying payment...");
          
          try {
            const token = localStorage.getItem("token");
            await api.post(
              "/user-dashboard/cart/verify-payment",
              response,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setLoadingMessage("Completing your order...");
            await completeOrder("razorpay", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
            });
          } catch (error) {
            setPaymentLoading(false);
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            toast.error("Payment cancelled");
          },
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.response?.data?.message || "Failed to create order");
    }
  };

  /* PHONEPE PAYMENT */
  const handlePhonePePayment = async () => {
    setPaymentLoading(true);
    setLoadingMessage("Creating PhonePe order...");

    try {
      const token = localStorage.getItem("token");
      
      // Create PhonePe order with the same payload structure
      const payload = {
        user_id: userId,
        address_id: selectedAddress.id,
        payment: {
          method: "phonepe",
          amount: finalTotal,
        },
        price_details: {
          subtotal,
          discount,
          coupon_code: couponData?.coupon_code || null,
          total_amount: finalTotal,
        },
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.qty,
          price: item.price,
          total: item.price * item.qty,
        })),
      };

      const response = await api.post(
        "/user-dashboard/create-phone-order",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Check if API returned success
      if (response.data.success) {
        setLoadingMessage("PhonePe payment successful!");
        
        // Wait a moment to show the success message
        setTimeout(() => {
          setPaymentLoading(false);
          setShowSuccessModal(true);
          clearCart();
          onClose();
          toast.success("PhonePe payment completed successfully! Thank you!");
        }, 1000);
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.response?.data?.message || "PhonePe payment failed");
    }
  };

  /* CASH ON DELIVERY */
//   const handleCODPayment = async () => {
//     setPaymentLoading(true);
//     setLoadingMessage("Processing COD order...");

//     try {
//       await completeOrder("cod", {
//         cod_confirmed: true,
//       });
//     } catch (error) {
//       setPaymentLoading(false);
//       toast.error(error.response?.data?.message || "Failed to place COD order");
//     }
//   };

  /* CASHFREE PAYMENT */
  const handleCashfreePayment = async () => {
    setPaymentLoading(true);
    setLoadingMessage("Initializing Cashfree...");

    try {
      const token = localStorage.getItem("token");
      
      const response = await api.post(
        "/user-dashboard/cart/cashfree/initiate",
        {
          amount: finalTotal,
          user_id: userId,
          address_id: selectedAddress.id,
          app_id: paymentGateways?.cashfree_app_id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { payment_url, order_id } = response.data;

      if (payment_url) {
        window.location.href = payment_url;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.response?.data?.message || "Cashfree payment failed");
    }
  };

  /* PAYU PAYMENT */
  const handlePayUPayment = async () => {
    setPaymentLoading(true);
    setLoadingMessage("Initializing PayU...");

    try {
      const token = localStorage.getItem("token");
      
      const response = await api.post(
        "/user-dashboard/cart/payu/initiate",
        {
          amount: finalTotal,
          user_id: userId,
          address_id: selectedAddress.id,
          payu_key: paymentGateways?.payu_key,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { payment_url, txnid } = response.data;

      if (payment_url) {
        window.location.href = payment_url;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.response?.data?.message || "PayU payment failed");
    }
  };

  /* COMPLETE ORDER - COMMON FUNCTION */
  const completeOrder = async (paymentMethod, paymentDetails) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const payload = {
        user_id: userId,
        address_id: selectedAddress.id,
        payment: {
          method: paymentMethod,
          ...paymentDetails,
          amount: finalTotal,
        },
        price_details: {
          subtotal,
          discount,
          coupon_code: couponData?.coupon_code || null,
          total_amount: finalTotal,
        },
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.qty,
          price: item.price,
          total: item.price * item.qty,
        })),
      };

      const response = await api.post("/user-dashboard/orders", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoadingMessage("Order placed successfully!");
      
      setTimeout(() => {
        setPaymentLoading(false);
        setShowSuccessModal(true);
        clearCart();
        onClose();
      }, 1000);
    } catch (error) {
      throw error;
    }
  };

  /* QUANTITY */
  const handleQtyChange = (id, delta) => {
    const item = items[id];
    if (!item) return;

    const qty = item.qty + delta;
    if (qty < 1) return removeFromCart(id);
    updateQty(id, qty);
  };

  return (
    <>
      {/* PAYMENT LOADER */}
      {paymentLoading && <PaymentLoader message={loadingMessage} />}
      
      {/* SUCCESS MODAL */}
      <OrderSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      
      <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-5 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3">
          Your Cart ({cartItems.length})
        </h2>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative mb-6">
              <FiShoppingBag className="w-24 h-24 text-gray-300" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                0
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your Cart is Empty
            </h3>
            
            <p className="text-gray-500 text-center mb-6 max-w-xs">
              Please add products to continue shopping
            </p>
            
            <button
              onClick={() => {
                onClose();
                router.push("/collections");
              }}
              className="bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <FiShoppingBag className="w-5 h-5" />
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            {cartItems.map((item, i) => (
              <div key={i} className="flex gap-3 border p-3 rounded mb-3 bg-white hover:shadow-md transition">
                <img
                  src={item.img || "/placeholder.png"}
                  className="w-16 h-16 object-cover rounded"
                  alt={item.title || item.name}
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{item.title || item.name}</p>
                  
                  {/* Size */}
                  {item.size && (
                    <div className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">Size:</span> {item.size}
                    </div>
                  )}

                  {/* Price with Color Swatch */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#8B4513]">₹{item.price}</p>
                      {item.color ? (
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: item.colorCode || "#cccccc" }}
                            title={item.color}
                          />
                          <span className="text-xs text-gray-600">{item.color}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No color</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                      <button 
                        onClick={() => handleQtyChange(item.product_id, -1)}
                        className="text-gray-600 hover:text-gray-800 font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium text-sm">{item.qty}</span>
                      <button 
                        onClick={() => handleQtyChange(item.product_id, 1)}
                        className="text-gray-600 hover:text-gray-800 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Available Colors */}
                  {item.allVariants && item.allVariants.length > 1 && (
                    <div className="mt-2 flex items-center gap-2">
                      {/* <span className="text-xs font-medium text-gray-600">Other colors:</span> */}
                      {/* <div className="flex gap-1.5">
                        {item.allVariants.map((variant, idx) => {
                          const colorValue = variant.values?.[0]?.value;
                          const colorCode = variant.values?.[0]?.color_code;
                          const isSelected = colorValue === item.color;
                          return (
                            <div
                              key={idx}
                              className={`w-5 h-5 rounded-full border-2 hover:border-gray-600 cursor-pointer transition ${
                                isSelected ? "border-[#8B4513] ring-2 ring-[#8B4513]" : "border-gray-300"
                              }`}
                              style={{ backgroundColor: colorCode || "#cccccc" }}
                              title={colorValue || "Color"}
                            />
                          );
                        })}
                      </div> */}
                    </div>
                  )}
                  {/* Total for this item */}
                  {/* <p className="text-xs text-gray-500 mt-1">
                    Totala: ₹{(item.price * item.qty).toFixed(2)}
                  </p> */}
                </div>

                <button 
                  onClick={() => removeFromCart(item.product_id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}

        {/* ADDRESS SECTION - Only visible when logged in */}
        {user && (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Delivery Address</h3>

            <button
              onClick={() => {
                setEditAddress(null);
                setShowAddAddress(true);
              }}
              disabled={addresses.length >= 2 || addressLoading}
              className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium transition-all ${
                addresses.length >= 2 || addressLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white hover:shadow-md"
              }`}
            >
              <FiPlus className="w-4 h-4" /> Add New
            </button>
          </div>

          {addresses.length >= 2 && !addressLoading && (
            <p className="text-xs text-orange-600 mb-2 bg-orange-50 p-2 rounded border border-orange-200">
              Maximum 2 addresses allowed. Please edit an existing address If Required.
            </p>
          )}

          {addressLoading ? (
            <div className="py-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm text-gray-500">Loading addresses...</p>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-500 mb-3">No address found</p>
              <button
                onClick={() => {
                  setEditAddress(null);
                  setShowAddAddress(true);
                }}
                className="text-sm text-[#8B4513] font-medium hover:underline"
              >
                Add your first address
              </button>
            </div>
          ) : (
            addresses.map((addr, index) => (
            <div
              key={`${addr.id}-${addr.name}-${index}`}
              onClick={() => setSelectedAddress(addr)}
              className={`border-2 p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                selectedAddress?.id === addr.id
                  ? "border-[#8B4513] bg-[#F5F5DC] shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  checked={selectedAddress?.id === addr.id}
                  onChange={() => setSelectedAddress(addr)}
                  className="mt-1 accent-[#8B4513]"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{addr.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Ph: {addr.phone}</p>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditAddress(addr);
                        setShowAddAddress(true);
                      }}
                      className="text-xs text-[#8B4513] font-medium flex items-center gap-1 hover:underline"
                    >
                      <FiEdit className="w-3 h-3" /> Edit
                    </button>
                    
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!confirm("Delete this address?")) return;
                        
                        try {
                          setAddressLoading(true);
                          await api.delete(`/user-dashboard/cart/delete-address/${addr.id}`, {
                            headers: { Authorization: `Bearer ${user.token}` },
                          });
                          toast.success("Address deleted successfully");
                          await fetchAddresses();
                        } catch (error) {
                          setAddressLoading(false);
                          toast.error("Failed to delete address");
                        }
                      }}
                      className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline"
                    >
                      {/* <FiTrash2 className="w-3 h-3" /> Delete */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
        )}

        {/* COUPON - Only visible when logged in */}
        {user && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Apply Coupon</h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 border px-3 py-2 rounded"
            />

            <button
              onClick={handleApplyCoupon}
              className="bg-black text-white px-4 rounded"
            >
              Apply
            </button>
          </div>

          {couponData && (
            <p className="text-green-600 text-sm mt-1">
              Discount Applied: ₹{discount}
            </p>
          )}
        </div>
        )}

        {/* TOTAL */}
        <div className="mt-5 border-t pt-3 text-sm space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>

          <div className="flex justify-between font-semibold text-base pt-2">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => {
              onClose();
              router.push("/collections");
            }}
            className="flex-1 bg-white border-2 border-[#8B4513] text-[#8B4513] py-3 rounded hover:bg-[#F5F5DC] transition-colors font-medium"
          >
            Continue Shopping
          </button>
          
          <button
            onClick={handlePlaceOrder}
            className="flex-1 bg-red-800 text-white py-3 rounded hover:bg-red-900 transition-colors font-medium"
          >
            Place My Order
          </button>
        </div>
          </>
        )}
      </div>
      
      {/* PAYMENT METHOD MODAL */}
      <PaymentMethodModal
        open={showPaymentMethod}
        onClose={() => setShowPaymentMethod(false)}
        onSelectMethod={handlePaymentMethodSelect}
      />

      {/* ADD ADDRESS MODAL */}
      <AddAddessModal
        open={showAddAddress}
        editData={editAddress}
        currentAddressCount={addresses.length}
        onClose={() => {
          setShowAddAddress(false);
          setEditAddress(null);
        }}
        onSuccess={async (newAddressData) => {
          // Immediately fetch fresh addresses
          try {
            await fetchAddresses();
          } catch (error) {
          }
          
          // Close the address modal
          setShowAddAddress(false);
          setEditAddress(null);
        }}
      />

      {/* OTP AUTH MODAL */}
      <OTPAuthModal
        open={showOTPAuth}
        onClose={() => setShowOTPAuth(false)}
        onSuccess={() => {
          const userStr = localStorage.getItem("user");
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              setUserId(user?.id?.toString());
            } catch (e) {
              // Failed to parse user
            }
          }
          setShowOTPAuth(false);
          setShowAddAddress(false);
          fetchAddresses();
          // After successful login, show payment modal
          setTimeout(() => {
            if (selectedAddress) {
              setShowPaymentMethod(true);
            } else {
              // toast.error("Please select a delivery address");
            }
          }, 500);
        }}
      />
      </div>
    </>
  );
}




// "use client";

// import React, { useEffect, useState } from "react";
// import { FiTrash2, FiEdit, FiPlus, FiShoppingBag } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { useCart } from "../providers/CartProvider";
// import AddAddessModal from "./AddAddressModal";
// import OTPAuthModal from "./OTPAuthModal";
// import PaymentLoader from "./PaymentLoader";
// import OrderSuccessModal from "./OrderSuccessModal";
// import PaymentMethodModal from "./PaymentMethodModal";
// import api from "../utils/apiInstance";

// export default function TestComponent({ open, onClose }) {

//   const { items, updateQty, removeFromCart, clearCart } = useCart();

//   const cartItems = Object.values(items ?? {});

//   const router = useRouter();

//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState(null);

//   const [showOTPAuth, setShowOTPAuth] = useState(false);

//   const [showPaymentMethod, setShowPaymentMethod] = useState(false);

//   const [paymentGateways, setPaymentGateways] = useState(null);

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const [showAddAddress, setShowAddAddress] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);

//   const [coupon, setCoupon] = useState("");
//   const [couponData, setCouponData] = useState(null);

//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState("Processing...");

//   const [showSuccessModal, setShowSuccessModal] = useState(false);


//   /* LOAD TOKEN */
//   useEffect(() => {

//     if (typeof window !== "undefined") {

//       setToken(localStorage.getItem("token"));

//       setUserId(localStorage.getItem("user_id"));

//     }

//   }, []);


//   /* TOTAL */
//   const subtotal = cartItems.reduce(
//     (acc, item) =>
//       acc + Number(item.price || 0) * Number(item.qty || 0),
//     0
//   );

//   const discount = Number(couponData?.discount) || 0;

//   const finalTotal = Math.max(0, subtotal - discount);


//   /* FETCH ADDRESSES */

//   const fetchAddresses = async () => {

//     if (!token) return;

//     try {

//       const res = await api.get(
//         "/user-dashboard/cart/get-address",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = res?.data?.data || [];

//       setAddresses(data);

//       setSelectedAddress(
//         data.find(a => a.is_default === 1) || data[0]
//       );

//     } catch {

//       toast.error("Failed to load addresses");

//     }
//   };


//   useEffect(() => {

//     if (open && token)
//       fetchAddresses();

//   }, [open, token]);


//   /* PLACE ORDER CLICK */

//   const handlePlaceOrder = () => {

//     if (!token) {

//       setShowOTPAuth(true);

//       return;
//     }

//     if (!selectedAddress) {

//       toast.error("Select address");

//       return;
//     }

//     setShowPaymentMethod(true);
//   };


//   /* PAYMENT METHOD SELECT */

//   const handlePaymentMethodSelect = async (method) => {

//     setShowPaymentMethod(false);

//     if (method === "phonepe")
//       handlePhonePePayment();

//   };


//   /* ============================
//      PHONEPE PAYMENT FULL FIXED
//   ============================ */

//   const handlePhonePePayment = async () => {

//     try {

//       setPaymentLoading(true);

//       setLoadingMessage("Creating PhonePe order...");


//       const payload = {

//         user_id: userId,

//         address_id: selectedAddress.id,

//         payment: {
//           method: "phonepe",
//           amount: finalTotal,
//         },

//         price_details: {
//           subtotal,
//           discount,
//           coupon_code: couponData?.coupon_code || null,
//           total_amount: finalTotal,
//         },

//         items: cartItems.map(item => ({

//           product_id: item.product_id,

//           quantity: item.qty,

//           price: item.price,

//           total: item.price * item.qty,

//         })),
//       };


//       const response = await api.post(
//         "/user-dashboard/create-phone-order",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );


//       console.log("PhonePe response:", response.data);


//       if (
//         response.data?.success &&
//         response.data?.checkout_url
//       ) {

//         setLoadingMessage("Redirecting to PhonePe...");


//         /* REDIRECT */
//         window.location.href =
//           response.data.checkout_url;

//         return;
//       }


//       throw new Error(
//         response.data?.message ||
//         "Checkout URL not received"
//       );


//     } catch (error) {

//       console.error(error);

//       setPaymentLoading(false);

//       toast.error(
//         error.response?.data?.message ||
//         error.message ||
//         "PhonePe failed"
//       );
//     }
//   };


//   /* QTY */

//   const handleQtyChange = (id, delta) => {

//     const item = items[id];

//     if (!item) return;

//     const qty = item.qty + delta;

//     if (qty < 1)
//       removeFromCart(id);
//     else
//       updateQty(id, qty);
//   };


//   /* ============================
//      UI
//   ============================ */

//   return (

//     <>

//       {paymentLoading &&
//         <PaymentLoader message={loadingMessage} />
//       }


//       <OrderSuccessModal
//         open={showSuccessModal}
//         onClose={() =>
//           setShowSuccessModal(false)
//         }
//       />


//       <div className={`fixed inset-0 ${open ? "visible" : "invisible"}`}>

//         <div
//           className="absolute inset-0 bg-black/40"
//           onClick={onClose}
//         />


//         <div className="absolute right-0 w-full sm:w-[420px] bg-white p-5 h-full overflow-auto">


//           <h2>
//             Cart ({cartItems.length})
//           </h2>


//           {cartItems.map(item => (

//             <div key={item.product_id}>

//               <p>{item.name}</p>

//               <p>
//                 ₹{item.price} × {item.qty}
//               </p>


//               <button
//                 onClick={() =>
//                   handleQtyChange(
//                     item.product_id,
//                     -1
//                   )
//                 }
//               >
//                 -
//               </button>


//               <button
//                 onClick={() =>
//                   handleQtyChange(
//                     item.product_id,
//                     1
//                   )
//                 }
//               >
//                 +
//               </button>


//               <button
//                 onClick={() =>
//                   removeFromCart(
//                     item.product_id
//                   )
//                 }
//               >
//                 Remove
//               </button>

//             </div>

//           ))}


//           <hr />


//           <p>
//             Subtotal: ₹{subtotal}
//           </p>

//           <p>
//             Discount: ₹{discount}
//           </p>

//           <p>
//             Total: ₹{finalTotal}
//           </p>


//           <button
//             onClick={handlePlaceOrder}
//             className="bg-red-800 text-white p-3 mt-3"
//           >
//             Place Order
//           </button>


//         </div>

//       </div>


//       <PaymentMethodModal
//         open={showPaymentMethod}
//         onClose={() =>
//           setShowPaymentMethod(false)
//         }
//         onSelectMethod={
//           handlePaymentMethodSelect
//         }
//       />


//       <AddAddessModal
//         open={showAddAddress}
//         editData={editAddress}
//         onClose={() =>
//           setShowAddAddress(false)
//         }
//         onSuccess={fetchAddresses}
//       />


//       <OTPAuthModal
//         open={showOTPAuth}
//         onClose={() =>
//           setShowOTPAuth(false)
//         }
//       />

//     </>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   FiTrash2,
//   FiEdit,
//   FiPlus,
//   FiShoppingBag
// } from "react-icons/fi";

// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// import { useCart } from "../providers/CartProvider";

// import AddAddessModal from "./AddAddressModal";
// import OTPAuthModal from "./OTPAuthModal";
// import PaymentLoader from "./PaymentLoader";
// import OrderSuccessModal from "./OrderSuccessModal";
// import PaymentMethodModal from "./PaymentMethodModal";

// import api from "../utils/apiInstance";


// export default function TestComponent({ open, onClose }) {

//   const { items, updateQty, removeFromCart, clearCart } = useCart();

//   const cartItems = Object.values(items ?? {});
//   const router = useRouter();


//   /* AUTH */

//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState(null);

//   const [showOTPAuth, setShowOTPAuth] = useState(false);


//   /* ADDRESS */

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const [showAddAddress, setShowAddAddress] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);


//   /* PAYMENT */

//   const [showPaymentMethod, setShowPaymentMethod] = useState(false);

//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState("Processing...");

//   const [showSuccessModal, setShowSuccessModal] = useState(false);


//   /* COUPON */

//   const [coupon, setCoupon] = useState("");
//   const [couponData, setCouponData] = useState(null);


//   /* LOAD TOKEN */

//   useEffect(() => {

//     if (typeof window !== "undefined") {

//       setToken(localStorage.getItem("token"));
//       setUserId(localStorage.getItem("user_id"));

//     }

//   }, []);



//   /* FETCH ADDRESSES */

//   const fetchAddresses = async () => {

//     if (!token) return;

//     try {

//       const res = await api.get(
//         "/user-dashboard/cart/get-address",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       console.log("Address response:", res.data);

//       const data =
//         res?.data?.data ||
//         res?.data?.addresses ||
//         [];

//       setAddresses(data);

//       if (data.length > 0) {

//         const defaultAddr =
//           data.find(a => a.is_default == 1)
//           || data[0];

//         setSelectedAddress(defaultAddr);

//       }

//     } catch (error) {

//       console.error(error);

//       toast.error("Failed to load addresses");

//     }

//   };


//   useEffect(() => {

//     if (open && token)
//       fetchAddresses();

//   }, [open, token]);



//   /* TOTAL */

//   const subtotal =
//     cartItems.reduce(
//       (acc, item) =>
//         acc +
//         Number(item.price || 0) *
//         Number(item.qty || 0),
//       0
//     );

//   const discount =
//     Number(couponData?.discount || 0);

//   const finalTotal =
//     Math.max(0, subtotal - discount);



//   /* APPLY COUPON */

//   const handleApplyCoupon = async () => {

//     if (!coupon)
//       return toast.error("Enter coupon");

//     try {

//       const res =
//         await api.post(
//           "/user-dashboard/cart/apply-coupon",
//           {
//             code: coupon,
//             amount: subtotal
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//       setCouponData(res.data);

//       toast.success("Coupon applied");

//     } catch {

//       toast.error("Invalid coupon");

//     }

//   };



//   /* PLACE ORDER CLICK */

//   const handlePlaceOrder = () => {

//     if (!token) {

//       setShowOTPAuth(true);
//       return;

//     }

//     if (!selectedAddress) {

//       toast.error("Select address");
//       return;

//     }

//     setShowPaymentMethod(true);

//   };



//   /* PAYMENT METHOD SELECT */

//   const handlePaymentMethodSelect = async (method) => {

//     setShowPaymentMethod(false);

//     if (method === "phonepe")
//       handlePhonePePayment();

//     if (method === "cod")
//       handleCODPayment();

//   };



//   /* PHONEPE PAYMENT */

//   const handlePhonePePayment = async () => {

//     setPaymentLoading(true);
//     setLoadingMessage("Creating PhonePe order...");

//     try {

//       const payload = {

//         user_id: userId,

//         address_id: selectedAddress.id,

//         payment: {
//           method: "phonepe",
//           amount: finalTotal
//         },

//         price_details: {
//           subtotal,
//           discount,
//           coupon_code:
//             couponData?.coupon_code || null,
//           total_amount: finalTotal
//         },

//         items: cartItems.map(item => ({
//           product_id: item.product_id,
//           quantity: item.qty,
//           price: item.price,
//           total:
//             item.price * item.qty
//         }))

//       };


//       const response =
//         await api.post(
//           "/user-dashboard/create-phone-order",
//           payload,
//           {
//             headers: {
//               Authorization:
//                 `Bearer ${token}`
//             }
//           }
//         );


//       if (
//         response.data.success &&
//         response.data.checkout_url
//       ) {

//         setLoadingMessage("Redirecting...");

//         window.location.href =
//           response.data.checkout_url;

//         return;

//       }


//       throw new Error("Checkout failed");

//     } catch (error) {

//       setPaymentLoading(false);

//       toast.error(
//         error.response?.data?.message
//         || error.message
//       );

//     }

//   };



//   /* COD PAYMENT */

//   const handleCODPayment = async () => {

//     setPaymentLoading(true);
//     setLoadingMessage("Placing order...");

//     try {

//       await api.post(
//         "/user-dashboard/orders",
//         {
//           user_id: userId,
//           address_id: selectedAddress.id,

//           payment: {
//             method: "cod",
//             amount: finalTotal
//           }

//         },
//         {
//           headers: {
//             Authorization:
//               `Bearer ${token}`
//           }
//         }
//       );

//       clearCart();

//       setPaymentLoading(false);

//       setShowSuccessModal(true);

//     } catch {

//       setPaymentLoading(false);

//       toast.error("COD failed");

//     }

//   };



//   /* QUANTITY CHANGE */

//   const handleQtyChange = (id, delta) => {

//     const item = items[id];

//     if (!item) return;

//     const qty =
//       item.qty + delta;

//     if (qty < 1)
//       removeFromCart(id);
//     else
//       updateQty(id, qty);

//   };



//   /* UI */

//   return (

//     <>
//       {paymentLoading &&
//         <PaymentLoader message={loadingMessage} />
//       }


//       <OrderSuccessModal
//         open={showSuccessModal}
//         onClose={() =>
//           setShowSuccessModal(false)
//         }
//       />


//       <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>

//         <div
//           className="absolute inset-0 bg-black/40"
//           onClick={onClose}
//         />


//         <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-5 overflow-y-auto">


//           <h2 className="text-xl font-semibold mb-3">

//             Your Cart ({cartItems.length})

//           </h2>



//           {/* CART ITEMS */}

//           {cartItems.map(item => (

//             <div
//               key={item.product_id}
//               className="flex gap-3 border p-2 rounded mb-2"
//             >

//               <img
//                 src={item.img}
//                 className="w-16 h-16"
//               />

//               <div className="flex-1">

//                 <p>{item.name}</p>

//                 <p>
//                   ₹{item.price} × {item.qty}
//                 </p>

//                 <button
//                   onClick={() =>
//                     handleQtyChange(item.product_id, -1)
//                   }
//                 >
//                   -
//                 </button>

//                 <button
//                   onClick={() =>
//                     handleQtyChange(item.product_id, 1)
//                   }
//                 >
//                   +
//                 </button>

//               </div>

//               <button
//                 onClick={() =>
//                   removeFromCart(item.product_id)
//                 }
//               >
//                 <FiTrash2 />
//               </button>

//             </div>

//           ))}



//           {/* ADDRESS */}

//           <h3 className="mt-4 font-semibold">

//             Delivery Address

//           </h3>


//           {addresses.map(addr => (

//             <div
//               key={addr.id}
//               onClick={() =>
//                 setSelectedAddress(addr)
//               }
//               className={`border p-3 rounded mb-2 cursor-pointer ${
//                 selectedAddress?.id === addr.id
//                   ? "border-red-800 bg-red-50"
//                   : ""
//               }`}
//             >

//               <p className="font-semibold">

//                 {addr.name}

//               </p>

//               <p>

//                 {addr.address},
//                 {addr.city},
//                 {addr.state}
//                 - {addr.pincode}

//               </p>

//               <p>

//                 Phone: {addr.phone}

//               </p>


//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setEditAddress(addr);
//                   setShowAddAddress(true);
//                 }}
//                 className="text-sm text-red-800"
//               >

//                 <FiEdit />
//                 Edit

//               </button>

//             </div>

//           ))}


//           <button
//             onClick={() => {
//               setEditAddress(null);
//               setShowAddAddress(true);
//             }}
//             className="flex gap-2 bg-red-800 text-white px-3 py-2 rounded"
//           >
//             <FiPlus />
//             Add Address
//           </button>



//           {/* TOTAL */}

//           <div className="mt-4">

//             <p>Subtotal ₹{subtotal}</p>

//             <p>Discount ₹{discount}</p>

//             <p className="font-bold">
//               Total ₹{finalTotal}
//             </p>

//           </div>



//           {/* PLACE ORDER */}

//           <button
//             onClick={handlePlaceOrder}
//             className="w-full bg-red-800 text-white p-3 mt-3"
//           >
//             Place Order
//           </button>


//         </div>

//       </div>



//       {/* MODALS */}

//       <PaymentMethodModal
//         open={showPaymentMethod}
//         onClose={() =>
//           setShowPaymentMethod(false)
//         }
//         onSelectMethod={
//           handlePaymentMethodSelect
//         }
//       />


//       <AddAddessModal
//         open={showAddAddress}
//         editData={editAddress}
//         onClose={() =>
//           setShowAddAddress(false)
//         }
//         onSuccess={fetchAddresses}
//       />
//       <OTPAuthModal
//         open={showOTPAuth}
//         onClose={() =>
//           setShowOTPAuth(false)
//         }
//       />

//     </>
//   );

// }



// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   FiTrash2,
//   FiEdit,
//   FiPlus,
//   FiShoppingBag,
// } from "react-icons/fi";

// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// import { useCart } from "../providers/CartProvider";

// import AddAddessModal from "./AddAddressModal";
// import OTPAuthModal from "./OTPAuthModal";
// import PaymentLoader from "./PaymentLoader";
// import OrderSuccessModal from "./OrderSuccessModal";
// import PaymentMethodModal from "./PaymentMethodModal";

// import api from "../utils/apiInstance";

// export default function TestComponent({ open, onClose }) {

//   const { items, updateQty, removeFromCart, clearCart } = useCart();

//   const cartItems = Object.values(items ?? {});
//   const router = useRouter();

//   /* ================= AUTH ================= */

//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [showOTPAuth, setShowOTPAuth] = useState(false);

//   /* ================= ADDRESS ================= */

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddAddress, setShowAddAddress] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);

//   /* ================= PAYMENT ================= */

//   const [showPaymentMethod, setShowPaymentMethod] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState("Processing...");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [paymentGateways, setPaymentGateways] = useState(null);

//   /* ================= COUPON ================= */

//   const [coupon, setCoupon] = useState("");
//   const [couponData, setCouponData] = useState(null);

//   /* ================= LOAD TOKEN ================= */

//   useEffect(() => {

//     if (typeof window !== "undefined") {

//       const t = localStorage.getItem("token");
//       const u = localStorage.getItem("user_id");

//       setToken(t);
//       setUserId(u);

//     }

//   }, []);

//   /* ================= FETCH PAYMENT GATEWAYS ================= */

//   useEffect(() => {
//     const fetchPaymentGateways = async () => {
//       try {
//         const response = await api.get("/user-dashboard/list-payment-gateways");
//         const gatewayData = response.data.data || response.data;
//         setPaymentGateways(gatewayData);
//       } catch (error) {
//         console.error("Failed to fetch payment gateways:", error);
//       }
//     };

//     if (open) {
//       fetchPaymentGateways();
//     }
//   }, [open]);

//   /* ================= VERIFY PHONEPE PAYMENT ================= */
//   // Payment verification is now handled by the backend via callback URL
//   // The backend will update order status when PhonePe sends the webhook
//   // Users will be redirected back to the site after payment completion

//   /* ================= FETCH ADDRESS ================= */

//   const fetchAddresses = async () => {

//     if (!token) return;

//     try {

//       const res = await api.get(
//         "/user-dashboard/cart/get-address",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       const data =
//         res?.data?.data ||
//         res?.data?.addresses ||
//         [];

//       setAddresses(data);

//       if (data.length > 0) {

//         const defaultAddr =
//           data.find(a => a.is_default == 1)
//           || data[0];

//         setSelectedAddress(defaultAddr);

//       }

//     } catch {

//       toast.error("Failed to load address");

//     }

//   };

//   useEffect(() => {

//     if (open && token)
//       fetchAddresses();

//   }, [open, token]);

//   /* ================= TOTAL ================= */

//   const subtotal =
//     cartItems.reduce(
//       (acc, item) =>
//         acc + item.price * item.qty,
//       0
//     );

//   const discount =
//     Number(couponData?.discount || 0);

//   const finalTotal =
//     Math.max(0, subtotal - discount);

//   /* ================= COUPON ================= */

//   const handleApplyCoupon = async () => {

//     if (!coupon)
//       return toast.error("Enter coupon");

//     try {

//       const res = await api.post(
//         "/user-dashboard/cart/apply-coupon",
//         {
//           code: coupon,
//           amount: subtotal
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setCouponData(res.data);

//       toast.success("Coupon applied");

//     } catch {

//       toast.error("Invalid coupon");

//     }

//   };

//   /* ================= PLACE ORDER ================= */

//   const handlePlaceOrder = () => {

//     // Validate cart is not empty
//     if (cartItems.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     // Check if user is logged in
//     if (!token) {
//       setShowOTPAuth(true);
//       return;
//     }

//     // Check if address is selected
//     if (!selectedAddress) {
//       toast.error("Please select a delivery address");
//       return;
//     }

//     // Show payment method selection
//     setShowPaymentMethod(true);

//   };

//   /* ================= PAYMENT METHOD ================= */

//   const handlePaymentMethodSelect = (method) => {

//     setShowPaymentMethod(false);

//     if (method === "razorpay")
//       handleRazorpayPayment();

//     if (method === "phonepe")
//       handlePhonePePayment();

//     if (method === "cod")
//       handleCODPayment();

//   };

//   /* ================= LOAD RAZORPAY SCRIPT ================= */

//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       if (window.Razorpay) return resolve(true);
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   /* ================= RAZORPAY PAYMENT ================= */

//   const handleRazorpayPayment = async () => {
//     setPaymentLoading(true);
//     setLoadingMessage("Initializing Razorpay...");

//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       setPaymentLoading(false);
//       return toast.error("Razorpay failed to load");
//     }

//     try {
//       setLoadingMessage("Creating order...");
      
//       const createRes = await api.post(
//         "/user-dashboard/cart/create-order",
//         { amount: finalTotal },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const order = createRes.data.order;
//       setPaymentLoading(false);

//       // Use Razorpay key from API
//       const razorpayKey = paymentGateways?.razorpay_key;

//       if (!razorpayKey) {
//         toast.error("Razorpay configuration missing");
//         return;
//       }

//       const options = {
//         key: razorpayKey,
//         amount: order.amount,
//         currency: "INR",
//         name: "Hamsani Silks",
//         order_id: order.id,

//         handler: async (response) => {
//           setPaymentLoading(true);
//           setLoadingMessage("Verifying payment...");
          
//           try {
//             await api.post(
//               "/user-dashboard/cart/verify-payment",
//               response,
//               { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setLoadingMessage("Completing your order...");
            
//             // Complete order with Razorpay details
//             const payload = {
//               user_id: userId,
//               address_id: selectedAddress.id,
//               payment: {
//                 method: "razorpay",
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 amount: finalTotal,
//               },
//               price_details: {
//                 subtotal,
//                 discount,
//                 coupon_code: couponData?.coupon_code || null,
//                 total_amount: finalTotal,
//               },
//               items: cartItems.map((item) => ({
//                 product_id: item.product_id,
//                 quantity: item.qty,
//                 price: item.price,
//                 total: item.price * item.qty,
//               })),
//             };

//             await api.post("/user-dashboard/orders", payload, {
//               headers: { Authorization: `Bearer ${token}` },
//             });

//             setLoadingMessage("Order placed successfully!");
            
//             setTimeout(() => {
//               setPaymentLoading(false);
//               setShowSuccessModal(true);
//               clearCart();
//               onClose();
//             }, 1000);

//           } catch (error) {
//             setPaymentLoading(false);
//             toast.error(error.response?.data?.message || "Payment verification failed");
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             setPaymentLoading(false);
//             toast.error("Payment cancelled");
//           },
//         },
//         theme: {
//           color: "#8B4513"
//         }
//       };

//       new window.Razorpay(options).open();
//     } catch (error) {
//       setPaymentLoading(false);
//       toast.error(error.response?.data?.message || "Failed to create order");
//     }
//   };

  /* ================= PHONEPE ================= */

  // const handlePhonePePayment = async () => {

  //   setPaymentLoading(true);
  //   setLoadingMessage("Creating PhonePe order...");

  //   try {

  //     // Validate cart items
  //     if (cartItems.length === 0) {
  //       throw new Error("Cart is empty");
  //     }

  //     // Get current URL for redirect
  //     const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
  //     const redirectUrl = `${currentUrl}/`; // Redirect to home page after payment

  //     const payload = {

  //       user_id: userId,

  //       address_id: selectedAddress.id,

  //       payment: {
  //         method: "phonepe",
  //         amount: finalTotal,
  //         redirect_url: redirectUrl, // Add redirect URL
  //         callback_url: `${currentUrl}/api/phonepe/callback` // Optional: for webhook
  //       },

  //       price_details: {
  //         subtotal,
  //         discount,
  //         coupon_code: couponData?.coupon_code || null,
  //         total_amount: finalTotal
  //       },

  //       items: cartItems.map(item => ({
  //         product_id: item.product_id,
  //         quantity: item.qty,
  //         price: item.price,
  //         total: item.price * item.qty
  //       }))

  //     };

  //     console.log("PhonePe payload:", payload);

  //     const res = await api.post(
  //       "/user-dashboard/create-phone-order",
  //       payload,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );

  //     console.log("PhonePe response:", res.data);

  //     // Validate response
  //     if (!res.data.success) {
  //       throw new Error(res.data.message || "Failed to create order");
  //     }

  //     if (!res.data.checkout_url) {
  //       throw new Error("Checkout URL not received from server");
  //     }

  //     // CRITICAL: Get order_id from response
  //     // Try multiple possible field names
  //     let orderId = res.data.order_id 
  //       || res.data.merchantTransactionId 
  //       || res.data.transaction_id
  //       || res.data.orderId;
      
  //     // TEMPORARY: Use static order_id for testing
  //     if (!orderId) {
  //       console.warn("⚠️ Backend didn't return order_id. Using static test order_id...");
  //       // Static order ID for testing
  //       orderId = "TEST_ORDER_123";
  //       toast("⚠️ Using static test order_id: TEST_ORDER_123", {
  //         icon: "⚠️",
  //         duration: 4000
  //       });
  //       console.log("Using static order_id:", orderId);
  //     }

  //     localStorage.setItem("phonepe_order_id", orderId);

  //     console.log("✅ Stored order_id:", orderId);
  //     console.log("🔗 Redirecting to:", res.data.checkout_url);

  //     setLoadingMessage("Redirecting to PhonePe...");

  //     // Small delay to show the message
  //     setTimeout(() => {
  //       window.location.href = res.data.checkout_url;
  //     }, 500);

  //   } catch (error) {

  //     console.error("PhonePe error:", error);
  //     setPaymentLoading(false);
      
  //     const errorMessage = error.response?.data?.message 
  //       || error.message 
  //       || "PhonePe payment failed";
      
  //     toast.error(errorMessage);

  //   }

  // };



//   const handlePhonePePayment = async () => {
//     setPaymentLoading(true);
//     setLoadingMessage("Creating order...");

//     try {
//       // Validations
//       if (!cartItems || cartItems.length === 0) {
//         throw new Error("Cart is empty");
//       }

//       if (!selectedAddress?.id) {
//         throw new Error("Please select delivery address");
//       }

//       // Step 1: Create order first to get order.id
//       setLoadingMessage("Creating order...");
      
//       const createOrderRes = await api.post(
//         "/user-dashboard/cart/create-order",
//         { amount: finalTotal },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const order = createOrderRes.data.order;
      
//       if (!order || !order.id) {
//         console.error("❌ Order creation failed:", createOrderRes.data);
//         throw new Error("Failed to create order - order ID missing");
//       }

//       console.log("✅ Order created with ID:", order.id);

//       // Get current URL for redirect
//       const currentUrl = typeof window !== "undefined" ? window.location.origin : "";

//       // Step 2: Create PhonePe payment with the order.id
//       setLoadingMessage("Creating PhonePe payment...");

//       const payload = {
//         user_id: userId,
//         address_id: selectedAddress.id,
//         order_id: order.id,  // Pass the order.id from step 1
//         payment: {
//           method: "phonepe",
//           amount: finalTotal,
//           redirect_url: `${currentUrl}/`,
//           callback_url: `${currentUrl}/api/phonepe/callback`,
//         },
//         price_details: {
//           subtotal,
//           discount,
//           coupon_code: couponData?.coupon_code || null,
//           total_amount: finalTotal,
//         },
//         items: cartItems.map((item) => ({
//           product_id: item.product_id,
//           quantity: item.qty,
//           price: item.price,
//           total: item.price * item.qty,
//         })),
//       };

//       console.log("PhonePe payload:", payload);

//       const res = await api.post(
//         "/user-dashboard/create-phone-order",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//         console.log("PhonePe payload:", payload);
//       console.log("PhonePe response:", res.data);

//       // Validate response
//       if (!res.data?.success) {
//         throw new Error(res.data?.message || "Failed to create PhonePe payment");
//       }

//       const { checkout_url } = res.data;

//       if (!checkout_url) {
//         console.error("❌ Missing checkout_url in response:", res.data);
//         throw new Error("Checkout URL missing from server");
//       }

//       console.log("✅ Order ID from create-order API:", order.id);
//       console.log("🔗 Redirecting to PhonePe:", checkout_url);

//       setLoadingMessage("Redirecting to PhonePe...");

//       // Redirect to PhonePe checkout
//       // Order ID is managed by the backend via the order.id from step 1
//       setTimeout(() => {
//         window.location.href = checkout_url;
//       }, 500);

//     } catch (error) {
//       console.error("PhonePe error:", error);
//       setPaymentLoading(false);

//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "PhonePe payment failed";

//       toast.error(errorMessage);
//     }
//   };


//   /* ================= COD ================= */

//   const handleCODPayment = async () => {

//     setPaymentLoading(true);
//     setLoadingMessage("Placing COD order...");

//     try {

//       const payload = {
//         user_id: userId,
//         address_id: selectedAddress.id,
//         payment: {
//           method: "cod",
//           amount: finalTotal
//         },
//         price_details: {
//           subtotal,
//           discount,
//           coupon_code: couponData?.coupon_code || null,
//           total_amount: finalTotal
//         },
//         items: cartItems.map(item => ({
//           product_id: item.product_id,
//           quantity: item.qty,
//           price: item.price,
//           total: item.price * item.qty
//         }))
//       };

//       await api.post(
//         "/user-dashboard/orders",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       clearCart();

//       setPaymentLoading(false);

//       setShowSuccessModal(true);

//       toast.success("Order placed successfully!");

//     } catch (error) {

//       console.error("COD error:", error);
//       setPaymentLoading(false);
//       toast.error(error.response?.data?.message || "Failed to place COD order");

//     }

//   };

//   /* ================= QTY ================= */

//   const handleQtyChange = (id, delta) => {

//     const item = items[id];

//     if (!item) return;

//     const qty = item.qty + delta;

//     if (qty < 1)
//       removeFromCart(id);
//     else
//       updateQty(id, qty);

//   };

//   /* ================= UI ================= */

//   return (

//     <>
//       {paymentLoading &&
//         <PaymentLoader message={loadingMessage} />
//       }

//       <OrderSuccessModal
//         open={showSuccessModal}
//         onClose={() => {
//           setShowSuccessModal(false);
//           onClose(); // Close the cart sidebar too
//           router.push("/dashboard/purchase-history"); // Redirect to order history
//         }}
//       />

//       <div className={`fixed inset-0 z-[9999] ${open ? "visible" : "invisible"}`}>

//         <div
//           className="absolute inset-0 bg-black/40"
//           onClick={onClose}
//         />

//         <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-5 overflow-y-auto">

//           <h2 className="text-xl font-semibold mb-3">
//             Your Cart ({cartItems.length})
//           </h2>

//           {/* EMPTY CART STATE */}
//           {cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
//               <div className="relative mb-6 animate-bounce">
//                 <FiShoppingBag className="w-24 h-24 text-gray-300" />
//                 <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">
//                   0
//                 </div>
//               </div>
              
//               <h3 className="text-2xl font-semibold text-gray-800 mb-2 animate-slideUp">
//                 Your Cart is Empty
//               </h3>
              
//               <p className="text-gray-500 text-center mb-6 max-w-xs animate-slideUp" style={{ animationDelay: '0.1s' }}>
//                 Looks like you haven't added anything to your cart yet. Start shopping now!
//               </p>
              
//               <button
//                 onClick={() => {
//                   onClose();
//                   router.push("/collections");
//                 }}
//                 className="bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 animate-slideUp"
//                 style={{ animationDelay: '0.2s' }}
//               >
//                 <FiShoppingBag className="w-5 h-5" />
//                 Start Shopping
//               </button>
//             </div>
//           ) : (
//             <>
//               {/* CART ITEMS */}

//               {cartItems.map(item => (

//                 <div key={item.product_id} className="flex gap-3 border p-2 rounded mb-2">

//                   <img src={item.img} className="w-16 h-16 object-cover"/>

//                   <div className="flex-1">

//                     <p>{item.name}</p>

//                     <p>₹{item.price} × {item.qty}</p>

//                     <div className="flex gap-2 mt-1">

//                       <button onClick={() => handleQtyChange(item.product_id,-1)}>−</button>

//                       <button onClick={() => handleQtyChange(item.product_id,1)}>+</button>

//                     </div>

//                   </div>

//                   <button onClick={() => removeFromCart(item.product_id)}>
//                     <FiTrash2/>
//                   </button>

//                 </div>

//               ))}

//               {/* ADDRESS */}

//               <h3 className="font-semibold mt-4">Address</h3>

//               {addresses.map(addr => (

//                 <div
//                   key={addr.id}
//                   onClick={()=>setSelectedAddress(addr)}
//                   className={`border p-3 rounded mb-2 cursor-pointer ${
//                     selectedAddress?.id === addr.id
//                       ? "border-red-800 bg-red-50"
//                       : ""
//                   }`}
//                 >

//                   <p>{addr.name}</p>
//                   <p>{addr.address}</p>

//                   <button
//                     onClick={(e)=>{
//                       e.stopPropagation();
//                       setEditAddress(addr);
//                       setShowAddAddress(true);
//                     }}
//                   >
//                     <FiEdit/>
//                   </button>

//                 </div>

//               ))}

//               <button
//                 onClick={()=>setShowAddAddress(true)}
//                 className="bg-red-800 text-white px-3 py-2 rounded"
//               >
//                 <FiPlus/> Add Address
//               </button>

//               {/* TOTAL */}

//               <div className="mt-4">

//                 <p>Subtotal ₹{subtotal}</p>
//                 <p>Discount ₹{discount}</p>

//                 <p className="font-bold">
//                   Total ₹{finalTotal}
//                 </p>

//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => {
//                     onClose();
//                     router.push("/collections");
//                   }}
//                   className="flex-1 bg-white border-2 border-[#8B4513] text-[#8B4513] py-3 rounded-lg hover:bg-[#F5F5DC] transition-all font-medium"
//                 >
//                   Continue Shopping
//                 </button>
                
//                 <button
//                   onClick={handlePlaceOrder}
//                   className="flex-1 bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-all font-medium"
//                 >
//                   Place Order
//                 </button>
//               </div>
//             </>
//           )}

//         </div>

//       </div>

//       <PaymentMethodModal
//         open={showPaymentMethod}
//         onClose={()=>setShowPaymentMethod(false)}
//         onSelectMethod={handlePaymentMethodSelect}
//       />

//       <AddAddessModal
//         open={showAddAddress}
//         editData={editAddress}
//         onClose={()=>setShowAddAddress(false)}
//         onSuccess={fetchAddresses}
//       />
//       <OTPAuthModal
//         open={showOTPAuth}
//         onClose={()=>setShowOTPAuth(false)}
//         onSuccess={() => {
//           // Reload token after successful login
//           setToken(localStorage.getItem("token"));
//           setUserId(localStorage.getItem("user_id"));
//           setShowOTPAuth(false);
//           // Fetch addresses for the newly logged in user
//           fetchAddresses();
//         }}
//       />

//     </>
//   );

// }