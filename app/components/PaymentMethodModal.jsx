"use client";
import React, { useEffect, useState } from "react";
import { FiX, FiCreditCard } from "react-icons/fi";
import { SiPhonepe, SiRazorpay, SiCashapp, SiPaytm } from "react-icons/si";
import { MdPayment } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../utils/apiInstance";

export default function PaymentMethodModal({ open, onClose, onSelectMethod }) {
  const [paymentGateways, setPaymentGateways] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchPaymentGateways();
    }
  }, [open]);

  const fetchPaymentGateways = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const response = await api.get("/user-dashboard/list-payment-gateways", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      
      // Handle both response.data.data and response.data structures
      const gatewayData = response.data.data || response.data;
      
      setPaymentGateways(gatewayData);
    } catch (error) {
      toast.error("Failed to load payment methods");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  // Build payment methods array based on API response
  const getAvailablePaymentMethods = () => {
    if (!paymentGateways) return [];

    const methods = [];

    if (paymentGateways.razorpay_enabled === true) {
      methods.push({
        id: "razorpay",
        name: "Razorpay",
        icon: <SiRazorpay className="w-8 h-8 text-blue-600" />,
        description: "Pay securely with cards, UPI, wallets",
      });
    }

    if (paymentGateways.phonepe_enabled === true) {
      methods.push({
        id: "phonepe",
        name: "PhonePe",
        icon: <SiPhonepe className="w-8 h-8 text-purple-600" />,
        description: "Quick payment via PhonePe",
      });
    }

    if (paymentGateways.cashfree_enabled === true) {
      methods.push({
        id: "cashfree",
        name: "Cashfree",
        icon: <SiCashapp className="w-8 h-8 text-orange-600" />,
        description: "Pay with Cashfree gateway",
      });
    }

    if (paymentGateways.payu_enabled === true) {
      methods.push({
        id: "payu",
        name: "PayU",
        icon: <SiPaytm className="w-8 h-8 text-green-600" />,
        description: "Pay with PayU gateway",
      });
    }

    // if (paymentGateways.cod_enabled === true) {
    //   methods.push({
    //     id: "cod",
    //     name: "Cash on Delivery",
    //     icon: <MdPayment className="w-8 h-8 text-green-600" />,
    //     description: "Pay when you receive your order",
    //   });
    // }

    return methods;
  };

  const paymentMethods = getAvailablePaymentMethods();

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Select Payment Method</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]"></div>
              <span className="ml-3 text-gray-600">Loading payment methods...</span>
            </div>
          ) : paymentMethods.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No payment methods available</p>
              <button
                onClick={onClose}
                className="mt-4 text-[#8B4513] hover:underline"
              >
                Go back
              </button>
            </div>
          ) : (
            paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => onSelectMethod(method.id)}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-[#8B4513] hover:bg-[#F5F5DC] transition-all group"
              >
                <div className="flex-shrink-0">{method.icon}</div>
                
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#8B4513]">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>

                <FiCreditCard className="w-5 h-5 text-gray-400 group-hover:text-[#8B4513]" />
              </button>
            ))
          )}
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          All transactions are secure and encrypted
        </p>
      </div>
    </div>
  );
}
