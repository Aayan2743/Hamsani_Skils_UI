

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// import CartSidebar from "../components/CartSidebar";
// import { useCart } from "../providers/CartProvider";
// import { useAuth } from "../components/context/AuthProvider";
// import {api} from "../utils/api"

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
//   /* ================= FETCH MENU ================= */
//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const res = await fetch("http://192.168.1.3:8000/api/ecom/menu");
        
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
        
//         const data = await res.json();
        
//         // Handle different response structures
//         const menuItems = data?.data || data;
//         setMenuData(Array.isArray(menuItems) ? menuItems : []);
//       } catch (err) {
//         console.error("Menu API error:", err);
//         // Fallback to empty array to prevent crashes
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
//             {/* DESKTOP SEARCH */}
//             <div className="hidden lg:flex items-center border px-3 py-1 rounded-md">
//               <input
//                 suppressHydrationWarning
//                 type="text"
//                 placeholder="Search"
//                 className="ml-2 outline-none text-sm w-[160px]"
//               />
//             </div>

//             {/* PROFILE */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() =>
//                   !user
//                     ? router.push("/account/login")
//                     : setAccountOpen((p) => !p)
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
//               <img
//                 src="/cart-shopping-svgrepo-com.svg"
//                 className="w-[20px]"
//               />
//               {count > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
//                   {count}
//                 </span>
//               )}
//             </button>

//             {/* HAMBURGER MENU BUTTON */}
//             <button 
//               className="lg:hidden text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors" 
//               onClick={() => setMenuOpen(true)}
//               aria-label="Open menu"
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
//                 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full sm:w-[480px] md:w-[520px] max-w-[95vw] bg-white border shadow-lg">
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

//       {/* MOBILE MENU OVERLAY */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => {
//             setMenuOpen(false);
//             setMobileActive(null);
//           }}
//         />
//       )}

//       {/* MOBILE MENU SIDEBAR */}
//       {menuOpen && (
//         <aside className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-50 overflow-y-auto shadow-xl lg:hidden animate-slide-in-left">
//           {/* MENU HEADER */}
//           <div className="h-16 flex items-center justify-between px-4 border-b bg-white sticky top-0 z-10 shadow-sm">
//             <h2 className="text-lg font-semibold">
//               {mobileActive ? mobileActive.label : 'Menu'}
//             </h2>
//             <button
//               onClick={() => {
//                 if (mobileActive) {
//                   setMobileActive(null);
//                 } else {
//                   setMenuOpen(false);
//                 }
//               }}
//               className="text-3xl leading-none"
//             >
//               {mobileActive ? '←' : '×'}
//             </button>
//           </div>

//           {/* MENU CONTENT */}
//           <div className="p-4">
//             {!mobileActive ? (
//               <nav className="space-y-2">
//                 {menuData.map((menu) => (
//                   <button
//                     key={menu.key}
//                     className="w-full px-4 py-4 flex justify-between items-center border-b hover:bg-gray-50 transition-colors text-left"
//                     onClick={() => setMobileActive(menu)}
//                   >
//                     <span className="font-medium">{menu.label}</span>
//                     <span className="text-xl">›</span>
//                   </button>
//                 ))}
//               </nav>
//             ) : (
//               <nav className="space-y-1">
//                 {mobileActive.items.map((item) => {
//                   const slug = slugify(item);
//                   if (!slug) return null;

//                   return (
//                     <Link
//                       key={item}
//                       href={`/collections?category=${slug}`}
//                       className="block px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
//                       onClick={() => {
//                         setMenuOpen(false);
//                         setMobileActive(null);
//                       }}
//                     >
//                       {item}
//                     </Link>
//                   );
//                 })}
//               </nav>
//             )}
//           </div>
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
import { api } from "../utils/api";

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

  /* ================= FETCH MENU USING API INSTANCE ================= */
  useEffect(() => {
    async function fetchMenu() {
      try {
        const data = await api.getMenu();

        // handle both {data:[]} and [] formats
        const menuItems = data?.data || data;
        setMenuData(Array.isArray(menuItems) ? menuItems : []);
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
                  alt="profile"
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
                alt="cart"
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* HAMBURGER MENU BUTTON */}
            <button
              className="lg:hidden text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full sm:w-[480px] md:w-[520px] max-w-[95vw] bg-white border shadow-lg">
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

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => {
            setMenuOpen(false);
            setMobileActive(null);
          }}
        />
      )}

      {/* MOBILE MENU SIDEBAR */}
      {menuOpen && (
        <aside className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-50 overflow-y-auto shadow-xl lg:hidden animate-slide-in-left">
          <div className="h-16 flex items-center justify-between px-4 border-b bg-white sticky top-0 z-10 shadow-sm">
            <h2 className="text-lg font-semibold">
              {mobileActive ? mobileActive.label : "Menu"}
            </h2>
            <button
              onClick={() => {
                if (mobileActive) {
                  setMobileActive(null);
                } else {
                  setMenuOpen(false);
                }
              }}
              className="text-3xl leading-none"
            >
              {mobileActive ? "←" : "×"}
            </button>
          </div>

          <div className="p-4">
            {!mobileActive ? (
              <nav className="space-y-2">
                {menuData.map((menu) => (
                  <button
                    key={menu.key}
                    className="w-full px-4 py-4 flex justify-between items-center border-b hover:bg-gray-50 transition-colors text-left"
                    onClick={() => setMobileActive(menu)}
                  >
                    <span className="font-medium">{menu.label}</span>
                    <span className="text-xl">›</span>
                  </button>
                ))}
              </nav>
            ) : (
              <nav className="space-y-1">
                {mobileActive.items.map((item) => {
                  const slug = slugify(item);
                  if (!slug) return null;

                  return (
                    <Link
                      key={item}
                      href={`/collections?category=${slug}`}
                      className="block px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileActive(null);
                      }}
                    >
                      {item}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </aside>
      )}

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

