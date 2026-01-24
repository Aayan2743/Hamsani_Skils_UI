"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthAPI } from "../../api/AuthAPI";




const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) return setError("Please enter your email.");

    try {
      setLoading(true);
      await AuthAPI.otp({ email });

      localStorage.setItem("resetEmail", email);

    router.push(`/account/verify-otp?email=${encodeURIComponent(email)}`);


    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex flex-col">


  <div
    className="flex-1 flex items-center justify-center bg-cover bg-center relative"
    style={{
      backgroundImage:
        `url("https://9nutz.com/wp-content/uploads/2025/06/Millet_Murukku_19-300x300.webp")`,
    }}
  >
    <div className="absolute inset-0 backdrop-blur-sm"></div>

    <div className="relative z-10 bg-white/95 backdrop-blur-xl shadow-xl rounded-xl p-8 w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
        Forgot Password?
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Enter your email to reset your password.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-teal-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full mt-2 py-2 bg-blue-900 hover:bg-blue-900 text-white rounded-lg font-medium transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Next →"}
        </button>
      </form>

     
    </div>
    
  </div>
  
</div>

  );
};

export default ForgotPassword;
