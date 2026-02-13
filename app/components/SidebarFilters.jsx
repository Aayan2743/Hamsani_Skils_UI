


// "use client";

// export default function SidebarFilters({
//   stockFilter,
//   setStockFilter,
//   inStock,
//   setInStock,
  
//   price,
//   setPrice,
//   applyPrice,
// }) {
//   return (
//     <aside className="w-[260px] space-y-10 text-black">

//       {/* AVAILABILITY */}
//     <div>
//         <h3 className="font-semibold mb-4 font-sans">AVAILABILITY</h3>
//         <label className="block text-sm">
//           <input
//             type="checkbox"
//             checked={inStock === true}
//             onChange={() => setInStock(inStock === true ? null : true)}
//           />{" "}
//           In Stock
//         </label>
//         <label className="block text-sm">
//           <input
//             type="checkbox"
//             checked={inStock === false}
//             onChange={() => setInStock(inStock === false ? null : false)}
//           />{" "}
//           Out Of Stock
//         </label>
//       </div>


//       {/* PRICE */}
//       <div>
//         <h3 className="font-semibold border-b pb-2 mb-4">
//           PRICE
//         </h3>

//         <input
//           type="range"
//           min={0}
//           max={10000}
//           value={price.max}
//           onChange={(e) =>
//             setPrice({ ...price, max: Number(e.target.value) })
//           }
//           className="w-full accent-blue-600 cursor-pointer"
//         />

//         <div className="flex justify-between text-sm mt-2">
//           <span>₹ {price.min}</span>
//           <span>₹ {price.max}</span>
//         </div>

//         <button
//           onClick={applyPrice}
//           className="w-full bg-blue-800 text-white py-3 mt-4"
//         >
//           APPLY
//         </button>

//           <div>
//         <h3 className="font-semibold border-b pb-2 mb-4 mt-6">
//           SILK SAREE'S 
//         </h3>
//         <img src="https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492&width=1920" alt="Weaving Silk Saree" />
//       </div>
//       </div>
//     </aside>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/apiInstance";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function SidebarFilters({
  inStock,
  setInStock,
  price,
  setPrice,
  applyPrice,
  selectedCategory,
}) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get("ecom/menu");
        setCategories(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        // console.error("Failed to fetch categories", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categorySlug) => {
    router.push(`/collections?category=${categorySlug}`);
  };

  return (
    <aside className="w-full lg:w-[260px] space-y-6 text-black">
      
      {/* CATEGORIES */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-[#2C1810]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Categories
        </h3>
        
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {/* ALL PRODUCTS OPTION */}
            <button
              onClick={() => router.push('/collections')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-[#8B4513] text-white'
                  : 'text-gray-700 hover:bg-[#F5F5DC] hover:text-[#8B4513]'
              }`}
            >
              <span className="text-sm font-semibold">All Products</span>
            </button>

            {/* CATEGORY MENUS */}
            {categories.map((menu) => (
              <div key={menu.key}>
                {/* Main Category */}
                <button
                  onClick={() => setExpandedMenu(expandedMenu === menu.key ? null : menu.key)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F5F5DC] transition-colors flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#8B4513]">
                    {menu.label}
                  </span>
                  {menu.items?.length > 0 && (
                    <svg
                      className={`w-4 h-4 transition-transform ${expandedMenu === menu.key ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Subcategories */}
                {expandedMenu === menu.key && menu.items?.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1">
                    {menu.items.map((item) => {
                      const itemSlug = slugify(item);
                      const isActive = selectedCategory === itemSlug;
                      
                      return (
                        <button
                          key={item}
                          onClick={() => handleCategoryClick(itemSlug)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-[#8B4513] text-white'
                              : 'text-gray-600 hover:bg-[#F5F5DC] hover:text-[#8B4513]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRICE FILTER */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-[#2C1810]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Price Range
        </h3>
        
        <input
          type="range"
          min={0}
          max={100000}
          value={price.max}
          onChange={(e) => setPrice({ ...price, max: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B4513]"
        />
        
        <div className="flex justify-between text-sm mt-3 text-gray-600">
          <span>₹{price.min.toLocaleString()}</span>
          <span>₹{price.max.toLocaleString()}</span>
        </div>

        <button
          onClick={applyPrice}
          className="w-full bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white py-3 mt-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          Apply Filter
        </button>
      </div>

      {/* PROMOTIONAL BANNER */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src="https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492&width=1920"
          alt="Silk Sarees Collection"
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-center">
          <h4 className="font-semibold text-[#2C1810] mb-2">Premium Silk Sarees</h4>
          <p className="text-xs text-gray-600">Handcrafted with love</p>
        </div>
      </div>
    </aside>
  );
}

