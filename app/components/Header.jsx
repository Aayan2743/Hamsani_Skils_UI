


// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// import CartSidebar from "../components/CartSidebar";
// import { useCart } from "../providers/CartProvider";
// import { useAuth } from "../components/context/AuthProvider";
// import api from "../utils/apiInstance";

// import {
//   UserCircleIcon,
//   ArrowRightOnRectangleIcon,
// } from "@heroicons/react/24/outline";

// const slugify = (text = "") =>
//   text
//     .toString()
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)+/g, "");

// export default function Header() {
//   const [desktopActive, setDesktopActive] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileActive, setMobileActive] = useState(null);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [menuData, setMenuData] = useState([]);

//   const { count, cartOpen, setCartOpen } = useCart();
//   const { user, logout } = useAuth();
//   const isLoggedIn = !!user;

//   const router = useRouter();
//   const dropdownRef = useRef(null);

//   // ---------------- CLIENT-SAFE TOKEN ----------------
//   const [token, setToken] = useState(null);
//   useEffect(() => {
//     setToken(localStorage.getItem("token"));
//   }, []);

//   /* ================= FETCH MENU ================= */
//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const data = await api.get("ecom/menu");
//         const menuItems = await data?.data || data;
//         setMenuData(Array.isArray(menuItems) ? menuItems : []);
//       } catch (err) {
//         setMenuData([]);
//       }
//     }

//     fetchMenu();
//   }, []);

//   /* ================= OUTSIDE CLICK ================= */
//   useEffect(() => {
//     function handleOutsideClick(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setAccountOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () =>
//       document.removeEventListener("mousedown", handleOutsideClick);
//   }, []);

//   /* ================= PROFILE CLICK ================= */
//   const handleProfileClick = () => {
//     if (token) {
//       router.push("/dashboard");
//     } else {
//       router.push("/account/login");
//     }
//   };

//   return (
//     <>
//       {/* TOP BAR */}
//       <div className="w-full bg-red-500 text-center text-white text-[18px] py-2 font-bold font-sans">
//         Our Showrooms EXPLORE
//       </div>

//       {/* HEADER */}
//       <header className="bg-white border-b relative z-30 py-2">
//         <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[100px] px-4 mt-2">
//           {/* LOGO */}
//           <Link href="/">
//             <Image
//               src="/image.png"
//               alt="PSR Silk Sarees"
//               width={120}
//               height={50}
//               priority
//             />
//           </Link>

//           {/* RIGHT ICONS */}
//           <div className="flex items-center gap-6 text-black">
//             {/* PROFILE */}
//             <div
//               className="relative"
//               ref={dropdownRef}
//               onMouseEnter={() => isLoggedIn && setAccountOpen(true)}
//               onMouseLeave={() => setAccountOpen(false)}
//             >
//               <button onClick={handleProfileClick}>
//                 {token ? (
//                   <UserCircleIcon className="w-6 h-6 text-black" />
//                 ) : (
//                   <ArrowRightOnRectangleIcon className="w-6 h-6 text-black" />
//                 )}
//               </button>

//               {isLoggedIn && accountOpen && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-md">
//                   <button
//                     onClick={() => router.push("/dashboard")}
//                     className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                   >
//                     Dashboard
//                   </button>

//                   <button
//                     onClick={() => {
//                       logout();
//                       router.push("/");
//                     }}
//                     className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* CART */}
//             <button onClick={() => setCartOpen(true)} className="relative">
//               <img
//                 src="/cart-shopping-svgrepo-com.svg"
//                 className="w-[20px]"
//                 alt="cart"
//               />
//               {count > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
//                   {count}
//                 </span>
//               )}
//             </button>

//             {/* HAMBURGER */}
//             <button
//               className="lg:hidden text-2xl p-2 hover:bg-gray-100 rounded-lg"
//               onClick={() => setMenuOpen(true)}
//             >
//               ☰
//             </button>
//           </div>
//         </div>

