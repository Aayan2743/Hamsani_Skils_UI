"use client";

import React, { useRef, useState } from "react";

export default function ProfilePage() {
  // profile fields
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("9876543210");
  const [email, setEmail] = useState("john@example.com");

  // photo
  const [photoUrl, setPhotoUrl] = useState(null);
  const photoFileRef = useRef(null);

  // tabs
  const [activeTab, setActiveTab] = useState("profile");

  // security
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // photo handlers
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    photoFileRef.current = file;
    setPhotoUrl(URL.createObjectURL(file));
  }

  function handleRemovePhoto() {
    photoFileRef.current = null;
    setPhotoUrl(null);
  }

  // submit handlers (UI only)
  function handleUpdateProfile(e) {
    e.preventDefault();
    alert("Profile updated (UI only)");
  }

  function handleChangePassword(e) {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password changed (UI only)");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Profile Settings</h2>
      <p className="text-sm text-gray-600">Manage your account settings</p>

      {/* Tabs */}
      <div className="mt-4 p-4 rounded">
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === "profile"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === "security"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Security
          </button>
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="w-full lg:max-w-xl">
            <form
              onSubmit={handleUpdateProfile}
              className="bg-white border rounded p-6 space-y-6"
            >
              <h3 className="font-medium">Basic Info</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 block mb-1">
                    Your name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-3 py-2 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 block mb-1">
                    Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border px-3 py-2 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 block mb-1">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded text-sm"
                  />
                </div>

                {/* Photo */}
                <div className="photo-wrapper flex items-center gap-4">
                  <div className="photo-preview w-20 h-20 rounded border bg-gray-100 flex items-center justify-center overflow-hidden">
                    {photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photoUrl}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No photo</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="text-sm text-gray-700 block mb-1">
                      Photo
                    </label>

                    <label className="inline-flex items-center gap-3 px-3 py-2 border rounded cursor-pointer">
                      <span className="text-sm">Choose file</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="sr-only"
                      />
                    </label>

                    <div className="text-xs text-gray-500 mt-2 flex gap-2">
                      <span>PNG/JPEG, max 2MB</span>
                      {photoUrl && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="text-red-600 underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-400 text-white px-4 py-2 rounded text-sm"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div className="bg-white border rounded p-6 w-full lg:max-w-xl">
            <h3 className="text-xl font-semibold mb-4">Security</h3>

            <form
              onSubmit={handleChangePassword}
              className="space-y-4"
            >
              <div>
                <label className="text-sm block mb-1">
                  Current password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>

              <div>
                <label className="text-sm block mb-1">
                  New password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>

              <div>
                <label className="text-sm block mb-1">
                  Confirm new password
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                  }}
                  className="border px-3 py-2 rounded text-sm"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Small screen photo fix */}
      <style jsx>{`
        @media (max-width: 360px) {
          .photo-wrapper {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .photo-preview {
            order: 2 !important;
            margin-top: 0.5rem !important;
            width: 64px !important;
            height: 64px !important;
          }
        }
      `}</style>
    </div>
  );
}
