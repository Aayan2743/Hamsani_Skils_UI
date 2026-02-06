// "use client";

// import React, { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "../../components/context/AuthProvider"; // adjust path if needed


// export default function SignupPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams?.get("redirect") || "/";
//   const { login } = useAuth();

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessages, setErrorMessages] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     const errs = {};

//     if (!name.trim()) {
//       errs.name = "Name is required";
//     } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
//       errs.name = "Name can only contain letters and spaces";
//     }

//     if (!phone.trim()) {
//       errs.phone = "Phone number is required";
//     } else if (!/^[0-9]{10,15}$/.test(phone.trim())) {
//       errs.phone = "Phone number must be 10–15 digits";
//     }

//     if (!email.trim()) {
//       errs.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       errs.email = "Invalid email address";
//     }

//     if (!password) {
//       errs.password = "Password is required";
//     } else if (password.length < 6) {
//       errs.password = "Password must be at least 6 characters";
//     }

//     return errs;
//   };

//   const fakeRegister = async () => {
//     // Replace with real API call
//     return new Promise((res, rej) => {
//       setTimeout(() => {
//         res({ ok: true, name: name.trim() });
//       }, 800);
//     });
//   };

//   const fakeLogin = async () =>
//     new Promise((res, rej) =>
//       setTimeout(() => {
//         if (email && password) res({ ok: true, name: email.split("@")[0] || "User" });
//         else rej(new Error("Please enter email and password"));
//       }, 700)
//     );

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const data = await fakeLogin();
//       login({ token: "1", name: data.name });
//       router.push(redirect);
//     } catch (err) {
//       setError(err.message || "Login failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" w-full flex items-center justify-center bg-white p-6 px-6 text-black">
//       <div
//         className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
//         style={{ minHeight: "40vh" }}
//       >
//         {/* LEFT IMAGE */}
//         <div className="w-full h-full">
//           <img
//             src="/mix9nuts.jpeg"
//             alt="9 nuts"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* RIGHT SIDE FORM */}
//        <div className="p-8 md:p-12 flex items-center justify-center bg-gray">
//          <div className="w-full max-w-md">
//      <h2 className="text-2xl font-bold mb-2" style={{ color: "rgb(239, 12, 50)" }}>Create Account</h2>

//         <form onSubmit={onSubmit} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your full name"
//               className="mt-1 w-full border border-gray-300 rounded-lg px-5 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//               // className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//             />
//             {errorMessages.name && (
//               <p className="text-red-500 text-sm mt-1">{errorMessages.name}</p>
//             )}
//           </div>

//           {/* Phone */}
//         <input
//   type="tel"
//   inputMode="numeric"
//   pattern="[0-9]*"
//   maxLength={10}
//   value={phone}
//   onChange={(e) => {
//     const value = e.target.value.replace(/\D/g, "");
//     setPhone(value);
//   }}
//   placeholder="10 digit phone number"
//   className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-2 focus:ring-2 focus:ring-green-500 outline-none"
// />


//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email address</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//             />
//             {errorMessages.email && (
//               <p className="text-red-500 text-sm mt-1">{errorMessages.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="At least 6 characters"
//               className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//             />
//             {errorMessages.password && (
//               <p className="text-red-500 text-sm mt-1">{errorMessages.password}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg mt-2 transition disabled:opacity-60"
//             disabled={loading}
//           >
//             {loading ? "Creating account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <a href="/account/login" className="text-green-700 font-medium">
//             Login
//           </a>
//         </p>
//       </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import { useAuth } from "../../components/context/AuthProvider";
// // import { getToken } from "../../utils/auth";

// // export default function SignupPage() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const redirect = searchParams?.get("redirect") || "/";
// //   const { signup, loading } = useAuth();

// //   const [name, setName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessages, setErrorMessages] = useState({});
// //   const [loadingLocal, setLoadingLocal] = useState(false);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     if (getToken()) router.push(redirect);
// //   }, [router, redirect]);

// //   const validate = () => {
// //     const errs = {};
// //     if (!name.trim()) errs.name = "Name is required";
// //     else if (!/^[A-Za-z\s]+$/.test(name.trim())) errs.name = "Name can only contain letters and spaces";

// //     if (!phone.trim()) errs.phone = "Phone number is required";
// //     else if (!/^[0-9]{10,15}$/.test(phone.trim())) errs.phone = "Phone number must be 10–15 digits";

// //     if (!email.trim()) errs.email = "Email is required";
// //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email address";

// //     if (!password) errs.password = "Password is required";
// //     else if (password.length < 6) errs.password = "Password must be at least 6 characters";

// //     return errs;
// //   };

// //   const onSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     const errs = validate();
// //     setErrorMessages(errs);
// //     if (Object.keys(errs).length) return;

