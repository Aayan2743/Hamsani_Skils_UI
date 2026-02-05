
// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useCart } from "../../providers/CartProvider";
// const IMAGE_BASE_URL = "http://192.168.1.6:8000/storage";

// export default function ProductDetailsPage() {
//      const { addToCart, setCartOpen } = useCart();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id");
 
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     if (!productId) return;

//     fetch(`http://192.168.1.6:8000/api/ecom/products?slug=${productId}`)
//       .then((res) => res.json())
//       .then((json) => {
//         setProduct(json?.data?.data?.[0] || null);
//       })
//       .catch(() => setProduct(null));
//   }, [productId]);

//   if (!product) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   const variant = product.variant_combinations?.[0];

//   const primaryImage =
//     product.images?.find((img) => img.is_primary)?.image_path ||
//     product.images?.[0]?.image_path ||
//     null;

//   const imageUrl = primaryImage
//     ? `${IMAGE_BASE_URL}/${primaryImage}`
//     : "/placeholder.svg";

//   return (
//     <div className="max-w-[1400px] mx-auto px-6 py-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* LEFT IMAGE */}
//         <div className="w-full">
//           <img
//             src={imageUrl}
//             alt={product.name}
//             className="w-full h-auto object-cover"
//           />
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="space-y-5">
//           {/* PRODUCT NAME */}
//           <h1 className="text-2xl font-bold text-red-600">
//             {product.name}
//           </h1>

//           {/* CATEGORY */}
//           {product.category?.name && (
//             <p className="text-gray-600 text-sm">
//               Category: {product.category.name}
//             </p>
//           )}

//           {/* SKU */}
//           {variant?.sku && (
//             <p className="text-gray-600 text-sm">
//               SKU: {variant.sku}
//             </p>
//           )}

//           {/* PRICE */}
//           {variant?.extra_price && (
//             <p className="text-3xl font-bold text-black">
//               ₹{Number(variant.extra_price).toLocaleString()}
//             </p>
//           )}

//           {/* DISCOUNT */}
//           {variant?.discount > 0 && (
//             <p className="text-green-600 font-medium">
//               {variant.discount}% OFF
//             </p>
//           )}

//           {/* STOCK */}
//           {variant?.quantity !== undefined && (
//             <p className="text-sm">
//               {variant.quantity > 0 ? (
//                 <span className="text-green-600">
//                   In Stock ({variant.quantity})
//                 </span>
//               ) : (
//                 <span className="text-red-600">Out of Stock</span>
//               )}
//             </p>
//           )}

//           {/* COLOR VARIANTS */}
//           {variant?.values?.length > 0 && (
//             <div>
//               <p className="font-semibold mb-2">Available Colors</p>
//               <div className="flex gap-2 flex-wrap">
//                 {variant.values.map((v) => (
//                   <div
//                     key={v.id}
//                     className="flex items-center gap-2 border px-3 py-1 rounded"
//                   >
//                     {v.color_code && (
//                       <span
//                         className="w-4 h-4 rounded-full border"
//                         style={{ backgroundColor: v.color_code }}
//                       />
//                     )}
//                     <span className="text-sm">{v.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//           {/* ACTION BUTTONS */}
//           <div className="flex gap-4 pt-4">
//             <button className="flex-1 bg-red-600 text-white py-3 rounded font-semibold">
//               Add to Cart
//             </button>
//             <button className="flex-1 bg-blue-800 text-white py-3 rounded font-semibold">
//               Buy Now
//             </button>
//           </div>
//           {/* DESCRIPTION */}
//           {product.description && (
//             <div className="pt-6 text-gray-700 whitespace-pre-line leading-relaxed font-sans">
//               {product.description}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useCart } from "../../providers/CartProvider";
// import toast from "react-hot-toast";

// const IMAGE_BASE_URL = "http://192.168.1.6:8000/storage";

// export default function ProductDetailsPage() {
//   const { addToCart, setCartOpen } = useCart();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id");

//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     if (!productId) return;

//     fetch(`http://192.168.1.6:8000/api/ecom/products?slug=${productId}`)
//       .then((res) => res.json())
//       .then((json) => {
//         setProduct(json?.data?.data?.[0] || null);
//       })
//       .catch(() => setProduct(null));
//   }, [productId]);

//   if (!product) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   const variant = product.variant_combinations?.[0];

//   const primaryImage =
//     product.images?.find((img) => img.is_primary)?.image_path ||
//     product.images?.[0]?.image_path ||
//     null;

//   const imageUrl = primaryImage
//     ? `${IMAGE_BASE_URL}/${primaryImage}`
//     : "/placeholder.svg";

//   /* ================= ADD TO CART ================= */
//   function handleAddToCart() {
//     if (!variant) return;

//     addToCart({
//       variantId: variant.sku || product.id,
//       title: product.name,
//       price: Number(variant.extra_price || 0),
//       img: imageUrl,
//     });

//     toast.success("Added to cart successfully");
//   }

//   /* ================= BUY NOW ================= */
//   function handleBuyNow() {
//     if (!variant) return;

//     addToCart({
//       variantId: variant.sku || product.id,
//       title: product.name,
//       price: Number(variant.extra_price || 0),
//       img: imageUrl,
//     });

//     toast.success("Added to cart successfully");
//     setCartOpen(true);
//   }

//   return (
//     <div className="max-w-[1400px] mx-auto px-6 py-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* LEFT IMAGE */}
//         <div className="w-full">
//           <img
//             src={imageUrl}
//             alt={product.name}
//             className="w-full h-auto object-cover"
//           />
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="space-y-5">
//           <h1 className="text-2xl font-bold text-red-600">
//             {product.name}
//           </h1>

