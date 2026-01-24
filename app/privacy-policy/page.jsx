import Head from "next/head";

export const metadata = {
  title: "Privacy Policy | Hamisni Skills",
  description:
    "Read the Privacy Policy of Hamisni Skills to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-gray-800">
           <header className="text-center  mt-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-3">
           Privacy Policy
          </h1>
         
        </header>
      <div className="max-w-5xl mx-auto px-6 py-4">
       

        <p className="mb-4">
          This Privacy Policy describes how <strong>Hamisni Skills</strong>{" "}
          (“we”, “our”, or “us”) collects, uses, and discloses your Personal
          Information when you visit or make a purchase from our website.
        </p>

        {/* Collecting Personal Information */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Collecting Personal Information
          </h2>
          <p className="mb-4">
            When you visit our site, we collect certain information about your
            device, your interaction with the site, and information necessary
            to process your purchases or service inquiries.
          </p>
        </section>

        {/* Device Information */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Device Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Examples:</strong> Browser type, IP address, time zone,
              cookies, pages viewed, and interaction data.
            </li>
            <li>
              <strong>Purpose:</strong> Website optimization, analytics, and
              performance monitoring.
            </li>
            <li>
              <strong>Source:</strong> Automatically collected via cookies and
              tracking technologies.
            </li>
            <li>
              <strong>Disclosure:</strong> Shared with trusted platforms such as
              Shopify and analytics providers.
            </li>
          </ul>
        </section>

        {/* Order Information */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Order & Service Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Examples:</strong> Name, email address, billing/shipping
              address, payment details, phone number.
            </li>
            <li>
              <strong>Purpose:</strong> Order processing, service delivery,
              communication, fraud prevention, and customer support.
            </li>
            <li>
              <strong>Source:</strong> Collected directly from you.
            </li>
          </ul>
        </section>

        {/* Sharing Information */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Sharing Personal Information
          </h2>
          <p className="mb-4">
            We share your Personal Information with service providers to help us
            operate our business and provide services, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Shopify (eCommerce platform)</li>
            <li>Payment gateways and shipping partners</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        {/* Behavioural Advertising */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Behavioural Advertising
          </h2>
          <p className="mb-4">
            Hamisni Skills may use your information to provide relevant
            advertisements and marketing communications. You may opt out of
            targeted advertising through platforms such as Google and Facebook.
          </p>
        </section>

        {/* GDPR */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Your Rights (GDPR)</h2>
          <p className="mb-4">
            If you are a resident of the EEA, you have the right to access,
            correct, update, or request deletion of your personal information.
          </p>
        </section>

        {/* Cookies */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Cookies</h2>
          <p className="mb-4">
            We use cookies to improve your browsing experience, analyze site
            traffic, and personalize content. You can control cookie settings
            through your browser.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-2">
            If you have questions about this Privacy Policy, contact us at:
          </p>
          <p className="font-medium">📧 Email: support@hamisniskills.com</p>
          <p className="mt-2">
            📍 Address: No 361 Dr. Rajendraprasad Street (100 Feet), Tatabad,
            Coimbatore – 641012, Tamil Nadu, India
          </p>
        </section>

        <p className="mt-8 text-sm text-gray-500">
          Last updated: January 2026
        </p>
      </div>
    </div>
  );
}
