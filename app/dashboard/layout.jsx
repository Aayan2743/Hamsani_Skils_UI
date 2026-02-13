
'use client'
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const rawPath = usePathname() || '/dashboard'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = normalizePath(rawPath)

  const NAV = [
    { key: 'overview', label: 'Overview', path: '/dashboard', icon: HomeIcon },
    { key: 'purchase', label: 'Purchase History', path: '/dashboard/purchase-history', icon: ShoppingBagIcon },
    { key: 'wishlist', label: 'Wishlist', path: '/dashboard/wishlist', icon: HeartIcon },
    { key: 'profile', label: 'Manage Profile', path: '/dashboard/profile', icon: UserIcon },
  ]

  function navigateTo(path) {
    router.push(normalizePath(path))
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden mb-4 px-4 py-2 bg-white rounded-lg shadow-sm flex items-center gap-2"
        >
          <Bars3Icon className="w-5 h-5" />
          <span>Menu</span>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile Menu Sidebar */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl md:hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-[#2C1810]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Dashboard
                    </h2>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <nav>
                    <ul className="space-y-2">
                      {NAV.map((n) => {
                        const navPath = normalizePath(n.path)
                        const isActive = pathname === navPath || (n.key !== 'overview' && pathname.startsWith(navPath + '/'))

                        return (
                          <li key={n.key}>
                            <button
                              type="button"
                              onClick={() => navigateTo(navPath)}
                              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3 ${
                                isActive 
                                  ? 'bg-[#8B4513] text-white shadow-md' 
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <n.icon className="w-5 h-5" />
                              {n.label}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row items-start gap-6">

          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block w-full md:w-72 shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">

              {/* Sidebar Header */}
              <div className="bg-gradient-to-r from-[#8B4513] to-[#C4A962] px-6 py-8 text-white">
                <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  My Account
                </h2>
                <p className="text-white/80 text-sm">Manage your profile & orders</p>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {NAV.map((n) => {
                    const navPath = normalizePath(n.path)
                    const isActive = pathname === navPath || (n.key !== 'overview' && pathname.startsWith(navPath + '/'))

                    return (
                      <motion.li
                        key={n.key}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <button
                          type="button"
                          onClick={() => navigateTo(navPath)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3 ${
                            isActive
                              ? 'bg-[#8B4513] text-white shadow-md'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <n.icon className="w-5 h-5" />
                          <span className="flex-1">{n.label}</span>
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 w-full min-w-0"
          >
            {children}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

/* Helpers */
function normalizePath(p) {
  if (!p) return '/'
  return p === '/' ? '/' : p.replace(/\/+$/, '')
}
