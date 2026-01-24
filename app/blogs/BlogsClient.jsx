"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { blogs } from "./blogData";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaSkype,
  FaVk,
} from "react-icons/fa";


export default function BlogsClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("post");
  const blog = blogs.find((b) => b.slug === slug);

  /* ================= BLOG DETAIL VIEW ================= */
  if (blog) {
    return (
      <>
        {/* SEO STRUCTURED DATA */}
        <Script
          id="blog-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              image: blog.heroImage,
              author: {
                "@type": "Organization",
                name: "Hamsini Silks",
              },
              publisher: {
                "@type": "Organization",
                name: "Hamsini Silks",
              },
              datePublished: blog.date,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://yourdomain.com/blogs?post=${blog.slug}`,
              },
            }),
          }}
        />

        <article className="max-w-6xl mx-auto px-6 py-14 text-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="overflow-hidden">
              <Image
                src={blog.heroImage}
                alt={blog.title}
                width={900}
                height={1200}
                className="transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div>
              <h1 className="text-3xl font-semibold mb-4">
                {blog.title}
              </h1>

              <p className="text-sm italic text-gray-500 mb-6">
                {blog.date} · {blog.author}
              </p>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
{/* SOCIAL SHARE */}
<div className="mt-10 border-t border-b py-6">
  <div className="flex justify-center gap-6 text-gray-700">
    <a
      href={`https://twitter.com/intent/tweet?url=https://yourdomain.com/blogs?post=${blog.slug}`}
      target="_blank"
      aria-label="Share on Twitter"
      className="hover:text-black"
    >
      <FaTwitter size={18} />
    </a>

    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com/blogs?post=${blog.slug}`}
      target="_blank"
      aria-label="Share on Facebook"
      className="hover:text-black"
    >
      <FaFacebookF size={18} />
    </a>

    <a
      href={`https://vk.com/share.php?url=https://yourdomain.com/blogs?post=${blog.slug}`}
      target="_blank"
      aria-label="Share on VK"
      className="hover:text-black"
    >
      <FaVk size={18} />
    </a>

    <a
      href={`https://pinterest.com/pin/create/button/?url=https://yourdomain.com/blogs?post=${blog.slug}&media=${blog.heroImage}&description=${blog.title}`}
      target="_blank"
      aria-label="Share on Pinterest"
      className="hover:text-black"
    >
      <FaPinterestP size={18} />
    </a>

    <a
      href={`mailto:?subject=${blog.title}&body=https://yourdomain.com/blogs?post=${blog.slug}`}
      aria-label="Share via Email"
      className="hover:text-black"
    >
      <FaEnvelope size={18} />
    </a>

    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=https://yourdomain.com/blogs?post=${blog.slug}`}
      target="_blank"
      aria-label="Share on LinkedIn"
      className="hover:text-black"
    >
      <FaLinkedinIn size={18} />
    </a>

    <a
      href={`https://wa.me/?text=https://yourdomain.com/blogs?post=${blog.slug}`}
      target="_blank"
      aria-label="Share on WhatsApp"
      className="hover:text-black"
    >
      <FaWhatsapp size={18} />
    </a>

    <a
      href={`https://web.skype.com/share?url=https://yourdomain.com/blogs?post=${blog.slug}`}
      target="_blank"
      aria-label="Share on Skype"
      className="hover:text-black"
    >
      <FaSkype size={18} />
    </a>
  </div>
</div>

          {/* COMMENTS */}
          <section className="mt-20">
            <h3 className="text-xl font-semibold mb-4">
              Leave a Reply
            </h3>

            <form className="space-y-4">
              <textarea className="w-full border p-3" rows={4} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input className="border p-2" placeholder="Your name" />
                <input className="border p-2" placeholder="Your email" />
                <input className="border p-2" placeholder="Your website" />
              </div>
              <button className="bg-green-700 text-white px-6 py-2">
                Post Comment
              </button>
            </form>

            <Link
              href="/blogs"
              className="inline-block mt-8 underline text-green-700"
            >
              ← Back to Blogs
            </Link>
          </section>
        </article>
      </>
    );
  }

  /* ================= BLOG LIST VIEW ================= */
  return (
    <main className="max-w-7xl mx-auto px-6 py-14 text-black">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-600">
          Blogs
        </h1>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs?post=${blog.slug}`}
            className="group"
          >
            <div className="overflow-hidden">
              <Image
                src={blog.heroImage}
                alt={blog.title}
                width={800}
                height={1000}
                className="transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">
                {blog.title}
              </h2>
              <p className="text-sm italic text-gray-500">
                {blog.date}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
