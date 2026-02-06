"use client";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AddAddressModal({
  open,
  onClose,
  onSuccess,
  editData = null, // 👈 pass address object for edit, null for add
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= PREFILL FOR EDIT ================= */
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        phone: editData.phone || "",
        address: editData.address || "",
        city: editData.city || "",
        state: editData.state || "",
        pincode: editData.pincode || "",
      });
    } else {
      setForm({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    }
  }, [editData]);

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((p) => ({ ...p, phone: value.replace(/\D/g, "").slice(0, 15) }));
      return;
    }

    if (name === "pincode") {
      setForm((p) => ({ ...p, pincode: value.replace(/\D/g, "").slice(0, 6) }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const { name, phone, address, city, state, pincode } = form;

    if (!name || !phone || !address || !city || !state || !pincode) {
      toast.error("All fields are required");
      return;
    }

    if (pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    setLoading(true);

    try {
      const url = editData
        ? `http://192.168.1.3:8000/api/user-dashboard/cart/update-address/${editData.id}`
        : `http://192.168.1.3:8000/api/user-dashboard/cart/add-address`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || "Something went wrong");
      }

      toast.success(
        editData ? "Address updated successfully 🎉" : "Address added successfully 🎉"
      );

      onSuccess(json?.data || form); // send back to parent
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-5 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {editData ? "Update Address" : "Add New Address"}
        </h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full border rounded px-3 py-2"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            className="w-full border rounded px-3 py-2"
            rows={2}
            value={form.address}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            className="w-full border rounded px-3 py-2"
            value={form.city}
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            className="w-full border rounded px-3 py-2"
            value={form.state}
            onChange={handleChange}
          />

          <input
            name="pincode"
            placeholder="Pincode"
            className="w-full border rounded px-3 py-2"
            value={form.pincode}
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded font-semibold disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
}
