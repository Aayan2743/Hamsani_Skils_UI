

// // "use client";

// // import React, {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useMemo,
// //   useState,
// // } from "react";

// // const CART_KEY = "cart_items";

// // const CartContext = createContext(null);

// // export function useCart() {
// //   return useContext(CartContext);
// // }

// // export default function CartProvider({ children }) {
// //   const [items, setItems] = useState({});

// //   /* ---------------- LOAD CART ---------------- */
// //   useEffect(() => {
// //     try {
// //       const stored = localStorage.getItem(CART_KEY);
// //       if (stored) setItems(JSON.parse(stored));
// //     } catch (e) {
// //       console.error("Failed to load cart", e);
// //     }
// //   }, []);

// //   /* ---------------- SAVE CART ---------------- */
// //   useEffect(() => {
// //     localStorage.setItem(CART_KEY, JSON.stringify(items));
// //   }, [items]);

// //   /* ---------------- ADD ---------------- */
// //   function addToCart(product, qty = 1) {
// //     const id = String(product.id);

// //     setItems(prev => ({
// //       ...prev,
// //       [id]: {
// //         ...product,
// //         qty: (prev[id]?.qty || 0) + qty,
// //       },
// //     }));
// //   }

// //   /* ---------------- REMOVE ---------------- */
// //   function removeFromCart(id) {
// //     id = String(id);
// //     setItems(prev => {
// //       const next = { ...prev };
// //       delete next[id];
// //       return next;
// //     });
// //   }

// //   /* ---------------- UPDATE QTY ---------------- */
// //   function setQty(id, qty) {
// //     id = String(id);
// //     if (qty < 1) return;

// //     setItems(prev => ({
// //       ...prev,
// //       [id]: {
// //         ...prev[id],
// //         qty,
// //       },
// //     }));
// //   }

// //   /* ---------------- CLEAR ---------------- */
// //   function clearCart() {
// //     setItems({});
// //     localStorage.removeItem(CART_KEY);
// //   }

// //   /* ---------------- TOTAL ---------------- */
// //   const total = useMemo(() => {
// //     return Object.values(items).reduce(
// //       (sum, i) => sum + i.price * i.qty,
// //       0
// //     );
// //   }, [items]);

// //   return (
// //     <CartContext.Provider
// //       value={{
// //         items,
// //         addToCart,
// //         removeFromCart,
// //         setQty,
// //         clearCart,
// //         total,
// //       }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // }






// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// const CART_KEY = "guest_cart";
// const CartContext = createContext(null);

// export function useCart() {
//   return useContext(CartContext);
// }




// export default function CartProvider({ children }) {
//   const [items, setItems] = useState({});

//   /* ================= LOAD FROM LOCALSTORAGE ================= */


  
//   useEffect(() => {
//     const raw = localStorage.getItem(CART_KEY);
//     if (raw) {
//       try {
//         setItems(JSON.parse(raw));
//       } catch {
//         setItems({});
//       }
//     }
//   }, []);

//   /* ================= SAVE TO LOCALSTORAGE ================= */
//   useEffect(() => {
//     localStorage.setItem(CART_KEY, JSON.stringify(items));
//   }, [items]);

//   /* ================= ADD ================= */
//   function addToCart(product, qty = 1) {
//     const id = String(product.variantId);

//     setItems((prev) => ({
//       ...prev,
//       [id]: {
//         ...product,
//         qty: (prev[id]?.qty || 0) + qty,
//       },
//     }));
//   }

//   /* ================= UPDATE QTY ================= */
//   function updateQty(variantId, qty) {
//     if (qty < 1) return;

//     setItems((prev) => ({
//       ...prev,
//       [variantId]: {
//         ...prev[variantId],
//         qty,
//       },
//     }));
//   }

//   /* ================= REMOVE ================= */
//   function removeFromCart(variantId) {
//     setItems((prev) => {
//       const next = { ...prev };
//       delete next[variantId];
//       return next;
//     });
//   }

//   /* ================= CLEAR ================= */
//   function clearCart() {
//     setItems({});
//     localStorage.removeItem(CART_KEY);
//   }

//   /* ================= TOTAL ================= */
//   const total = useMemo(
//     () =>
//       Object.values(items).reduce(
//         (sum, i) => sum + i.price * i.qty,
//         0
//       ),
//     [items]
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//          setItems,   
//           updateQty,
//         removeFromCart,
//         clearCart,
//         total,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }










// "use client";
// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [items, setItems] = useState({});
//   const [cartOpen, setCartOpen] = useState(false);

//   /* ================= ADD ================= */
//   function addToCart(product, qty = 1) {
//     setItems(prev => {
//       const existing = prev[product.variantId];

//       return {
//         ...prev,
//         [product.variantId]: existing
//           ? { ...existing, qty: existing.qty + qty }
//           : { ...product, qty },
//       };
//     });
//   }

//   /* ================= REMOVE ================= */
//   function removeFromCart(variantId) {
//     setItems(prev => {
//       const copy = { ...prev };
//       delete copy[variantId];
//       return copy;
//     });
//   }

//   /* ================= UPDATE QTY ================= */
//   function updateQty(variantId, qty) {
//     setItems(prev => ({
//       ...prev,
//       [variantId]: { ...prev[variantId], qty },
//     }));
//   }

//   /* ================= TOTAL ================= */
//   const total = Object.values(items).reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   /* ================= COUNT ================= */
//   const count = Object.values(items).reduce(
//     (sum, item) => sum + item.qty,
//     0
//   );
//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//         removeFromCart,
//         updateQty,
//         total,
//         count,
//         cartOpen,
//         setCartOpen,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }



"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  /* ================= ADD ================= */
  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const existing = prev[product.variantId];

      return {
        ...prev,
        [product.variantId]: existing
          ? { ...existing, qty: existing.qty + qty }
          : { ...product, qty },
      };
    });
  }

  /* ================= REMOVE ================= */
  function removeFromCart(variantId) {
    setItems((prev) => {
      const copy = { ...prev };
      delete copy[variantId];
      return copy;
    });
  }

  /* ================= UPDATE QTY ================= */
  function updateQty(variantId, qty) {
    if (qty <= 0) {
      removeFromCart(variantId);
      return;
    }

    setItems((prev) => ({
      ...prev,
      [variantId]: { ...prev[variantId], qty },
    }));
  }

  /* ================= CLEAR CART ================= */
  function clearCart() {
    setItems({});
    setCartOpen(false);
  }

  /* ================= TOTAL ================= */
  const total = Object.values(items).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ================= COUNT ================= */
  const count = Object.values(items).reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart, // 👈 exposed here
        total,
        count,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

