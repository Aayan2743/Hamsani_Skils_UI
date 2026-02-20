// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true, // ✅ Skip TS errors if any
//   },
//   output: "export", // ✅ Enables static export (creates /out)
//   images: {
//     unoptimized: true, // ✅ Prevents image optimization error on static hosting
//   },
//   trailingSlash: true, // ✅ Ensures every route like /admin → /admin/index.html
//   // allowedDevOrigins: ['192.168.1.5'], // ✅ Allow network access during development
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TS errors if any
  },
  output: "export", // ✅ Enables static export (creates /out)
  images: {
    unoptimized: true, // ✅ Prevents image optimization error on static hosting
  },
  trailingSlash: true, // ✅ Ensures every route like /admin → /admin/index.html
};

module.exports = nextConfig;

