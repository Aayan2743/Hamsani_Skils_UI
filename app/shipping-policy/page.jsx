import Head from "next/head";

export default function ShippingPolicy() {
  return (
    <>
      <Head>
        <title>Shipping Policy | Hamisni Skills</title>
        <meta
          name="description"
          content="Read the shipping policy of Hamisni Skills for domestic and international orders, delivery timelines, COD terms, customs duties, and remote area surcharge details."
        />
        <meta
          name="keywords"
          content="Hamisni Skills shipping policy, delivery policy, international shipping, domestic shipping, remote area surcharge"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.hamisniskills.com/shipping-policy" />
      </Head>

      <main className="bg-white text-gray-800">
  <header className="text-center  mt-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-3">
          Shipping Policy
          </h1>
          <p className="text-sm tracking-widest text-gray-500">
              Last updated: July 2025
          </p>
        </header>
        
        <section className="max-w-5xl mx-auto px-4 py-4">
          

          {/* Domestic Shipping */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Domestic Shipping (India)
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Once your booking is confirmed, Hamisni Skills will process the
                dispatch within <strong>2 working days</strong> from the date of
                booking.
              </li>
              <li>
                Orders are shipped through our available courier partners.
              </li>
              <li>
                Delivery usually takes <strong>5 to 8 working days</strong> from
                the date of dispatch.
              </li>
              <li>
                Hamisni Skills is not responsible for delays, theft, or loss
                during transit caused by shipping companies.
              </li>
              <li>
                In case of returns, pickup may not be available in all areas.
                Customers must ship the product to our return address if pickup
                is unavailable.
              </li>
              <li>
                Cash on Delivery (COD) is not available for all locations. If
                COD service is denied by the courier, the order will be converted
                to prepaid and dispatched after payment confirmation.
              </li>
              <li>
                For shipping-related queries, please contact us at{" "}
                <a
                  href="mailto:customercare@hamsinisilks.com"
                  className="text-blue-600 underline"
                >
                customercare@hamsinisilks.com
                </a>
              </li>
            </ul>
          </section>

          {/* International Shipping */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              International Shipping
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Customers must provide accurate name, address, and contact
                details at checkout. Hamisni Skills will not be liable for delays
                or loss due to incorrect information.
              </li>
              <li>
                Once an order is shipped, address or contact detail changes are
                not possible.
              </li>
              <li>
                Customers are responsible for paying all applicable{" "}
                <strong>VAT, taxes, customs duties, or import charges</strong> at
                the time of delivery.
              </li>
              <li>
                International orders are processed within{" "}
                <strong>3 working days</strong> and delivered within{" "}
                <strong>8 to 15 working days</strong>.
              </li>
              <li>
                Hamisni Skills is not responsible for delays caused by logistics
                partners, customs clearance, or unforeseen circumstances.
              </li>
              <li>
                Delivery delays may occur due to political, weather, pandemic,
                or other natural or unnatural events.
              </li>
              <li>
                Customers are requested not to accept damaged or tampered
                packages from the delivery partner.
              </li>
            </ul>
          </section>

          {/* Remote Area Surcharge */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Remote Area Surcharge (RAS)
            </h2>
            <p className="text-gray-700 mb-3">
              As per international courier policies, an additional{" "}
              <strong>Remote Area Surcharge (RAS)</strong> may apply if the
              delivery address falls under a remote location.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                The surcharge will not be charged during checkout.
              </li>
              <li>
                Customers will be informed of the RAS before shipment.
              </li>
              <li>
                The surcharge must be paid within <strong>3 days</strong> of
                notification.
              </li>
              <li>
                Failure to pay the surcharge will result in order cancellation
                and a full refund for the product amount.
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">
              Need Help?
            </h2>
            <p className="text-gray-700">
              For any assistance regarding shipping or delivery, please contact
              us at:
            </p>
            <p className="mt-2 text-gray-800 font-medium">
              {/* 📞 +91 7540005884 <br /> */}
              📧{" "}
              <a
                href="mailto:customercare@hamisniskills.com"
                className="text-blue-600 underline"
              >
            customercare@hamsinisilks.com
              </a>
            </p>
          </section>
        </section>
      </main>
    </>
  );
}
