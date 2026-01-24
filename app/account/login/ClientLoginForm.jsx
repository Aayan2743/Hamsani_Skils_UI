



// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "../../components/context/AuthProvider";
// import { getToken } from "../../utils/auth";

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams?.get("redirect") || "/dashboard";
//   const { login, loading } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [localLoading, setLocalLoading] = useState(false);
//   const [error, setError] = useState("");

//   // if already logged in (token in localStorage) redirect away from login page
//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       router.push(redirect);
//     }
//   }, [router, redirect]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLocalLoading(true);

//     try {
//       await login({ email, password });
     
//       router.push(redirect);
//     } catch (err) {
//       setError(err?.message || "Login failed");
//       setLocalLoading(false);
//     }
//   };

//   return (
//     <div className=" w-full flex items-center justify-center bg-white p-6 px-6 text-black">
//       <div
//         className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
//         style={{ minHeight: "70vh" }}
//       >
//         {/* LEFT IMAGE */}
//         <div className="w-full h-full">
//           <img src="/mix9nuts.jpg" alt="9 nuts" className="w-full h-full object-cover" />
//         </div>

//         {/* RIGHT SIDE FORM */}
//         <div className="p-8 md:p-12 flex items-center justify-center bg-gray">
//           <div className="w-full max-w-md">
//             <h2 className="text-3xl font-bold mb-2" style={{ color: "#e46128ff" }}>Login</h2>
//             <p className="text-sm text-black mb-6">Enter your details to get started.</p>

//             <form onSubmit={onSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-black">Email address</label>
//                 <input type="email" placeholder="you@example.com" className="mt-1 w-full border border-[#ddd] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1C7C2C] outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-black">Password</label>
//                 <input type="password" placeholder="Your password" className="mt-1 w-full border border-[#ddd] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1C7C2C] outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
//               </div>

//               <div className="flex justify-between items-center">
//                 <div />
//                 <a href="/account/forgot-password" className="text-sm" style={{ color: "#1C7C2C" }}>Forgot password?</a>
//               </div>

//               {error && <p className="text-red-500 text-sm">{error}</p>}

//               <button type="submit" className="w-full text-white font-semibold py-2 rounded-lg mt-2 transition" style={{ backgroundColor: "#1C7C2C" }} disabled={loading || localLoading}>
//                 {loading || localLoading ? "Signing in..." : "Sign In"}
//               </button>
//             </form>

//             <p className="mt-6 text-sm text-black">
//               Don't have an account?{" "}
//               <a href="/account/register" className="font-medium" style={{ color: "#1C7C2C" }}>Create one</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/context/AuthProvider"; 

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fakeLogin = async () =>
    new Promise((res, rej) =>
      setTimeout(() => {
        if (email && password) res({ ok: true, name: email.split("@")[0] || "User" });
        else rej(new Error("Please enter email and password"));
      }, 700)
    );

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await fakeLogin();
      login({ token: "1", name: data.name });
      router.push(redirect);
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className=" w-full flex items-center justify-center bg-white p-6 px-6 text-black">
      <div
        className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
        style={{ minHeight: "70vh" }}
      >
        {/* LEFT IMAGE */}
        <div className="w-full h-full">
          <img
            src="/mix9nuts.jpeg"
            alt="9 nuts"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-8 md:p-12 flex items-center justify-center bg-gray">
          <div className="w-full max-w-md">

            {/* ORANGE TITLE */}
            <h2 className="text-3xl font-bold mb-2" style={{ color: "rgb(254, 6, 14)" }}>
              Login
            </h2>

            <p className="text-sm text-black mb-6">
              Enter your details to get started.
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-black">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full border border-[#ddd] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1C7C2C] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-black">Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  className="mt-1 w-full border border-[#ddd] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1C7C2C] outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* DARK GREEN SIGN-IN BUTTON */}
              <button
                type="submit"
                className="w-full text-white font-semibold py-2 rounded-lg mt-2 transition"
                style={{
                  backgroundColor: "#1C7C2C",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#169B38")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1C7C2C")}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
 <div className="flex justify-between items-center mt-2">
                <div />
                <a href="#" className="text-sm" style={{ color: "#1C7C2C" }}>Forgot password?</a>
              </div>
            {/* REGISTER LINK */}
            <p className="mt-6 text-sm text-black">
              Don't have an account?{" "}
              <a href="/account/register" className="font-medium" style={{ color: "#1C7C2C" }}>
                Create one
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}



