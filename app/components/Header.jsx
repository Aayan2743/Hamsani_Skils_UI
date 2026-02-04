// "use client";
// import { useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import CartSidebar from "../components/CartSidebar";
// import { useCart } from "../providers/CartProvider";
// import { useAuth } from "../components/context/AuthProvider";

// const slugify = (text) =>
//   text
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)+/g, "");


// const MENU = [
//   {
//     key: "silk",
//     label: "Silk Sarees",
//     items: [
//        "Soft Silk",
//       "Kanchipuram Jacquard",
//       "Kanchipuram Traditional",
//       "Soft Silk",
//       "Banarasi Silk",
//       "Pochampally Silk",
//       "9 Yards Silk",
//       "Gadwal Silk",
//       "Mysore Silk",
//       "Arani Silk",
//       "Fancy Kanchipuram Silk",
//     ],
//   },
//   {
//     key: "silk-casual",
//     label: "Silk Sarees",
//     items: [
//        "Georgette Sarees",
//       "Banaras Tussar Silk",
//       "Chiniya Silk",
//       "Kadhi Tussar Silk",
//       "Georgette Sarees",
//       "Modal Silk",
//       "Munga Silk",
//       "Murshidabad Silk",
//       "Pashmina Silk",
//       "Summer Silk",
//       "Cotton Silk",
//       "Kadiyal Silk",
//       "Art Silk",
//       "Soft Silk Mix",
//     ],
//   },
//   {
//     key: "silk-cotton",
//     label: "Silk Cotton",
//     items: [
//       "Patola Silk Cotton",
//       "Chanderi Silk Cotton",
//       "Maheshwari Silk Cotton",
//       "Silk Cotton",
//     ],
//   },
//   {
//     key: "fancy",
//     label: "Fancy Sarees",
//     items: [
//       "Assam Sarees",
//       "Bandhini Crushed Sarees",
//       "Banarasi Sarees",
//       "Banarasi Habutai Satin",
//       "Kosa Sarees",
//       "Kota Sarees",
//       "Laser Embroidery",
//       "Linen Sarees",
//       "Organza Sarees",
//       "Semi Binny Silk",
//       "Semi Crape Sarees",
//       "Semi Dupion Sarees",
//       "Semi Tussar Sarees",
//       "Semi Georgette",
//       "Tissue Sarees",
//     ],
//   },
//   {
//     key: "cotton",
//     label: "Cotton Sarees",
//     items: [
//       "Bengal Cotton",
//       "Byloom Cotton",
//       "Ikkat Cotton",
//       "Kalakshetra Kovai Cotton",
//       "Kanchi Cotton",
//       "Kerala Cotton",
//       "Kovai Cotton",
//       "Manipuri Cotton",
//       "Mangalagiri Cotton",
//       "Orissa Cotton",
//       "Printed Cotton",
//     ],
//   },
//   {
//     key: "materials",
//     label: "Materials",
//     items: [
//       "Dress Materials",
//       "Running Materials",
//       "Men's Wedding Set",
//       "Readymade Blouse",
//     ],
//   },
// ];

// /* ================= COMPONENT ================= */

// export default function Header() {
//   const [desktopActive, setDesktopActive] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileActive, setMobileActive] = useState(null);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

// const { count, cartOpen, setCartOpen } = useCart();

// const { items } = useCart();

// const { user, logout } = useAuth();
// const isLoggedIn = !!user;


// const router = useRouter();
// const dropdownRef = useRef(null);

// const [accountOpen, setAccountOpen] = useState(false);


// // useEffect(() => {
// //   const checkLogin = () => {
// //     const loggedIn = localStorage.getItem("isLoggedIn") === "true";
// //     setIsLoggedIn(loggedIn);
// //   };

// //   checkLogin(); // initial

// //   window.addEventListener("storage", checkLogin);
// //   window.addEventListener("focus", checkLogin);

// //   return () => {
// //     window.removeEventListener("storage", checkLogin);
// //     window.removeEventListener("focus", checkLogin);
// //   };
// // }, []);



// // const handleLogout = () => {
// //   localStorage.removeItem("isLoggedIn");

// //   setIsLoggedIn(false);
// //   setAccountOpen(false);
// //   setMenuOpen(false);

// //   router.push("/");
// // };



// useEffect(() => {
//   function handleOutsideClick(e) {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setAccountOpen(false);
//     }
//   }

