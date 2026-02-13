// "use client";
// import { motion } from "framer-motion";
// import { fadeIn, fadeInUp } from "../../utils/animations.js";
// import Link from "next/link";

// export default function HeroSectionNew() {
//   return (
//     <motion.section
//       initial="hidden"
//       animate="visible"
//       variants={fadeIn}
//       className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-[#8B4513] to-[#5D2E1F]"
//     >
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img
//           src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
//           alt="Elegant Silk Sarees"
//           className="w-full h-full object-cover opacity-60"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 h-full flex items-center">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           <motion.div
//             variants={fadeInUp}
//             className="max-w-2xl text-white"
//           >
//             <motion.p
//               variants={fadeInUp}
//             className="text-3xl md:text-4xl font-normal text-[#2C1810] mb-2"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               Timeless Elegance
//             </motion.p>

//             <motion.p
//               variants={fadeInUp}
//    className="text-3xl md:text-4xl font-normal text-[#2C1810] mb-2"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               The Art of<br />
//               Handwoven<br />
//               Elegance
//               {/* <h2 
//               className="text-3xl md:text-4xl font-normal text-[#2C1810] mb-2"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               New Arrivals
//             </h2> */}
//             </motion.p>

//             <motion.p
//               variants={fadeInUp}
//               className="text-base md:text-lg mb-8 text-gray-200 max-w-xl leading-relaxed"
//             >
//               Discover our exquisite collection of handcrafted silk sarees,
//               where tradition meets contemporary elegance.
//             </motion.p>

//             <motion.div
//               variants={fadeInUp}
//               className="flex flex-wrap gap-4"
//             >
//               <Link
//                 href="/collections"
//                 className="bg-white text-[#8B4513] px-8 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors duration-300"
//               >
//                 SHOP COLLECTION
//               </Link>

//               <Link
//                 href="/about"
//                 className="border-2 border-white text-white px-8 py-3 rounded-sm font-semibold hover:bg-white hover:text-[#8B4513] transition-all duration-300"
//               >
//                 OUR STORY
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Decorative Element */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F5DC] to-transparent" />
//     </motion.section>
//   );
// }


"use client";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "../../utils/animations.js";
import Link from "next/link";

export default function HeroSectionNew() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-[#8B4513] to-[#5D2E1F]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
          alt="Elegant Silk Sarees"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={fadeInUp}
            className="max-w-xl text-white"
          >
            {/* Small Heading */}
            <motion.h2
              variants={fadeInUp}
              className="text-xl md:text-2xl font-normal mb-3 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Timeless Elegance
            </motion.h2>

            {/* Main Heading */}
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-normal mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Art of <br />
              Handwoven <br />
              Elegance
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base mb-8 text-gray-200 max-w-lg leading-relaxed"
            >
              Discover our exquisite collection of handcrafted silk sarees,
              where tradition meets contemporary elegance.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/collections"
                className="bg-white text-[#8B4513] px-6 py-2 rounded-sm font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                SHOP COLLECTION
              </Link>

              <Link
                href="/about"
                className="border border-white text-white px-6 py-2 rounded-sm font-semibold hover:bg-white hover:text-[#8B4513] transition-all duration-300"
              >
                OUR STORY
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F5DC] to-transparent" />
    </motion.section>
  );
}

