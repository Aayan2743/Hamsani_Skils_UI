"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function OrderDetailsPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- STATIC MOCK DATA ---------------- */
  const STATIC_ORDER = {
    id: "HS-ORD-10234",
    payment_status: "PAID",
    order_status: "SHIPPED",
    gateway: "Razorpay",
    total_amount: 18999,
    discount_amount: 2000,
    payable_amount: 16999,
    tracking_number: "BLUEDART-88990012",
    tracking_url: "https://www.bluedart.com/tracking",
    address: {
      address: "12-3-45, Silk Weavers Colony",
      city: "Kanchipuram",
      state: "Tamil Nadu",
      pincode: "631501",
      country: "India",
    },
    items: [
      {
        id: 1,
        qty: 1,
        price_at_time: 12999,
        variant: {
          sku: "HS-KAN-RED-ZARI",
          image:
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
          product: {
            name: "Kanchipuram Pure Silk Saree – Red Zari",
          },
        },
      },
      {
        id: 2,
        qty: 1,
        price_at_time: 6000,
        variant: {
          sku: "HS-BAN-GOLD",
          image:
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
          product: {
            name: "Banarasi Silk Saree – Gold Weave",
          },
        },
      },
    ],
  };
  /* -------------------------------------------------- */

  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setOrder(STATIC_ORDER);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="p-6">Loading order...</div>;
  }

  if (!order) {
    return <div className="p-6 text-red-500">Order not found</div>;
  }

  const address = order.address;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            Order Id: {order.id}
          </h1>
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
                  value={`${address.address}, ${address.city}, ${address.state} - ${address.pincode}`}
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
                      value={order.tracking_number}
                    />
                    <Row
                      label="Tracking URL"
                      value={
                        <a
                          href={order.tracking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Track Shipment
                        </a>
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

            {order.items.map((it, idx) => (
              <div
                key={it.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border rounded p-4 mb-4"
              >
                <div className="md:col-span-1 text-orange-600 font-semibold">
                  {idx + 1}
                </div>

                <div className="md:col-span-3 text-orange-600">
                  {it.variant.product.name}
                </div>

                <div className="md:col-span-1">
                  <img
                    src={it.variant.image}
                    alt={it.variant.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>

                <div className="md:col-span-2 text-sm">
                  SKU: {it.variant.sku}
                </div>

                <div className="md:col-span-1 text-sm">
                  Qty: {it.qty}
                </div>

                <div className="md:col-span-2 text-sm">
                  Home Delivery
                </div>

                <div className="md:col-span-1 font-semibold">
                  ₹{it.price_at_time}
                </div>
              </div>
            ))}
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
