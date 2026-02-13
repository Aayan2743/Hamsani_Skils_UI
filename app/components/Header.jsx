
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// import CartSidebar from "../components/CartSidebar";
// import { useCart } from "../providers/CartProvider";
// import api from "../utils/apiInstance";

// import { UserCircleIcon } from "@heroicons/react/24/outline";
// import { FaFacebookF, FaInstagram } from "react-icons/fa";

// /* ---------- UTILS ---------- */
// const slugify = (text = "") =>
//   text
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)+/g, "");

// export default function Header() {
//   const [desktopActive, setDesktopActive] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [menuData, setMenuData] = useState([]);
//   const [menuLoading, setMenuLoading] = useState(true);
//   const [token, setToken] = useState(null);

//   const { count, cartOpen, setCartOpen } = useCart();
//   const router = useRouter();
//   const dropdownRef = useRef(null);

//   /* ---------- TOKEN ---------- */
//   useEffect(() => {
//     setToken(localStorage.getItem("token"));
//   }, []);

//   /* ---------- MENU API ---------- */
//   useEffect(() => {
//     let isMounted = true;

//     async function fetchMenu() {
//       try {
//         setMenuLoading(true);
//         const res = await api.get("ecom/menu");
        
//         if (!isMounted) return;
        
//         setMenuData(Array.isArray(res?.data) ? res.data : []);
//       } catch (error) {
//         if (!isMounted) return;
//         setMenuData([]);
//       } finally {
//         if (isMounted) {
//           setMenuLoading(false);
//         }
//       }
//     }

//     fetchMenu();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   /* ---------- CLOSE PROFILE ON OUTSIDE CLICK ---------- */
//   useEffect(() => {
//     const close = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setAccountOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", close);
//     return () => document.removeEventListener("mousedown", close);
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     router.push("/");
//     window.location.reload();
//   };

//   const filteredMenus = menuData.filter(
//     (menu) => menu.items && menu.items.length
//   );

//   const visibleMenus = filteredMenus.slice(0, 6);
//   const extraMenus = filteredMenus.slice(6);

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <header className="sticky top-0 z-40 bg-white shadow-sm">
//         <div className="max-w-[1400px] mx-auto px-4">
//           <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4 lg:gap-0">

//             {/* LOGO */}
//             <Link href="/">
//               <Image
//                 src="/image.png"
//                 alt="Hamsini Silks & Jewellers"
//                 width={120}
//                 height={60}
//                 priority
//               />
//             </Link>

//             {/* ===== DESKTOP NAV ===== */}
//             <nav className="hidden lg:flex gap-8 uppercase text-sm font-bold">
//               {menuLoading ? (
//                 // Menu skeleton loader
//                 <>
//                   {[1, 2, 3, 4, 5, 6].map((i) => (
//                     <div
//                       key={i}
//                       className="h-4 w-20 bg-gray-200 rounded animate-pulse"
//                     />
//                   ))}
//                 </>
//               ) : (
//                 <>
//                   {visibleMenus.map((menu) => (
//                     <div
//                       key={menu.key}
//                       className="relative"
//                       onMouseEnter={() => setDesktopActive(menu.key)}
//                       onMouseLeave={() => setDesktopActive(null)}
//                     >
//                       <span className="cursor-pointer pb-2">
//                         {menu.label}
//                       </span>

//                       {desktopActive === menu.key && (
//                         <div className="absolute top-full mt-3 bg-white shadow-lg z-40">
//                           <ul className="flex flex-col p-4 min-w-[200px]">
//                             {menu.items.map((item) => (
//                               <li key={item}>
//                                 <Link
//                                   href={`/collections?category=${slugify(item)}`}
//                                   className="block px-3 py-2 hover:bg-gray-100"
//                                 >
//                                   {item}
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   ))}

//                   {extraMenus.length > 0 && (
//                     <div
//                       className="relative"
//                       onMouseEnter={() => setDesktopActive("more")}
//                       onMouseLeave={() => setDesktopActive(null)}
//                     >
//                       <span className="cursor-pointer pb-2">More</span>

//                       {desktopActive === "more" && (
//                         <div className="absolute top-full mt-3 bg-white shadow-lg z-40">
//                           <ul className="flex flex-col p-4 min-w-[200px]">
//                             {extraMenus.map((menu) => (
//                               <li key={menu.key} className="px-3 py-2">
//                                 {menu.label}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </>
//               )}
//             </nav>

//             {/* ===== RIGHT ICONS ===== */}
//             <div className="flex items-center gap-5 justify-center lg:justify-end w-full lg:w-auto">

