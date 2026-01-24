import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div
      className="
        grid 
        grid-cols-1       /* ✅ MOBILE: 1 product */
        gap-4
        sm:grid-cols-2    /* tablet */
        lg:grid-cols-3    /* desktop */
      "
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
