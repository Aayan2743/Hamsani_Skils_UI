
// "use client";
// import Image from "next/image";
// import SafeImage from "./SafeImage";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/app/providers/CartProvider";
// import { useWishlist } from "@/app/components/WishlistContext";
// import { Heart } from "lucide-react";
// import toast from "react-hot-toast";
// export default function ProductCard({ product }) {
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   const liked = wishlist.includes(product.id);

//   // ✅ Use image_url from API if available
//   const primaryImage =
//     product.raw?.images?.find((img) => img.is_primary)?.image_url ||
//     product.raw?.images?.[0]?.image_url ||
//     product.image ||
//     null;

//   const imageUrl = primaryImage || "/placeholder.svg";

//   function handleAddToCart(e) {
//     e.stopPropagation();

//     if (!product.id || !product.title || !product.price) {
//       toast.error("Product data is incomplete");
//       return;
//     }

//     addToCart({
//       variantId: product.id,
//       title: product.title,
//       price: product.price,
//       img: imageUrl,
//     });

//     toast.success("Added to cart");
//   }

//   function handleWishlist(e) {
//     e.stopPropagation();
//     toggleWishlist(product.id);
//   }

//   return (
//     <div
//       onClick={() => router.push(`/products/details?id=${product.slug}`)}
//       className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer w-[220px]" // increased width
//     >
//       {/* IMAGE */}
//       <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
//         <SafeImage
//           src={imageUrl}
//           alt={product.title}
//           fallback="/placeholder.svg"
//           fill
//           sizes="(max-width: 768px) 50vw, 25vw"
//           className="object-cover group-hover:scale-110 transition duration-500"
//         />

//         {/* WISHLIST */}
//         <button
//           onClick={handleWishlist}
//           className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
//         >
//           <Heart
//             size={18}
//             className={liked ? "fill-rose-600 text-rose-600" : "text-zinc-500"}
//           />
//         </button>
//       </div>

//       {/* INFO */}
//       <div className="p-4 text-center">
//         <p className="text-sm line-clamp-2 text-zinc-800">{product.title}</p>
//         <p className="mt-1 font-semibold text-zinc-900">
//           ₹ {product.price}
//         </p>
//       </div>

//       {/* ADD TO CART */}
//       <button
//         onClick={handleAddToCart}
//         className="w-full py-3 text-sm font-medium bg-red-700 text-white hover:bg-red-500 transition"
//       >
//         ADD TO CART
//       </button>
//     </div>
//   );
// }


// "use client";

// import Image from "next/image";
// import SafeImage from "./SafeImage";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/app/providers/CartProvider";
// import { useWishlist } from "@/app/components/WishlistContext";
// import { Heart } from "lucide-react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import api from "../utils/apiInstance"

// export default function ProductCard({ product }) {
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { wishlist, setWishlist } = useWishlist(); // using setter for API update

//   const liked = wishlist.includes(product.id);

//   // ✅ Use image_url from API if available
//   const primaryImage =
//     product.raw?.images?.find((img) => img.is_primary)?.image_url ||
//     product.raw?.images?.[0]?.image_url ||
//     product.image ||
//     null;

//   const imageUrl = primaryImage || "/placeholder.svg";

//   // ADD TO CART
//   function handleAddToCart(e) {
//     e.stopPropagation();

//     if (!product.id || !product.title || !product.price) {
//       toast.error("Product data is incomplete");
//       return;
//     }

//     addToCart({
//       product_id: product.id, // use product_id to match your CartProvider
//       title: product.title,
//       price: product.price,
//       img: imageUrl,
//       qty: 1,
//     });

//     toast.success("Added to cart");
//   }

//   // TOGGLE WISHLIST
//   async function handleWishlist(e) {
//     e.stopPropagation();

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please login to manage wishlist");
//         router.push("/account/login");
//         return;
//       }