//               {/* FACEBOOK */}
//               <a
//                 href="https://www.facebook.com/profile.php?id=61587415783400"
//                 target="_blank"
//                 className="hover:text-blue-600"
//               >
//                 <FaFacebookF size={18} />
//               </a>

//               {/* INSTAGRAM */}
//               <a
//                 href="https://www.instagram.com/hamsinisilks/?hl=en"
//                 target="_blank"
//                 className="hover:text-pink-600"
//               >
//                 <FaInstagram size={18} />
//               </a>

//               {/* PROFILE */}
//               <div
//                 ref={dropdownRef}
//                 className="relative"
//                 onMouseEnter={() => token && setAccountOpen(true)}
//                 onMouseLeave={() => setAccountOpen(false)}
//               >
//                 <button
//                   onClick={() => !token && router.push("/account/login")}
//                   className="cursor-pointer"
//                 >
//                   <UserCircleIcon className="w-6 h-6" />
//                 </button>

//                 {token && accountOpen && (
//                   <div className="absolute right-0 top-full pt-2 z-50">
//                     <div className="w-44 bg-white shadow-lg rounded-md">
//                       <button
//                         onClick={() => {
//                           router.push("/dashboard");
//                           setAccountOpen(false);
//                         }}
//                         className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                       >
//                         Dashboard
//                       </button>
//                       <button
//                         onClick={logout}
//                         className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* CART */}
//               <button onClick={() => setCartOpen(true)} className="relative">
//                 <img
//                   src="/cart-shopping-svgrepo-com.svg"
//                   className="w-5"
//                   alt="cart"
//                 />
//                 {count > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
//                     {count}
//                   </span>
//                 )}
//               </button>

//               {/* HAMBURGER */}
//               <button
//                 className="lg:hidden text-2xl"
//                 onClick={() => setMenuOpen(true)}
//               >
//                 ☰
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ================= MOBILE MENU ================= */}
//       {menuOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setMenuOpen(false)}
//           />

//           <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto">
//             <div className="flex justify-between items-center px-4 py-4 border-b">
//               <Image src="/image.png" width={100} height={50} alt="logo" />
//               <button onClick={() => setMenuOpen(false)}>✕</button>
//             </div>

//             <div className="px-4 py-3 space-y-2">
//               {menuLoading ? (
//                 // Mobile menu skeleton
//                 <>
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <div
//                       key={i}
//                       className="h-10 bg-gray-200 rounded animate-pulse"
//                     />
//                   ))}
//                 </>
//               ) : (
//                 filteredMenus.map((menu) => (
//                   <MobileMenuItem
//                     key={menu.key}
//                     menu={menu}
//                     onClose={() => setMenuOpen(false)}
//                   />
//                 ))
//               )}
//             </div>

//             <div className="border-t px-4 py-4">
//               {!token ? (
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false);
//                     router.push("/account/login");
//                   }}
//                   className="w-full py-2 text-left font-medium"
//                 >
//                   Login / Register
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       router.push("/dashboard");
//                     }}
//                     className="w-full py-2 text-left font-medium"
//                   >
//                     My Account
//                   </button>
//                   <button
//                     onClick={logout}
//                     className="w-full py-2 text-left text-red-600 font-medium"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
//     </>
//   );
// }

// /* ================= MOBILE MENU ITEM ================= */
// function MobileMenuItem({ menu, onClose }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border-b pb-2">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center py-2 font-semibold"
//       >
//         {menu.label}
//         <span>{open ? "−" : "+"}</span>
//       </button>

//       {open && (
//         <div className="pl-4 space-y-1">
//           {menu.items.map((item) => (
//             <Link
//               key={item}
//               href={`/collections?category=${slugify(item)}`}
//               onClick={onClose}
//               className="block py-1 text-sm text-gray-700"
//             >
//               {item}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// import CartSidebar from "../components/CartSidebar";
// import { useCart } from "../providers/CartProvider";
// import api from "../utils/apiInstance";

// import { UserCircleIcon } from "@heroicons/react/24/outline";
// import {
//   FaLinkedinIn,
//   FaInstagram,
//   FaTwitter,
//   FaYoutube,
//   FaDribbble,
// } from "react-icons/fa";

// import { useSocialMedia } from "././context/SocialMediaContext";


// /* ---------- UTILS ---------- */
// const slugify = (text = "") =>
//   text
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)+/g, "");

// export default function Header() {
//   const [desktopActive, setDesktopActive] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [menuData, setMenuData] = useState([]);
//   const [menuLoading, setMenuLoading] = useState(true);
//   const [token, setToken] = useState(null);