//   document.addEventListener("mousedown", handleOutsideClick);
//   return () => document.removeEventListener("mousedown", handleOutsideClick);
// }, []);
//   return (
//     <>
//      <div className="w-full bg-red-500 text-center text-white text-[18px] tracking-wide py-2 relative font-bold font-sans">
//   Our Showrooms EXPLORE
// </div>
//       {/* HEADER */}
//       <header className="bg-white border-b relative z-30 py-2">
//         {/* TOP ROW */}
//         <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[90px] px-4 ">
//           {/* LOGO IMAGE */}
//           <Link href="/">
//             <Image
//               src="/image.png" // <-- PUT YOUR LOGO HERE
//               alt="PSR Silk Sarees"
//               width={120}
//               height={50}
//               priority
//             />
//           </Link>

//           {/* RIGHT ICONS */}
//           <div className="flex items-center gap-6 relative text-black">
//             {/* ================= DESKTOP SEARCH ================= */}
//             <div className="hidden lg:flex items-center border px-3 py-1 rounded-md">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <circle
//                   cx="11"
//                   cy="11"
//                   r="7"
//                   stroke="black"
//                   strokeWidth="1.5"
//                 />
//                 <line
//                   x1="16.5"
//                   y1="16.5"
//                   x2="21"
//                   y2="21"
//                   stroke="black"
//                   strokeWidth="1.5"
//                 />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="ml-2 outline-none text-sm w-[160px]"
//               />
//             </div>

//             {/* ================= MOBILE SEARCH ================= */}
           
//             <div className="flex items-center gap-5 relative">
//               {/* MOBILE SEARCH ICON */}
//               <div className="relative lg:hidden">
//                 <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                     <circle
//                       cx="11"
//                       cy="11"
//                       r="7"
//                       stroke="black"
//                       strokeWidth="1.5"
//                     />
//                     <line
//                       x1="16.5"
//                       y1="16.5"
//                       x2="21"
//                       y2="21"
//                       stroke="black"
//                       strokeWidth="1.5"
//                     />
//                   </svg>
//                 </button>

//                 {mobileSearchOpen && (
//                   <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border shadow-md rounded-md px-3 py-2 w-[220px] z-50">
//                     <input
//                       autoFocus
//                       type="text"
//                       placeholder="Search products"
//                       className="w-full outline-none text-sm"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* MOBILE PROFILE ICON */}
//               {/* ACCOUNT / PROFILE */}
// <div className="relative" ref={dropdownRef}>
//   <button
//     onClick={() => {
//      if (!user) {
//   router.push("/account/login");
// }
//  else {
//         setAccountOpen((s) => !s);
//       }
//     }}
//     className="flex items-center gap-1"
//   >
//     <img
//       src="/profile-round-1342-svgrepo-com.svg"
//       alt="Account"
//       className="w-[20px] h-[20px]"
//     />

//     {isLoggedIn && (
//       <span>{user ? "Account" : "Login"}</span>

//     )}
//   </button>

//   {/* DROPDOWN */}
//   {isLoggedIn && accountOpen && (
//     <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-md z-50">
//       <button
//         onClick={() => {
//           setAccountOpen(false);
//           router.push("/dashboard");
//         }}
//         className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
//       >
//         Dashboard
//       </button>

//       <button
//   onClick={() => {
//     logout();
//     setAccountOpen(false);
//     setMenuOpen(false);
//     router.push("/");
    
//   }}
//   className="w-full text-left px-4 py-2 text-red-600"
// >
//   Logout
// </button>

//     </div>
//   )}
// </div>

//              {/* CART ICON */}
// <button
//   className="relative"
//   onClick={() => setCartOpen(true)}
// >
//   <img
//     src="/cart-shopping-svgrepo-com.svg"
//     alt="Cart"
//     className="w-[20px] h-[20px]"
//   />

//   {count > 0 && (
//     <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//       {count}
//     </span>
//   )}
// </button>


//               {/* HAMBURGER */}
               
//               <button
//                 className="lg:hidden text-2xl"
//                 onClick={() => {
//                   setMenuOpen(true);
//                   setMobileSearchOpen(false);
//                 }}
//               >
//                 ☰
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* DESKTOP MENU */}
//         <nav className="hidden lg:flex justify-center gap-8 pb-3 mt-3 text-[14px] uppercase tracking-[0.15em] text-black font-sans font-bold">
//           {MENU.map((menu) => (
//             <div
//               key={menu.key}
//               className="relative"
//               onMouseEnter={() => setDesktopActive(menu.key)}
//               onMouseLeave={() => setDesktopActive(null)}
//             >
//             <span className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-black font-sans">
//   {menu.label}
// </span>

