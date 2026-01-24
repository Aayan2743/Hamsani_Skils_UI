
// // app/layout.jsx
// import "./globals.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { AuthProvider } from "./components/context/AuthProvider";
// import CartProvider from "./providers/CartProvider";
// import {ProductFilterProvider} from "./providers/ProductFilterProvider"
// export const metadata = {
//   title: "PSR Silk sarees India Pvt Ltd",
  
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           <CartProvider>
//             <ProductFilterProvider> 
//             <Header />
//             <main className="min-h-[60vh]">{children}</main>
//             <Footer />
//             </ProductFilterProvider> 
//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }



// app/layout.jsx
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cardo } from "next/font/google";
import { AuthProvider } from "./components/context/AuthProvider";
import {CartProvider} from "./providers/CartProvider"; // ✅ default import
import { Toaster } from "react-hot-toast";
import {WishlistProvider} from"./components/WishlistContext";

export const metadata = {
  title: "Hamsini Silk sarees India Pvt Ltd",
  
};

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cardo.className}>
      <body>
        <AuthProvider>
          <CartProvider>
             <WishlistProvider>
            <Header />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
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
