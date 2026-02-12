import Head from "next/head";

const faqs = [
  {
    q: "What type of silk sarees does Hamsini offer?",
    a: "Hamsini Sarees offers a premium collection of traditional and bridal silk sarees including Kanchipuram, Banarasi, Mysore Silk, Paithani, soft silks, and wedding-exclusive designs."
  },
  {
    q: "Are Hamsini silk sarees authentic?",
    a: "Yes. All Hamsini silk sarees are 100% authentic and sourced directly from skilled weavers and trusted silk clusters across India."
  },
  {
    q: "How long does delivery take?",
    a: "Orders are usually processed within 1–2 business days and delivered within 3–7 working days depending on your location."
  },
  {
    q: "Can I exchange or return my saree?",
    a: "Yes. We offer exchanges or returns within 15 days of delivery, provided the saree is unused and in original condition."
  },
  {
    q: "Do you offer bridal or bulk orders?",
    a: "Absolutely! Hamsini specializes in bridal silk sarees and bulk orders for weddings and events. Please contact our support team for assistance."
  },
  {
    q: "How should I care for my silk saree?",
    a: "Dry clean only. Store your saree in a cool, dry place wrapped in soft cotton cloth to maintain its sheen and longevity."
  }
];

export default function FAQPage() {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>FAQ | Hamsini Silks & Sarees</title>
        <meta
          name="description"
          content="Find answers to common questions about Hamsini silk sarees, authenticity, delivery, returns, and bridal collections."
        />
      </Head>

      {/* Header */}
     
      <header className="text-center  mt-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-3">
           FAQ&apos;s
          </h1>
          <p className="text-sm tracking-widest text-gray-500">
              Frequently Asked Questions about Hamsini Sarees
          </p>
        </header>


      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-8 text-black">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 bg-gray-50 p-6 rounded-xl h-fit">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Need Help?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            If you have any questions related to Hamsini Sarees, our customer
            care team is happy to assist you.
          </p>

          <a
            href="/contact"
            className="inline-block mt-4 bg-red-400 text-white px-5 py-2 rounded-md text-sm hover:bg-red-700 transition"
          >
            Contact Support
          </a>
        </aside>

        {/* FAQ Section */}
        <section className="lg:col-span-3">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 rounded-lg p-5 transition"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="font-medium text-gray-800">
                    Q: {faq.q}
                  </h3>
                  <span className="text-xl group-open:rotate-45 transition">
                    +
                  </span>
                </summary>

                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