//   const { count, cartOpen, setCartOpen } = useCart();
//   const { socialLinks, loading } = useSocialMedia();

//   const router = useRouter();
//   const dropdownRef = useRef(null);

//   /* ---------- TOKEN ---------- */
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setToken(localStorage.getItem("token"));
//     }
//   }, []);

//   /* ---------- MENU API ---------- */
//   useEffect(() => {
//     let isMounted = true;

//     async function fetchMenu() {
//       try {
//         setMenuLoading(true);
//         const res = await api.get("ecom/menu");
//         if (!isMounted) return;
//         setMenuData(Array.isArray(res?.data) ? res.data : []);
//       } catch {
//         if (!isMounted) return;
//         setMenuData([]);
//       } finally {
//         if (isMounted) setMenuLoading(false);
//       }
//     }

//     fetchMenu();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   /* ---------- CLOSE PROFILE ON OUTSIDE CLICK ---------- */
//   useEffect(() => {
//     const close = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setAccountOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", close);
//     return () => document.removeEventListener("mousedown", close);
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     router.push("/");
//     window.location.reload();
//   };

//   const filteredMenus = menuData.filter(
//     (menu) => menu.items && menu.items.length
//   );

//   const visibleMenus = filteredMenus.slice(0, 6);
//   const extraMenus = filteredMenus.slice(6);

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white shadow-sm">
//         <div className="max-w-[1400px] mx-auto px-4">
//           <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4 lg:gap-0">

//             {/* LOGO */}
//             <Link href="/">
//               <Image
//                 src="/image.png"
//                 alt="Hamsini Silks & Jewellers"
//                 width={120}
//                 height={60}
//                 priority
//               />
//             </Link>

//             {/* ===== DESKTOP NAV ===== */}
//             {/* ===== DESKTOP NAV ===== */}
// <nav className="hidden lg:flex gap-8 uppercase text-sm font-bold">
//   {menuLoading ? (
//     <>
//       {[1, 2, 3, 4, 5, 6].map((i) => (
//         <div
//           key={i}
//           className="h-4 w-20 bg-gray-200 rounded animate-pulse"
//         />
//       ))}
//     </>
//   ) : (
//     <>
//       {visibleMenus.map((menu) => (
//         <div key={menu.key} className="relative group">
//           {/* Parent Label */}
//           <span className="cursor-pointer pb-2 inline-block">
//             {menu.label}
//           </span>

//           {/* Dropdown */}
//           <div className="absolute top-full left-0 bg-white shadow-lg z-40 
//                           opacity-0 invisible group-hover:opacity-100 
//                           group-hover:visible transition-all duration-200">
//             <ul className="flex flex-col p-4 min-w-[200px]">
//               {menu.items.map((item) => (
//                 <li key={item}>
//                   <Link
//                     href={`/collections?category=${slugify(item)}`}
//                     className="block px-3 py-2 hover:bg-gray-100 whitespace-nowrap"
//                   >
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}

//       {extraMenus.length > 0 && (
//         <div className="relative group">
//           <span className="cursor-pointer pb-2 inline-block">
//             More
//           </span>

//           <div className="absolute top-full left-0 bg-white shadow-lg z-40 
//                           opacity-0 invisible group-hover:opacity-100 
//                           group-hover:visible transition-all duration-200">
//             <ul className="flex flex-col p-4 min-w-[200px]">
//               {extraMenus.map((menu) => (
//                 <li key={menu.key} className="px-3 py-2 whitespace-nowrap">
//                   {menu.label}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   )}
// </nav>


//             {/* ===== RIGHT SECTION ===== */}
//             <div className="flex items-center gap-5 justify-center lg:justify-end w-full lg:w-auto">

//               {/* ABOUT US (Desktop Hover) */}
//               <div
//                 className="relative hidden lg:block"
//                 onMouseEnter={() => setDesktopActive("about")}
//                 onMouseLeave={() => setDesktopActive(null)}
//               >
//                 <span className="cursor-pointer text-sm font-semibold uppercase">
//                   About Us
//                 </span>

