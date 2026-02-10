// import ProductCard from "./ProductCard";

// export default function ProductGrid({ products }) {
//   return (
//     <div
//       className="
//         grid 
//         grid-cols-1     
//         gap-4
//         sm:grid-cols-2   
//         lg:grid-cols-3   
//         border
//       "
//     >
//       {products.map((p) => (
//         <ProductCard key={p.id} product={p} />
//       ))}
//     </div>
//   );
// }
// import ProductCard from "./ProductCard";

// export default function ProductGrid({ products }) {
//   return (
//     <div
//       className="
//         grid
//         grid-cols-1
//         gap-2   
//         sm:grid-cols-2
//         sm:gap-4     
//         lg:grid-cols-3
//         lg:gap-6    
//       "
//     >
//       {products.map((p) => (
//         <ProductCard key={p.id} product={p} />
//       ))}
//     </div>
//   );
// }

"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-2
        sm:grid-cols-3
        sm:gap-3
        lg:grid-cols-4
        lg:gap-4
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
