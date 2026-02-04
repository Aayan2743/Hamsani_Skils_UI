import ProductClient from "../ProductClient";

export const metadata = {
  title: "Product Details",
  description: "View product details",
};

export default function ProductPage({ params }) {
  // ✅ STEP 1: get slug from URL
  const { slug } = params;

  // ✅ STEP 2: pass slug to client component
  return <ProductClient slug={slug} />;
}
