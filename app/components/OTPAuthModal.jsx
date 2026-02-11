// "use client";

// import { useState } from "react";
// import { FiX } from "react-icons/fi";
// import toast from "react-hot-toast";
// import api from "../utils/apiInstance";
// import Link from "next/link";

// export default function OTPAuthModal({ open, onClose, onSuccess }) {
//   const [step, setStep] = useState("phone"); // "phone" | "otp"
//   const [isLogin, setIsLogin] = useState(true); // true = login, false = register
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   /* SEND OTP */
//   const handleSendOTP = async (e) => {
//     e.preventDefault();

//     if (!phone || phone.length !== 10) {
//       return toast.error("Enter valid 10-digit phone number");
//     }

//     if (!isLogin && !name.trim()) {
//       return toast.error("Enter your name");
//     }

//     if (!isLogin && !email.trim()) {
//       return toast.error("Enter your email");
//     }

//     setLoading(true);

//     try {
//       const endpoint = isLogin
//         ? "auth/send-otp"
//         : "/ecom/auth/register-with-otp";

//       const payload = isLogin
//         ? { phone }
//         : { phone, name: name.trim(), email: email.trim() };

//       const res = await api.post(endpoint, payload);

//       if (res.data?.success) {
//         toast.success("OTP sent to your phone");
//         setStep("otp");
//       } else {
//         toast.error(res.data?.message || "Failed to send OTP");
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to send OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* VERIFY OTP */
//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();

//     if (!otp || otp.length !== 6) {
//       return toast.error("Enter valid 6-digit OTP");
//     }

//     setLoading(true);

//     try {
//       const endpoint = isLogin
//         ? "/ecom/auth/verify-login-otp"
//         : "/ecom/auth/verify-register-otp";

//       const res = await api.post(endpoint, { phone, otp });

//       if (res.data?.success && res.data?.data?.token) {
//         const { token, user } = res.data.data;

//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));

//         toast.success(isLogin ? "Login successful!" : "Registration successful!");
        
//         // Call success callback
//         if (onSuccess) onSuccess();
        
//         // Close modal
//         handleClose();
//       } else {
//         toast.error(res.data?.message || "Invalid OTP");
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "OTP verification failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* RESET & CLOSE */
//   const handleClose = () => {
//     setStep("phone");
//     setPhone("");
//     setOtp("");
//     setName("");
//     setEmail("");
//     setIsLogin(true);
//     onClose();
//   };

//   /* TOGGLE LOGIN/REGISTER */
//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setStep("phone");
//     setOtp("");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
//         {/* CLOSE BUTTON */}
//         <button
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <FiX size={24} />
//         </button>

//         <div className="p-6">
//           {/* HEADER */}
//           <h2 className="text-2xl font-bold mb-2">
//             {isLogin ? "Login" : "Register"} with OTP
//           </h2>
//           <p className="text-gray-600 text-sm mb-6">
//             {step === "phone"
//               ? `Enter your phone number to ${isLogin ? "login" : "register"}`
//               : "Enter the OTP sent to your phone"}
//           </p>

//           {/* PHONE STEP */}
//           {step === "phone" && (
//             <form onSubmit={handleSendOTP} className="space-y-4">
//               {!isLogin && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       placeholder="Enter your name"
//                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                       required={!isLogin}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                       required={!isLogin}
//                     />
//                   </div>
//                 </>
//               )}

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
//                   placeholder="Enter 10-digit phone number"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                   maxLength={10}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
// className="w-full bg-[#800000] text-white py-3 rounded-lg font-semibold disabled:opacity-50"

//               >
//                 {loading ? "Sending..." : "Send OTP"}
//               </button>
//             </form>
//           )}

//           {/* OTP STEP */}
//           {step === "otp" && (
//             <form onSubmit={handleVerifyOTP} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Enter OTP
//                 </label>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                   placeholder="Enter 6-digit OTP"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-center text-2xl tracking-widest"
//                   maxLength={6}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setStep("phone")}
//                 className="w-full text-gray-600 text-sm hover:text-gray-800"
//               >
//                 ← Change Phone Number
//               </button>
//             </form>
//           )}

//           {/* TOGGLE LOGIN/REGISTER */}
// <div className="mt-6 text-center">
//   <Link
//     href="/account/login"
//     onClick={handleClose}
//     className="text-sm text-blue-600 hover:underline"
//   >
//     Login With Username & Password
//   </Link>
// </div>

//           <div className="mt-6 text-center">
//             <button
//               onClick={toggleMode}
//               className="text-sm text-blue-600 hover:underline"
//             >
//               {isLogin
//                 ? "Don't have an account? Register"
//                 : "Already have an account? Login"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../utils/apiInstance";
import Link from "next/link";

export default function OTPAuthModal({ open, onClose, onSuccess }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  /* ================= SEND OTP ================= */
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
        error.response?.data?.message ||
          "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
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

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(res.data.message || "Login successful");

        if (onSuccess) onSuccess();
        handleClose();
      } else {
        toast.error(res.data?.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= CLOSE MODAL ================= */
  const handleClose = () => {
    setStep("phone");
    setPhone("");
    setOtp("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Login with OTP</h2>
          <p className="text-gray-600 text-sm mb-6">
            {step === "phone"
              ? "Enter your phone number to login"
              : "Enter the OTP sent to your phone"}
          </p>

          {/* ================= PHONE STEP ================= */}
          {step === "phone" && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Enter 10-digit phone number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                  maxLength={10}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#800000] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* ================= OTP STEP ================= */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000] text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#800000] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => setStep("phone")}
                className="w-full text-gray-600 text-sm hover:text-gray-800"
              >
                ← Change Phone Number
              </button>
            </form>
          )}

          {/* USERNAME LOGIN LINK */}
          <div className="mt-6 text-center">
            <Link
              href="/account/login"
              onClick={handleClose}
              className="text-sm text-blue-600 hover:underline"
            >
              Login With Username & Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
