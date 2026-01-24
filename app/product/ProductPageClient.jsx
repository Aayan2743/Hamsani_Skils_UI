"use client";

import { useSearchParams } from "next/navigation";
import ProductClient from "./ProductClient";

export default function ProductPageClient() {
  const productId = useSearchParams().get("id");
  return <ProductClient productId={productId} />;
}
