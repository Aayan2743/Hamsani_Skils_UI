import api from "./apiInstance";

// Prefetch products on app load
export async function prefetchProducts() {
  try {
    // This will populate the cache
    await api.get("ecom/products");
  } catch (error) {
    console.error("Prefetch products failed:", error);
  }
}

// Prefetch menu on app load
export async function prefetchMenu() {
  try {
    await api.get("ecom/menu");
  } catch (error) {
    console.error("Prefetch menu failed:", error);
  }
}

// Prefetch all critical data
export function prefetchCriticalData() {
  // Run in parallel
  Promise.all([
    prefetchProducts(),
    prefetchMenu(),
  ]).catch(console.error);
}
