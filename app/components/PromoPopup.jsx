// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiX, FiTag, FiShoppingBag } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import api from "../utils/apiInstance";

// export default function PromoPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

// useEffect(() => {
//   const timer = setTimeout(() => {
//     setIsOpen(true);
//   }, 2500);

//   return () => clearTimeout(timer);
// }, []);

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleShopNow = () => {
//     setIsOpen(false);
//     router.push("/collections");
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
//         >
//           {/* Backdrop */}
//           <motion.div
//             className="absolute inset-0"
//             onClick={handleClose}
//           />

//           {/* Popup Content */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0, y: 50 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.8, opacity: 0, y: 50 }}
//             transition={{ type: "spring", duration: 0.5 }}
//             className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
//           >
//             {/* Close Button */}
//             <button
//               onClick={handleClose}
//               className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
//             >
//               <FiX className="w-5 h-5 text-gray-700" />
//             </button>

//             <div className="flex flex-col md:flex-row">
//               {/* Left Side - Image */}
//               <div className="md:w-1/2 bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#C4A962] p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
//                 {/* Decorative Elements */}
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                   className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
//                 />
//                 <motion.div
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//                   className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"
//                 />

//                 {/* Content */}
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.3, type: "spring" }}
//                   className="relative z-10 text-center"
//                 >
//                   <FiTag className="w-16 h-16 mx-auto mb-4" />
                  
//                   <motion.h2
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-4xl md:text-5xl font-bold mb-2"
//                   >
//                     MEGA SALE
//                   </motion.h2>
                  
//                   <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="text-6xl md:text-7xl font-extrabold mb-2"
//                   >
//                     30% OFF
//                   </motion.div>
                  
//                   <motion.p
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                     className="text-lg opacity-90"
//                   >
//                     On Premium Silk Sarees
//                   </motion.p>
//                 </motion.div>

//                 {/* Floating Icons */}
//                 <motion.div
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="absolute top-20 left-8"
//                 >
//                   <FiShoppingBag className="w-8 h-8 opacity-30" />
//                 </motion.div>
//                 <motion.div
//                   animate={{ y: [0, -15, 0] }}
//                   transition={{ duration: 2.5, repeat: Infinity }}
//                   className="absolute bottom-32 right-8"
//                 >
//                   <FiShoppingBag className="w-6 h-6 opacity-30" />
//                 </motion.div>
//               </div>

//               {/* Right Side - Details */}
//               <div className="md:w-1/2 p-8 flex flex-col justify-center">
//                 <motion.div
//                   initial={{ x: 50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                     Exclusive Offer Just For You!
//                   </h3>
                  
//                   <p className="text-gray-600 mb-6 leading-relaxed">
//                     Discover our exquisite collection of handcrafted silk sarees. 
//                     Limited time offer on premium Kanjivaram, Banarasi, and Designer sarees.
//                   </p>

//                   <div className="space-y-3 mb-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-2 h-2 bg-[#C4A962] rounded-full"></div>
//                       <span className="text-gray-700">Free Shipping on orders above ₹5000</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-2 h-2 bg-[#C4A962] rounded-full"></div>
//                       <span className="text-gray-700">Authentic handloom sarees</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-2 h-2 bg-[#C4A962] rounded-full"></div>
//                       <span className="text-gray-700">Easy returns within 7 days</span>
//                     </div>
//                   </div>

//                   {/* <div className="bg-[#F5F5DC] border-l-4 border-[#8B4513] p-4 mb-6 rounded">
//                     <p className="text-sm text-gray-700">
//                       <span className="font-semibold">Use Code:</span>{" "}
//                       <span className="font-bold text-[#8B4513] text-lg">SILK30</span>
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Valid till end of this month
//                     </p>
//                   </div> */}
//                   <button
//                     onClick={handleShopNow}
//                     className="w-full bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
//                   >
//                     <FiShoppingBag className="w-5 h-5" />
//                     Shop Now
//                   </button>
//                   <button
//                     onClick={handleClose}
//                     className="w-full mt-3 text-gray-500 hover:text-black-700 text-sm transition-colors"
//                   >
//                     Maybe Later
//                   </button>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiX, FiTag, FiShoppingBag } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import api from "../utils/apiInstance";

// export default function PromoPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [banner, setBanner] = useState(null);
//   const router = useRouter();
//   // Fetch Banner API
//   useEffect(() => {
//     const fetchBanner = async () => {
//       try {
//         const res = await api.get("/ecom/active-banner");

//         if (res.data?.success) {
//           const bannerData = res.data.data;

//           const now = new Date();
//           const start = new Date(bannerData.start_date);
//           const end = new Date(bannerData.end_date);

//           if (now >= start && now <= end) {
//             setBanner(bannerData);

//             setTimeout(() => {
//               setIsOpen(true);
//             }, 2500);
//           }
//         }
//       } catch (error) {
//         console.error("Banner API Error:", error);
//       }
//     };

