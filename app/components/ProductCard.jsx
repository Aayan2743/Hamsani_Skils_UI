
// "use client";

// import SafeImage from "./SafeImage";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/app/providers/CartProvider";
// import { useWishlist } from "@/app/components/WishlistContext";
// import { Heart } from "lucide-react";
// import toast from "react-hot-toast";
// import api from "../utils/apiInstance";
// import { useEffect, useState } from "react";

// export default function ProductCard({ product }) {
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { wishlist, setWishlist } = useWishlist();
//   const [isLiked, setIsLiked] = useState(false);

//   useEffect(() => {
//     setIsLiked(wishlist.includes(product.id));
//   }, [wishlist, product.id]);

//   const imageUrl =
//     product.raw?.images?.find((img) => img.is_primary)?.image_url ||
//     product.raw?.images?.[0]?.image_url ||
//     product.image ||
//     "/placeholder.svg";

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     addToCart({
//       product_id: product.id,
//       title: product.title,
//       price: product.price,
//       img: imageUrl,
//       qty: 1,
//     });
//     toast.success("Added to cart");
//   };

//   const handleWishlist = async (e) => {
//     e.stopPropagation();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Please login to manage wishlist");
//       router.push("/account/login");
//       return;
//     }

//     setIsLiked((prev) => !prev);

//     try {
//       const res = await api.post(
//         "user-dashboard/wishlist-toggle",
//         { product_id: product.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.status === 200 && res.success) {
//         res.action === "added"
//           ? setWishlist([...wishlist, product.id])
//           : setWishlist(wishlist.filter((id) => id !== product.id));
//       } else {
//         setIsLiked((prev) => !prev);
//       }
//     } catch {
//       setIsLiked((prev) => !prev);
//     }
//   };

//   return (
//     <div
//       onClick={() => router.push(`/products/details?id=${product.slug}`)}
//       className="
//         group bg-white border border-zinc-200
//         rounded-md overflow-hidden cursor-pointer
//         transition hover:shadow-md
//         w-full
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative aspect-[3/4] bg-zinc-100">
//         <SafeImage
//           src={imageUrl}
//           alt={product.title}
//           fill
//           className="object-cover"
//         />

//         {/* ❤️ HEART */}
//         <button
//           onClick={handleWishlist}
//           className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-sm"
//         >
//           <Heart
//             size={16}
//             className={
//               isLiked
//                 ? "fill-rose-600 text-rose-600"
//                 : "text-zinc-500"
//             }
//           />
//         </button>
//       </div>

//       {/* INFO */}
//       <div className="px-2 py-2">
//         <p  className="mt-1 text-sm font-semibold text-zinc-900">
//           {product.title}
//         </p>

//         <p className="mt-1 text-sm font-semibold text-zinc-900">
//           ₹ {product.price}
//         </p>
//       </div>

//       {/* ADD TO CART */}
//       <button
//         onClick={handleAddToCart}
//         className="
//           w-full py-2 text-xs font-semibold
//           text-blue-600 border-t border-zinc-200
//           hover:bg-zinc-50 transition
//         "
//       >
//         ADD TO CART
//       </button>
//     </div>
//   );
// }



"use client";

import SafeImage from "./SafeImage";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import { useWishlist } from "@/app/components/WishlistContext";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/apiInstance";
import { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { wishlist, setWishlist } = useWishlist();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(wishlist.includes(product.id));
  }, [wishlist, product.id]);

  const imageUrl =
    product.raw?.images?.find((img) => img.is_primary)?.image_url ||
    product.raw?.images?.[0]?.image_url ||
    product.image ||
    "/placeholder.svg";

  const variant = product.raw?.variant_combinations?.[0];
  const basePrice = Number(variant?.purchase_price || 0);
  const sellingPrice = Number(variant?.extra_price || product.price || 0);
  const discount = variant?.discount ? Number(variant.discount) : 0;
  
  // Calculate final price after discount
  const finalPrice = discount > 0 
    ? sellingPrice - (sellingPrice * discount / 100)
    : sellingPrice;

  // Determine badges
  const isBestseller = product.raw?.is_bestseller || false;
  const isNew = product.raw?.is_new || false;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      product_id: product.id,
      title: product.title,
      price: finalPrice,
      img: imageUrl,
      qty: 1,
    });
    toast.success("Added to cart");
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login");
      router.push("/account/login");
      return;
    }

    setIsLiked((prev) => !prev);

    try {
      const res = await api.post(
        "user-dashboard/wishlist-toggle",
        { product_id: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res?.success) {
        res.action === "added"
          ? setWishlist([...wishlist, product.id])
          : setWishlist(wishlist.filter((id) => id !== product.id));
      } else {
        setIsLiked((prev) => !prev);
      }
    } catch {
      setIsLiked((prev) => !prev);
    }
  };

  return (
    <div
      onClick={() => router.push(`/products/details?id=${product.slug}`)}
      className="group bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] bg-[#F5F5DC] overflow-hidden">
        <SafeImage
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isBestseller && (
            <span className="bg-[#8B4513] text-white text-[10px] font-bold px-2 py-1 rounded">
              BESTSELLER
            </span>
          )}
          {isNew && (
            <span className="bg-[#C4A962] text-white text-[10px] font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="bg-[#E74C3C] text-white text-[10px] font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* WISHLIST HEART */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={18}
            className={isLiked ? "fill-rose-600 text-rose-600" : "text-zinc-700"}
          />
        </button>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-4">
        <p className="text-[11px] text-[#8B7355] uppercase tracking-wide mb-1">
          SILK SAREES
        </p>
        
        <h3 className="text-[15px] font-normal text-[#2C1810] mb-2 line-clamp-1">
          {product.title}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${i < 4 ? "text-[#C4A962]" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[11px] text-gray-500 ml-1">(234)</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-semibold text-[#2C1810]">
            ₹{finalPrice.toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-[14px] text-gray-400 line-through">
              ₹{sellingPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

