"use client";

import { X } from "lucide-react";

export default function MobileFilterDrawer({ open, onClose, children }) {
  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* DRAWER */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} aria-label="Close filters">
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5 overflow-y-auto h-[calc(100%-64px)]">
          {children}
        </div>
      </aside>
    </>
  );
}
