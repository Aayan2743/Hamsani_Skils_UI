export const metadata = {
  title: "Refund Policy | Hamisni Skills",
  description:
    "Read the Refund, Return, and Exchange Policy of Hamisni Skills. Learn about domestic and international returns, exchanges, damages, and eligibility.",
  keywords: [
    "Hamisni Skills Refund Policy",
    "Return Policy",
    "Exchange Policy",
    "Online Learning Refund",
    "Skill Platform Policy",
  ],
  robots: "index, follow",
};

export default function RefundPolicy() {
  return (
    <main className="bg-white-50 text-gray-800">

          <header className="text-center  mt-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-3">
           Refund & Exchange Policys
          </h1>
        </header>
      <section className="max-w-5xl mx-auto px-4 py-6">
      
        {/* Domestic Returns */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Domestic Returns & Exchange
          </h2>

          <p className="mb-4">
            Hamisni Skills offers a <strong>7-day return policy</strong>. You
            have 7 days after receiving your item to request a return.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Items must be in the same condition as received, unused, unworn,
              with original tags and packaging.
            </li>
            <li>
              Proof of purchase or receipt is required to process returns.
            </li>
            <li>
              Items sent without prior return approval will not be accepted.
            </li>
          </ul>

          <p className="mt-4">
            To initiate a return, contact us at{" "}
            <a
              href="mailto:customercare@hamsinisilks.com"
              className="text-blue-600 underline"
            >
             customercare@hamsinisilks.com
            </a>
          </p>
        </section>

        {/* Damages */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Damages & Incorrect Orders
          </h2>
          <p>
            Please inspect your order upon delivery. If the product is damaged,
            defective, or incorrect, contact us immediately so we can evaluate
            and resolve the issue promptly.
          </p>
        </section>

        {/* Non-returnable */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Exceptions / Non-Returnable Items
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sarees customized for finishing purposes</li>
            <li>Items with blouse cuts or knots tied</li>
            <li>Discounted or sale products</li>
          </ul>
        </section>

        {/* Exchange */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
          <p>
            * All exchange requests must be made within 7 of receiving the order 
            * Delivery of all exchanged products will be done within 7 working days.
          </p>
        </section>

        {/* Refund */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
          <p>
            No monetary refunds will be processed. Eligible products can only be
            exchanged for items available on our website.
          </p>
        </section>

        {/* Pickup */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Pickup</h2>
          <p>
            Return pickup service is not available in all locations. Customers
            are responsible for shipping the product to our communication
            address.
          </p>
        </section>

        {/* International */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            International Returns
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>No exchange or return is available for international orders.</li>
            <li>
              If a wrong or damaged item is received, inform us within 48 hours
              at{" "}
              <a
                href="mailto:customercare@hamsinisilks.com"
                className="text-blue-600 underline"
              >
            customercare@hamsinisilks.com
              </a>
            </li>
            <li>
              Complaints raised after 7 days of receiving the shipment will not
              be accepted.
            </li>
            <li>
              Duties or taxes during return shipping are the customer’s
              responsibility.
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
}
