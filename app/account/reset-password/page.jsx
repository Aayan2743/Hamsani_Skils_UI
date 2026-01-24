// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { AuthAPI } from "../../api/AuthAPI";


// export default function ResetPassword() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Load email from localStorage
//   useEffect(() => {
//     const storedEmail = localStorage.getItem("resetEmail");
//     if (storedEmail) setEmail(storedEmail);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!newPassword || !confirm) {
//       setError("Password fields are required.");
//       return;
//     }

//     if (newPassword !== confirm) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const resetToken = localStorage.getItem("resetToken");
//     if (!resetToken) {
//       setError("Reset token missing.");
//       return;
//     }

//     try {
//       setLoading(true);

//       await AuthAPI.reset({
//         email,
//         reset_token: resetToken,
//         new_password: newPassword,
//       });

//       localStorage.removeItem("resetToken");
//       localStorage.removeItem("resetEmail");

//       router.push("/account/login");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Reset failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
 

//       <div className="flex-1 flex items-center justify-center bg-cover bg-center relative"
//         style={{
//           backgroundImage:
//             `url("https://9nutz.com/wp-content/uploads/2025/06/Millet_Murukku_19-300x300.webp")`,
//         }}
//       >
//         <div className="absolute inset-0 backdrop-blur-sm"></div>

//         <div className="relative z-10 bg-white/95 shadow-xl rounded-xl p-8 w-full max-w-md">
//           <h2 className="text-xl font-semibold mb-4 text-center">
//             Reset Password
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               readOnly
//               className="w-full border p-2 rounded mb-3 opacity-60"
//             />

//             <label>New Password</label>
//             <input
//               type="password"
//               className="w-full border p-2 rounded mb-3"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />

//             <label>Confirm Password</label>
//             <input
//               type="password"
//               className="w-full border p-2 rounded mb-3"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//             />

//             {error && <p className="text-red-500 text-sm">{error}</p>}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-4 py-2 bg-blue-900 text-white rounded"
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthAPI } from "../../api/AuthAPI";

export default function ResetPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const token = localStorage.getItem("resetToken");

    // 🔐 If user opens this page directly, kick them out
    if (!storedEmail || !token) {
      router.replace("/account/login");
      return;
    }

    setEmail(storedEmail);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirm) {
      setError("Password fields are required.");
      return;
    }

    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const resetToken = localStorage.getItem("resetToken");
    if (!resetToken) {
      setError("Reset token missing.");
      return;
    }

    try {
      setLoading(true);

      await AuthAPI.reset({
        email,
        reset_token: resetToken,
        new_password: newPassword,
      });

      // ✅ Cleanup
      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");

      // ✅ Go to login
      router.push("/account/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Reset failed.");
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

        <div className="relative z-10 bg-white/95 shadow-xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border p-2 rounded mb-3 opacity-60"
            />

            <label>New Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mb-3"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2 bg-blue-900 text-white rounded"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
