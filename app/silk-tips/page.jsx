import Image from "next/image";

/* SEO Metadata */
export const metadata = {
  title: "Safety & Skill Tips | Hamisni Skills",
  description:
    "Discover essential safety and skill development tips from Hamisni Skills. Learn best practices for online learning, professional growth, and career success.",
  keywords: [
    "Hamisni Skills",
    "Skill Development Tips",
    "Learning Safety Tips",
    "Online Education Best Practices",
    "Professional Skills Training",
  ],
  openGraph: {
    title: "Safety & Skill Tips | Hamisni Skills",
    description:
      "Best practices and safety tips for effective skill development and online learning with Hamisni Skills.",
    images: ["/skills-tips.webp"],
    type: "website",
  },
};

export default function SafetySkillsTipsPage() {
  return (
    <main className="bg-[#faf7f4] text-gray-800">
      <section className="max-w-6xl mx-auto px-6 py-14">

        {/* Page Heading */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-3">
            Safety & Skill Tips
          </h1>
          <p className="text-sm tracking-widest text-gray-500 uppercase">
            Hamisni Skills
          </p>
        </header>

        {/* Optional Image Section */}
        <div className="flex justify-center mb-14">
          <Image
            src="/skills-tips.webp"
            alt="Hamisni Skills learning safety and professional tips"
            width={500}
            height={600}
            className="rounded-lg shadow-sm"
            priority
          />
        </div>

   

      </section>
    </main>
  );
}