//       const res = await api.post(
//         "user-dashboard/wishlist-toggle",
//         { product_id: product.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data?.success) {
//         // Update local wishlist state
//         if (liked) {
//           setWishlist(wishlist.filter((id) => id !== product.id));
//           toast.success("Removed from wishlist");
//         } else {
//           setWishlist([...wishlist, product.id]);
//           toast.success("Added to wishlist");
//         }
//       } else {
//         toast.error(res.data?.message || "Failed to update wishlist");
//       }
//     } catch (err) {
//       // console.error(err);
//       // toast.error("Wishlist update failed");
//     }
//   }

//   return (
//     <div
//       onClick={() => router.push(`/products/details?id=${product.slug}`)}
//       className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer w-[220px]"
//     >
//       {/* IMAGE */}
//       <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
//         <SafeImage
//           src={imageUrl}
//           alt={product.title}
//           fallback="/placeholder.svg"
//           fill
//           sizes="(max-width: 768px) 50vw, 25vw"
//           className="object-cover group-hover:scale-110 transition duration-500"
//         />

//         {/* WISHLIST */}
//         <button
//           onClick={handleWishlist}
//           className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
//         >
//           <Heart
//             size={18}
//             className={liked ? "fill-rose-600 text-rose-600" : "text-zinc-500"}
//           />
//         </button>
//       </div>

//       {/* INFO */}
//       <div className="p-4 text-center">
//         <p className="text-sm line-clamp-2 text-zinc-800">{product.title}</p>
//         <p className="mt-1 font-semibold text-zinc-900">₹ {product.price}</p>
//       </div>

//       {/* ADD TO CART */}
//       <button
//         onClick={handleAddToCart}
//         className="w-full py-3 text-sm font-medium bg-red-700 text-white hover:bg-red-500 transition"
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

  // 🔥 Local state for instant UI toggle
  const [isLiked, setIsLiked] = useState(false);

  // Sync with global wishlist
  useEffect(() => {
    setIsLiked(wishlist.includes(product.id));
  }, [wishlist, product.id]);

  const imageUrl =
    product.raw?.images?.find((img) => img.is_primary)?.image_url ||
    product.raw?.images?.[0]?.image_url ||
    product.image ||
    "/placeholder.svg";

  // ADD TO CART
  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart({
      product_id: product.id,
      title: product.title,
      price: product.price,
      img: imageUrl,
      qty: 1,
    });

    toast.success("Added to cart");
  };

  // ❤️ WISHLIST TOGGLE (PERFECT HEART SYNC)
  const handleWishlist = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to manage wishlist");
      router.push("/account/login");
      return;
    }

    // 🚀 Optimistic UI update
    setIsLiked((prev) => !prev);

    try {
      const res = await api.post(
        "user-dashboard/wishlist-toggle",
        { product_id: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 && res.success) {
        if (res.action === "added") {
          setWishlist([...wishlist, product.id]);
          toast.success("Added to wishlist");
        }

        if (res.action === "removed") {
          setWishlist(wishlist.filter((id) => id !== product.id));
          toast.success("Removed from wishlist");
        }
      } else {
        // rollback if unexpected response
        setIsLiked((prev) => !prev);
        // toast.error("Wishlist update failed");
      }
    } catch (error) {
      // rollback on error
      setIsLiked((prev) => !prev);
      // toast.error("Wishlist update failed");
    }
  };

  return (
    <div
      onClick={() => router.push(`/products/details?id=${product.slug}`)}
      className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer w-[220px]"
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <SafeImage
          src={imageUrl}
          alt={product.title}
          fallback="/placeholder.svg"
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        {/* ❤️ HEART */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
        >
          <Heart
            size={18}
            className={
              isLiked
                ? "fill-rose-600 text-rose-600 scale-110 transition"
                : "text-zinc-500 transition"
            }
          />
        </button>
      </div>

      {/* INFO */}
      <div className="p-4 text-center">
        <p className="text-sm line-clamp-2 text-zinc-800">
          {product.title}
        </p>
        <p className="mt-1 font-semibold text-zinc-900">
          ₹ {product.price}
        </p>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        className="w-full py-3 text-sm font-medium bg-red-700 text-white hover:bg-red-500 transition"
      >
        ADD TO CART
      </button>
    </div>
  );
}