//                 {desktopActive === "about" && (
//                   <div className="absolute right-0 top-full mt-3 w-[420px] max-h-[400px] overflow-y-auto bg-white shadow-2xl rounded-lg p-6 z-50 text-sm leading-relaxed">
//                     <p className="mb-3">
//                       Hamsini Silks is a celebration of India’s rich handloom tradition, built on deep respect for craftsmanship and heritage.
//                     </p>
//                     <p className="mb-3">
//                       Rooted in South India’s weaving communities, we bring pure handwoven silk sarees to customers who value quality and tradition.
//                     </p>
//                     <p className="mb-3">
//                       We blend age-old weaving techniques with contemporary design sensibilities while staying true to our roots.
//                     </p>
//                     <p className="italic font-medium text-gray-700">
//                       “Every saree is woven with tradition, passion, and timeless elegance.”
//                     </p>
//                   </div>
//                 )}
//               </div>

                 
//                    {/* LINKEDIN */}
// {socialLinks?.linkedin && (
//   <a
//     href={socialLinks.linkedin}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="hover:text-blue-700 transition"
//   >
//     <FaLinkedinIn size={18} />
//   </a>
// )}

// {/* INSTAGRAM */}
// {socialLinks?.instagram && (
//   <a
//     href={socialLinks.instagram}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="hover:text-pink-600 transition"
//   >
//     <FaInstagram size={18} />
//   </a>
// )}

// {/* DRIBBBLE */}
// {socialLinks?.dribbble && (
//   <a
//     href={socialLinks.dribbble}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="hover:text-pink-500 transition"
//   >
//     <FaDribbble size={18} />
//   </a>
// )}

// {/* TWITTER */}
// {socialLinks?.twitter && (
//   <a
//     href={socialLinks.twitter}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="hover:text-sky-500 transition"
//   >
//     <FaTwitter size={18} />
//   </a>
// )}

// {/* YOUTUBE */}
// {socialLinks?.youtube && (
//   <a
//     href={socialLinks.youtube}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="hover:text-red-600 transition"
//   >
//     <FaYoutube size={18} />
//   </a>
// )}


//               {/* PROFILE */}
//               <div
//                 ref={dropdownRef}
//                 className="relative mt-2"
//                 onMouseEnter={() => token && setAccountOpen(true)}
//                 onMouseLeave={() => setAccountOpen(false)}
//               >
//                 <button
//                   onClick={() => !token && router.push("/account/login")}
//                   className="cursor-pointer"
//                 >
//                   <UserCircleIcon className="w-6 h-6" />
//                 </button>

//                 {token && accountOpen && (
//                   <div className="absolute right-0 top-full pt-2 z-50">
//                     <div className="w-44 bg-white shadow-lg rounded-md">
//                       <button
//                         onClick={() => {
//                           router.push("/dashboard");
//                           setAccountOpen(false);
//                         }}
//                         className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                       >
//                         Dashboard
//                       </button>
//                       <button
//                         onClick={logout}
//                         className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* CART */}
//               <button onClick={() => setCartOpen(true)} className="relative">
//                 <img
//                   src="/cart-shopping-svgrepo-com.svg"
//                   className="w-5"
//                   alt="cart"
//                 />
//                 {count > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
//                     {count}
//                   </span>
//                 )}
//               </button>

//               {/* MOBILE MENU BUTTON */}
//               <button
//                 className="lg:hidden text-2xl"
//                 onClick={() => setMenuOpen(true)}
//               >
//                 ☰
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ===== MOBILE SIDEBAR ===== */}
//       {menuOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setMenuOpen(false)}
//           />

//           <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto p-5">

//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-bold">Menu</h2>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="text-2xl"
//               >
//                 ✕
//               </button>
//             </div>

//             {menuLoading ? (
//               <div className="space-y-3">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     className="h-4 w-32 bg-gray-200 rounded animate-pulse"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredMenus.map((menu) => (
//                   <div key={menu.key}>
//                     <h4 className="font-semibold uppercase text-sm mb-2">
//                       {menu.label}
//                     </h4>

//                     <ul className="space-y-2 ml-2">
//                       {menu.items.map((item) => (
//                         <li key={item}>
//                           <Link
//                             href={`/collections?category=${slugify(item)}`}
//                             onClick={() => setMenuOpen(false)}
//                             className="block text-sm text-gray-700 hover:text-black"
//                           >
//                             {item}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}

//                 <div className="pt-6 border-t mt-6">
//                   <h3 className="font-bold text-base mb-2">About Us</h3>
//                   <p className="text-sm leading-relaxed text-gray-600">
//                     Hamsini Silks is a celebration of India’s rich handloom tradition...
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

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
import api from "../utils/apiInstance";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaDribbble,
} from "react-icons/fa";

import { useSocialMedia } from "././context/SocialMediaContext";

