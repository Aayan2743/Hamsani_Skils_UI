import React, { Suspense } from "react";
import ClientRegisterForm from "./ClientRegisterForm";

export default function RegisterPage() {
  return (
    <main>
      <h1 className="sr-only">Register</h1>
      <Suspense fallback={<div>Loading form…</div>}>
        <ClientRegisterForm />
      </Suspense>
    </main>
  );
}
