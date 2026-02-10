
// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// import CartSidebar from "../components/CartSidebar";
// import { useCart } from "../providers/CartProvider";
// import api from "../utils/apiInstance";

// import {
//   UserCircleIcon,
//   ArrowRightOnRectangleIcon,
// } from "@heroicons/react/24/outline";

// import { FaFacebookF, FaInstagram } from "react-icons/fa";

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
//   const [token, setToken] = useState(null);

//   const { count, cartOpen, setCartOpen } = useCart();
//   const router = useRouter();
//   const dropdownRef = useRef(null);

//   /* TOKEN */
//   useEffect(() => {
//     setToken(localStorage.getItem("token"));
//   }, []);

//   /* MENU API */
//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const res = await api.get("ecom/menu");
//         setMenuData(Array.isArray(res?.data) ? res.data : []);
//       } catch {
//         setMenuData([]);
//       }
//     }
//     fetchMenu();
//   }, []);

//   /* CLOSE PROFILE DROPDOWN */
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

//   const handleProfileClick = () => {
//     if (!token) router.push("/account/login");
//     else setAccountOpen((p) => !p);
//   };

//   const filteredMenus = menuData.filter(
//     (menu) => menu.items && menu.items.length
//   );

//   const visibleMenus = filteredMenus.slice(0, 6);
//   const extraMenus = filteredMenus.slice(6);

//   return (
//     <>
//       <header className="bg-white  relative z-30 mt-2">
//         <div className="max-w-[1400px] mx-auto px-4">
//           {/* TOP ROW */}
//           <div className="flex justify-between items-center py-4">
//             {/* LOGO */}
//             <Link href="/">
//               <Image
//                 src="/image.png"
//                 alt="PSR Silk Sarees"
//                 width={120}
//                 height={50}
//                 priority
//               />
//             </Link>
//               <nav className="hidden lg:flex justify-center gap-8 py-4 uppercase text-sm font-bold">
//             {visibleMenus.map((menu) => (
//               <div
//                 key={menu.key}
//                 className="relative"
//                 onMouseEnter={() => setDesktopActive(menu.key)}
//                 onMouseLeave={() => setDesktopActive(null)}
//               >
//                 <span className="cursor-pointer pb-2 hover">
//                   {menu.label}
//                 </span>
//                 {desktopActive === menu.key && (
//                   <div className="absolute top-full mt-3 bg-white shadow-lg z-40">
//                     <ul className="flex flex-col gap-2 p-4">
//                       {menu.items.map((item) => (
//                         <li key={item}>
//                           <Link
//                             href={`/collections?category=${slugify(item)}`}
//                             className="block px-3 py-2 hover:bg-gray-50"
//                           >
//                             {item}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ))}

//             {extraMenus.length > 0 && (
//               <div
//                 className="relative"
//                 onMouseEnter={() => setDesktopActive("more")}
//                 onMouseLeave={() => setDesktopActive(null)}
//               >
//                 <span className="cursor-pointer pb-2 ">
//                   More
//                 </span>

//                 {desktopActive === "more" && (
//                   <div className="absolute top-full mt-3 bg-white shadow-lg z-40">
//                     <ul className="flex flex-col gap-2 p-4">
//                       {extraMenus.map((menu) => (
//                         <li key={menu.key}>{menu.label}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )}
//           </nav>

//             {/* ICONS */}
//             <div className="flex items-center gap-5 text-black mb-20">
//               <a
//                 href="https://www.facebook.com/profile.php?id=61587415783400"
//                 target="_blank"
//                 className="hover:text-blue-600"
//               >
//                 <FaFacebookF size={18} />
//               </a>

//               <a
//                 href="https://www.instagram.com/hamsinisilks/?hl=en"
//                 target="_blank"
//                 className="hover:text-pink-600"
//               >
//                 <FaInstagram size={18} />
//               </a>

//               {/* PROFILE */}
//             <div
//   ref={dropdownRef}
//   className="relative mt-2"
//   onMouseEnter={() => token && setAccountOpen(true)}
//   onMouseLeave={() => setAccountOpen(false)}
// >
//   <button
//     onClick={() => {
//       if (!token) router.push("/account/login");
//     }}
//     className="cursor-pointer pb-2"
//   >
//     {token ? (
//       <UserCircleIcon className="w-6 h-6" />
//     ) : (
//       <UserCircleIcon className="w-6 h-6" />
//     )}
//   </button>

//   {token && accountOpen && (
//     <div className="absolute right-0 top-full pt-2 z-50">
//       <div className="w-44 bg-white  shadow-lg rounded-md overflow-hidden">
//         <button
//           onClick={() => {
//             router.push("/dashboard");
//             setAccountOpen(false);
//           }}
//           className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//         >
//           Dashboard
//         </button>