//           {desktopActive === menu.key && (
//   <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white border shadow-lg">
//     <ul className="grid grid-cols-2 gap-x-6 gap-y-2 p-4 text-[16px] normal-case">
//       {menu.items.map((item, i) => (
//         <li key={i} className="hover:bg-gray-50 font-sans rounded">
//           <Link
//             href={`/collections?category=${slugify(item)}`}
//             className="block px-3 py-2"
//           >
//             {item}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

//             </div>
//           ))}
//         </nav>
//       </header>

//       {/* OVERLAY */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => {
//             setMenuOpen(false);
//             setMobileActive(null);
//           }}
//         />
//       )}

//       {/* MOBILE SIDEBAR */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 transition-transform duration-300 text-black ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* MAIN MENU */}
//         {!mobileActive && (
//           <>
//             <div className="h-[56px] flex justify-between items-center px-4 border-b text-black">
//               <span className="text-lg">Menu</span>
//               <button onClick={() => setMenuOpen(false)}>×</button>
//             </div>

//             <nav className="divide-y text-[15px] uppercase">
//               {MENU.map((menu) => (
//                 <button
//                   key={menu.key}
//                   className="w-full px-4 py-4 flex justify-between font-sans"
//                   onClick={() => setMobileActive(menu)}
//                 >
//                   {menu.label}
//                   <span>›</span>
//                 </button>
//               ))}
//             </nav>
//           </>
//         )}

//         {/* SUB MENU */}
//         {mobileActive && (
//           <>
//             {/* <div className="h-[56px] flex items-center gap-3 px-4 border-b">
//               <button onClick={() => setMobileActive(null)}>←</button>
//               <span className="uppercase">{mobileActive.label}</span>
//             </div> */}

//             <div className="px-4 py-4 border-b text-[15px]">
//             <Link
//   href={`/collections/${slugify(mobileActive.label)}`}
//   className="block px-4 py-4 text-[14px] font-medium"
//   onClick={() => {
//     setMenuOpen(false);
//     setMobileActive(null);
//   }}
// >
//   Go To {mobileActive.label}
// </Link>

//             </div>

//             <nav className="divide-y text-[16px]">
//            {mobileActive.items.map((item) => (
//   <Link
//     key={item}
//     href={`/collections?category=${slugify(item)}`}
//     className="block px-4 py-4 hover:bg-gray-50"
//     onClick={() => {
//       setMenuOpen(false);
//       setMobileActive(null);
//     }}
//   >
//     {item}
//   </Link>
// ))}

//             </nav>
          
//           </>
//         )}

//        <div className="border-t mt-6 text-[15px]">
//   {!isLoggedIn ? (
//     <>
//       {/* SIGN IN */}
//       <Link href="/account/login">
//         <div
//           className="px-4 py-4 flex items-center gap-3"
//           onClick={() => setMenuOpen(false)}
//         >
//           👤 <span>Sign In</span>
//         </div>
//       </Link>

//       {/* REGISTER */}
//       <Link href="/account/register">
//         <div
//           className="px-4 py-4 flex items-center gap-3"
//           onClick={() => setMenuOpen(false)}
//         >
//           ➕ <span>Create an Account</span>
//         </div>
//       </Link>
//     </>
//   ) : (
//     <>
//       <Link href="/dashboard">
//         <div
//           className="px-4 py-2"
//           onClick={() => setMenuOpen(false)}
//         >
//           Overview
//         </div>
//       </Link>

//       <Link href="/dashboard/purchase-history">
//         <div
//           className="px-4 py-2"
//           onClick={() => setMenuOpen(false)}
//         >
//           Purchase History
//         </div>
//       </Link>

//       <Link href="/dashboard/wishlist">
//         <div
//           className="px-4 py-2"
//           onClick={() => setMenuOpen(false)}
//         >
//           Wishlist
//         </div>
//       </Link>

//       <Link href="/dashboard/addresses">
//         <div
//           className="px-4 py-2"
//           onClick={() => setMenuOpen(false)}
//         >
//           Address
//         </div>
//       </Link>

//       <Link href="/dashboard/profile">
//         <div
//           className="px-4 py-2"
//           onClick={() => setMenuOpen(false)}
//         >
//           Profile
//         </div>
//       </Link>

