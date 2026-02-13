"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useCart } from "../../providers/CartProvider";
import toast from "react-hot-toast";
import api from "../../utils/apiInstance";
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  Package, 
  RotateCcw 
} from "lucide-react";

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
  const [expandedSection, setExpandedSection] = useState("details");

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

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-[#F5F5DC] min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-[#8B4513] cursor-pointer">Home</span> 
          <span className="mx-2">/</span>
          <span className="hover:text-[#8B4513] cursor-pointer">
            {product.category?.parent_id ? "Women" : "Sarees"}
          </span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#8B4513] cursor-pointer">
            {product.category?.name || "Category"}
          </span>
          <span className="mx-2">/</span>
          <span className="text-[#2C1810] font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12">
          
          <div className="space-y-4">
            <div className="flex gap-4">
              {images.length > 1 && (
                <div className="flex flex-col gap-3 w-20">
                  {images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === idx
                          ? "border-[#8B4513]"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img.image_url}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex-1 relative aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg overflow-hidden group">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition">
                    <Heart size={20} className="text-gray-700" />
                  </button>
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition">
                    <Share2 size={20} className="text-gray-700" />
                  </button>
                </div>

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
              </div>
            </div>

            <div className="text-center">
              <button className="text-sm text-[#8B4513] hover:underline font-medium">
                VIEW FULL SIZE
              </button>
            </div>
          </div>

          <div className="space-y-5">
            
            <h1 className="text-3xl md:text-4xl font-normal text-[#2C1810]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#2C1810]">
                ₹{finalPrice.toLocaleString()}
              </span>
              {selectedVariant.discount > 0 && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{Number(selectedVariant.extra_price).toLocaleString()}
                  </span>
                  <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded">
                    {selectedVariant.discount}% OFF
                  </span>
                </>
              )}
            </div>
{/* 
            <p className="text-sm text-gray-600">
              (Inclusive of all taxes)
            </p> */}

            {product.variant_combinations.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-[#2C1810] uppercase text-sm">Select Color</p>
                  {selectedVariant.values?.[0] && (
                    <span className="text-sm text-gray-600">
                      {selectedVariant.values[0].value}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.variant_combinations.map((variant) => {
                    const color = variant.values?.[0];
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`w-10 h-10 rounded-full border-2 transition ${
                          selectedVariant.id === variant.id
                            ? "border-[#8B4513] ring-2 ring-[#8B4513] ring-offset-2"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color?.color_code || "#ccc" }}
                        title={color?.value || "Color"}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-[#2C1810] uppercase text-sm">Select Size</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button className="border-2 border-[#8B4513] bg-[#8B4513]/5 px-6 py-2 rounded-lg font-medium text-sm">
                  Standard
                </button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              {selectedVariant.quantity > 0 ? (
                <p className="text-green-700 font-medium text-sm">
                  ✓ {selectedVariant.quantity} products available in stock
                </p>
              ) : (
                <p className="text-red-700 font-medium text-sm">✗ Out of Stock</p>
              )}
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={selectedVariant.quantity === 0}
                className="flex-1 bg-white border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                disabled={selectedVariant.quantity === 0}
                className="flex-1 bg-[#FF5722] hover:bg-[#E64A19] text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                BUY NOW
              </button>
            </div>

            <div className="border border-gray-300 rounded-lg p-4">
              {/* <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#8B4513]"
                />
                <button className="bg-[#8B4513] text-white px-6 py-2 rounded font-medium text-sm hover:bg-[#6D3410] transition">
                  CHECK
                </button>
              </div> */}
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm">
                <Package size={20} className="text-[#8B4513] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#2C1810]">Free Delivery</p>
                  <p className="text-gray-600">Within 7-10 Days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <RotateCcw size={20} className="text-[#8B4513] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#2C1810]">Easy Exchange</p>
                  <p className="text-gray-600">In 10 Days</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-6 space-y-3">
              
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("details")}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="font-semibold text-[#2C1810] uppercase text-sm">Product Details</span>
                  {expandedSection === "details" ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSection === "details" && (
                  <div className="pb-4 space-y-3 text-sm text-gray-700">
                    {product.description && (
                      <p className="leading-relaxed whitespace-pre-line">{product.description}</p>
                    )}
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {selectedVariant.values?.[0]?.value && (
                        <div>
                          <p className="font-semibold text-[#2C1810]">Colour</p>
                          <p className="text-gray-600">{selectedVariant.values[0].value}</p>
                        </div>
                      )}
                      {selectedVariant.sku && (
                        <div>
                          <p className="font-semibold text-[#2C1810]">SKU</p>
                          <p className="text-gray-600">{selectedVariant.sku}</p>
                        </div>
                      )}
                      {product.category?.name && (
                        <div>
                          <p className="font-semibold text-[#2C1810]">Category</p>
                          <p className="text-gray-600">{product.category.name}</p>
                        </div>
                      )}
                      {product.brand_id && (
                        <div>
                          <p className="font-semibold text-[#2C1810]">Brand ID</p>
                          <p className="text-gray-600">{product.brand_id}</p>
                        </div>
                      )}
                      {product.status && (
                        <div>
                          <p className="font-semibold text-[#2C1810]">Status</p>
                          <p className="text-gray-600">{product.status}</p>
                        </div>
                      )}
                      {/* {selectedVariant.purchase_price && (
                        <div>
                          <p className="font-semibold text-[#2C1810]">Purchase Price</p>
                          <p className="text-gray-600">₹{Number(selectedVariant.purchase_price).toLocaleString()}</p>
                        </div>
                      )} */}
                    </div>

                    {/* Display extra_details if it's an object with Description */}
                    {product.extra_details && typeof product.extra_details === 'object' && product.extra_details.Description && (
                      <div className="mt-4">
                        <div 
                          className="leading-relaxed prose prose-sm max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: product.extra_details.Description }}
                        />
                      </div>
                    )}

                    {/* Display specifications if it's a string or object */}
                    {product.specifications && (
                      <div className="mt-4">
                        <p className="font-semibold text-[#2C1810] mb-2">Specifications</p>
                        {typeof product.specifications === 'string' && product.specifications.trim() ? (
                          <p className="text-gray-600">{product.specifications}</p>
                        ) : typeof product.specifications === 'object' && Object.keys(product.specifications).length > 0 ? (
                          <div className="space-y-2">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <div key={key} className="flex gap-2">
                                <span className="font-medium text-[#2C1810]">{key}:</span>
                                <span className="text-gray-600">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Display all other extra_details fields */}
                    {product.extra_details && typeof product.extra_details === 'object' && Object.keys(product.extra_details).length > 0 && (
                      <div className="mt-4 space-y-4">
                        {Object.entries(product.extra_details).map(([key, value]) => {
                          // Skip Description as it's already shown above
                          if (key === 'Description') return null;
                          
                          return (
                            <div key={key}>
                              <p className="font-semibold text-[#2C1810] mb-2">{key}</p>
                              {typeof value === 'string' && value.includes('<') ? (
                                <div 
                                  className="text-gray-600 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: value }}
                                />
                              ) : (
                                <p className="text-gray-600">{String(value)}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {selectedVariant.low_quantity && (
                      <div className="mt-4">
                        <p className="font-semibold text-[#2C1810] mb-2">Low Stock Alert</p>
                        <p className="text-gray-600">{selectedVariant.low_quantity} units</p>
                      </div>
                    )}

                    {product.specifications && typeof product.specifications === 'string' && product.specifications.trim() && (
                      <div className="mt-4">
                        <p className="font-semibold text-[#2C1810] mb-2">Specifications</p>
                        <p className="text-gray-600">{product.specifications}</p>
                      </div>
                    )}

                    {product.extra_details && typeof product.extra_details === 'string' && product.extra_details.trim() && (
                      <div className="mt-4">
                        <p className="font-semibold text-[#2C1810] mb-2">Additional Details</p>
                        <p className="text-gray-600">{product.extra_details}</p>
                      </div>
                    )}

                    {product.created_at && (
                      <div className="mt-4">
                        <p className="font-semibold text-[#2C1810] mb-2">Created</p>
                        <p className="text-gray-600 text-xs">
                          {new Date(product.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("declaration")}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="font-semibold text-[#2C1810] uppercase text-sm">Product Declaration</span>
                  {expandedSection === "declaration" ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSection === "declaration" && (
                  <div className="pb-4 text-sm text-gray-700">
                    {product.extra_details?.['Product Declaration'] ? (
                      typeof product.extra_details['Product Declaration'] === 'string' && product.extra_details['Product Declaration'].includes('<') ? (
                        <div 
                          className="leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: product.extra_details['Product Declaration'] }}
                        />
                      ) : (
                        <p className="leading-relaxed">{String(product.extra_details['Product Declaration'])}</p>
                      )
                    ) : (
                      <p className="leading-relaxed text-gray-500">
                        Product declaration information not available.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("shipping")}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="font-semibold text-[#2C1810] uppercase text-sm">Shipping & Returns</span>
                  {expandedSection === "shipping" ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSection === "shipping" && (
                  <div className="pb-4 text-sm text-gray-700 space-y-3">
                    {product.extra_details?.['Return & Exchange'] ? (
                      typeof product.extra_details['Return & Exchange'] === 'string' && product.extra_details['Return & Exchange'].includes('<') ? (
                        <div 
                          className="leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: product.extra_details['Return & Exchange'] }}
                        />
                      ) : (
                        <p className="leading-relaxed">{String(product.extra_details['Return & Exchange'])}</p>
                      )
                    ) : (
                      <p className="leading-relaxed text-gray-500">
                        Shipping and returns information not available.
                      </p>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        <SimilarProductsCarousel categorySlug={product.category?.slug} currentProductId={product.id} />
      </div>
    </div>
  );
}

function SimilarProductsCarousel({ categorySlug, currentProductId }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`ecom/products?per_page=10`);
        const allProducts = res.data?.data?.data || [];
        
        const filtered = allProducts
          .filter(p => p.category?.slug === categorySlug && p.id !== currentProductId)
          .slice(0, 8);
        
        setSimilarProducts(filtered);
      } catch (error) {
        console.error("Failed to load similar products");
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
      <div className="relative aspect-[3/4] bg-[#F5F5DC] overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#E74C3C] text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-[#8B7355] uppercase tracking-wide mb-1">
          SILK SAREES
        </p>
        <h3 className="font-semibold text-[#2C1810] mb-2 line-clamp-2 text-sm group-hover:text-[#8B4513] transition-colors">
          {product.name}
        </h3>
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
