"use client";

import React from "react";

export default function DashboardHome() {
  /* ---------- STATIC UI DATA ---------- */
  const totalExpenditure = "₹12,450.00";

  const stats = {
    cart: 3,
    wishlist: 5,
    ordered: 12,
  };

  const defaultAddress = {
    address: "Hamisni Foods, Sector 62, Noida, UP",
    phone: "+91 98765 43210",
  };

  return (
    <div className="min-h-screen text-gray-900 p-4 md:p-4">

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {/* STATS */}
        <div className="lg:col-span-2 bg-white border rounded shadow-sm p-2 lg:p-3">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
            <StatCard
              title="Products in Cart"
              value={pad(stats.cart)}
               icon="/cart-shopping-svgrepo-com.svg"
            />
            <StatCard
              title="Products in Wishlist"
              value={pad(stats.wishlist)}
               icon="/wishlist-svgrepo-com.svg"
            />
            <StatCard
              title="Total Products Ordered"
              value={pad(stats.ordered)}
               icon="/order-svgrepo-com.svg"
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="bg-white border rounded shadow-sm p-3 flex flex-col justify-between">
          <div>
            <h4 className="font-medium mb-2">Default Shipping Address</h4>

            {defaultAddress ? (
              <div className="text-sm text-gray-700">
                <div>{defaultAddress.address}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {defaultAddress.phone}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                You don't have a default address yet.
              </div>
            )}
          </div>

          <div className="mt-3">
            <button
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-full shadow text-sm cursor-default"
            >
              <span className="text-lg leading-none">+</span>
              <span className="font-medium">Add New Address</span>
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="bg-white border rounded shadow-sm p-4">
        <div className="w-full rounded overflow-hidden">
          <img
            src="https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492&width=1920"
            alt="Hamisni Dry Fruits Box"
            className="w-full h-[460px] object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="flex items-center gap-2 p-2 border rounded bg-white flex-1 min-h-[60px] lg:gap-3 lg:p-3 lg:min-h-[74px]">
      <div className="w-10 h-10 lg:w-9 lg:h-12 rounded-full flex items-center justify-center bg-red-50 shrink-0">
        <img src={icon} alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
      </div>
      <div>
        <div className="text-base lg:text-lg font-bold leading-tight">
          {value}
        </div>
        <div className="text-xs text-gray-400">{title}</div>
      </div>
    </div>
  );
}

function pad(n) {
  const s = String(n ?? 0);
  return s.length === 1 ? `0${s}` : s;
}