//       {/* LOGOUT */}
//      <button
//   onClick={() => {
//     logout();
//     setAccountOpen(false);
//     setMenuOpen(false);
//     router.push("/");
//   }}
// >
//   Logout
// </button>

//     </>
//   )}
// </div>

//       </aside>
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-50">
//         <div className="flex justify-between px-6 py-3 text-[13px]">
//           {/* HOME */}
//           <Link href="/">
//           <div className="flex flex-col items-center gap-1 text-black">
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M3 10.5L12 3l9 7.5V21H3z"
//                 stroke="black"
//                 strokeWidth="1.5"
//               />
//             </svg>
//             <span>Home</span>
//           </div>
// </Link>
//           {/* SEARCH */}
//             <Link href="/">
//           <div className="flex flex-col items-center gap-1 text-black">
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//               <circle cx="11" cy="11" r="7" stroke="black" strokeWidth="1.5" />
//               <line
//                 x1="16.5"
//                 y1="16.5"
//                 x2="21"
//                 y2="21"
//                 stroke="black"
//                 strokeWidth="1.5"
//               />
//             </svg>
//             <span>Search</span>
//           </div>
// </Link>
//           {/* COLLECTION */}
//           <Link href="/">
//           <div className="flex flex-col items-center gap-1 text-black">
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//               <rect
//                 x="3"
//                 y="3"
//                 width="7"
//                 height="7"
//                 stroke="black"
//                 strokeWidth="1.5"
//               />
//               <rect
//                 x="14"
//                 y="3"
//                 width="7"
//                 height="7"
//                 stroke="black"
//                 strokeWidth="1.5"
//               />
//               <rect
//                 x="3"
//                 y="14"
//                 width="7"
//                 height="7"
//                 stroke="black"
//                 strokeWidth="1.5"
//               />
//               <rect
//                 x="14"
//                 y="14"
//                 width="7"
//                 height="7"
//                 stroke="black"
//                 strokeWidth="1.5"
//               />
//             </svg>
//             <span>Collection</span>
//           </div>
// </Link>
//           {/* ACCOUNT */}
//         <div
//   onClick={() => {
//     if (isLoggedIn) {
//       router.push("/dashboard");
//     } else {
//       router.push("/account/login");
//     }
//   }}
//   className="flex flex-col items-center gap-1 text-black cursor-pointer"
// >
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <circle cx="12" cy="8" r="4" stroke="black" strokeWidth="1.5" />
//     <path
//       d="M4 21c1.5-4 14.5-4 16 0"
//       stroke="black"
//       strokeWidth="1.5"
//     />
//   </svg>
//   <span>Account</span>
// </div>

//           {/* CART */}
          
//           <div className="flex flex-col items-center gap-1 relative text-black">
//            {/* CART ICON */}
// <button
//   className="relative"
//   onClick={() => setCartOpen(true)}
// >
//   {/* <img
//     src="/cart-shopping-svgrepo-com.svg"
//     alt="Cart"
//     className="w-[20px] h-[20px]"
//   /> */}

//   {count > 0 && (
//             <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//               {count}
//             </span>
//           )}
// </button>

//           </div>
          
//         </div>
//       </div>
//       <CartSidebar
//   open={cartOpen}
//   onClose={() => setCartOpen(false)}
// />
//     </>
//   );
// }


// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// import CartSidebar from "../components/CartSidebar";
// import { useCart } from "../providers/CartProvider";
// import { useAuth } from "../components/context/AuthProvider";
// const slugify = (text) =>
//   text
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)+/g, "");

// export default function Header() {
//   const [desktopActive, setDesktopActive] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileActive, setMobileActive] = useState(null);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [menuData, setMenuData] = useState([]);

//   const { count, cartOpen, setCartOpen } = useCart();
//   const { user, logout } = useAuth();
//   const isLoggedIn = !!user;

//   const router = useRouter();
//   const dropdownRef = useRef(null);

//   /* ================= FETCH MENU ================= */
//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const res = await fetch("http://192.168.1.6:8000/api/ecom/menu");
//         const data = await res.json();
//         setMenuData(data);
//       } catch (err) {
//         console.error("Menu API error:", err);
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
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, []);

//   return (
//     <>
//       <div className="w-full bg-red-500 text-center text-white text-[18px] tracking-wide py-2 relative font-bold font-sans">
//         Our Showrooms EXPLORE
//       </div>

