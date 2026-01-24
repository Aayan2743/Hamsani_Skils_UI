"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { products } from "../data/products";
import SidebarFilters from "../components/SidebarFilters";
import ProductGrid from "../components/ProductGrid";
import Toolbar from "../components/Toolbar";
import MobileFilterDrawer from "../components/MobileFilterDrawer";
import { WishlistProvider } from "../components/WishlistContext";

export default function CollectionsPage() {
  const params = useSearchParams();
  const category = params.get("category");

  /* ---------------- FILTER STATES ---------------- */
  const [filterOpen, setFilterOpen] = useState(false);
  const [inStock, setInStock] = useState(null);
  const [price, setPrice] = useState({ min: 0, max: 10000 });
  const [appliedPrice, setAppliedPrice] = useState(price);

  /* ---------------- GRID STATES ---------------- */
  const [columns, setColumns] = useState(3);
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("best");

  /* ---------------- FILTER LOGIC ---------------- */
  let filtered = products.filter(
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
  if (sort === "new") filtered.sort((a, b) => b.date - a.date);

  filtered = filtered.slice(0, limit);

  return (
    <WishlistProvider>
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        
        {/* TOOLBAR (SORT / GRID OPTIONS) */}
        

        {/* MOBILE FILTER BUTTON */}
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden w-full border border-zinc-300 py-3 rounded-lg font-medium mb-5 text-black"
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

          {/* PRODUCTS */}
          <div className="flex-1">
            <ProductGrid products={filtered} columns={columns} />
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
            setFilterOpen(false); // ✅ auto close
          }}
        />
      </MobileFilterDrawer>
    </WishlistProvider>
  );
}
