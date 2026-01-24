// // // app/dashboard/layout.jsx
// // 'use client'

// // import React, { useState, useEffect, useRef } from 'react'
// // import { usePathname, useRouter } from 'next/navigation'

// // export default function DashboardLayout({ children }) {
// //   const router = useRouter()
// //   const pathname = usePathname() || '/dashboard'
// //   const [sidebarOpen, setSidebarOpen] = useState(false)
// //   const [compact, setCompact] = useState(false) // optional compact mode
// //   const drawerRef = useRef(null)

// //   const NAV = [
// //     { key: 'overview', label: 'Overview', path: '/dashboard', hint: '' },
// //     { key: 'purchase', label: 'Purchase History', path: '/dashboard/purchase-history', hint: 'new' },
// //     // { key: 'returns', label: 'Return Requests', path: '/dashboard/returns' },
// //     { key: 'wishlist', label: 'Wishlist', path: '/dashboard/wishlist' },
// //     { key: 'profile', label: 'Manage Profile', path: '/dashboard/profile' },
// //   ]

// //   useEffect(() => {
// //     // close drawer on route change
// //     setSidebarOpen(false)
// //   }, [pathname])

// //   useEffect(() => {
// //     // click outside to close drawer on mobile
// //     function handler(e) {
// //       if (!drawerRef.current) return
// //       if (!drawerRef.current.contains(e.target)) setSidebarOpen(false)
// //     }
// //     if (sidebarOpen) window.addEventListener('click', handler)
// //     return () => window.removeEventListener('click', handler)
// //   }, [sidebarOpen])

// //   function navigateTo(p) {
// //     router.push(p)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 text-gray-900">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// //         <div className="flex items-start gap-6">
// //           {/* Sidebar (desktop) */}
// //           <aside className={`hidden md:block w-72 shrink-0`}>
// //             <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
// //               <div className="px-6 py-5 border-b flex items-center gap-4">
// //                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
// //                   <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 20a6 6 0 0112 0" />
// //                   </svg>
// //                 </div>
// //                 <div>
// //                   <div className="text-sm font-semibold">John Doe</div>
// //                   <div className="text-xs text-gray-500">you@example.com</div>
// //                 </div>
// //               </div>

// //               <nav className="p-4">
// //                 <ul className="space-y-2">
// //                   {NAV.map((n) => {
// //                     const isActive = pathname === n.path || pathname.startsWith(n.path + '/')
// //                     return (
// //                       <li key={n.key}>
// //                         <button
// //                           onClick={() => navigateTo(n.path)}
// //                           className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
// //                             isActive ? 'bg-emerald-50 text-emerald-800' : 'text-gray-600 hover:bg-gray-50'
// //                           }`}
// //                         >
// //                           <span className="w-6 text-center text-gray-400">{navIcon(n.key)}</span>
// //                           <span className="flex-1">{n.label}</span>
// //                           {n.hint && <span className="ml-2 inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{n.hint}</span>}
// //                         </button>
// //                       </li>
// //                     )
// //                   })}
// //                 </ul>

              
// //               </nav>
// //             </div>
// //           </aside>

// //           {/* Mobile drawer */}
         

       
// //           <div className="flex-1 min-w-0">
       
        

        
// //             <div className="space-y-6">
// //               {children}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// // function navIcon(key) {
// //   switch (key) {
// //     case 'overview': return '🏠'
// //     case 'purchase': return '🧾'
// //     // case 'returns': return '↩️'
// //     case 'wishlist': return '🤍'
// //     case 'profile': return '👤'
// //     default: return '•'
// //   }
// // }






// // app/dashboard/layout.jsx
// 'use client'

// import React, { useEffect, useRef } from 'react'
// import { usePathname, useRouter } from 'next/navigation'

// export default function DashboardLayout({ children }) {
//   const router = useRouter()
//   const rawPath = usePathname() || '/dashboard'
//   const drawerRef = useRef(null)

//   // normalize pathname: remove trailing slash except root
//   const pathname = normalizePath(rawPath)

//   const NAV = [
//     { key: 'overview', label: 'Overview', path: '/dashboard', hint: '' },
//     { key: 'purchase', label: 'Purchase History', path: '/dashboard/purchase-history', hint: 'new' },
//     { key: 'wishlist', label: 'Wishlist', path: '/dashboard/wishlist' },
//     { key: 'profile', label: 'Manage Profile', path: '/dashboard/profile' },
//     { key: 'address', label: 'address', path: '/dashboard/addresses' },
//   ]

//   useEffect(() => {
//     // close any mobile drawer on route change (if you add it later)
//     // we don't track sidebarOpen here but keep API parity with earlier code
//   }, [pathname])

