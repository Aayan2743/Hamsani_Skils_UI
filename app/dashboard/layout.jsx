
'use client'
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const rawPath = usePathname() || '/dashboard'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // normalize pathname: remove trailing slash except root
  const pathname = normalizePath(rawPath)

  const NAV = [
    { key: 'overview', label: 'Overview', path: '/dashboard' },
    { key: 'purchase', label: 'Purchase History', path: '/dashboard/purchase-history', hint: 'new' },
    { key: 'wishlist', label: 'Wishlist', path: '/dashboard/wishlist' },
    { key: 'profile', label: 'Manage Profile', path: '/dashboard/profile' },
    // { key: 'address', label: 'Address', path: '/dashboard/addresses' },
  ]

  function navigateTo(path) {
    router.push(normalizePath(path))
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden mb-4 px-4 py-2 bg-white border rounded-lg shadow-sm"
        >
          ☰ Menu
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile Menu Sidebar */}
        <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Dashboard</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">×</button>
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
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive ? 'bg-red-200 text-emerald-800' : 'text-gray-600 hover:bg-red-50'
                        }`}
                      >
                        {n.label}
                        {n.hint && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            {n.hint}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-full md:w-72 shrink-0 animate-sidebar-in">
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

              {/* User Header */}
              {/* <div className="px-4 sm:px-6 py-4 sm:py-5 border-b">
                <div className="text-sm font-semibold">John Doe</div>
                <div className="text-xs text-gray-500">you@example.com</div>
              </div> */}

              {/* Navigation */}
              <nav className="p-3 sm:p-4">
                <ul className="space-y-2">
                  {NAV.map((n) => {
                    const navPath = normalizePath(n.path)

                    const isActive =
                      pathname === navPath ||
                      (n.key !== 'overview' && pathname.startsWith(navPath + '/'))

                    return (
                      <li key={n.key}>
                        <button
                          type="button"
                          onClick={() => navigateTo(navPath)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-red-200 text-emerald-800'
                              : 'text-gray-600 hover:bg-red-50'
                          }`}
                        >
                          <span className="flex-1">{n.label}</span>

                          {n.hint && (
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              {n.hint}
                            </span>
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full min-w-0">
            <div className="space-y-4 sm:space-y-6">{children}</div>
          </div>

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