//     fetchBanner();
//   }, []);

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   // const handleShopNow = () => {
//   //   setIsOpen(false);
//   //     router.push("/collections");
//   //   if (banner?.button_link) {
//   //     router.push(banner.button_link);
//   //   } else {
//   //     router.push("/collections");
//   //   }
//   // };

//   const handleShopNow=()=>{
//      setIsOpen(false);
//    router.push("/collections");

//   }

//   if (!banner) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
//         >
//           {/* Backdrop */}
//           <motion.div
//             className="absolute inset-0"
//             onClick={handleClose}
//           />

//           {/* Popup Content */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0, y: 50 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.8, opacity: 0, y: 50 }}
//             transition={{ type: "spring", duration: 0.5 }}
//             className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
//           >
//             {/* Close Button */}
//             <button
//               onClick={handleClose}
//               className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
//             >
//               <FiX className="w-5 h-5 text-gray-700" />
//             </button>

//             <div className="flex flex-col md:flex-row">
//               {/* Left Side - Gradient Background */}
//               <div className="md:w-1/2 bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#C4A962] p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
                
//                 {/* Decorative Rotating Elements */}
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                   className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
//                 />
//                 <motion.div
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//                   className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"
//                 />

//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.3, type: "spring" }}
//                   className="relative z-10 text-center"
//                 >
//                   <FiTag className="w-16 h-16 mx-auto mb-4" />

//                   <motion.h2
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-4xl md:text-5xl font-bold mb-2"
//                   >
//                     {banner.title}
//                   </motion.h2>

//                   <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="text-6xl md:text-7xl font-extrabold mb-2"
//                   >
//                     {banner.subtitle}
//                   </motion.div>

//                   <motion.p
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                     className="text-lg opacity-90"
//                   >
//                     {banner.description}
//                   </motion.p>
//                 </motion.div>

//                 {/* Floating Icons */}
//                 <motion.div
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="absolute top-20 left-8"
//                 >
//                   <FiShoppingBag className="w-8 h-8 opacity-30" />
//                 </motion.div>
//                 <motion.div
//                   animate={{ y: [0, -15, 0] }}
//                   transition={{ duration: 2.5, repeat: Infinity }}
//                   className="absolute bottom-32 right-8"
//                 >
//                   <FiShoppingBag className="w-6 h-6 opacity-30" />
//                 </motion.div>
//               </div>

//               {/* Right Side */}
//               <div className="md:w-1/2 p-8 flex flex-col justify-center">
//                 <motion.div
//                   initial={{ x: 50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                     Exclusive Offer Just For You!
//                   </h3>

//                   <p className="text-gray-600 mb-6 leading-relaxed">
//                     {banner.description}
//                   </p>

//                   <button
//                     onClick={handleShopNow}
//                     className="w-full bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
//                   >
//                     <FiShoppingBag className="w-5 h-5" />
//                     {banner.button_text || "Shop Now"}
//                   </button>

//                   <button
//                     onClick={handleClose}
//                     className="w-full mt-3 text-gray-500 hover:text-black-700 text-sm transition-colors"
//                   >
//                     Maybe Later
//                   </button>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTag, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";
import api from "../utils/apiInstance";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [banner, setBanner] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await api.get("/ecom/active-banner");

        if (res.data?.success) {
          const bannerData = res.data.data;

          const now = new Date();
          const start = new Date(bannerData.start_date);
          const end = new Date(bannerData.end_date);

          if (now >= start && now <= end) {
            setBanner(bannerData);

            setTimeout(() => {
              setIsOpen(true);
            }, 2500);
          }
        }
      } catch (error) {
        // Banner API Error
      }
    };

    fetchBanner();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleShopNow = () => {
    setIsOpen(false);
    router.push("/collections");
  };

  if (!banner) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <motion.div
            className="absolute inset-0"
            onClick={handleClose}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
            >
              <FiX className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex flex-col md:flex-row">
              
              {/* Left Side */}
              <div className="md:w-1/2 bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#C4A962] p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"
                />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="relative z-10 text-center"
                >
                  <FiTag className="w-16 h-16 mx-auto mb-4" />

                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-5xl font-bold mb-2"
                  >
                    {banner.title}
                  </motion.h2>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-6xl md:text-7xl font-extrabold mb-2"
                  >
                    {banner.subtitle}
                  </motion.div>

                </motion.div>
              </div>

              {/* Right Side */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Exclusive Offer Just For You!
                  </h3>

                  {/* ✅ HTML Description Rendering */}
                  <div
                    className="text-gray-600 mb-6 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: banner.description,
                    }}
                  />

                  <button
                    onClick={handleShopNow}
                    className="w-full bg-gradient-to-r from-[#8B4513] to-[#C4A962] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <FiShoppingBag className="w-5 h-5" />
                    {banner.button_text || "Shop Now"}
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full mt-3 text-gray-500 hover:text-black-700 text-sm transition-colors"
                  >
                    Maybe Later
                  </button>

                </motion.div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}