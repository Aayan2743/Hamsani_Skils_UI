"use client";

import React from "react";

export default function ReturnsPage() {
  // STATIC SAMPLE DATA (edit as needed)
  const returnData = [
    {
      id: 1,
      date: "2024-01-12",
      orderId: "ORD-10293",
      product: "Banana Choco-Chip Millet Pancake",
      amount: "₹504",
      status: "Pending",
    },
    {
      id: 2,
      date: "2024-02-01",
      orderId: "ORD-98342",
      product: "Millet Pancake Combo (Pack of 3)",
      amount: "₹621",
      status: "Approved",
    },
  ];

  const isEmpty = returnData.length === 0;

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Applied Return Request</h2>

      <div className="border-b mb-4"></div>

      {/* Table Header */}
      <div className="grid grid-cols-12 text-sm font-medium text-gray-600 px-2 mb-3">
        <div className="col-span-1">So.no</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2">Order Id</div>
        <div className="col-span-4">Product</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-1">Status</div>
      </div>

      <div className="border-b mb-6"></div>

      {/* Empty State */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <svg
            className="w-12 h-12 mb-2 opacity-60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path d="M9 10h.01M15 10h.01M8 15c1.5-1 6.5-1 8 0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-base">Nothing found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {returnData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 text-sm px-2 py-3 border-b last:border-none"
            >
              <div className="col-span-1">{item.id}</div>
              <div className="col-span-2">{item.date}</div>
              <div className="col-span-2">{item.orderId}</div>
              <div className="col-span-4">{item.product}</div>
              <div className="col-span-2 font-medium">{item.amount}</div>
              <div className="col-span-1">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    item.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