//         {/* DESKTOP MENU */}
//         <nav className="hidden lg:flex justify-center gap-8 pb-3 mt-3 uppercase text-[14px] font-bold">
//           {menuData.map((menu) => (
//             <div
//               key={menu.key}
//               className="relative"
//               onMouseEnter={() => setDesktopActive(menu.key)}
//               onMouseLeave={() => setDesktopActive(null)}
//             >
//               <span className="cursor-pointer pb-2 hover:border-b-2 border-black">
//                 {menu.label}
//               </span>
//               {desktopActive === menu.key && (
//                 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white border shadow-lg">
//                   <ul className="grid grid-cols-2 gap-2 p-4 text-[16px]">
//                     {menu.items.map((item) => {
//                       const slug = slugify(item);
//                       if (!slug) return null;

//                       return (
//                         <li key={item}>
//                           <Link
//                             href={`/collections?category=${slug}`}
//                             className="block px-3 py-2 hover:bg-gray-50"
//                           >
//                             {item}
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </header>
//       <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
//     </>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import CartSidebar from "../components/CartSidebar";
import { useCart } from "../providers/CartProvider";
import { useAuth } from "../components/context/AuthProvider";
import api from "../utils/apiInstance";

import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function Header() {
  const [desktopActive, setDesktopActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const { count, cartOpen, setCartOpen } = useCart();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const router = useRouter();
  const dropdownRef = useRef(null);

  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  /* ================= FETCH MENU ================= */
  useEffect(() => {
    async function fetchMenu() {
      try {
        const data = await api.get("ecom/menu");
        const menuItems = data?.data || data;
        setMenuData(Array.isArray(menuItems) ? menuItems : []);
      } catch {
        setMenuData([]);
      }
    }
    fetchMenu();
  }, []);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  /* ================= PROFILE CLICK ================= */
  const handleProfileClick = () => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/account/login");
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full bg-red-500 text-center text-white text-[18px] py-2 font-bold font-sans">
        Our Showrooms EXPLORE
      </div>

      {/* HEADER */}
      <header className="bg-white border-b relative z-30 py-2">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[100px] px-4 mt-2">
          {/* LOGO */}
          <Link href="/">
            <Image
              src="/image.png"
              alt="PSR Silk Sarees"
              width={120}
              height={50}
              priority
            />
          </Link>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6 text-black">
            {/* PROFILE */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => isLoggedIn && setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button onClick={handleProfileClick}>
                {token ? (
                  <UserCircleIcon className="w-6 h-6 text-black" />
                ) : (
                  <ArrowRightOnRectangleIcon className="w-6 h-6 text-black" />
                )}
              </button>

              {isLoggedIn && accountOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-md"
                  onMouseEnter={() => setAccountOpen(true)}
                  onMouseLeave={() => setAccountOpen(false)}
                >
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* CART */}
            <button onClick={() => setCartOpen(true)} className="relative">
              <img
                src="/cart-shopping-svgrepo-com.svg"
                className="w-[20px]"
                alt="cart"
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* HAMBURGER */}
            <button
              className="lg:hidden text-2xl p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex justify-center gap-8 pb-3 mt-3 uppercase text-[14px] font-bold">
          {menuData.map((menu) => (
            <div
              key={menu.key}
              className="relative"
              onMouseEnter={() => setDesktopActive(menu.key)}
              onMouseLeave={() => setDesktopActive(null)}
            >
              <span className="cursor-pointer pb-2 hover:border-b-2 border-black">
                {menu.label}
              </span>

              {desktopActive === menu.key && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white border shadow-lg">
                  <ul className="grid grid-cols-2 gap-2 p-4 text-[16px]">
                    {menu.items.map((item) => {
                      const slug = slugify(item);
                      if (!slug) return null;

                      return (
                        <li key={item}>
                          <Link
                            href={`/collections?category=${slug}`}
                            className="block px-3 py-2 hover:bg-gray-50"
                          >
                            {item}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

