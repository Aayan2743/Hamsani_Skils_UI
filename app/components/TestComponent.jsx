"use client";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "../providers/CartProvider";
import AddAddessModal from "./AddAddressModal";
import OTPAuthModal from "./OTPAuthModal";
import PaymentLoader from "./PaymentLoader";
import OrderSuccessModal from "./OrderSuccessModal";
import PaymentMethodModal from "./PaymentMethodModal";
import api from "../utils/apiInstance";

export default function TestComponent({ open, onClose }) {
  const { items, updateQty, removeFromCart, clearCart } = useCart();
  const cartItems = Object.values(items ?? {});
  const router = useRouter();

  const [token, setToken] = useState(null);
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
      setToken(localStorage.getItem("token"));
      setUserId(localStorage.getItem("user_id"));
    }
  }, []);

  /* FETCH PAYMENT GATEWAYS CONFIG */
  useEffect(() => {
    const fetchPaymentGateways = async () => {
      try {
        const response = await api.get("/user-dashboard/list-payment-gateways");
        const gatewayData = response.data.data || response.data;
        setPaymentGateways(gatewayData);
      } catch (error) {
        console.error("Failed to fetch payment gateways:", error);
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
    if (!token) return;

    try {
      const res = await api.get("/user-dashboard/cart/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.data || [];
      setAddresses(data);
      setSelectedAddress(
        data.find((a) => a.is_default === 1) || data[0] || null
      );
    } catch {
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    if (open && token) fetchAddresses();
  }, [open, token]);

  /* APPLY COUPON */
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return toast.error("Enter coupon code");

    try {
      const res = await api.post(
        "/user-dashboard/cart/apply-coupon",
        { code: coupon.trim(), amount: subtotal },
        { headers: { Authorization: `Bearer ${token}` } }
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
    if (!token) {
      setShowOTPAuth(true);
      return;
    }

    // Then check if address is selected
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
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
      
      const createRes = await api.post(
        "/user-dashboard/cart/create-order",
        { amount: finalTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = createRes.data.order;
      setPaymentLoading(false);

      // Use Razorpay key from API or fallback to env variable
      const razorpayKey = paymentGateways?.razorpay_key
  console.log("test",razorpayKey)
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

      await api.post("/user-dashboard/orders", payload, {
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

        {/* EMPTY CART MESSAGE */}
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
              <div key={i} className="flex gap-3 border p-2 rounded mb-2">
                <img
                  src={item.img || "/placeholder.png"}
                  className="w-16 h-16 object-cover"
                  alt=""
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p>₹{item.price} × {item.qty}</p>

                  <div className="flex gap-2 mt-1">
                    <button onClick={() => handleQtyChange(item.product_id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleQtyChange(item.product_id, 1)}>+</button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item.product_id)}>
                  <FiTrash2 />
                </button>
              </div>
            ))}

        {/* ADDRESS SECTION */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Delivery Address</h3>

            <button
              onClick={() => {
                setEditAddress(null);
                setShowAddAddress(true);
              }}
              className="flex items-center gap-1.5 text-sm bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white px-3 py-1.5 rounded-lg hover:shadow-md transition-all font-medium"
            >
              <FiPlus className="w-4 h-4" /> Add New
            </button>
          </div>

          {addresses.length === 0 && (
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
          )}

          {addresses.map((addr) => (
            <div
              key={addr.id}
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

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditAddress(addr);
                      setShowAddAddress(true);
                    }}
                    className="text-xs text-[#8B4513] font-medium mt-2 flex items-center gap-1 hover:underline"
                  >
                    <FiEdit className="w-3 h-3" /> Edit Address
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COUPON */}
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
        onClose={() => {
          setShowAddAddress(false);
          setEditAddress(null);
        }}
        onSuccess={(newAddressData) => {
          // Optimistically update the addresses list without full refetch
          if (editAddress) {
            // Update existing address
            setAddresses(prev => 
              prev.map(addr => addr.id === editAddress.id ? newAddressData : addr)
            );
            setSelectedAddress(newAddressData);
          } else {
            // Add new address
            setAddresses(prev => [...prev, newAddressData]);
            setSelectedAddress(newAddressData);
          }
          
          setShowAddAddress(false);
          setEditAddress(null);
          
          // Fetch fresh data in background to ensure sync
          fetchAddresses();
        }}
      />

      {/* OTP AUTH MODAL */}
      <OTPAuthModal
        open={showOTPAuth}
        onClose={() => setShowOTPAuth(false)}
        onSuccess={() => {
          setToken(localStorage.getItem("token"));
          setUserId(localStorage.getItem("user_id"));
          fetchAddresses();
          setShowOTPAuth(false);
          // After successful login, show payment modal
          setTimeout(() => {
            if (selectedAddress) {
              setShowPaymentMethod(true);
            } else {
              toast.info("Please select a delivery address");
            }
          }, 500);
        }}
      />
      </div>
    </>
  );
}
