// // "use client";

// // import Image from "next/image";
// // import { useRouter } from "next/navigation";
// // import { useCart } from "@/app/providers/CartProvider";
// // import { useWishlist } from "@/app/components/WishlistContext";
// // import { useState } from "react";

// // export default function ProductCard({ product }) {
// //   const router = useRouter();
// //   const { addToCart } = useCart();
// //   const { wishlist, toggleWishlist } = useWishlist();
// //   const [hover, setHover] = useState(false);

// //   function handleAddToCart(e) {
// //     e.stopPropagation();

// //     addToCart({
// //       variantId: product.id,   // REQUIRED
// //       title: product.title,
// //       price: product.price,
// //       image: product.images[0],
// //     });
// //   }

// //   return (
// //    <div className="relative border group cursor-pointer bg-white">

// //   {/* IMAGE */}
// //   <div className="relative aspect-[3/4] overflow-hidden">
// //     <Image
// //       src={hover ? product.images[1] : product.images[0]}
// //       alt={product.title}
// //       fill
// //       className="object-cover transition-transform duration-500 group-hover:scale-110"
// //     />
// //   </div>

// //   {/* ADD TO CART */}
// //   <button
// //     onClick={handleAddToCart}
// //     className="
// //       w-full 
// //       border-t 
// //       py-3 
// //       text-sm
// //       tracking-wide
// //       bg-white
// //       active:bg-gray-100
// //     "
// //   >
// //     ADD TO CART
// //   </button>

// //   {/* INFO */}
// //   <div className="text-center py-3 px-2">
// //     <p className="text-sm leading-tight line-clamp-2">
// //       {product.title}
// //     </p>
// //     <p className="text-sm mt-1 font-medium">
// //       ₹ {product.price}
// //     </p>
// //   </div>
// // </div>

// //   );
// // }








// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/app/providers/CartProvider";
//   import toast from "react-hot-toast";
// export default function ProductCard({ product }) {
//   const router = useRouter();
//   const { addToCart, setCartOpen } = useCart();



// function handleAddToCart(e) {
//   e.stopPropagation();

//   addToCart({
//     variantId: product.id,
//     title: product.title,
//     price: product.price,
//     img: product.images[0],
//   });

//   toast.success("Added to cart successfully");
// }


//   return (
//     <div
//       className="border cursor-pointer group bg-white"
//       onClick={() => router.push(`/product?id=${product.id}`)}
//     >
//       {/* IMAGE */}
//       <div className="relative aspect-[3/4] overflow-hidden">
//         <Image
//           src={product.images[0]}
//           alt={product.title}
//           fill
//           className="object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//       </div>

//       {/* ADD TO CART */}
//       <button
//         onClick={handleAddToCart}
//         className="
//           w-full
//           border-t
//           py-3
//           text-sm
//           tracking-wide
//           bg-white
//           active:bg-gray-100
//         "
//       >
//         ADD TO CART
//       </button>

//       {/* INFO */}
//       <div className="text-center py-3 px-2">
//         <p className="text-sm leading-tight line-clamp-2">
//           {product.title}
//         </p>
//         <p className="text-sm mt-1 font-medium">
//           ₹ {product.price}
//         </p>
//       </div>
//     </div>
//   );
// }




// "use client";

// import Image from "next/image";
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

//   function handleAddToCart(e) {
//     e.stopPropagation();

//     addToCart({
//       variantId: product.id,
//       title: product.title,
//       price: product.price,
//       img: product.images[0],
//     });

//     toast.success("Added to cart");
//   }

//   function handleWishlist(e) {
//     e.stopPropagation();
//     toggleWishlist(product.id);
//   }

//   return (
//     <div
//       onClick={() => router.push(`/product?id=${product.id}`)}
//       className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
//     >
//       {/* IMAGE */}
//       <div className="relative aspect-[3/4] overflow-hidden">
//         <Image
//           src={product.images}
//           alt={product.title}
//           fill
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
//         <p className="text-sm line-clamp-2 text-zinc-800">
//           {product.title}
//         </p>
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

// const IMAGE_BASE_URL = "http://192.168.1.3:8000/storage";

// export default function ProductCard({ product }) {
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();
//    console.log("product card",product)
//   const liked = wishlist.includes(product.id)
//   // ✅ get primary image safely with fallbacks
//   const primaryImage = 
//     product.raw?.images?.find((img) => img.is_primary)?.image_path ||
//     product.raw?.images?.[0]?.image_path ||
//     product.images?.find((img) => img.is_primary)?.image_path ||
//     product.images?.[0]?.image_path ||
//     product.image ||
//     null;

//   // ✅ build full image URL with error handling
//   const imageUrl = primaryImage
//     ? `${IMAGE_BASE_URL}/${primaryImage}`
//     : "/placeholder.svg";

//   function handleAddToCart(e) {
//     e.stopPropagation();

//     // Ensure we have valid product data
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
//    console.log("PRODUCT ROUTE",product.slug)
//   return (
//     <div
//       onClick={() => router.push(`/products/details?id=${product.slug}`)}
//       // onClick={() => router.push(`/product/${product.slug}`)}
//       className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
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
//             className={
//               liked
//                 ? "fill-rose-600 text-rose-600"
//                 : "text-zinc-500"
//             }
//           />
//         </button>
//       </div>

//       {/* INFO */}
//       <div className="p-4 text-center">
//         <p className="text-sm line-clamp-2 text-zinc-800">
//           {product.title}
//         </p>
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


"use client";

import Image from "next/image";
import SafeImage from "./SafeImage";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import { useWishlist } from "@/app/components/WishlistContext";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const liked = wishlist.includes(product.id);

  // ✅ Use image_url from API if available
  const primaryImage =
    product.raw?.images?.find((img) => img.is_primary)?.image_url ||
    product.raw?.images?.[0]?.image_url ||
    product.image ||
    null;

  const imageUrl = primaryImage || "/placeholder.svg";

  function handleAddToCart(e) {
    e.stopPropagation();

    if (!product.id || !product.title || !product.price) {
      toast.error("Product data is incomplete");
      return;
    }

    addToCart({
      variantId: product.id,
      title: product.title,
      price: product.price,
      img: imageUrl,
    });

    toast.success("Added to cart");
  }

  function handleWishlist(e) {
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  return (
    <div
      onClick={() => router.push(`/products/details?id=${product.slug}`)}
      className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer w-[220px]" // increased width
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <SafeImage
          src={imageUrl}
          alt={product.title}
          fallback="/placeholder.svg"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        {/* WISHLIST */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
        >
          <Heart
            size={18}
            className={liked ? "fill-rose-600 text-rose-600" : "text-zinc-500"}
          />
        </button>
      </div>

      {/* INFO */}
      <div className="p-4 text-center">
        <p className="text-sm line-clamp-2 text-zinc-800">{product.title}</p>
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
