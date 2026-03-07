"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";
import { Phone, ArrowRight, Hash } from "lucide-react";
import Link from "next/link";
import { setToken, setUser } from "../../utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  
  const [step, setStep] = useState("phone"); // "phone" | "otp"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!phone || phone.length !== 10) {
      return toast.error("Enter valid 10-digit phone number");
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/send-otp", {
        identifier: phone,
      });

      if (res.data?.status) {
        toast.success(res.data.message || "OTP sent successfully");
        setStep("otp");
      } else {
        toast.error(res.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      return toast.error("Enter valid 6-digit OTP");
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/verify-login-otp", {
        identifier: phone,
        otp: otp,
      });

      if (res.data?.status && res.data?.token) {
        const { token, user } = res.data;

        // Use the setToken function which also sets expiry time
        setToken(token);
        setUser(user);

        toast.success(res.data.message || "Login successful! Welcome back 🎉");
        // Redirect to home page after successful login
        router.push("/");
      } else {
        toast.error(res.data?.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#F5F5DC] via-[#FFF8E7] to-[#F5F5DC] p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#8B4513]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C4A962]/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#8B4513]/3 to-[#C4A962]/3 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative z-10 animate-fade-in-up">
        
        {/* LEFT SIDE - IMAGE */}
        <div className="relative h-64 lg:h-auto overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/20 to-[#C4A962]/20 z-10" />
          <img
            src="/mix9nuts.jpeg"
            alt="Login"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-4 text-center drop-shadow-lg animate-fade-in font-display">
              Welcome Back
            </h2>
            <p className="text-lg text-center drop-shadow-md animate-fade-in-delayed">
              Continue your journey with Hamsini Silks
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6 animate-fade-in-right">
            
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-[#2C1810] mb-2 animate-slide-down font-display">
                Sign In
              </h1>
              <p className="text-gray-600 animate-slide-down-delayed">
                 Enter your mobile number to access your account
              </p>
            </div>

            {/* Form */}
            {step === "phone" ? (
              <form onSubmit={handleSendOTP} className="space-y-5">
                
                {/* Phone Number Input */}
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <label className="block text-sm font-semibold text-[#2C1810]">
                    Please Provide WhatsApp number 
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#8B4513] transition-colors" />
                    <input
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#8B4513] focus:ring-4 focus:ring-[#8B4513]/10 outline-none transition-all duration-300 bg-white/50"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      maxLength={10}
                      required
                    />
                  </div>
                  {/* <p className="text-xs text-gray-500 mt-1">
                    Please provide WhatsApp Number
                  </p> */}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#8B4513] to-[#6D3410] hover:from-[#6D3410] hover:to-[#8B4513] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group animate-slide-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-5">
                
                {/* OTP Input */}
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <label className="block text-sm font-semibold text-[#2C1810]">
                    Enter OTP
                  </label>
                  <div className="relative group">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#8B4513] transition-colors" />
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#8B4513] focus:ring-4 focus:ring-[#8B4513]/10 outline-none transition-all duration-300 bg-white/50 text-center text-2xl tracking-widest"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    OTP sent to {phone}
                  </p>
                </div>

                {/* Change Phone Number */}
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-sm text-[#8B4513] hover:text-[#6D3410] font-medium transition-colors animate-slide-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  ← Change Phone Number
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#8B4513] to-[#6D3410] hover:from-[#6D3410] hover:to-[#8B4513] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group animate-slide-up"
                  style={{ animationDelay: '0.3s' }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Register Link */}
            {/* <div className="text-center pt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/account/register"
                  className="text-[#8B4513] hover:text-[#6D3410] font-semibold transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-delayed {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down-delayed {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.3s both;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        .animate-slide-down-delayed {
          animation: slide-down-delayed 0.5s ease-out 0.1s both;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out both;
        }
      `}</style>
    </div>
  );
}
