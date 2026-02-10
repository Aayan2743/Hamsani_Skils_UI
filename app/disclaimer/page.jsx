import Image from "next/image";

/* SEO Metadata */
export const metadata = {
  title: "Disclaimer | Hamisni Skills",
  description:
    "Read the disclaimer of Hamisni Skills. Understand the limitations, responsibilities, and usage guidelines for our skill development and learning platform.",
  keywords: [
    "Hamisni Skills Disclaimer",
    "Skill Learning Disclaimer",
    "Online Education Disclaimer",
    "Hamisni Skills Terms",
  ],
  openGraph: {
    title: "Disclaimer | Hamisni Skills",
    description:
      "Hamisni Skills disclaimer outlining content usage, responsibilities, and limitations.",
    images: ["/about.webp"],
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="bg-white text-gray-800">
      <section className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Page Heading */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-3">
            Disclaimer
          </h1>
          <p className="text-sm tracking-widest text-gray-500">
            HAMISNI SKILLS
          </p>
        </header>

        {/* Image */}
        <figure className="flex justify-center mb-10">
          <Image
            src="/about.webp"
            alt="Hamisni Skills learning and professional development"
            width={700}
            height={420}
            className="rounded-lg object-cover"
            priority
          />
        </figure>

        {/* Content */}
        <article className="max-w-5xl mx-auto text-[15px] leading-7 space-y-6">
          <p>
            <strong>Hamisni Skills</strong> provides educational content, training
            materials, and skill-development resources for general learning
            purposes only. All information on this website is published in good
            faith and is intended to support personal and professional growth.
          </p>

          <p>
            While we strive to keep our content accurate and up to date, Hamisni
            Skills makes no warranties regarding the completeness, reliability,
            or accuracy of the information provided. Any action you take based
            on the content of this website is strictly at your own risk.
          </p>

          <p>
            Hamisni Skills does not guarantee job placements, business success,
            income generation, or professional outcomes from the use of our
            courses, tutorials, or learning resources.
          </p>

          <p>
            The website may contain links to external resources or third-party
            platforms. We do not control or endorse the content, nature, or
            availability of those websites and are not responsible for any loss
            or damage arising from their use.
          </p>

          <p>
            Any examples, case studies, or success stories shared on Hamisni
            Skills are for informational purposes only and should not be
            considered as assured results.
          </p>

          <p>
            By using our website, you hereby consent to this disclaimer and
            agree to its terms.
          </p>

          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
            “Hamisni Skills is committed to empowering learners, while
            encouraging responsible and informed usage of educational content.”
          </blockquote>
        </article>
      </section>
    </main>
  );
}
