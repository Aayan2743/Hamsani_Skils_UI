"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const STATIC_ADDRESSES = [
  {
    id: 1,
    address: "12-4-56, MG Road, Near Central Mall",
    postal: "500081",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    phone: "9876543210",
  },
  {
    id: 2,
    address: "Flat 302, Green Residency, Whitefield",
    postal: "560066",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    phone: "9123456780",
  },
];


export default function AddressesPage() {
  const [addresses, setAddresses] = useState(STATIC_ADDRESSES);

  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm());

  /* ---------------- HELPERS ---------------- */
  function emptyForm() {
    return {
      id: null,
      address: "",
      postal: "",
      city: "",
      phone: "",
      state: "",
      country: "India",
    };
  }

  function startAdd() {
    setEditingId("new");
    setForm(emptyForm());
  }

  function startEdit(id) {
    const addr = addresses.find((a) => a.id === id);
    if (!addr) return;

    setEditingId(id);
    setForm({ ...addr });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm());
  }

  /* ---------------- PINCODE → CITY / STATE (KEPT) ---------------- */
  async function handlePostalChange(value) {
    setForm((prev) => ({ ...prev, postal: value }));

    if (value.length !== 6) return;

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${value}`
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
      }
    } catch {
      // silent fail
    }
  }

  /* ---------------- SAVE (LOCAL ONLY) ---------------- */
  function saveAddress(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId === "new") {
        setAddresses((prev) => [
          ...prev,
          { ...form, id: Date.now() },
        ]);
      } else {
        setAddresses((prev) =>
          prev.map((a) =>
            a.id === editingId ? { ...form } : a
          )
        );
      }
      cancelEdit();
    } catch {
      setError("Failed to save address");
    } finally {
      setSaving(false);
    }
  }

  /* ---------------- DELETE ---------------- */
  function removeAddress(id) {
    if (!confirm("Delete this address?")) return;
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Addresses</h2>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 border px-3 py-2 rounded-md text-sm"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

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
                  <div className="font-medium">{a.address}</div>
                  <div className="text-sm text-gray-600">
                    {a.city} • {a.postal}
                  </div>
                  <div className="text-sm">📞 {a.phone}</div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => startEdit(a.id)}>
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => removeAddress(a.id)}>
                    <Trash2
                      size={18}
                      className="text-red-600"
                    />
                  </button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
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
          label="Address"
          value={form.address}
          onChange={(v) =>
            setForm({ ...form, address: v })
          }
        />
        <Field
          label="Postal code"
          value={form.postal}
          onChange={onPostalChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Field
          label="City"
          value={form.city}
          onChange={(v) =>
            setForm({ ...form, city: v })
          }
        />
        <Field
          label="Phone"
          value={form.phone}
          onChange={(v) =>
            setForm({ ...form, phone: v })
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Field
          label="State"
          value={form.state}
          onChange={(v) =>
            setForm({ ...form, state: v })
          }
        />
        <Field
          label="Country"
          value={form.country}
          onChange={(v) =>
            setForm({ ...form, country: v })
          }
        />
      </div>

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
          className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm"
        >
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {label}
      </label>
      <input
        className="w-full border rounded px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