//   useEffect(() => {
//     // click-outside handler for a future drawer (keeps parity with earlier code)
//     function handler(e) {
//       if (!drawerRef.current) return
//       if (!drawerRef.current.contains(e.target)) {
//         // close drawer if you implement it
//       }
//     }
//     window.addEventListener('click', handler)
//     return () => window.removeEventListener('click', handler)
//   }, [])

//   function navigateTo(path) {
//     // use normalized path for navigation (no trailing slashes)
//     router.push(normalizePath(path))
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex items-start gap-6">

//           {/* Sidebar (desktop) */}
//           <aside className="hidden md:block w-72 shrink-0">
//             <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

//               {/* User Header */}
//               <div className="px-6 py-5 border-b flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//                   <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 20a6 6 0 0112 0" />
//                   </svg>
//                 </div>

//                 <div>
//                   <div className="text-sm font-semibold">John Doe</div>
//                   <div className="text-xs text-gray-500">you@example.com</div>
//                 </div>
//               </div>

//               {/* Navigation */}
//               <nav className="p-4" ref={drawerRef}>
//                 <ul className="space-y-2">
//                   {NAV.map((n) => {
//                     // normalize nav path too
//                     const navPath = normalizePath(n.path)

//                     // isActive rules:
//                     // - exact match => active
//                     // - for non-overview entries allow startsWith (so /dashboard/purchase-history/* still matches purchase)
//                     // - overview only active when exactly /dashboard
//                     const isActive =
//                       pathname === navPath ||
//                       (n.key !== 'overview' && pathname.startsWith(navPath + '/')) ||
//                       (n.key !== 'overview' && pathname === navPath)

//                     return (
//                       <li key={n.key}>
//                         <button
//                           type="button"
//                           onClick={() => navigateTo(navPath)}
//                           className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
//                             isActive
//                               ? 'bg-emerald-50 text-emerald-800'
//                               : 'text-gray-600 hover:bg-gray-50'
//                           }`}
//                         >
//                           <span className="w-6 text-center text-gray-400">{navIcon(n.key)}</span>
//                           <span className="flex-1">{n.label}</span>

//                           {n.hint && (
//                             <span className="ml-2 inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
//                               {n.hint}
//                             </span>
//                           )}
//                         </button>
//                       </li>
//                     )
//                   })}
//                 </ul>
//               </nav>

//             </div>
//           </aside>

//           {/* MAIN CONTENT */}
//           <div className="flex-1 min-w-0">
//             <div className="space-y-6">{children}</div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// /** Helpers **/
// function normalizePath(p) {
//   if (!p) return '/'
//   try {
//     // remove trailing slash except when path is just "/"
//     return p === '/' ? '/' : p.replace(/\/+$/, '')
//   } catch {
//     return p
//   }
// }

// function navIcon(key) {
//   switch (key) {
//     case 'overview': return '🏠'
//     case 'purchase': return '🧾'
//     case 'wishlist': return '🤍'
//     case 'profile': return '👤'
//     case "address":
//       // 📍 Option 1 — Clean Location Pin (your selected icon)
//       return (
//         <svg
//           className="w-5 h-5 mx-auto"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//         >
//           <path
//             d="M12 21s-6-5-6-10a6 6 0 1 1 12 0c0 5-6 10-6 10z"
//             strokeWidth="1.6"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <circle
//             cx="12"
//             cy="11"
//             r="2.5"
//             strokeWidth="1.6"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       );
//     default: return '•'
//   }
// }













'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const rawPath = usePathname() || '/dashboard'

  // normalize pathname: remove trailing slash except root
  const pathname = normalizePath(rawPath)

  const NAV = [
    { key: 'overview', label: 'Overview', path: '/dashboard' },
    { key: 'purchase', label: 'Purchase History', path: '/dashboard/purchase-history', hint: 'new' },
    { key: 'wishlist', label: 'Wishlist', path: '/dashboard/wishlist' },
    { key: 'profile', label: 'Manage Profile', path: '/dashboard/profile' },
    { key: 'address', label: 'Address', path: '/dashboard/addresses' },
  ]

  function navigateTo(path) {
    router.push(normalizePath(path))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start gap-6">

          {/* Sidebar */}
          <aside className="hidden md:block w-72 shrink-0 animate-sidebar-in">
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

              {/* User Header */}
              <div className="px-6 py-5 border-b">
                <div className="text-sm font-semibold">John Doe</div>
                <div className="text-xs text-gray-500">you@example.com</div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
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
          <div className="flex-1 min-w-0">
            <div className="space-y-6">{children}</div>
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
