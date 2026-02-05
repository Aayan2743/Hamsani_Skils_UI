// import ProductClient from "./ProductClient";

// /* ✅ Generate static params using product IDs */
// export async function generateStaticParams() {
//   const res = await fetch(
//     "http://192.168.1.6:8000/api/ecom/products"
//   );

//   const json = await res.json();
//   const products = json?.data?.data || [];

//   return products.map((product) => ({
//     id: product.id.toString(), // Convert to string for URL
//   }));
// }
 
// export const metadata = {
//   title: "Product Details",
//   description: "View product details",
// };

// export default function ProductPage({ params }) {
//   return <ProductClient productId={params.id} products={products} />;
// }

// // <ProductClient productId={params.id} 


// import ProductClient from "./ProductClient";

// async function getProducts() {
//   const res = await fetch("http://192.168.1.6:8000/api/ecom/products", {
//     cache: "no-store", // or 'force-cache' if static
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const json = await res.json();
//   return json?.data?.data || [];
// }

// export async function generateStaticParams() {
//   const products = await getProducts();

//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

// export default async function ProductPage({ params }) {
//   const products = await getProducts();

//   const currentProduct = products.find(
//     (p) => p.id.toString() === params.id
//   );

//   return (
//     <ProductClient
//       productId={params.id}
//       products={products}
//       product={currentProduct}
//     />
//   );
// }


// import ProductClient from "./ProductClient";

// async function getProducts() {
//   const res = await fetch("http://192.168.1.6:8000/api/ecom/products", {
//     cache: "no-store",
//   });

//   const json = await res.json();
//   return json?.data?.data || [];
// }

// export async function generateStaticParams() {
//   const products = await getProducts();

//   return products.map((p) => ({
//     id: p.id.toString(),
//   }));
// }

// export default async function ProductPage({ params }) {
//   const products = await getProducts();

//   const currentProduct = products.find(
//     (p) => p.id === Number(params.id)
//   );

//   return <ProductClient product={currentProduct} />;
// }


import ProductClient from "./ProductClient";

async function getProductBySlug(slug) {
  console.log("SLUG RECEIVED:", slug);

  const res = await fetch(
    `http://192.168.1.6:8000/api/ecom/products?slug=${slug}`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json?.data?.data?.[0] || null;
}

export default async function ProductPage({ params }) {
  console.log("PARAMS:", params);

  const product = await getProductBySlug(params.slug);
  return <ProductClient product={product} />;
}
