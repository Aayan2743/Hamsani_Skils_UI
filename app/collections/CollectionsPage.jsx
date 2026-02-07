
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
import { useEffect, useState } from "react";

import SidebarFilters from "../components/SidebarFilters";
import ProductGrid from "../components/ProductGrid";
import MobileFilterDrawer from "../components/MobileFilterDrawer";
import { WishlistProvider } from "../components/WishlistContext";
import api from "../utils/apiInstance";

/* ---------- SKELETON LOADER ---------- */
function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border bg-white overflow-hidden"
        >
          <div className="aspect-[3/4] bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CollectionsPage() {
  const params = useSearchParams();
  const category = params.get("category");

  /* ---------------- API STATE ---------------- */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FILTER STATES ---------------- */
  const [filterOpen, setFilterOpen] = useState(false);
  const [inStock, setInStock] = useState(null);
  const [price, setPrice] = useState({ min: 0, max: 10000 });
  const [appliedPrice, setAppliedPrice] = useState(price);

  /* ---------------- GRID STATES ---------------- */
  const [columns, setColumns] = useState(3);
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("best");

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get("ecom/products");
        const data = res.data;

        const productsData =
          data?.data?.data || data?.data || data || [];

        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.log("Products API error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  /* ---------------- NORMALIZE PRODUCT DATA ---------------- */
  const normalizedProducts = products.map((p) => {
    const variant = p.variant_combinations?.[0];

    return {
      id: p.id,
      slug: p.slug,
      title: p.name,
      category: p.category?.slug,
      image:
        p.images?.find((img) => img.is_primary)?.image_path ??
        p.images?.[0]?.image_path ??
        null,
      price: Number(variant?.extra_price ?? 0),
      inStock: (variant?.quantity ?? 0) > 0,
      raw: p,
    };
  });

  /* ---------------- FILTER LOGIC ---------------- */
  let filtered = normalizedProducts.filter(
    (p) =>
      (!category || p.category === category) &&
      (inStock === null || p.inStock === inStock) &&
      p.price >= appliedPrice.min &&
      p.price <= appliedPrice.max
  );

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "az") filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "za") filtered.sort((a, b) => b.title.localeCompare(a.title));

  filtered = filtered.slice(0, limit);

  /* ---------------- RENDER ---------------- */
  return (
    <WishlistProvider>
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* CATEGORY TITLE */}
        {category && (
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 capitalize">
            {category.replace(/-/g, " ")}
          </h1>
        )}

        {/* MOBILE FILTER BUTTON */}
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden w-full border border-zinc-300 py-3 rounded-lg font-medium mb-5"
        >
          Filters
        </button>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <div className="hidden lg:block w-72 shrink-0">
            <SidebarFilters
              inStock={inStock}
              setInStock={setInStock}
              price={price}
              setPrice={setPrice}
              applyPrice={() => setAppliedPrice(price)}
            />
          </div>

          {/* PRODUCTS / EMPTY STATE */}
          <div className="flex-1">
            {loading ? (
              <ProductsSkeleton />
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold mb-2">
                  No products available
                </h2>
                <p className="text-gray-500">
                  There are no products found for this category.
                </p>
              </div>
            ) : (
              <ProductGrid products={filtered} columns={columns} />
            )}
          </div>
        </div>
      </main>

      {/* MOBILE FILTER DRAWER */}
      <MobileFilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <SidebarFilters
          inStock={inStock}
          setInStock={setInStock}
          price={price}
          setPrice={setPrice}
          applyPrice={() => {
            setAppliedPrice(price);
            setFilterOpen(false);
          }}
        />
      </MobileFilterDrawer>
    </WishlistProvider>
  );
}

