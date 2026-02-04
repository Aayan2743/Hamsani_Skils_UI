import Image from "next/image";

/* SEO Metadata */
export const metadata = {
  title: "Who We Are | Hamsini Silks – Timeless Handloom Heritage",
  description:
    "Learn about Hamsini Silks, a brand rooted in traditional handloom weaving, offering authentic silk sarees crafted with heritage, quality, and innovation.",
  keywords: [
    "Hamsini Silks",
    "Handloom Silk Sarees",
    "Traditional Silk Sarees",
    "South Indian Silk Sarees",
    "Kanjivaram Sarees",
    "Pure Silk Sarees",
  ],
  openGraph: {
    title: "Who We Are | Hamsini Silks",
    description:
      "Hamsini Silks celebrates the legacy of handloom weaving through authentic silk sarees and timeless craftsmanship.",
    images: ["/who-we-are.jpg"],
    type: "website",
  },
};

export default function WhoWeArePage() {
  return (
    <main className="bg-white text-[#1a1a1a]">
    <section className=" py-10 text-center text-white">
  <h1 className="text-4xl font-bold text-red-600 font-sans">About Us</h1>
</section>

      <section className="max-w-7xl mx-auto px-10 ">

  {/* Page Heading */}
  <header className="text-center">
    <h1 className="text-sm tracking-[0.25em] font-semibold mb-4 font-sans">
      WHO WE ARE
    </h1>
  </header>

  {/* Image */}
  <figure className="mb-6 flex justify-center">
    <Image
      src="/about.webp"
      alt="Hamsini Silks handloom heritage and founder legacy"
      width={600}
      height={400}
      className="object-cover"
      priority
    />
  </figure>

  {/* Content */}
  <article className="max-w-5xl mx-auto text-[15px] leading-7 space-y-6 font-sans">
   <p>
            <strong>Hamsini Silks</strong> is a celebration of India’s rich
            handloom tradition, built on a deep respect for craftsmanship,
            heritage, and authenticity. Our journey is inspired by generations
            of skilled weavers who have preserved the timeless art of silk
            weaving.
          </p>

          <p>
            Rooted in traditional weaving communities of South India, Hamsini
            Silks began with a vision to bring pure, handwoven silk sarees to
            discerning customers who value quality and tradition. Every saree
            we create reflects cultural elegance and meticulous artistry.
          </p>

          <p>
            With a strong foundation in handloom manufacturing, Hamsini Silks
            blends age-old weaving techniques with contemporary design
            sensibilities. This approach has helped us craft sarees that appeal
            to both traditional and modern tastes while staying true to our
            roots.
          </p>

          <p>
            Over the years, Hamsini Silks has grown into a trusted name,
            recognized for its commitment to purity, intricate designs, and
            superior craftsmanship. Our collections include classic silks,
            bridal sarees, and exclusive handloom creations that stand the test
            of time.
          </p>

          <p>
            Innovation plays an important role at Hamsini Silks. Our design team
            works closely with master weavers to create unique patterns, rich
            textures, and elegant color palettes, ensuring every saree tells a
            story of tradition and refinement.
          </p>

          <p>
            To serve our customers better, Hamsini Silks embraces modern retail
            channels, including online platforms and social media, making our
            handcrafted sarees accessible to customers across India and beyond.
          </p>

          <p>
            Today, Hamsini Silks continues its journey with a commitment to
            excellence, authenticity, and customer satisfaction. Our growth is
            driven by the trust of our customers and our dedication to preserving
            the legacy of Indian handloom weaving.
          </p>

          <blockquote className="italic">
            “At Hamsini Silks, every saree is woven with tradition, passion, and
            a promise of timeless elegance.”
          </blockquote>

  </article>

</section>

    </main>
  );
}
