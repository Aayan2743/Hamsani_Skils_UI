// import Image from "next/image";
// import ProductTabs from "../components/ProductTabs";
// import RelatedProducts from "../components/RelatedProducts";

// import { useCart } from "../providers/CartProvider";

// export const metadata = {


  
//   title: "Peacock Blue Patola Silk Cotton Saree",
//   description:
//     "Buy Peacock Blue Patola Silk Cotton Saree with Ikat Pochampally design. Free shipping available.",
// };

// const PRODUCT = {
//   name: "Peacock Blue Patola Silk Cotton Saree",
//   sku: "9JSR058100",
//   price: 4410,
//   images: [
//     "/saree-1.jpg",
//     "/saree-2.jpg",
//     "/saree-3.jpg",
//     "/saree-4.jpg",
//   ],
// };

// export default function ProductPage() {
//   const { addToCart, setCartOpen } = useCart();


// const router = useRouter();

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid lg:grid-cols-2 gap-10">
        
//         {/* LEFT IMAGE */}
//         <div>
//           <Image
//             src={PRODUCT.images[0]}
//             alt={PRODUCT.name}
//             width={600}
//             height={750}
//             priority
//             className="w-full object-cover"
//           />

//           {/* THUMBNAILS */}
//           <div className="flex gap-3 mt-4">
//             {PRODUCT.images.map((img, i) => (
//               <Image
//                 key={i}
//                 src={img}
//                 alt=""
//                 width={80}
//                 height={80}
//                 className="border cursor-pointer"
//               />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT CONTENT */}
//         <div>
//           <p className="text-sm text-gray-500">New</p>

//           <h1 className="text-2xl font-semibold mt-2">
//             {PRODUCT.name}
//           </h1>

//           <p className="text-sm text-gray-500 mt-1">
//             SKU: {PRODUCT.sku}
//           </p>

//           <p className="text-2xl font-bold mt-4">
//             ₹{PRODUCT.price.toLocaleString()}
//           </p>

//           {/* BUTTONS */}
//         <button
//   onClick={() =>
//     addToCart({
//       variantId: PRODUCT.sku,
//       title: PRODUCT.name,
//       price: PRODUCT.price,
//       img: PRODUCT.images[0],
//     })
//   }
//   className="w-full bg-black text-white py-3 mt-6"
// >
//   ADD TO CART
// </button>



//         <button
//   onClick={() => {
//     addToCart({
//       variantId: PRODUCT.sku,
//       title: PRODUCT.name,
//       price: PRODUCT.price,
//       img: PRODUCT.images[0],
//     });

//     setCartOpen(true); // 🔥 OPEN SIDEBAR
//   }}
//   className="w-full border border-black py-3 mt-3"
// >
//   BUY IT NOW
// </button>


//           {/* INFO */}
//           <ul className="mt-6 space-y-2 text-sm text-gray-600">
//             <li>🚚 Free Shipping</li>
//             <li>🔒 Secure payment</li>
//             <li>⚠️ Color may slightly vary</li>
//           </ul>
//         </div>
//       </div>

//       {/* TABS */}
//       <ProductTabs />

//       {/* RELATED */}
//       <RelatedProducts />
//     </div>
//   );
// }











import ProductClient from "./ProductClient";

export const metadata = {
  title: "Peacock Blue Patola Silk Cotton Saree",
  description:
    "Buy Peacock Blue Patola Silk Cotton Saree with Ikat Pochampally design. Free shipping available.",
};

export default function ProductPage() {
  return <ProductClient />;
}
