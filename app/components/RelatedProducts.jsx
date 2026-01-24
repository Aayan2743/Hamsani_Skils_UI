// "use client";

// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import { Heart } from "lucide-react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { useCart } from "@/app/providers/CartProvider";
// import { useWishlist } from "@/app/components/WishlistContext";

// const RELATED = [
//   { id: 1, name: "Pale Oak Patola Saree", price: 4410, img: "/r1.jpg" },
//   { id: 2, name: "Pink Patola Saree", price: 4410, img: "/r2.jpg" },
//   { id: 3, name: "Dark Green Semi Patola", price: 2570, img: "/r3.jpg" },
//   { id: 4, name: "Red Patola Saree", price: 4350, img: "/r4.jpg" },
//   { id: 5, name: "Royal Blue Patola Saree", price: 4990, img: "/r5.jpg" },
// ];

// export default function RelatedProducts() {
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   const sliderRef = useRef(null);
//   const [itemsPerView, setItemsPerView] = useState(4);

//   /* ---------------- RESPONSIVE ---------------- */
//   useEffect(() => {
//     function update() {
//       if (window.innerWidth < 640) setItemsPerView(1);
//       else if (window.innerWidth < 1024) setItemsPerView(2);
//       else setItemsPerView(4);
//     }
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   /* ---------------- SCROLL ---------------- */
//   const scroll = (dir) => {
//     if (!sliderRef.current) return;
//     const width = sliderRef.current.offsetWidth / itemsPerView;
//     sliderRef.current.scrollBy({
//       left: dir * width,
//       behavior: "smooth",
//     });
//   };

//   /* ---------------- ACTIONS ---------------- */
//   function handleAdd(e, product) {
//     e.stopPropagation();
//     addToCart({
//       variantId: product.id,
//       title: product.name,
//       price: product.price,
//       img: product.img,
//     });
//     toast.success("Added to cart");
//   }

//   function handleWishlist(e, id) {
//     e.stopPropagation();
//     toggleWishlist(id);
//   }

//   return (
//     <div className="mt-20 relative">
//       <h2 className="text-center text-lg font-semibold mb-8">
//         RELATED PRODUCTS
//       </h2>

//       {/* DESKTOP ARROWS */}
//       <button
//         onClick={() => scroll(-1)}
//         className=" lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
//       >
//         ◀
//       </button>

//       <button
//         onClick={() => scroll(1)}
//         className=" lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
//       >
//         ▶
//       </button>

//       {/* SLIDER */}
//       <div
//         ref={sliderRef}
//         className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-1"
//         style={{ scrollSnapType: "x mandatory" }}
//       >
//         {RELATED.map((p) => {
//           const liked = wishlist.includes(p.id);

//           return (
//             <div
//               key={p.id}
//               onClick={() => router.push(`/product?id=${p.id}`)}
//               className="
//                 min-w-full sm:min-w-[50%] lg:min-w-[25%]
//                 cursor-pointer
//                 scroll-snap-align-start
//                 bg-white border border-zinc-200 rounded-xl
//                 overflow-hidden hover:shadow-lg transition
//               "
//             >
//               {/* IMAGE */}
//               <div className="relative aspect-[3/4] overflow-hidden">
//                 <Image
//                   src={p.img}
//                   alt={p.name}
//                   fill
//                   className="object-cover hover:scale-110 transition duration-500"
//                 />

//                 {/* WISHLIST */}
//                 <button
//                   onClick={(e) => handleWishlist(e, p.id)}
//                   className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
//                 >
//                   <Heart
//                     size={18}
//                     className={
//                       liked
//                         ? "fill-rose-600 text-rose-600"
//                         : "text-zinc-500"
//                     }
//                   />
//                 </button>
//               </div>

//               {/* INFO */}
//               <div className="p-4 text-center">
//                 <p className="text-sm line-clamp-2 text-zinc-800">
//                   {p.name}
//                 </p>
//                 <p className="mt-1 font-semibold text-zinc-900">
//                   ₹ {p.price}
//                 </p>
//               </div>

//               {/* ADD TO CART */}
//               <button
//                 onClick={(e) => handleAdd(e, p)}
//                 className="w-full py-3 text-sm font-medium bg-zinc-900 text-white hover:bg-black transition"
//               >
//                 ADD TO CART
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }











"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import toast from "react-hot-toast";

import { useCart } from "@/app/providers/CartProvider";
import { useWishlist } from "@/app/components/WishlistContext";