//       {/* HEADER */}
//       <header className="bg-white border-b relative z-30 py-2">
//         <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[90px] px-4">
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
//             {/* DESKTOP SEARCH */}
//             <div className="hidden lg:flex items-center border px-3 py-1 rounded-md">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="ml-2 outline-none text-sm w-[160px]"
//               />
//             </div>

//             {/* PROFILE */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() =>
//                   !user ? router.push("/account/login") : setAccountOpen(!accountOpen)
//                 }
//               >
//                 <img
//                   src="/profile-round-1342-svgrepo-com.svg"
//                   className="w-[20px] h-[20px]"
//                 />
//               </button>

//               {isLoggedIn && accountOpen && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-md">
//                   <button
//                     onClick={() => router.push("/dashboard")}
//                     className="block w-full px-4 py-2 text-left"
//                   >
//                     Dashboard
//                   </button>
//                   <button
//                     onClick={() => {
//                       logout();
//                       router.push("/");
//                     }}
//                     className="block w-full px-4 py-2 text-left text-red-600"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* CART */}
//             <button onClick={() => setCartOpen(true)} className="relative">
//               <img src="/cart-shopping-svgrepo-com.svg" className="w-[20px]" />
//               {count > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
//                   {count}
//                 </span>
//               )}
//             </button>
//             {/* HAMBURGER */}
//             <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
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
//                     {menu.items.map((item) => (
//                       <li key={item}>
//                         <Link
//                           href={`/collections?category=${slugify(item)}`}
//                           className="block px-3 py-2 hover:bg-gray-50"
//                         >
//                           {item}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </header>
//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <aside className="fixed inset-y-0 left-0 w-[85%] bg-white z-50">
//           {!mobileActive ? (
//             menuData.map((menu) => (
//               <button
//                 key={menu.key}
//                 className="w-full px-4 py-4 flex justify-between"
//                 onClick={() => setMobileActive(menu)}
//               >
//                 {menu.label} <span>›</span>
//               </button>
//             ))
//           ) : (
//             <>
//               {mobileActive.items.map((item) => (
//                 <Link
//                   key={item}
//                   href={`/collections?category=${slugify(item)}`}
//                   className="block px-4 py-4"
//                   onClick={() => {
//                     setMenuOpen(false);
//                     setMobileActive(null);
//                   }}
//                 >
//                   {item}
//                 </Link>
//               ))}
//             </>
//           )}
//         </aside>
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
import { useAuth } from "../components/context/AuthProvider";

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
  /* ================= FETCH MENU ================= */
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("http://192.168.1.6:8000/api/ecom/menu");
        const data = await res.json();

        console.log("test",data)
        setMenuData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Menu API error:", err);
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
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full bg-red-500 text-center text-white text-[18px] py-2 font-bold font-sans">
        Our Showrooms EXPLORE
      </div>

      {/* HEADER */}
      <header className="bg-white border-b relative z-30 py-2">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[90px] px-4">
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
            {/* DESKTOP SEARCH */}
            <div className="hidden lg:flex items-center border px-3 py-1 rounded-md">
              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search"
                className="ml-2 outline-none text-sm w-[160px]"
              />
            </div>

            {/* PROFILE */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  !user
                    ? router.push("/account/login")
                    : setAccountOpen((p) => !p)
                }
              >
                <img
                  src="/profile-round-1342-svgrepo-com.svg"
                  className="w-[20px] h-[20px]"
                />
              </button>

              {isLoggedIn && accountOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-md">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="block w-full px-4 py-2 text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="block w-full px-4 py-2 text-left text-red-600"
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
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* HAMBURGER */}
            <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <aside className="fixed inset-y-0 left-0 w-[85%] bg-white z-50">
          {!mobileActive ? (
            menuData.map((menu) => (
              <button
                key={menu.key}
                className="w-full px-4 py-4 flex justify-between"
                onClick={() => setMobileActive(menu)}
              >
                {menu.label} <span>›</span>
              </button>
            ))
          ) : (
            <>
              {mobileActive.items.map((item) => {
                const slug = slugify(item);
                if (!slug) return null;

                return (
                  <Link
                    key={item}
                    href={`/collections?category=${slug}`}
                    className="block px-4 py-4"
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileActive(null);
                    }}
                  >
                    {item}
                  </Link>
                );
              })}
            </>
          )}
        </aside>
      )}

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}




