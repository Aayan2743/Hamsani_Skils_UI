
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
      className="
        group bg-white border border-zinc-200
        rounded-md overflow-hidden cursor-pointer
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden">
        <SafeImage
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* ❤️ WISHLIST */}
        <button
          onClick={handleWishlist}
          className="
            absolute top-2 right-2
            bg-white rounded-full p-1.5 shadow
            opacity-0 scale-75
            group-hover:opacity-100 group-hover:scale-100
            transition
          "
        >
          <Heart
            size={16}
            className={
              isLiked
                ? "fill-rose-600 text-rose-600"
                : "text-zinc-500"
            }
          />
        </button>

        {/* ADD TO CART (FLIPKART STYLE) */}
        <button
          onClick={handleAddToCart}
          className="
            absolute bottom-0 left-0 w-full
            bg-blue-600 text-white text-xs font-semibold
            py-2
            translate-y-full group-hover:translate-y-0
            transition-transform duration-300
          "
        >
          ADD TO CART
        </button>
      </div>

      {/* INFO */}
      <div className="px-2 py-2">
        <p className="mt-1 text-sm font-semibold text-zinc-900">
          {product.title}
        </p>

        <p className="mt-1 text-sm font-semibold text-zinc-900">
          ₹ {product.price}
        </p>
      </div>
    </div>
  );
}

