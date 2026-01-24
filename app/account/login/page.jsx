import React, { Suspense } from "react";
import ClientLoginForm from "./ClientLoginForm";

export default function LoginPage() {
  return (
    <main>
      <h1 className="sr-only">Login</h1>
      <Suspense fallback={<div>Loading login...</div>}>
        <ClientLoginForm />
      </Suspense>
    </main>
  );
}
