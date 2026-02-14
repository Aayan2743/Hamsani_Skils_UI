"use client";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../utils/apiInstance";
import axios from "axios";
import OTPAuthModal from "./OTPAuthModal";

export default function AddAddressModal({
  open,
  onClose,
  onSuccess,
  editData = null,
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
  const [pinLoading, setPinLoading] = useState(false);
  const [showOTPAuth, setShowOTPAuth] = useState(false);

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

  /* ================= FETCH CITY & STATE ================= */
  const fetchPincodeDetails = async (pin) => {
    setPinLoading(true);
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pin}`
      );

      const data = res.data?.[0];

      if (data?.Status !== "Success" || !data?.PostOffice?.length) {
        toast.error("Invalid pincode");
        setForm((p) => ({ ...p, city: "", state: "" }));
        return;
      }

      const postOffice = data.PostOffice[0];

      setForm((p) => ({
        ...p,
        city: postOffice.District || "",
        state: postOffice.State || "",
      }));
    } catch (error) {
      toast.error("Failed to fetch pincode details");
      setForm((p) => ({ ...p, city: "", state: "" }));
    } finally {
      setPinLoading(false);
    }
  };

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((p) => ({
        ...p,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }

    if (name === "pincode") {
      const pin = value.replace(/\D/g, "").slice(0, 6);

      setForm((p) => ({
        ...p,
        pincode: pin,
        city: "",
        state: "",
      }));

      if (pin.length === 6) {
        fetchPincodeDetails(pin);
      }

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

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    if (pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      setShowOTPAuth(true);
      return;
    }

    setLoading(true);

    try {
      const url = editData
        ? `/user-dashboard/cart/update-address/${editData.id}`
        : `/user-dashboard/cart/add-address`;

      const res = await api.post(url, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(
        editData
          ? "Address updated successfully 🎉"
          : "Address added successfully 🎉"
      );

      onSuccess(res.data?.data || form);
      onClose();
    } catch (err) {
      const apiData = err.response?.data;

      // Check if it's an authentication error
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Session expired. Please login again");
        setShowOTPAuth(true);
        return;
      }
      if (typeof apiData?.errors === "string") {
        toast.error(apiData.errors);
        return;
      }

      if (typeof apiData?.errors === "object") {
        const firstKey = Object.keys(apiData.errors)[0];
        toast.error(apiData.errors[firstKey]?.[0] || "Invalid input");
        return;
      }

      toast.error(apiData?.message || err.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* OTP AUTH MODAL - Render first with higher z-index */}
      {showOTPAuth && (
        <OTPAuthModal
          open={showOTPAuth}
          onClose={() => setShowOTPAuth(false)}
          onSuccess={() => {
            setShowOTPAuth(false);
            // Retry saving address after successful login
            setTimeout(() => {
              handleSubmit();
            }, 500);
          }}
        />
      )}

      {/* ADDRESS MODAL */}
      <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center">
        <div className="bg-white w-[90%] max-w-md rounded-xl p-5 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
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
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8B4513]"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8B4513]"
              value={form.phone}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8B4513]"
              rows={2}
              value={form.address}
              onChange={handleChange}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8B4513]"
              value={form.pincode}
              onChange={handleChange}
            />

            <input
              name="city"
              placeholder={pinLoading ? "Fetching city..." : "City"}
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={form.city}
              disabled
            />

            <input
              name="state"
              placeholder={pinLoading ? "Fetching state..." : "State"}
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={form.state}
              disabled
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white py-2.5 rounded-lg font-semibold disabled:opacity-60 hover:shadow-lg transition-all"
            >
              {loading ? "Saving..." : "Save Address"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
