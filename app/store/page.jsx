"use client";

import { useState } from "react";


const STORES = [
  {
    city: "Coimbatore – 100 Feet Road",
    address:
      "361, Dr. Rajendra Prasad Road (100 Feet), Tatabad, Coimbatore, Tamil Nadu 641012",
    phone: "91500 16561",
    map: "https://www.google.com/maps?q=361 Dr Rajendra Prasad Road Tatabad Coimbatore&output=embed",
  },
  {
    city: "Coimbatore – Cross Cut Road",
    address:
      "942, Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu 641012",
    phone: "91500 16562",
    map: "https://www.google.com/maps?q=942 Cross Cut Road Gandhipuram Coimbatore&output=embed",
  },
  {
    city: "Madurai",
    address:
      "No. 137, 5th Street, K.K. Nagar, Madurai, Tamil Nadu 625020",
    phone: "91500 16577",
    map: "https://www.google.com/maps?q=137 5th Street KK Nagar Madurai&output=embed",
  },
  {
    city: "Salem",
    address:
      "10/3, Fair Lands, Park Street, Z2 Hasthampatty, Salem, Tamil Nadu 636016",
    phone: "91500 16567",
    map: "https://www.google.com/maps?q=10/3 Fair Lands Park Street Salem&output=embed",
  },
];


export default function StoreLocatorPage() {
  const [activeStore, setActiveStore] = useState(STORES[0]);

  return (
    <main className="bg-white min-h-screen text-black">
      {/* PAGE TITLE */}
      <header className="py-8">
        <h1 className="text-3xl font-semibold text-center tracking-wide text-red-500">
          STORE LOCATOR
        </h1>
      </header>

      {/* LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row border border-gray-200">

          {/* LEFT SIDEBAR */}
       <aside className="lg:w-[360px] w-full border-r border-gray-200">
  <div className="max-h-[600px] overflow-y-auto">

    {STORES.map((store, index) => {
      const isActive = activeStore.city === store.city;

      return (
        <article
          key={index}
          onClick={() => setActiveStore(store)}
          className={`px-6 py-5 cursor-pointer border-b
            ${isActive ? "bg-gray-100 border-l-4 border-black" : "hover:bg-gray-50"}
          `}
        >
          {/* Store Name */}
          <h2 className="text-lg font-semibold mb-2">
            Hamsini Silks & Jewellers – {store.city}
          </h2>

          {/* Address (VERY IMPORTANT FOR SEO) */}
          <address className="not-italic text-sm text-gray-700 leading-relaxed mb-1">
            {store.address}
          </address>

          {/* Phone */}
          <p className="text-sm text-gray-900">
            Phone: {store.phone}
          </p>
        </article>
      );
    })}

  </div>
</aside>


          {/* MAP SECTION */}
          <div className="flex-1 h-[60vh] lg:min-h-[600px]">

            <iframe
              title={`Map - ${activeStore.city}`}
              src={activeStore.map}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>
    </main>
  );
}
