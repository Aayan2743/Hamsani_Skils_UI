import { Suspense } from "react";
import CollectionsPage from "./CollectionsPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading collections…</div>}>
      <CollectionsPage />
    </Suspense>
  );
}
