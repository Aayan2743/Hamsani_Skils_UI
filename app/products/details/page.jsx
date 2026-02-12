"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useCart } from "../../providers/CartProvider";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";


const IMAGE_BASE_URL = "http://192.168.1.6:8000/storage";

/* ================= SKELETON LOADER ================= */
function ProductLoader() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="w-full h-[400px] bg-gray-200 rounded" />
        <div className="space-y-5">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-10 w-1/2 bg-gray-200 rounded" />
          <div className="flex gap-4 pt-4">
            <div className="flex-1 h-12 bg-gray-300 rounded" />
            <div className="flex-1 h-12 bg-gray-300 rounded" />
          </div>
          <div className="h-20 w-full bg-gray-200 rounded mt-4" />
        </div>
      </div>
    </div>
  );
}

function ProductDetailsContent() {
  const { addToCart, setCartOpen } = useCart();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
         console.log("Fetching product with ID:", productId);
        const res = await api.get("/ecom/products", {
          params: { slug: productId },
        });

        if (!isMounted) return;

        const prod = res?.data?.data?.data?.[0] || null;
        
        if (!prod) {
          setError("Product not found");
          setProduct(null);
          return;
        }

        setProduct(prod);

        // Set default variant
        if (prod?.variant_combinations?.length) {
          setSelectedVariant(prod.variant_combinations[0]);
        }
      } catch (error) {
        if (!isMounted) return;
        setError("Failed to load product");
        setProduct(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  /* ================= SHOW LOADER ================= */
  if (loading) {
    return <ProductLoader />;
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {error || "Product not found"}
        </h2>
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  /* ================= IMAGE ================= */
  const primaryImage =
    product.images?.find((img) => img.is_primary)?.image_url || // ✅ use image_url
    product.images?.[0]?.image_url ||                            // fallback
    "/placeholder.svg";

  const imageUrl = primaryImage.startsWith("http")
    ? primaryImage
    : `${IMAGE_BASE_URL}/${primaryImage}`;

  /* ================= ADD TO CART ================= */
  function handleAddToCart() {
    addToCart({
      product_id: product.id,
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
        <div className="w-full relative aspect-[3/4]">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
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

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<ProductLoader />}>
      <ProductDetailsContent />
    </Suspense>
  );
}
