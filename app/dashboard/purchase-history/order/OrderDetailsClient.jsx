"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import api from "../../../utils/apiInstance";

export default function OrderDetailsClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadOrder() {
      try {
        setLoading(true);
        setError(null);

        // Fetch order details from API
        const res = await api.get(`/ecom/orders/${orderId}`);

        if (!isMounted) return;

        // Try different response structures
        const orderData =
          res?.data?.data?.order ||
          res?.data?.order ||
          res?.data?.data ||
          res?.data ||
          null;

        if (!orderData) {
          setError("Order not found");
          setOrder(null);
        } else {
          setOrder(orderData);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load order details"
        );
        setOrder(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">
            {error || "Order not found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {orderId
              ? `Unable to load order details for ID: ${orderId}`
              : "No order ID provided in the URL"}
          </p>
          <Link
            href="/dashboard/purchase-history"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const address = order.address || {};

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Order Id: {order.id}</h1>
          <Link
            href="/dashboard/purchase-history"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Orders
          </Link>
        </div>

        {/* ORDER SUMMARY */}
        <section className="bg-white border rounded shadow-sm">
          <div className="p-6">
            <h2 className="text-sm font-semibold mb-4">
              Order Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <Row label="Order Code" value={order.id} />
                <Row label="Payment Status" value={order.payment_status} />
                <Row label="Order Status" value={order.order_status} />
                <Row
                  label="Shipping Address"
                  value={
                    address.address
                      ? `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`
                      : "N/A"
                  }
                />
              </div>

              <div className="space-y-3">
                <Row
                  label="Total Amount"
                  value={`₹${order.total_amount}`}
                />
                <Row
                  label="Discount"
                  value={`₹${order.discount_amount}`}
                />
                <Row
                  label="Payable"
                  value={`₹${order.payable_amount}`}
                />
                <Row label="Payment Gateway" value={order.gateway} />

                {order.order_status === "SHIPPED" && (
                  <>
                    <Row
                      label="Tracking Id"
                      value={order.tracking_number || "N/A"}
                    />
                    <Row
                      label="Tracking URL"
                      value={
                        order.tracking_url ? (
                          <a
                            href={order.tracking_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Track Shipment
                          </a>
                        ) : (
                          "N/A"
                        )
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ORDER ITEMS */}
        <section className="bg-white border rounded shadow-sm">
          <div className="p-6">
            <h3 className="text-sm font-semibold mb-4">
              Order Items
            </h3>

            {order.items && order.items.length > 0 ? (
              order.items.map((it, idx) => (
                <div
                  key={it.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border rounded p-4 mb-4"
                >
                  <div className="md:col-span-1 text-orange-600 font-semibold">
                    {idx + 1}
                  </div>

                  <div className="md:col-span-3 text-orange-600">
                    {it.variant?.product?.name || it.product_name || "N/A"}
                  </div>

                  <div className="md:col-span-1">
                    {it.variant?.image && (
                      <img
                        src={it.variant.image}
                        alt={it.variant?.product?.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </div>

                  <div className="md:col-span-2 text-sm">
                    SKU: {it.variant?.sku || it.sku || "N/A"}
                  </div>

                  <div className="md:col-span-1 text-sm">
                    Qty: {it.qty || it.quantity || 0}
                  </div>

                  <div className="md:col-span-2 text-sm">
                    Home Delivery
                  </div>

                  <div className="md:col-span-1 font-semibold">
                    ₹{it.price_at_time || it.price || 0}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No items found</p>
            )}
          </div>
        </section>

        {/* AMOUNT SUMMARY */}
        <aside className="bg-white border rounded shadow-sm p-6 max-w-md">
          <h3 className="text-sm font-semibold mb-4">
            Order Amount
          </h3>

          <div className="space-y-3 text-sm">
            <AmountRow
              label="Subtotal"
              value={`₹${order.total_amount}`}
            />
            <AmountRow
              label="Discount"
              value={`- ₹${order.discount_amount}`}
            />
            <AmountRow
              label="Payable"
              value={`₹${order.payable_amount}`}
              bold
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Row({ label, value }) {
  return (
    <div className="flex gap-4">
      <div className="w-40 text-gray-500">{label}:</div>
      <div className="flex-1 text-gray-800">{value}</div>
    </div>
  );
}

function AmountRow({ label, value, bold }) {
  return (
    <div
      className={`flex justify-between ${
        bold ? "font-semibold" : ""
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
