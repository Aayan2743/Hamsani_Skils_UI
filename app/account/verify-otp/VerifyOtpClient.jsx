"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthAPI } from "../../api/AuthAPI";

export default function VerifyOtpClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ read email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.replace("/account/login");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await AuthAPI.verityotp({ email, otp });
      const resetToken = res?.data?.reset_token;

      if (!resetToken) {
        setError("No reset token received.");
        return;
      }

      localStorage.setItem("resetToken", resetToken);
      router.replace("/account/reset-password");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded w-full max-w-md">
        <h2 className="text-xl mb-4">Verify OTP</h2>

        <input
          type="email"
          value={email}
          readOnly
          className="w-full border p-2 mb-3 opacity-60"
        />

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 mb-3"
          placeholder="Enter OTP"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="w-full bg-blue-600 text-white py-2" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
