"use client";

import Image from "next/image";
import { useCart } from "../providers/CartProvider";
import ProductTabs from "../components/ProductTabs";
import RelatedProducts from "../components/RelatedProducts";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const PRODUCT = {
  name: "Peacock Blue Patola Silk Cotton Saree",
  sku: "9JSR058100",
  price: 4410,
  images: [
   "https://www.psrsilks.com/cdn/shop/files/IMG_0085copy.webp?v=1768817464",
    "https://www.psrsilks.com/cdn/shop/files/IMG_0085copy.webp?v=1768817464",
    "https://www.psrsilks.com/cdn/shop/files/IMG_0085copy.webp?v=1768817464",
    // "https://www.psrsilks.com/cdn/shop/files/IMG_0085copy.webp?v=1768817464",
  ],
};

export default function ProductClient() {
  const { addToCart, setCartOpen } = useCart();


  function handleAdd() {
  addToCart({
    variantId: PRODUCT.sku,
    title: PRODUCT.name,
    price: PRODUCT.price,
    img: PRODUCT.images[0],
  });

  toast.success("Added to cart successfully");
}

function handleBuyNow() {
  addToCart({
    variantId: PRODUCT.sku,
    title: PRODUCT.name,
    price: PRODUCT.price,
    img: PRODUCT.images[0],
  });

  toast.success("Added to cart successfully");
  setCartOpen(true);
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* LEFT IMAGE */}
        <div>
          <Image
            src={PRODUCT.images[0]}
            alt={PRODUCT.name}
            width={600}
            height={750}
            priority
            className="w-full object-cover"
          />

          <div className="flex gap-3 mt-4">
            {PRODUCT.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt=""
                width={80}
                height={80}
                className="border cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          
          <h1 className="text-2xl font-semibold mt-2 text-red-500 font-sans">
            {PRODUCT.name}
          </h1>

          <p className="text-sm text-gray-500 mt-1 font-sans">
            SKU: {PRODUCT.sku}
          </p>

          <p className="text-2xl font-bold mt-4 text-black font-sans">
            ₹{PRODUCT.price.toLocaleString()}
          </p>

       <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 lg:static lg:border-0">
  <div className="grid grid-cols-2 gap-3">
    <button
      onClick={handleAdd}
      className="bg-red-700 text-white py-3 rounded-lg font-sans"
    >
      Add to Cart
    </button>

    <button
      onClick={handleBuyNow}
      className="border border-zinc-900 py-3 text-white rounded-lg bg-blue-900 font-sans"
    >
      Buy Now
    </button>
  </div>
</div>
{/* MOBILE STICKY BUTTONS */}
<div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 z-50 lg:hidden">
  <div className="grid grid-cols-2 gap-3">
    <button
      onClick={handleAdd}
      className="bg-red-700 text-white py-3 rounded-lg font-medium font-sans"
    >
      Add to Cart
    </button>

    <button
      onClick={handleBuyNow}
      className="bg-blue-900 text-white py-3 rounded-lg font-medium font-sans font-bold"
    >
      Buy Now
    </button>
  </div>
</div>

          <ul className="mt-6 space-y-2 text-md text-gray-900 font-sans">
            <li>🚚 Free Shipping
Domestic Free standard shipping on orders over
10,000 INR</li>
            <li>🔒 This site has implemented secure payment protocols to protect your financial information</li>
            <li>⚠️ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
          </ul>
        </div>
      </div>
      <ProductTabs />
      <RelatedProducts />
    </div>
  );
}
