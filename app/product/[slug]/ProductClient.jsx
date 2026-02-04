"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const IMAGE_BASE_URL = "http://192.168.1.6:8000/storage";

export default function ProductClient({ slug }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ STEP 3: API CALL BASED ON SLUG
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        const res = await fetch(
          `http://192.168.1.6:8000/api/ecom/products?slug=${slug}`
        );

        const json = await res.json();
       console.log("TEST", json?.data  )
        // ✅ Your API returns array → take first item
        setProduct(json?.data);
      } catch (err) {
        console.error("Product API error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <p className="p-10">Loading product...</p>;
  if (!product) return <p className="p-10">Product not found</p>;

  const primaryImage =
    product.images?.find((img) => img.is_primary)?.image_path ||
    product.images?.[0]?.image_path;

  const imageUrl = primaryImage
    ? `${IMAGE_BASE_URL}/${primaryImage}`
    : "/placeholder.png";

  const variant = product.variant_combinations?.[0];

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 p-6">
      {/* IMAGE */}
      <div className="relative aspect-[3/4] bg-zinc-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-xl font-semibold mt-3">
          ₹ {variant?.extra_price ?? "--"}
        </p>

        <div className="mt-6 whitespace-pre-line text-zinc-700">
          {product.description}
        </div>

        <button className="mt-6 bg-red-700 text-white px-6 py-3">
          Add to Cart
        </button>
      </div>
    </div>
  );
}