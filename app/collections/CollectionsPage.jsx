
// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// import SidebarFilters from "../components/SidebarFilters";
// import ProductGrid from "../components/ProductGrid";
// import MobileFilterDrawer from "../components/MobileFilterDrawer";
// import { WishlistProvider } from "../components/WishlistContext";
// import api from "../utils/apiInstance";


// export default function CollectionsPage() {
//   const params = useSearchParams();
//   const category = params.get("category"); // e.g. "kanchipuram-traditional"

//   /* ---------------- API STATE ---------------- */
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- FILTER STATES ---------------- */
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [inStock, setInStock] = useState(null);
//   const [price, setPrice] = useState({ min: 0, max: 10000 });
//   const [appliedPrice, setAppliedPrice] = useState(price);

//   /* ---------------- GRID STATES ---------------- */
//   const [columns, setColumns] = useState(3);
//   const [limit, setLimit] = useState(20);
//   const [sort, setSort] = useState("best");

//   /* ---------------- FETCH PRODUCTS ---------------- */
//   useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get("ecom/products");

//       // Axios already returns parsed JSON
//       const data = res.data;

//       // Handle different response structures safely
//       const productsData =
//         data?.data?.data || data?.data || data || [];
//       setProducts(Array.isArray(productsData) ? productsData : []);
//     } catch (err) {
//       console.error("Products API error:", err);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProducts();
// }, []);


//   /* ---------------- NORMALIZE PRODUCT DATA ---------------- */
//   const normalizedProducts = products.map((p) => {
//     const variant = p.variant_combinations?.[0];

//     return {
//       id: p.id,
//       slug: p.slug,
//       title: p.name,
//       category: p.category?.slug, // IMPORTANT
//       image:
//         p.images?.find((img) => img.is_primary)?.image_path ??
//         p.images?.[0]?.image_path ??
//         null,
//       price: Number(variant?.extra_price ?? 0),
//       inStock: (variant?.quantity ?? 0) > 0,
//       raw: p,
//     };
//   });

//   /* ---------------- FILTER LOGIC ---------------- */
//   let filtered = normalizedProducts.filter(
//     (p) =>
//       (!category || p.category === category) &&
//       (inStock === null || p.inStock === inStock) &&
//       p.price >= appliedPrice.min &&
//       p.price <= appliedPrice.max
//   );

//   if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
//   if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
//   if (sort === "az") filtered.sort((a, b) => a.title.localeCompare(b.title));
//   if (sort === "za") filtered.sort((a, b) => b.title.localeCompare(a.title));

//   filtered = filtered.slice(0, limit);

//   /* ---------------- RENDER ---------------- */
//   return (
//     <WishlistProvider>
//       <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* CATEGORY TITLE */}
//         {category && (
//           <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 capitalize">
//             {category.replace(/-/g, " ")}
//           </h1>
//         )}

//         {/* MOBILE FILTER BUTTON */}
//         <button
//           onClick={() => setFilterOpen(true)}
//           className="lg:hidden w-full border border-zinc-300 py-3 rounded-lg font-medium mb-5"
//         >
//           Filters
//         </button>

//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
//           {/* DESKTOP FILTER SIDEBAR */}
//           <div className="hidden lg:block w-72 shrink-0">
//             <SidebarFilters
//               inStock={inStock}
//               setInStock={setInStock}
//               price={price}
//               setPrice={setPrice}
//               applyPrice={() => setAppliedPrice(price)}
//             />
//           </div>

//           {/* PRODUCTS / EMPTY STATE */}
//           <div className="flex-1">
//             {loading ? (
//               <p className="text-center py-10">Loading products…</p>
//             ) : filtered.length === 0 ? (
//               <div className="text-center py-20">
//                 <h2 className="text-xl font-semibold mb-2">
//                   No products available
//                 </h2>
//                 <p className="text-gray-500">
//                   There are no products found for this category.
//                 </p>
//               </div>
//             ) : (
//               <ProductGrid products={filtered} columns={columns} />
//             )}
//           </div>
//         </div>
//       </main>

//       {/* MOBILE FILTER DRAWER */}
//       <MobileFilterDrawer
//         open={filterOpen}
//         onClose={() => setFilterOpen(false)}
//       >
//         <SidebarFilters
//           inStock={inStock}
//           setInStock={setInStock}
//           price={price}
//           setPrice={setPrice}
//           applyPrice={() => {
//             setAppliedPrice(price);
//             setFilterOpen(false);
//           }}
//         />
//       </MobileFilterDrawer>
//     </WishlistProvider>
//   );
// }


