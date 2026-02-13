
// "use client";

// import React, { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "../../components/context/AuthProvider";
// import toast from "react-hot-toast";
// import api from "../../utils/apiInstance";

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

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     const errs = {};

//     if (!name.trim()) errs.name = "Name is required";
//     else if (!/^[A-Za-z\s]+$/.test(name.trim()))
//       errs.name = "Name can only contain letters and spaces";

//     if (!phone.trim()) errs.phone = "Phone number is required";
//     else if (!/^[0-9]{10,15}$/.test(phone))
//       errs.phone = "Phone number must be 10–15 digits";

//     if (!email.trim()) errs.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//       errs.email = "Invalid email address";

//     if (!password) errs.password = "Password is required";
//     else if (password.length < 6)
//       errs.password = "Password must be at least 6 characters";

//     return errs;
//   };

//   /* ================= SUBMIT ================= */
//  const onSubmit = async (e) => {
//   e.preventDefault();

//   const errs = validate();
//   setErrorMessages(errs);
//   if (Object.keys(errs).length > 0) return;

//   setLoading(true);

//   try {
//     const res = await api.post("/auth/user-register", {
//       name,
//       phone,
//       email,
//       password,
//     });

//     const json = res.data;

//     /* ===============================
//        STORE TOKEN + USER (AUTO LOGIN)
//     =============================== */
//     localStorage.setItem("token", json.token);
//     localStorage.setItem("token_type", json.token_type);
//     localStorage.setItem("user", JSON.stringify(json.user));

//     // // Keep AuthContext in sync
//     // login({
//     //   token: json.token,
//     //   user: json.user,
//     // });

//     toast.success("Account created successfully 🎉");
//      window.location.reload()
//          router.push(redirect);
//   } catch (err) {
 

//     const message =
//       err.response?.data?.message ||
//       err.message ||
//       "Something went wrong";

//     toast.error(message);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="w-full flex items-center justify-center bg-white p-6 text-black">
//       <div
//         className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
//         style={{ minHeight: "40vh" }}
//       >
//         {/* LEFT IMAGE */}
//         <div className="w-full h-full">
//           <img
//             src="/mix9nuts.jpeg"
//             alt="Signup"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* FORM */}
//         <div className="p-8 md:p-12 flex items-center justify-center">
//           <div className="w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-2 text-red-600">
//               Create Account
//             </h2>

//             <form onSubmit={onSubmit} className="space-y-4">
//               {/* NAME */}
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Full name"
//                 className="w-full border rounded-lg px-4 py-2"
//               />
//               {errorMessages.name && (
//                 <p className="text-red-500 text-sm">{errorMessages.name}</p>
//               )}

//               {/* PHONE */}
//               <input
//                 type="tel"
//                 inputMode="numeric"
//                 maxLength={15}
//                 value={phone}
//                 onChange={(e) =>
//                   setPhone(e.target.value.replace(/\D/g, ""))
//                 }
//                 placeholder="Phone number"
//                 className="w-full border rounded-lg px-4 py-2"
//               />
//               {errorMessages.phone && (
//                 <p className="text-red-500 text-sm">{errorMessages.phone}</p>
//               )}

//               {/* EMAIL */}
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email address"
//                 className="w-full border rounded-lg px-4 py-2"
//               />
//               {errorMessages.email && (
//                 <p className="text-red-500 text-sm">{errorMessages.email}</p>
//               )}

//               {/* PASSWORD */}
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="w-full border rounded-lg px-4 py-2"
//               />
//               {errorMessages.password && (
//                 <p className="text-red-500 text-sm">
//                   {errorMessages.password}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
//               >
//                 {loading ? "Creating account..." : "Sign Up"}
//               </button>
//             </form>

//             <p className="mt-6 text-center text-sm">
//               Already have an account?{" "}
//               <a href="/account/login" className="text-green-700 font-medium">
//                 Login
//               </a>
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
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";

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
    setErrorMessages({});

    try {
      const res = await api.post("/auth/user-register", {
        name,
        phone,
        email,
        password,
      });

      const json = res.data;

      // STORE TOKEN + USER
      localStorage.setItem("token", json.token);
      localStorage.setItem("token_type", json.token_type);
      localStorage.setItem("user", JSON.stringify(json.user));

      toast.success("Account created successfully 🎉");
      router.push(redirect);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      const data = err.response?.data;

      /* ===============================
         HANDLE STRING ERROR
      =============================== */
      if (typeof data?.errors === "string") {
        toast.error(data.errors);

        if (data.errors.toLowerCase().includes("phone")) {
          setErrorMessages({ phone: data.errors });
        } else if (data.errors.toLowerCase().includes("email")) {
          setErrorMessages({ email: data.errors });
        }

        return;
      }

      /* ===============================
         HANDLE FIELD ERRORS (OBJECT)
      =============================== */
      if (typeof data?.errors === "object") {
        const fieldErrors = {};

        Object.keys(data.errors).forEach((key) => {
          fieldErrors[key] = data.errors[key][0];
        });

        setErrorMessages(fieldErrors);
        toast.error("Please fix the highlighted errors");
        return;
      }

      /* ===============================
         FALLBACK ERROR
      =============================== */
      toast.error(
        data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
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
             <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-[#2C1810] mb-2 animate-slide-down">
                Create Account
              </h1>
            </div>

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

              {/* <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button> */}
              
              <button
  type="submit"
  disabled={loading}
  className="w-full bg-gradient-to-r from-[#8B4513] to-[#6D3410] hover:from-[#6D3410] hover:to-[#8B4513] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group animate-slide-up"
  style={{ animationDelay: "0.4s" }}
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      Creating account...
    </>
  ) : (
    <>
      Create Account
      {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
    </>
  )}
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