/* ---------------- DATA ---------------- */
const RELATED = [
  { id: 1, name: "Pale Oak Patola Saree", price: 4410, img: "https://www.psrsilks.com/cdn/shop/files/IMG_0075copy_6f31a0bd-6915-4718-bccc-ac7d9a4f4471.webp?v=1768899708" },
  { id: 2, name: "Pink Patola Saree", price: 4410, img: "https://www.psrsilks.com/cdn/shop/files/IMG_0075copy_6f31a0bd-6915-4718-bccc-ac7d9a4f4471.webp?v=1768899708" },
  { id: 3, name: "Dark Green Semi Patola", price: 2570, img: "https://www.psrsilks.com/cdn/shop/files/IMG_0075copy_6f31a0bd-6915-4718-bccc-ac7d9a4f4471.webp?v=1768899708" },
  { id: 4, name: "Red Patola Saree", price: 4350, img: "https://www.psrsilks.com/cdn/shop/files/IMG_0075copy_6f31a0bd-6915-4718-bccc-ac7d9a4f4471.webp?v=1768899708" },
  { id: 5, name: "Royal Blue Patola Saree", price: 4990, img: "https://www.psrsilks.com/cdn/shop/files/IMG_0075copy_6f31a0bd-6915-4718-bccc-ac7d9a4f4471.webp?v=1768899708" },
];

/* ---------------- COMPONENT ---------------- */
export default function RelatedProducts() {
  const router = useRouter();
  const sliderRef = useRef(null);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [itemsPerView, setItemsPerView] = useState(4);

  /* ---------------- RESPONSIVE ---------------- */
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setItemsPerView(1);        // mobile
      else if (window.innerWidth < 1024) setItemsPerView(2); // tablet
      else setItemsPerView(4);                               // desktop
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ---------------- SCROLL ---------------- */
  function scroll(dir) {
    if (!sliderRef.current) return;

    const cardWidth = sliderRef.current.offsetWidth / itemsPerView;

    sliderRef.current.scrollBy({
      left: dir * cardWidth,
      behavior: "smooth",
    });
  }

  /* ---------------- ACTIONS ---------------- */
  function handleAdd(e, product) {
    e.stopPropagation();
    addToCart({
      variantId: product.id,
      title: product.name,
      price: product.price,
      img: product.img,
    });
    toast.success("Added to cart");
  }

  function handleWishlist(e, id) {
    e.stopPropagation();
    toggleWishlist(id);
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="mt-20 relative">
      <h2 className="text-center text-lg font-semibold mb-8 text-red-700">
        RELATED PRODUCTS
      </h2>

      {/* LEFT ARROW (ALL DEVICES) */}
      <button
        onClick={() => scroll(-1)}
        className="
          absolute left-2 lg:left-0
          top-1/2 -translate-y-1/2
          z-10
          bg-white/90 backdrop-blur
          shadow-md
          rounded-full
          text-black
          w-9 h-9 lg:w-11 lg:h-11
          flex items-center justify-center
        "
      >
        <ChevronLeft size={18} />
      </button>

      {/* RIGHT ARROW (ALL DEVICES) */}
      <button
        onClick={() => scroll(1)}
        className="
          absolute right-2 lg:right-0
          top-1/2 -translate-y-1/2
          z-10
          bg-white/90 backdrop-blur
          shadow-md
          rounded-full
          w-9 h-9 lg:w-11 lg:h-11
          text-black
          flex items-center justify-center
        "
      >
        <ChevronRight size={18} />
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="
          flex gap-4
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
          px-1
        "
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        {RELATED.map((p) => {
          const liked = wishlist.includes(p.id);

          return (
            <div
              key={p.id}
              onClick={() => router.push(`/product?id=${p.id}`)}
              className="
                flex-shrink-0
                w-full sm:w-1/2 lg:w-1/4
                cursor-pointer
                bg-white
                border border-zinc-200
                rounded-xl
                overflow-hidden
                hover:shadow-lg
                transition
              "
              style={{
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
              }}
            >
              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* WISHLIST */}
                <button
                  onClick={(e) => handleWishlist(e, p.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <Heart
                    size={18}
                    className={
                      liked
                        ? "fill-rose-600 text-rose-600"
                        : "text-zinc-500"
                    }
                  />
                </button>
              </div>

              {/* INFO */}
              <div className="p-4 text-center">
                <p className="text-sm line-clamp-2 text-zinc-800">
                  {p.name}
                </p>
                <p className="mt-1 font-semibold text-zinc-900">
                  ₹ {p.price}
                </p>
              </div>

              {/* ADD TO CART */}
              <button
                onClick={(e) => handleAdd(e, p)}
                className="
                  w-full py-3
                  text-sm font-medium
                  bg-red-700 text-white
                  hover:bg-red-500
                  transition
                "
              >
                ADD TO CART
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