//           {product.category?.name && (
//             <p className="text-gray-600 text-sm">
//               Category: {product.category.name}
//             </p>
//           )}

//           {variant?.sku && (
//             <p className="text-gray-600 text-sm">
//               SKU: {variant.sku}
//             </p>
//           )}

//           {variant?.extra_price && (
//             <p className="text-3xl font-bold text-black">
//               ₹{Number(variant.extra_price).toLocaleString()}
//             </p>
//           )}

//           {variant?.discount > 0 && (
//             <p className="text-green-600 font-medium">
//               {variant.discount}% OFF
//             </p>
//           )}

//           {variant?.quantity !== undefined && (
//             <p className="text-sm">
//               {variant.quantity > 0 ? (
//                 <span className="text-green-600">
//                   In Stock ({variant.quantity})
//                 </span>
//               ) : (
//                 <span className="text-red-600">Out of Stock</span>
//               )}
//             </p>
//           )}

//           {variant?.values?.length > 0 && (
//             <div>
//               <p className="font-semibold mb-2 font-sans">Available Colors</p>
//               <div className="flex gap-2 flex-wrap">
//                 {variant.values.map((v) => (
//                   <div
//                     key={v.id}
//                     className="flex items-center gap-2 border px-3 py-1 rounded"
//                   >
//                     {v.color_code && (
//                       <span
//                         className="w-4 h-4 rounded-full border"
//                         style={{ backgroundColor: v.color_code }}
//                       />
//                     )}
//                     <span className="text-sm">{v.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ACTION BUTTONS */}
//           <div className="flex gap-4 pt-4">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 bg-red-600 text-white py-3 rounded font-semibold"
//             >
//               Add to Cart
//             </button>

//             <button
//               onClick={handleBuyNow}
//               className="flex-1 bg-blue-800 text-white py-3 rounded font-semibold"
//             >
//               Buy Now
//             </button>
//           </div>

//           {product.description && (
//             <div className="pt-6 text-gray-700 whitespace-pre-line leading-relaxed font-sans">
//               {product.description}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../../providers/CartProvider";
import toast from "react-hot-toast";

const IMAGE_BASE_URL = "http://192.168.1.6:8000/storage";

export default function ProductDetailsPage() {
  const { addToCart, setCartOpen } = useCart();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!productId) return;

    fetch(`http://192.168.1.6:8000/api/ecom/products?slug=${productId}`)
      .then((res) => res.json())
      .then((json) => {
        const prod = json?.data?.data?.[0] || null;
        setProduct(prod);

        // ✅ default variant (first one)
        if (prod?.variant_combinations?.length) {
          setSelectedVariant(prod.variant_combinations[0]);
        }
      })
      .catch(() => setProduct(null));
  }, [productId]);

  if (!product || !selectedVariant) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  /* ================= IMAGE ================= */
  const primaryImage =
    product.images?.find((img) => img.is_primary)?.image_path ||
    product.images?.[0]?.image_path ||
    null;

  const imageUrl = primaryImage
    ? `${IMAGE_BASE_URL}/${primaryImage}`
    : "/placeholder.svg";

  /* ================= ADD TO CART ================= */
  function handleAddToCart() {
    addToCart({
      variantId: selectedVariant.sku || product.id,
      title: product.name,
      price: Number(selectedVariant.extra_price || 0),
      img: imageUrl,
    });

    toast.success("Added to cart successfully");
  }

  /* ================= BUY NOW ================= */
  function handleBuyNow() {
    addToCart({
      variantId: selectedVariant.sku || product.id,
      title: product.name,
      price: Number(selectedVariant.extra_price || 0),
      img: imageUrl,
    });

    toast.success("Added to cart successfully");
    setCartOpen(true);
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT IMAGE */}
        <div className="w-full">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-red-600">
            {product.name}
          </h1>

          {product.category?.name && (
            <p className="text-gray-600 text-sm">
              Category: {product.category.name}
            </p>
          )}

          {selectedVariant.sku && (
            <p className="text-gray-600 text-sm">
              SKU: {selectedVariant.sku}
            </p>
          )}

          {/* ✅ PRICE CHANGES ON HOVER */}
          <p className="text-3xl font-bold text-black">
            ₹{Number(selectedVariant.extra_price).toLocaleString()}
          </p>

          {selectedVariant.discount > 0 && (
            <p className="text-green-600 font-medium">
              {selectedVariant.discount}% OFF
            </p>
          )}

          <p className="text-sm">
            {selectedVariant.quantity > 0 ? (
              <span className="text-green-600">
                In Stock ({selectedVariant.quantity})
              </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>

          {/* ================= COLORS ================= */}
          <div>
            <p className="font-semibold mb-2 font-sans">Available Colors</p>

            <div className="flex gap-3 flex-wrap">
              {product.variant_combinations.map((variant) => {
                const color = variant.values?.[0];

                return (
                  <div
                    key={variant.id}
                    onMouseEnter={() => setSelectedVariant(variant)}
                    className={`flex items-center gap-2 border px-3 py-1 rounded cursor-pointer transition
                      ${
                        selectedVariant.id === variant.id
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                  >
                    {color?.color_code && (
                      <span
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.color_code }}
                      />
                    )}
                    <span className="text-sm">{color?.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-red-600 text-white py-3 rounded font-semibold"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-800 text-white py-3 rounded font-semibold"
            >
              Buy Now
            </button>
          </div>

          {product.description && (
            <div className="pt-6 text-gray-700 whitespace-pre-line leading-relaxed font-sans">
              {product.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
