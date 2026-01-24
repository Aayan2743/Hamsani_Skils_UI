// // import Image from "next/image";
// // import Link from "next/link";

// // /* =======================
// //    BLOG DATA (HAMSINI SILKS)
// // ======================= */
// // const blogs = [
// //   {
// //     slug: "celebrate-with-hamsini-silks",
// //     title: "Celebrate Every Occasion with Hamsini Silks",
// //     date: "August 18, 2024",
// //     author: "Hamsini Silks",
// //     image: "/images/blog1.jpg",
// //     excerpt:
// //       "From bridal grandeur to everyday elegance, Hamsini Silks offers pure silk sarees crafted with tradition, quality, and timeless beauty.",
// //   },
// //   {
// //     slug: "art-of-pure-silk-sarees",
// //     title: "The Art of Pure Silk Sarees at Hamsini Silks",
// //     date: "July 02, 2024",
// //     author: "Hamsini Silks",
// //     image: "/images/blog2.jpg",
// //     excerpt:
// //       "Every saree at Hamsini Silks reflects skilled craftsmanship, rich zari work, and the legacy of authentic Indian handlooms.",
// //   },
// //   {
// //     slug: "festive-collections-hamsini-silks",
// //     title: "Festive Collections by Hamsini Silks",
// //     date: "October 10, 2023",
// //     author: "Hamsini Silks",
// //     image: "/images/blog3.jpg",
// //     excerpt:
// //       "Celebrate festivals in style with Hamsini Silks’ vibrant festive silk sarees designed for grace and grandeur.",
// //   },
// // ];

// // /* =======================
// //    PAGE METADATA (SEO)
// // ======================= */
// // export const metadata = {
// //   title: "Blogs | Hamsini Silks",
// //   description:
// //     "Explore blogs by Hamsini Silks on pure silk sarees, bridal collections, festive wear, and traditional craftsmanship.",
// // };

// // /* =======================
// //    BLOGS PAGE
// // ======================= */
// // export default function BlogsPage() {
// //   return (
// //     <main className="container mx-auto px-4 py-10">
// //       {/* Breadcrumb */}
// //       <nav className="text-sm text-gray-500 mb-6">
// //         <span>Home</span>
// //         <span className="mx-2">›</span>
// //         <span>Blogs</span>
// //       </nav>

// //       {/* Page Title */}
// //       <h1 className="text-3xl font-semibold mb-10">Blogs</h1>

// //       <div className="flex flex-col lg:flex-row gap-12">
// //         {/* ================= SIDEBAR ================= */}
// //         <aside className="w-full lg:w-1/4">
// //           <h3 className="uppercase font-bold text-sm mb-4">Blogs</h3>

// //           <h4 className="uppercase text-xs font-bold tracking-wider mb-4">
// //             Our Articles
// //           </h4>

// //           <ul className="space-y-4 text-sm">
// //             {blogs.map((blog) => (
// //               <li key={blog.slug}>
// //                 <Link
// //                   href={`/blogs/${blog.slug}`}
// //                   className="hover:underline"
// //                 >
// //                   {blog.title}
// //                 </Link>
// //                 <p className="text-gray-400 italic">{blog.date}</p>
// //               </li>
// //             ))}
// //           </ul>
// //         </aside>

// //         {/* ================= BLOG GRID ================= */}
// //         <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:w-3/4">
// //           {blogs.map((blog) => (
// //             <article key={blog.slug} className="bg-white">
// //               <Link href={`/blogs/${blog.slug}`} className="block">
// //                 <div className="relative aspect-square overflow-hidden">
// //                   <Image
// //                     src={blog.image}
// //                     alt={blog.title}
// //                     fill
// //                     className="object-cover transition-transform duration-500 hover:scale-105"
// //                   />
// //                 </div>
// //               </Link>

// //               <div className="pt-4">
// //                 <h2 className="text-lg font-semibold text-gray-900 leading-snug">
// //                   <Link href={`/blogs/${blog.slug}`}>
// //                     {blog.title}
// //                   </Link>
// //                 </h2>

// //                 <p className="text-sm italic text-gray-400 mt-1">
// //                   {blog.date} · {blog.author} · 0 Comments
// //                 </p>

// //                 <p className="text-sm text-gray-600 mt-3">
// //                   {blog.excerpt}
// //                 </p>
// //               </div>
// //             </article>
// //           ))}
// //         </section>
// //       </div>
// //     </main>
// //   );
// // }






// import Image from "next/image";
// import Link from "next/link";
// import { blogs } from "./blogData";

// export const metadata = {
//   title: "Blogs | Hamsini Silks",
//   description:
//     "Explore Hamsini Silks blogs on pure silk sarees, bridal collections, festive wear, and timeless craftsmanship.",
//   alternates: {
//     canonical: "https://yourdomain.com/blogs",
//   },
// };

// export default function BlogsPage() {
//   return (
//     <main className="max-w-7xl mx-auto px-6 py-14 text-black">
//       <section className="text-center text-white">
//         <h1 className="text-4xl font-bold text-red-600">Blogs</h1>
//       </section>

//       <section className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-16">
//         {blogs.map((blog) => (
//           <Link
//             key={blog.slug}
//             href={`/blogs/blog?post=${blog.slug}`}
//             className="group"
//           >
//             <div className="overflow-hidden">
//               <Image
//                 src={blog.heroImage}
//                 alt={blog.title}
//                 width={800}
//                 height={1000}
//                 className="transition-transform duration-700 group-hover:scale-110"
//               />
//             </div>

//             <div className="mt-6">
//               <h2 className="text-xl font-semibold">{blog.title}</h2>
//               <p className="text-sm italic text-gray-500">{blog.date}</p>
//             </div>
//           </Link>
//         ))}
//       </section>
//     </main>
//   );
// }










// import BlogsClient from "./BlogsClient";

// export const metadata = {
//   title: "Blogs | Hamsini Silks",
//   description:
//     "Explore Hamsini Silks blogs on pure silk sarees, bridal collections, festive wear, and timeless craftsmanship.",
//   alternates: {
//     canonical: "https://yourdomain.com/blogs",
//   },
// };

// export default function BlogsPage() {
//   return <BlogsClient />;
// }




import { Suspense } from "react";
import BlogsClient from "./BlogsClient";

export const metadata = {
  title: "Blogs | Hamsini Silks",
  description:
    "Explore Hamsini Silks blogs on pure silk sarees, bridal collections, festive wear, and timeless craftsmanship.",
  alternates: {
    canonical: "https://yourdomain.com/blogs",
  },
};

export default function BlogsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading blogs...</div>}>
      <BlogsClient />
    </Suspense>
  );
}
