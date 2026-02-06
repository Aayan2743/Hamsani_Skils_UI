// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "../../providers/CartProvider";
// import toast from "react-hot-toast";

// export default function ProductClient({ productId, products, product }) {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();
//   const { addToCart } = useCart();
//     console.log("All products:", products);
//   console.log("Current product:", product);
//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         setLoading(true);
        
//         // Try different API endpoint formats
//         let res;
//         let data;
        
//         try {
//           // First try: /products/{id}
//           res = await fetch(`http://192.168.1.6:8000/api/ecom/products/${productId}`);
//           data = await res.json();
//         } catch (error) {
//           // Fallback: /products?id={id}
//           res = await fetch(`http://192.168.1.6:8000/api/ecom/products?id=${productId}`);
//           data = await res.json();
//         }
        
//         if (!res.ok) {
//           throw new Error(data.message || 'Product not found');
//         }
        
//         // Handle different response structures
//         const productData = data?.data?.data?.[0] || data?.data || data;
        
//         if (!productData) {
//           throw new Error('Product not found');
//         }
        
//         setProduct(productData);
//       } catch (err) {
//         setError(err.message);
//         console.error("Product fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (productId) {
//       fetchProduct();
//     }
//   }, [productId]);

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="text-center">Loading product...</div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
//           <p className="text-gray-600 mb-4">{error || 'The product you are looking for does not exist.'}</p>
//           <button 
//             onClick={() => router.back()}
//             className="bg-black text-white px-6 py-2 rounded"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const variant = product.variant_combinations?.[0];
//   const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];

//   const handleAddToCart = () => {
//     if (!variant || variant.quantity === 0) return;

//     addToCart({
//       variantId: product.id,
//       title: product.name,
//       price: Number(variant.extra_price),
//       img: primaryImage ? `http://192.168.1.6:8000/storage/${primaryImage.image_path}` : "/placeholder.svg",
//     });

//     toast.success("Added to cart successfully!");
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Product Image */}
//         <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
//           {primaryImage ? (
//             <img
//               src={`http://192.168.1.6:8000/storage/${primaryImage.image_path}`}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image Available
//             </div>
//           )}
//         </div>

//         {/* Product Details */}
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold">{product.name}</h1>
//             <p className="text-gray-600 mt-2">{product.category?.name}</p>
//           </div>

//           {variant && (
//             <div className="space-y-2">
//               <div className="text-2xl font-bold">
//                 ₹{Number(variant.extra_price).toLocaleString()}
//               </div>
//               {variant.discount > 0 && (
//                 <div className="text-sm text-green-600">
//                   {variant.discount}% off
//                 </div>
//               )}
//               <div className="text-sm text-gray-600">
//                 {variant.quantity > 0 ? (
//                   <span className="text-green-600">In Stock ({variant.quantity} available)</span>
//                 ) : (
//                   <span className="text-red-600">Out of Stock</span>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Color Variations */}
//           {variant?.values && variant.values.length > 0 && (
//             <div>
//               <h3 className="font-semibold mb-2">Available Colors:</h3>
//               <div className="flex gap-2">
//                 {variant.values.map((value) => (
//                   <div
//                     key={value.id}
//                     className="flex items-center gap-2 border rounded-lg px-3 py-2"
//                   >
//                     {value.color_code && (
//                       <div
//                         className="w-4 h-4 rounded-full border"
//                         style={{ backgroundColor: value.color_code }}
//                       />
//                     )}
//                     <span className="text-sm">{value.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Description */}
//           {product.description && (
//             <div>
//               <h3 className="font-semibold mb-2">Description</h3>
//               <div className="text-gray-700 whitespace-pre-line">
//                 {product.description}
//               </div>
//             </div>
//           )}

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
//             disabled={!variant || variant.quantity === 0}
//           >
//             {variant && variant.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "../../providers/CartProvider";
// import toast from "react-hot-toast";

// export default function ProductClient({ productId, products, product }) {
//   const [currentProduct, setCurrentProduct] = useState(product);
//   const router = useRouter();
//   const { addToCart } = useCart();
//    console.log("TEST", productId,products,product)
//   if (!currentProduct) {
//     return (
//       <div className="text-center py-10">
//         Product not found
//       </div>
//     );
//   }

//   const variant = currentProduct.variant_combinations?.[0];
//   const primaryImage =
//     currentProduct.images?.find(img => img.is_primary) ||
//     currentProduct.images?.[0];

//   const handleAddToCart = () => {
//     if (!variant || variant.quantity === 0) return;

//     addToCart({
//       variantId: currentProduct.id,
//       title: currentProduct.name,
//       price: Number(variant.extra_price),
//       img: primaryImage
//         ? `http://192.168.1.6:8000/storage/${primaryImage.image_path}`
//         : "/placeholder.svg",
//     });

//     toast.success("Added to cart successfully!");
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Image */}
//         <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
//           {primaryImage ? (
//             <img
//               src={`http://192.168.1.6:8000/storage/${primaryImage.image_path}`}
//               alt={currentProduct.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-400">
//               No Image
//             </div>
//           )}
//         </div>

//         {/* Details */}
//         <div className="space-y-6">
//           <h1 className="text-3xl font-bold">{currentProduct.name}</h1>

//           {variant && (
//             <div className="text-2xl font-bold">
//               ₹{Number(variant.extra_price).toLocaleString()}
//             </div>
//           )}

//           <button
//             onClick={handleAddToCart}
//             disabled={!variant || variant.quantity === 0}
//             className="w-full bg-black text-white py-3 rounded"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useCart } from "../../providers/CartProvider";
// import toast from "react-hot-toast";

// export default function ProductClient({ product }) {
//   const [currentProduct] = useState(product);
//   const { addToCart } = useCart();
//    console.log("TEST", product)
//   if (!currentProduct) {
//     return <div className="text-center py-10">Product not found</div>;
//   }

//   const variant = currentProduct.variant_combinations?.[0];
//   const primaryImage =
//     currentProduct.images?.find((img) => img.is_primary) ||
//     currentProduct.images?.[0];

//   const handleAddToCart = () => {
//     if (!variant || variant.quantity === 0) return;

//     addToCart({
//       variantId: currentProduct.id,
//       title: currentProduct.name,
//       price: Number(variant.extra_price),
//       img: primaryImage
//         ? `http://192.168.1.6:8000/storage/${primaryImage.image_path}`
//         : "/placeholder.svg",
//     });

//     toast.success("Added to cart successfully!");
//   };

//   return (
//     <div>
//       <h1>{currentProduct.name}</h1>
//       <button onClick={handleAddToCart}>Add to cart</button>
//     </div>
//   );
// }



"use client";

import { useCart } from "@/app/providers/CartProvider";
import toast from "react-hot-toast";

export default function ProductClient({ product }) {
  const { addToCart } = useCart();

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const variant = product.variant_combinations?.[0];
  const primaryImage =
    product.images?.find((img) => img.is_primary) ||
    product.images?.[0];

  const handleAddToCart = () => {
    if (!variant || variant.quantity === 0) return;

    addToCart({
      variantId: product.id,
      title: product.name,
      price: Number(variant.extra_price),
      img: primaryImage
        ? `http://192.168.1.6:8000/storage/${primaryImage.image_path}`
        : "/placeholder.svg",
    });

    toast.success("Added to cart successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      <img
        src={`http://192.168.1.6:8000/storage/${primaryImage.image_path}`}
        alt={product.name}
        className="w-96"
      />

      <p className="mt-4 text-xl font-semibold">
        ₹ {variant?.extra_price}
      </p>

      <button
        onClick={handleAddToCart}
        className="mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
