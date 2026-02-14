
// import "./globals.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { Cardo } from "next/font/google";
// import { AuthProvider } from "./components/context/AuthProvider";
// import {CartProvider} from "./providers/CartProvider"; // ✅ default import
// import { Toaster } from "react-hot-toast";
// import {WishlistProvider} from"./components/WishlistContext";

// export const metadata = {
//   title: "Hamsini Silk sarees India Pvt Ltd",
  
// };

// const cardo = Cardo({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   display: "swap",
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={cardo.className}>
//       <body>
//         <AuthProvider>
//           <CartProvider>
//              <WishlistProvider>
//             <Header />
//             <main className="min-h-[60vh]">{children}</main>
//             <Footer />
//              </WishlistProvider>
//           </CartProvider>
//         </AuthProvider>
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 2000,
//             style: {
//               fontSize: "14px",
//             },
//           }}
//         />
//       </body>
//     </html>
//   );
// }

// import "./globals.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { Source_Sans_3 } from "next/font/google";
// import { AuthProvider } from "./components/context/AuthProvider";
// import { CartProvider } from "./providers/CartProvider";
// import { Toaster } from "react-hot-toast";
// import { WishlistProvider } from "./components/WishlistContext";

// export const metadata = {
//   title: "Hamsini Silk sarees India Pvt Ltd",
// };

// const sourceSans = Source_Sans_3({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   display: "swap",
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={sourceSans.className}>
//       <body>
//         <AuthProvider>
//           <CartProvider>
//             <WishlistProvider>
//               <Header className="font-sans" />
//               <main className="min-h-[60vh]">{children}</main>
//               <Footer  className="bg-[#232323] text-[#f8f8f8] font-sans"/>
//             </WishlistProvider>
//           </CartProvider>
//         </AuthProvider>

//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 2000,
//             style: {
//               fontSize: "14px",
//             },
//           }}
//         />
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import "./globals-responsive.css";
import HeaderNew from "./components/HeaderNew";
import Footer from "./components/Footer";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import { AuthProvider } from "./components/context/AuthProvider";
import { CartProvider } from "./providers/CartProvider";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "./components/WishlistContext";
import Script from "next/script";
import ClientPrefetch from "./components/ClientPrefetch";
import { SocialMediaProvider } from "./components/context/SocialMediaContext";

export const metadata = {
  title: "Hamsini Silks",
};

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-playfair" suppressHydrationWarning>{/* Apply Playfair Display globally */}
        {/* ✅ Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SocialMediaProvider>
              <ClientPrefetch />
              <HeaderNew />
              <main className="min-h-[60vh]">{children}</main>
              <Footer className="bg-[#232323] text-[#f8f8f8]" />
              </SocialMediaProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}