// //     setLoadingLocal(true);
// //     try {
// //       const res = await signup({ name, phone, email, password });
// //       // if signup returned token, user is logged in and redirected
// //       router.push(redirect);
// //     } catch (err) {
// //       setError(err?.message || "Signup failed");
// //       setLoadingLocal(false);
// //     }
// //   };

// //   return (
// //     <div className=" w-full flex items-center justify-center bg-white p-6 px-6 text-black">
// //       <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "40vh" }}>
// //         <div className="w-full h-full">
// //           <img src="/mix9nuts.jpg" alt="9 nuts" className="w-full h-full object-cover" />
// //         </div>

// //         <div className="p-8 md:p-12 flex items-center justify-center bg-gray">
// //           <div className="w-full max-w-md">
// //             <h2 className="text-2xl font-bold mb-2" style={{ color: "#e46128ff" }}>Create Account</h2>

// //             <form onSubmit={onSubmit} className="space-y-4">
// //               {/* Name */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Full Name</label>
// //                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="mt-1 w-full border border-gray-300 rounded-lg px-5 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
// //                 {errorMessages.name && <p className="text-red-500 text-sm mt-1">{errorMessages.name}</p>}
// //               </div>

// //               {/* Phone */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Phone Number</label>
// //                 <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10–15 digits" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
// //                 {errorMessages.phone && <p className="text-red-500 text-sm mt-1">{errorMessages.phone}</p>}
// //               </div>

// //               {/* Email */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Email address</label>
// //                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
// //                 {errorMessages.email && <p className="text-red-500 text-sm mt-1">{errorMessages.email}</p>}
// //               </div>

// //               {/* Password */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Password</label>
// //                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
// //                 {errorMessages.password && <p className="text-red-500 text-sm mt-1">{errorMessages.password}</p>}
// //               </div>

// //               {error && <p className="text-red-500 text-sm">{error}</p>}

// //               <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg mt-2 transition disabled:opacity-60" disabled={loading || loadingLocal}>
// //                 {loading || loadingLocal ? "Creating account..." : "Sign Up"}
// //               </button>
// //             </form>

// //             <p className="mt-6 text-center text-sm text-gray-600">Already have an account? <a href="/account/login" className="text-green-700 font-medium">Login</a></p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/context/AuthProvider";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */
  const validate = () => {
    const errs = {};

    if (!name.trim()) errs.name = "Name is required";
    else if (!/^[A-Za-z\s]+$/.test(name.trim()))
      errs.name = "Name can only contain letters and spaces";

    if (!phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[0-9]{10,15}$/.test(phone))
      errs.phone = "Phone number must be 10–15 digits";

    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email address";

    if (!password) errs.password = "Password is required";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters";

    return errs;
  };

  /* ================= SUBMIT ================= */
 const onSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  setErrorMessages(errs);
  if (Object.keys(errs).length > 0) return;

  setLoading(true);

  try {
    const res = await api.post("/auth/user-register", {
      name,
      phone,
      email,
      password,
    });

    const json = res.data;

    /* ===============================
       STORE TOKEN + USER (AUTO LOGIN)
    =============================== */
    localStorage.setItem("token", json.token);
    localStorage.setItem("token_type", json.token_type);
    localStorage.setItem("user", JSON.stringify(json.user));

    // // Keep AuthContext in sync
    // login({
    //   token: json.token,
    //   user: json.user,
    // });

    toast.success("Account created successfully 🎉");
    router.push(redirect);
  } catch (err) {
    console.error("Signup error:", err);

    const message =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong";

    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full flex items-center justify-center bg-white p-6 text-black">
      <div
        className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
        style={{ minHeight: "40vh" }}
      >
        {/* LEFT IMAGE */}
        <div className="w-full h-full">
          <img
            src="/mix9nuts.jpeg"
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORM */}
        <div className="p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2 text-red-600">
              Create Account
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* NAME */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full border rounded-lg px-4 py-2"
              />
              {errorMessages.name && (
                <p className="text-red-500 text-sm">{errorMessages.name}</p>
              )}

              {/* PHONE */}
              <input
                type="tel"
                inputMode="numeric"
                maxLength={15}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Phone number"
                className="w-full border rounded-lg px-4 py-2"
              />
              {errorMessages.phone && (
                <p className="text-red-500 text-sm">{errorMessages.phone}</p>
              )}

              {/* EMAIL */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full border rounded-lg px-4 py-2"
              />
              {errorMessages.email && (
                <p className="text-red-500 text-sm">{errorMessages.email}</p>
              )}

              {/* PASSWORD */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2"
              />
              {errorMessages.password && (
                <p className="text-red-500 text-sm">
                  {errorMessages.password}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <a href="/account/login" className="text-green-700 font-medium">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

