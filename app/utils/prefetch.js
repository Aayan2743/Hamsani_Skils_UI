// import api from "./apiInstance";

// // Prefetch products on app load
// export async function prefetchProducts() {
//   try {
//     // This will populate the cache
//     await api.get("ecom/products");
//   } catch (error) {
//     // console.error("Prefetch products failed:", error);
//   }
// }

// // Prefetch menu on app load
// export async function prefetchMenu() {
//   try {
//     await api.get("ecom/menu");
//   } catch (error) {
//     console.error("Prefetch menu failed:", error);
//   }
// }

// // Prefetch all critical data
// export function prefetchCriticalData() {
//   // Run in parallel
//   Promise.all([
//     prefetchProducts(),
//     prefetchMenu(),
//   ]).catch(console.error);
// }


import api from "./apiInstance";
import toast from "react-hot-toast";

// Prefetch products on app load
export async function prefetchProducts() {
  try {
    const res = await api.get("ecom/products");
    return true;
  } catch (error) {
    return false;
  }
}

// Prefetch menu on app load
export async function prefetchMenu() {
  try {
    const res = await api.get("ecom/menu");
    return true;
  } catch (error) {
    return false;
  }
}

// Prefetch all critical data
export async function prefetchCriticalData() {
  toast.loading("Loading app data...", { id: "prefetch" });

  try {
    const results = await Promise.all([
      prefetchProducts(),
      prefetchMenu(),
    ]);

    const allSuccess = results.every(Boolean);

    if (allSuccess) {
      toast.success("App data loaded successfully ✅", {
        id: "prefetch",
      });
    } else {
      toast.error("Some data failed to load ⚠️", {
        id: "prefetch",
      });
    }
  } catch (error) {
    toast.error("Failed to load app data ❌", {
      id: "prefetch",
    });
  }
}