/* ---------- UTILS ---------- */
const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [token, setToken] = useState(null);

  const { count, cartOpen, setCartOpen } = useCart();
  const { socialLinks } = useSocialMedia();

  const router = useRouter();
  const dropdownRef = useRef(null);

  /* ---------- TOKEN ---------- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  /* ---------- MENU API ---------- */
  useEffect(() => {
    let isMounted = true;

    async function fetchMenu() {
      try {
        setMenuLoading(true);
        const res = await api.get("ecom/menu");
        if (!isMounted) return;
        setMenuData(Array.isArray(res?.data) ? res.data : []);
      } catch {
        if (!isMounted) return;
        setMenuData([]);
      } finally {
        if (isMounted) setMenuLoading(false);
      }
    }

    fetchMenu();
    return () => {
      isMounted = false;
    };
  }, []);

  /* ---------- CLOSE PROFILE ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push("/");
    window.location.reload();
  };

  /* ✅ SHOW FIRST 6, REST IN MORE */
  const visibleMenus = menuData.slice(0, 6);
  const extraMenus = menuData.slice(6);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4 lg:gap-0">

            {/* LOGO */}
            <Link href="/">
              <Image
                src="/image.png"
                alt="Hamsini Silks & Jewellers"
                width={120}
                height={100}
                priority
              />
            </Link>

            {/* ===== DESKTOP NAV ===== */}
            <nav className="hidden lg:flex gap-8 uppercase text-sm font-bold">
              {menuLoading ? (
                <>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-4 w-20 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </>
              ) : (
                <>
                  {visibleMenus.map((menu) => (
                    <div key={menu.key} className="relative group">
                      <span className="cursor-pointer pb-2 inline-block">
                        {menu.label}
                      </span>

                      {menu.items?.length > 0 && (
                        <div className="absolute top-full left-0 bg-white shadow-lg z-40 
                          opacity-0 invisible group-hover:opacity-100 
                          group-hover:visible transition-all duration-200">
                          <ul className="flex flex-col p-4 min-w-[200px]">
                            {menu.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/collections?category=${slugify(item)}`}
                                  // href={`/products?details=${slugify(item)}`}
                                  className="block px-3 py-2 hover:bg-gray-100 whitespace-nowrap"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}

                  {extraMenus.length > 0 && (
                    <div className="relative group">
                      <span className="cursor-pointer pb-2 inline-block">
                        More
                      </span>

                      <div className="absolute top-full left-0 bg-white shadow-lg z-40 
                        opacity-0 invisible group-hover:opacity-100 
                        group-hover:visible transition-all duration-200">
                        <ul className="flex flex-col p-4 min-w-[200px]">
                          {extraMenus.map((menu) => (
                            <li key={menu.key} className="px-3 py-2 whitespace-nowrap">
                              {menu.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )}
            </nav>

            {/* ===== RIGHT SECTION ===== */}
            <div className="flex items-center gap-5 justify-center lg:justify-end w-full lg:w-auto">

              {/* SOCIAL ICONS */}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn size={18} />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={18} />
                </a>
              )}
              {socialLinks?.dribbble && (
                <a href={socialLinks.dribbble} target="_blank" rel="noopener noreferrer">
                  <FaDribbble size={18} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={18} />
                </a>
              )}
              {socialLinks?.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={18} />
                </a>
              )}

              {/* PROFILE */}
              <div
                ref={dropdownRef}
                className="relative mt-2"
                onMouseEnter={() => token && setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <button
                  onClick={() => !token && router.push("/account/login")}
                  className="cursor-pointer"
                >
                  <UserCircleIcon className="w-6 h-6" />
                </button>

                {token && accountOpen && (
                  <div className="absolute right-0 top-full pt-2 z-50">
                    <div className="w-44 bg-white shadow-lg rounded-md">
                      <button
                        onClick={() => {
                          router.push("/dashboard");
                          setAccountOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={logout}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* CART */}
              <button onClick={() => setCartOpen(true)} className="relative">
                <img
                  src="/cart-shopping-svgrepo-com.svg"
                  className="w-5"
                  alt="cart"
                />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              {/* MOBILE MENU BUTTON */}
              <button
                className="lg:hidden text-2xl"
                onClick={() => setMenuOpen(true)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR (UNCHANGED) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setMenuOpen(false)} className="text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {menuData.map((menu) => (
                <div key={menu.key}>
                  <h4 className="font-semibold uppercase text-sm mb-2">
                    {menu.label}
                  </h4>
                  <ul className="space-y-2 ml-2">
                    {menu.items?.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/collections?category=${slugify(item)}`}
                          onClick={() => setMenuOpen(false)}
                          className="block text-sm text-gray-700 hover:text-black"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
