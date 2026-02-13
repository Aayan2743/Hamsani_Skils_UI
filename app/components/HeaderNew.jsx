"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownMenu } from "../utils/animations.js";

import CartSidebar from "./CartSidebar";
import { useCart } from "../providers/CartProvider";
import api from "../utils/apiInstance";

import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  HeartIcon, 
  ShoppingBagIcon,
  Bars3Icon,
  ChevronDownIcon 
} from "@heroicons/react/24/outline";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function HeaderNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { count, cartOpen, setCartOpen } = useCart();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const visibleMenus = menuData.slice(0, 6);

  return (
    <>
      {/* STICKY HEADER WRAPPER */}
      <div className="sticky top-0 z-50">
        {/* MAIN HEADER */}
        <header className="bg-[#F5F5DC]">
          <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            
            {/* LOGO */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/image.png"
                alt="Vastra"
                width={100}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </Link>

            {/* SEARCH BAR */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for sarees, silk, banarasi..."
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-[#C4A962] hover:bg-[#B39952] transition-colors"
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* ACCOUNT */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => token && setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <button
                  onClick={() => !token && router.push("/account/login")}
                  className="flex flex-col items-center gap-1 hover:text-[#8B4513] transition-colors"
                >
                  <UserIcon className="w-6 h-6" />
                  <span className="text-xs hidden md:block">Account</span>
                </button>

                {token && accountOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownMenu}
                    className="absolute right-0 top-full mt-2 w-44 bg-white shadow-lg rounded-sm z-50"
                  >
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        setAccountOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>

              {/* WISHLIST */}
              <Link
                href="/dashboard/wishlist"
                className="flex flex-col items-center gap-1 hover:text-[#8B4513] transition-colors"
              >
                <HeartIcon className="w-6 h-6" />
                <span className="text-xs hidden md:block">Wishlist</span>
              </Link>

              {/* CART */}
              <button
                onClick={() => setCartOpen(true)}
                className="flex flex-col items-center gap-1 hover:text-[#8B4513] transition-colors relative"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                <span className="text-xs hidden md:block">Cart</span>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8B4513] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {count}
                  </span>
                )}
              </button>

              {/* MOBILE MENU */}
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for sarees..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 text-sm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-[#C4A962] hover:bg-[#B39952]"
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* SECONDARY NAVIGATION */}
      <nav className="bg-white shadow-sm hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center gap-8 py-3">
            
            {/* CATEGORY DROPDOWNS */}
            {menuLoading ? (
              <div className="flex gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              visibleMenus.map((menu) => (
                <div
                  key={menu.key}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(menu.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium hover:text-[#8B4513] transition-colors py-2">
                    {menu.label}
                    {menu.items?.length > 0 && (
                      <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>

                  {menu.items?.length > 0 && activeDropdown === menu.key && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownMenu}
                      onMouseEnter={() => setActiveDropdown(menu.key)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-0 w-56 bg-white shadow-xl rounded-lg overflow-hidden z-50"
                    >
                      <ul className="py-2">
                        {menu.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/collections?category=${slugify(item)}`}
                              className="block px-4 py-2.5 text-sm hover:bg-[#F5F5DC] hover:text-[#8B4513] transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              ))
            )}

            {/* NEW ARRIVALS & BESTSELLERS */}
            <Link
              href="/collections?filter=new"
              className="text-sm font-medium text-[#C4A962] hover:text-[#B39952] transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              href="/collections?filter=bestsellers"
              className="text-sm font-medium hover:text-[#8B4513] transition-colors"
            >
              Bestsellers
            </Link>
          </div>
        </div>
      </nav>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Menu</h2>
                  <button onClick={() => setMenuOpen(false)} className="text-2xl">
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {menuData.map((menu) => (
                    <div key={menu.key}>
                      <h4 className="font-semibold text-sm mb-2">{menu.label}</h4>
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