//         <button
//           onClick={logout}
//           className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   )}
// </div>


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

//               {/* MOBILE */}
//               <button
//                 className="lg:hidden text-2xl"
//                 onClick={() => setMenuOpen(true)}
//               >
//                 ☰
//               </button>
//             </div>
//           </div>

//           {/* CENTER MENU */}
//         </div>
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
import api from "../utils/apiInstance";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

/* ---------- UTILS ---------- */
const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function Header() {
  const [desktopActive, setDesktopActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [token, setToken] = useState(null);

  const { count, cartOpen, setCartOpen } = useCart();
  const router = useRouter();
  const dropdownRef = useRef(null);

  /* ---------- TOKEN ---------- */
  useEffect(() => {
    setToken(localStorage.getItem("token"));
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
      } catch (error) {
        if (!isMounted) return;
        console.error("Menu fetch error:", error);
        setMenuData([]);
      } finally {
        if (isMounted) {
          setMenuLoading(false);
        }
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

  const filteredMenus = menuData.filter(
    (menu) => menu.items && menu.items.length
  );

  const visibleMenus = filteredMenus.slice(0, 6);
  const extraMenus = filteredMenus.slice(6);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4 lg:gap-0">

            {/* LOGO */}
            <Link href="/">
              <Image
                src="/image.png"
                alt="Hamsini Silks & Jewellers"
                width={120}
                height={60}
                priority
              />
            </Link>

            {/* ===== DESKTOP NAV ===== */}
            <nav className="hidden lg:flex gap-8 uppercase text-sm font-bold">
              {menuLoading ? (
                // Menu skeleton loader
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
                    <div
                      key={menu.key}
                      className="relative"
                      onMouseEnter={() => setDesktopActive(menu.key)}
                      onMouseLeave={() => setDesktopActive(null)}
                    >
                      <span className="cursor-pointer pb-2">
                        {menu.label}
                      </span>

                      {desktopActive === menu.key && (
                        <div className="absolute top-full mt-3 bg-white shadow-lg z-40">
                          <ul className="flex flex-col p-4 min-w-[200px]">
                            {menu.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/collections?category=${slugify(item)}`}
                                  className="block px-3 py-2 hover:bg-gray-100"
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
                    <div
                      className="relative"
                      onMouseEnter={() => setDesktopActive("more")}
                      onMouseLeave={() => setDesktopActive(null)}
                    >
                      <span className="cursor-pointer pb-2">More</span>

                      {desktopActive === "more" && (
                        <div className="absolute top-full mt-3 bg-white shadow-lg z-40">
                          <ul className="flex flex-col p-4 min-w-[200px]">
                            {extraMenus.map((menu) => (
                              <li key={menu.key} className="px-3 py-2">
                                {menu.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </nav>

            {/* ===== RIGHT ICONS ===== */}
            <div className="flex items-center gap-5 justify-center lg:justify-end w-full lg:w-auto">

              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/profile.php?id=61587415783400"
                target="_blank"
                className="hover:text-blue-600"
              >
                <FaFacebookF size={18} />
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/hamsinisilks/?hl=en"
                target="_blank"
                className="hover:text-pink-600"
              >
                <FaInstagram size={18} />
              </a>

              {/* PROFILE */}
              <div
                ref={dropdownRef}
                className="relative"
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

              {/* HAMBURGER */}
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

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center px-4 py-4 border-b">
              <Image src="/image.png" width={100} height={50} alt="logo" />
              <button onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            <div className="px-4 py-3 space-y-2">
              {menuLoading ? (
                // Mobile menu skeleton
                <>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-10 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </>
              ) : (
                filteredMenus.map((menu) => (
                  <MobileMenuItem
                    key={menu.key}
                    menu={menu}
                    onClose={() => setMenuOpen(false)}
                  />
                ))
              )}
            </div>

            <div className="border-t px-4 py-4">
              {!token ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/account/login");
                  }}
                  className="w-full py-2 text-left font-medium"
                >
                  Login / Register
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full py-2 text-left font-medium"
                  >
                    My Account
                  </button>
                  <button
                    onClick={logout}
                    className="w-full py-2 text-left text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

/* ================= MOBILE MENU ITEM ================= */
function MobileMenuItem({ menu, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-2 font-semibold"
      >
        {menu.label}
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="pl-4 space-y-1">
          {menu.items.map((item) => (
            <Link
              key={item}
              href={`/collections?category=${slugify(item)}`}
              onClick={onClose}
              className="block py-1 text-sm text-gray-700"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

