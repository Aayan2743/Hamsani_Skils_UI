import Head from "next/head";

export const metadata = {
  title: "Terms of Service | Hamisni Skills",
  description:
    "Read the Terms of Service for Hamisni Skills. Understand your rights, responsibilities, and legal obligations while using our website and services.",
  keywords: [
    "Hamisni Skills",
    "Terms of Service",
    "User Agreement",
    "Skill Development Platform",
    "Online Learning Terms",
  ],
  robots: "index, follow",
};

export default function TermsOfService() {
  return (
    <main className="bg-white-50 text-gray-800">
       <header className="text-center  mt-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-3">
         Terms of Service
          </h1>
          <p className="text-sm tracking-widest text-gray-500">
              Last updated: July 2025
          </p>
        </header>
      <section className="max-w-5xl mx-auto px-4 py-4">
       

        <p className="mb-6">
          Welcome to <strong>Hamsini Silks</strong>. If you continue to browse
          and use this website, you are agreeing to comply with and be bound by
          the following terms and conditions of use, which together with our
          privacy policy govern Hamisni Skills’ relationship with you.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Definitions</h2>
            <p>
              The terms <strong>Hamsini Silks</strong>, <strong>"We"</strong>,
              <strong>"Us"</strong>, or <strong>"Our"</strong> refer to the owner
              of this website. The term <strong>"You"</strong> refers to the user
              or viewer of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Website Usage</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The content of this website is for general information and skill
                development purposes only and is subject to change without
                notice.
              </li>
              <li>
                We do not provide any warranty or guarantee regarding accuracy,
                completeness, or suitability of the content.
              </li>
              <li>
                Your use of any information or materials on this website is
                entirely at your own risk.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Skill-Based Content Disclaimer
            </h2>
            <p>
              Hamisni Skills provides educational and skill-development content.
              We are not responsible for outcomes, job placements, or business
              results arising from the use of our learning materials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Intellectual Property
            </h2>
            <p>
              This website contains material owned by or licensed to Hamisni
              Skills, including design, layout, graphics, and content.
              Reproduction is prohibited without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Unauthorized Use
            </h2>
            <p>
              Unauthorized use of this website may give rise to a claim for
              damages and/or be a criminal offense under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. External Links</h2>
            <p>
              Our website may contain links to third-party websites for
              additional resources. We do not endorse or take responsibility
              for the content of those websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Linking Policy</h2>
            <p>
              You may not create a link to this website from another website or
              document without prior written consent from Hamisni Skills.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
            <p>
              Your use of this website and any dispute arising out of such use is
              subject to the laws of India or other applicable regulatory
              authorities.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
