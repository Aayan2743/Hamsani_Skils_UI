"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useCart } from "../../providers/CartProvider";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";
import { ChevronLeft, ChevronRight, Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react";

/* ================= SKELETON LOADER ================= */
function ProductLoader() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="w-full h-[500px] bg-gray-200 rounded-lg" />
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
          <div className="h-10 w-1/3 bg-gray-200 rounded" />
          <div className="h-32 w-full bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

function ProductDetailsContent() {
  const { addToCart, setCartOpen } = useCart();
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!productSlug) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await api.get(`ecom/products?slug=${productSlug}`);

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
  }, [productSlug]);

  /* ================= SHOW LOADER ================= */
  if (loading) {
    return <ProductLoader />;
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#2C1810]">
          {error || "Product not found"}
        </h2>
        <button
          onClick={() => window.history.back()}
          className="text-[#8B4513] hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const images = product.images || [];
  const currentImage = images[selectedImage]?.image_url || "/placeholder.svg";
  
  const finalPrice = selectedVariant.discount > 0
    ? selectedVariant.amount
    : Number(selectedVariant.extra_price);

  /* ================= ADD TO CART ================= */
  function handleAddToCart() {
    addToCart({
      product_id: product.id,
      title: product.name,
      price: finalPrice,
      img: currentImage,
      qty: quantity,
    });
    toast.success("Added to cart successfully");
  }

  /* ================= BUY NOW ================= */
  function handleBuyNow() {
    addToCart({
      product_id: product.id,
      title: product.name,
      price: finalPrice,
      img: currentImage,
      qty: quantity,
    });
    toast.success("Added to cart successfully");
    setCartOpen(true);
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-[#F5F5DC] min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span>Home</span> / <span>{product.category?.name}</span> / <span className="text-[#2C1810]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT - IMAGE GALLERY */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden group">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {selectedVariant.discount > 0 && (
                <div className="absolute top-4 left-4 bg-[#E74C3C] text-white px-3 py-1 rounded text-sm font-bold">
                  -{selectedVariant.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx
                        ? "border-[#8B4513]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - PRODUCT INFO */}
          <div className="space-y-6">
            
            {/* Category */}
            <div className="text-sm text-[#8B7355] uppercase tracking-wide">
              {product.category?.name}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-normal text-[#2C1810]">
              {product.name}
            </h1>

            {/* SKU */}
            {selectedVariant.sku && (
              <p className="text-sm text-gray-600">SKU: {selectedVariant.sku}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-semibold text-[#2C1810]">
                ₹{finalPrice.toLocaleString()}
              </span>
              {selectedVariant.discount > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  ₹{Number(selectedVariant.extra_price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {selectedVariant.quantity > 0 ? (
                <span className="text-green-600 font-medium">
                  ✓ In Stock ({selectedVariant.quantity} available)
                </span>
              ) : (
                <span className="text-red-600 font-medium">✗ Out of Stock</span>
              )}
            </div>

            {/* Color Variants */}
            {product.variant_combinations.length > 0 && (
              <div>
                <p className="font-semibold mb-3 text-[#2C1810]">Select Color</p>
                <div className="flex gap-3 flex-wrap">
                  {product.variant_combinations.map((variant) => {
                    const color = variant.values?.[0];
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`flex items-center gap-2 border-2 px-4 py-2 rounded-lg cursor-pointer transition hover:border-[#8B4513] ${
                          selectedVariant.id === variant.id
                            ? "border-[#8B4513] bg-[#8B4513]/5"
                            : "border-gray-300"
                        }`}
                      >
                        {color?.color_code && (
                          <span
                            className="w-5 h-5 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: color.color_code }}
                          />
                        )}
                        <span className="text-sm font-medium">{color?.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <p className="font-semibold mb-3 text-[#2C1810]">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedVariant.quantity, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  disabled={quantity >= selectedVariant.quantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={selectedVariant.quantity === 0}
                className="flex-1 bg-[#8B4513] hover:bg-[#6D3410] text-white py-4 rounded-lg font-semibold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={selectedVariant.quantity === 0}
                className="flex-1 bg-[#C4A962] hover:bg-[#B39952] text-white py-4 rounded-lg font-semibold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8B4513] transition">
                <Heart size={18} />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8B4513] transition">
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck size={20} className="text-[#8B4513]" />
                <span>Free shipping on orders over ₹10,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield size={20} className="text-[#8B4513]" />
                <span>Secure payment protocols</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RefreshCw size={20} className="text-[#8B4513]" />
                <span>Easy returns within 7 days</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-lg mb-3 text-[#2C1810]">Product Description</h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                  {product.description}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SIMILAR PRODUCTS CAROUSEL */}
        <SimilarProductsCarousel categorySlug={product.category?.slug} currentProductId={product.id} />
      </div>
    </div>
  );
}

/* ================= SIMILAR PRODUCTS CAROUSEL ================= */
function SimilarProductsCarousel({ categorySlug, currentProductId }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`ecom/products?per_page=10`);
        const allProducts = res.data?.data?.data || [];
        
        // Filter products by same category and exclude current product
        const filtered = allProducts
          .filter(p => p.category?.slug === categorySlug && p.id !== currentProductId)
          .slice(0, 8);
        
        setSimilarProducts(filtered);
      } catch (error) {
        console.error("Failed to load similar products", error);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchSimilarProducts();
    }
  }, [categorySlug, currentProductId]);

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-[#2C1810] mb-6">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-normal text-[#2C1810] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
        You May Also Like
      </h2>
      
      <div className="relative">
        <SimilarProductsSlider products={similarProducts} />
      </div>
    </div>
  );
}

/* ================= SLIDER COMPONENT ================= */
function SimilarProductsSlider({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative group">
      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} className="text-[#8B4513]" />
        </button>
      )}
      
      {currentIndex < maxIndex && (
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} className="text-[#8B4513]" />
        </button>
      )}

      {/* Products Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <SimilarProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex
                ? "w-8 bg-[#8B4513]"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ================= SIMILAR PRODUCT CARD ================= */
function SimilarProductCard({ product }) {
  const variant = product.variant_combinations?.[0];
  const imageUrl = product.images?.find((img) => img.is_primary)?.image_url || 
                   product.images?.[0]?.image_url || 
                   "/placeholder.svg";
  const price = Number(variant?.extra_price || 0);
  const discount = variant?.discount || 0;

  return (
    <a
      href={`/products/details?id=${product.slug}`}
      className="block group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-[#F5F5DC] overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#E74C3C] text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[#8B7355] uppercase tracking-wide mb-1">
          SILK SAREES
        </p>
        
        <h3 className="font-semibold text-[#2C1810] mb-2 line-clamp-2 text-sm group-hover:text-[#8B4513] transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#8B4513]">
            ₹{price.toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{Math.round(price / (1 - discount / 100)).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<ProductLoader />}>
      <ProductDetailsContent />
    </Suspense>
  );
}
