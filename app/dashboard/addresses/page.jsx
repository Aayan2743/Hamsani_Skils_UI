"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm());

  /* ---------------- HELPERS ---------------- */
  function emptyForm() {
    return {
      id: null,
      name: "",
      address: "",
      pincode: "",
      city: "",
      phone: "",
      state: "",
    };
  }

  /* ---------------- FETCH ADDRESSES ---------------- */
  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get("/user-dashboard/cart/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.data || [];
      // Limit to only 2 addresses
      setAddresses(data.slice(0, 2));
    } catch (error) {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  function startAdd() {
    if (addresses.length >= 2) {
      toast.error("Maximum 2 addresses allowed");
      return;
    }
    setEditingId("new");
    setForm(emptyForm());
  }

  function startEdit(id) {
    const addr = addresses.find((a) => a.id === id);
    if (!addr) return;

    setEditingId(id);
    setForm({ 
      id: addr.id,
      name: addr.name || "",
      address: addr.address || "",
      pincode: addr.pincode || "",
      city: addr.city || "",
      phone: addr.phone || "",
      state: addr.state || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm());
  }

  /* ---------------- PINCODE → CITY / STATE ---------------- */
  async function handlePostalChange(value) {
    const pincode = value.replace(/\D/g, "").slice(0, 6);
    setForm((prev) => ({ ...prev, pincode, city: "", state: "" }));

    if (pincode.length !== 6) return;

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await res.json();

      if (
        Array.isArray(data) &&
        data[0]?.Status === "Success" &&
        data[0]?.PostOffice?.length
      ) {
        const po = data[0].PostOffice[0];
        setForm((prev) => ({
          ...prev,
          city: po.District,
          state: po.State,
        }));
      } else {
        toast.error("Invalid pincode");
      }
    } catch {
      toast.error("Failed to fetch pincode details");
    }
  }

  /* ---------------- SAVE ---------------- */
  async function saveAddress(e) {
    e.preventDefault();
    
    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error("All fields are required");
      return;
    }

    if (form.phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    if (form.pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setSaving(true);

    try {
      const url = editingId === "new"
        ? "/user-dashboard/cart/add-address"
        : `/user-dashboard/cart/update-address/${form.id}`;

      await api.post(url, {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(editingId === "new" ? "Address added successfully" : "Address updated successfully");
      await fetchAddresses();
      cancelEdit();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setSaving(false);
    }
  }

  /* ---------------- DELETE ---------------- */
  async function removeAddress(id) {
    if (!confirm("Delete this address?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      await api.delete(`/user-dashboard/cart/delete-address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Address deleted successfully");
      await fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
    }
  }

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-8">Loading addresses...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Addresses (Max 2)</h2>
        <button
          onClick={startAdd}
          disabled={addresses.length >= 2}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
            addresses.length >= 2
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "border hover:bg-gray-50"
          }`}
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {addresses.length >= 2 && (
        <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded border border-orange-200">
          Maximum 2 addresses allowed. Please edit or delete an existing address.
        </div>
      )}

      {editingId === "new" && (
        <Card>
          <AddressForm
            form={form}
            setForm={setForm}
            onCancel={cancelEdit}
            onSave={saveAddress}
            saving={saving}
            onPostalChange={handlePostalChange}
          />
        </Card>
      )}

      {addresses.length === 0 && editingId !== "new" && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No addresses found</p>
          <button
            onClick={startAdd}
            className="text-sm text-[#8B4513] font-medium hover:underline"
          >
            Add your first address
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {addresses.map((a) => (
          <Card key={a.id}>
            {editingId === a.id ? (
              <AddressForm
                form={form}
                setForm={setForm}
                onCancel={cancelEdit}
                onSave={saveAddress}
                saving={saving}
                onPostalChange={handlePostalChange}
              />
            ) : (
              <div className="flex justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-800">{a.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{a.address}</div>
                  <div className="text-sm text-gray-600">
                    {a.city}, {a.state} - {a.pincode}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">📞 {a.phone}</div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => startEdit(a.id)}>
                    <Pencil size={18} className="text-[#8B4513]" />
                  </button>
                  <button onClick={() => removeAddress(a.id)}>
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({ children }) {
  return (
    <div className="border rounded-md bg-white p-4 lg:p-6">
      {children}
    </div>
  );
}

function AddressForm({
  form,
  setForm,
  onCancel,
  onSave,
  saving,
  onPostalChange,
}) {
  return (
    <form onSubmit={onSave} className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Field
          label="Full Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          required
        />
        <Field
          label="Phone"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v.replace(/\D/g, "").slice(0, 10) })}
          maxLength={10}
          required
        />
      </div>

      <Field
        label="Address"
        value={form.address}
        onChange={(v) => setForm({ ...form, address: v })}
        required
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Field
          label="Pincode"
          value={form.pincode}
          onChange={onPostalChange}
          maxLength={6}
          required
        />
        <Field
          label="City"
          value={form.city}
          disabled
          placeholder="Auto-filled from pincode"
        />
      </div>

      <Field
        label="State"
        value={form.state}
        disabled
        placeholder="Auto-filled from pincode"
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white rounded-md text-sm disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, disabled, placeholder, maxLength, required }) {
  return (
    <div>
      <label className="block text-sm mb-1 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8B4513] disabled:bg-gray-100"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
}
