// "use client";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { products } from "../data/products";
// import SidebarFilters from "../components/SidebarFilters";
// import ProductGrid from "../components/ProductGrid";
// import Toolbar from "../components/Toolbar";
// import MobileFilterDrawer from "../components/MobileFilterDrawer";
// import { WishlistProvider } from "../components/WishlistContext";

// export default function CollectionsPage() {
//   const params = useSearchParams();
//   const category = params.get("category");

//   /* ---------------- FILTER STATES ---------------- */
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [inStock, setInStock] = useState(null);
//   const [price, setPrice] = useState({ min: 0, max: 10000 });
//   const [appliedPrice, setAppliedPrice] = useState(price);

//   /* ---------------- GRID STATES ---------------- */
//   const [columns, setColumns] = useState(3);
//   const [limit, setLimit] = useState(20);
//   const [sort, setSort] = useState("best");

//   /* ---------------- FILTER LOGIC ---------------- */
//   let filtered = products.filter(
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
//   if (sort === "new") filtered.sort((a, b) => b.date - a.date);

//   filtered = filtered.slice(0, limit);

//   return (
//     <WishlistProvider>
//       <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
//         {/* TOOLBAR (SORT / GRID OPTIONS) */}
//         {/* MOBILE FILTER BUTTON */}
//         <button
//           onClick={() => setFilterOpen(true)}
//           className="lg:hidden w-full border border-zinc-300 py-3 rounded-lg font-medium mb-5 text-black"
//         >
//           Filters
//         </button>

//         <div className="flex gap-8">
          
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

//           {/* PRODUCTS */}
//           <div className="flex-1">
//             <ProductGrid products={filtered} columns={columns} />
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
//             setFilterOpen(false); // ✅ auto close
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

export default function CollectionsPage() {
  const params = useSearchParams();
  const category = params.get("category"); // e.g. "kanchipuram-traditional"

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
    async function fetchProducts() {
      try {
        setLoading(true);

        const res = await fetch("http://192.168.1.6:8000/api/ecom/products");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const json = await res.json();

        // Handle different response structures
        const productsData = json?.data?.data || json?.data || json || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error("Products API error:", err);
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
      category: p.category?.slug, // IMPORTANT
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
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* CATEGORY TITLE */}
        {category && (
          <h1 className="text-2xl font-bold mb-6 capitalize">
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

        <div className="flex gap-8">
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
              <p className="text-center py-10">Loading products…</p>
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
