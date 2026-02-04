// import ProductClient from "./ProductClient";

// export const metadata = {
//   title: "Product Details",
//   description: "View product details",
// };

// export default function ProductPage({ params }) {
//   // ✅ STEP 1: get slug from URL
//   const { slug } = params;

//   // ✅ STEP 2: pass slug to client component
//   return <ProductClient slug={slug} />;
// }


import ProductClient from "./ProductClient";

/* ✅ REQUIRED FOR output: "export" */
export async function generateStaticParams() {
  const res = await fetch(
    "http://192.168.1.6:8000/api/ecom/products"
  );

  const json = await res.json();

  const products = json?.data?.data || [];

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export const metadata = {
  title: "Product Details",
  description: "View product details",
};

export default function ProductPage({ params }) {
  return <ProductClient slug={params.slug} />;
}