"use client";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import SidebarFilters from "../components/SidebarFilters";
import ProductGrid from "../components/ProductGrid";
import MobileFilterDrawer from "../components/MobileFilterDrawer";
import { WishlistProvider } from "../components/WishlistContext";
import { useProducts } from "../hooks/useProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------- SKELETON LOADER ---------- */
function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg bg-white overflow-hidden shadow"
        >
          <div className="aspect-[3/4] bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-5 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- PAGINATION COMPONENT ---------- */
function Pagination({ currentPage, lastPage, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(lastPage, startPage + showPages - 1);
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-[40px] h-10 rounded-lg font-medium transition ${
            page === currentPage
              ? "bg-[#8B4513] text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default function CollectionsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  
  /* ---------------- PAGINATION STATE ---------------- */
  const [currentPage, setCurrentPage] = useState(1);
  
  /* ---------------- USE PRODUCTS HOOK WITH PAGINATION (12 per page) ---------------- */
  const { products = [], loading, pagination } = useProducts(currentPage, 12);

  /* ---------------- FILTER STATES ---------------- */
  const [filterOpen, setFilterOpen] = useState(false);
  const [inStock, setInStock] = useState(null);
  const [price, setPrice] = useState({ min: 0, max: 100000 });
  const [appliedPrice, setAppliedPrice] = useState(price);

  /* ---------------- NORMALIZE PRODUCT DATA ---------------- */
  const normalizedProducts = useMemo(() => {
    return products.map((p) => {
      const variant = p.variant_combinations?.[0];

      return {
        id: p.id,
        slug: p.slug,
        title: p.name,
        category: p.category?.slug?.toLowerCase() || "",
        image:
          p.images?.find((img) => img.is_primary)?.image_url ??
          p.images?.[0]?.image_url ??
          null,
        price: Number(variant?.extra_price ?? 0),
        inStock: (variant?.quantity ?? 0) > 0,
        raw: p,
      };
    });
  }, [products]);

  /* ---------------- FILTER LOGIC WITH SEARCH ---------------- */
  const filteredProducts = useMemo(() => {
    return normalizedProducts.filter((p) => {
      const matchesCategory =
        !categoryParam || p.category === categoryParam.toLowerCase();

      const matchesStock = inStock === null || p.inStock === inStock;

      const matchesPrice =
        p.price >= appliedPrice.min && p.price <= appliedPrice.max;

      // Search filter - check product name, category, and description
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.raw?.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStock && matchesPrice && matchesSearch;
    });
  }, [normalizedProducts, categoryParam, inStock, appliedPrice, searchQuery]);

  /* ---------------- HANDLE PAGE CHANGE ---------------- */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------- RENDER ---------------- */
  return (
    <WishlistProvider>
      <main className="w-full bg-[#F5F5DC] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* PAGE TITLE */}
          {searchQuery ? (
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-normal text-[#2C1810] mb-2">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-sm text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
          ) : categoryParam ? (
            <h1 className="text-2xl sm:text-3xl font-normal text-[#2C1810] mb-6 capitalize">
              {categoryParam.replace(/-/g, " ")}
            </h1>
          ) : null}

          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden w-full border border-[#8B7355] bg-white py-3 rounded-lg font-medium mb-6 hover:bg-[#8B7355] hover:text-white transition"
          >
            Filters & Sort
          </button>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* DESKTOP FILTER SIDEBAR */}
            <div className="hidden lg:block w-72 shrink-0">
              <SidebarFilters
                inStock={inStock}
                setInStock={setInStock}
                price={price}
                setPrice={setPrice}
                applyPrice={() => setAppliedPrice(price)}
                selectedCategory={categoryParam}
              />
            </div>

            {/* PRODUCTS */}
            <div className="flex-1">
              {/* Results Count */}
              {!loading && (
                <div className="mb-6 text-sm text-gray-600">
                  Showing {pagination.from}-{pagination.to} of {pagination.total} products
                </div>
              )}

              {loading ? (
                <ProductsSkeleton />
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg">
                  <h2 className="text-xl font-semibold mb-2 text-[#2C1810]">
                    No products available
                  </h2>
                  <p className="text-gray-500">
                    There are no products found for this category.
                  </p>
                </div>
              ) : (
                <>
                  <ProductGrid products={filteredProducts} columns={4} />
                  
                  {/* PAGINATION */}
                  {pagination.last_page > 1 && (
                    <Pagination
                      currentPage={pagination.current_page}
                      lastPage={pagination.last_page}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE FILTER DRAWER */}
      <MobileFilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)}>
        <SidebarFilters
          inStock={inStock}
          setInStock={setInStock}
          price={price}
          setPrice={setPrice}
          applyPrice={() => {
            setAppliedPrice(price);
            setFilterOpen(false);
          }}
          selectedCategory={categoryParam}
        />
      </MobileFilterDrawer>
    </WishlistProvider>
  );
}

