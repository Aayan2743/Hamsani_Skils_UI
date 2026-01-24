// 'use client';

// import Image from 'next/image';

// export default function SoftSilkBanner() {
//   return (
//     <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
//       {/* Desktop Image */}
//       <div className="hidden md:block absolute inset-0">
//         <Image
//           src="/softsilk_saree.webp"
//           alt="Soft Silk Sarees"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div>

//       {/* Mobile Image */}
//       <div className="md:hidden absolute inset-0">
//         <Image
//           src="/softsilk_saree_mobile_view.webp"
//           alt="Soft Silk Sarees Mobile"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div>

//       {/* Overlay Content */}
//       <div className="absolute inset-0 flex items-center">
//         <div className="w-full px-6 md:px-20">
//           <div className="max-w-md text-white">
//             <h1 className="uppercase font-semibold tracking-widest text-2xl md:text-3xl mb-4">
//               Softsilk
//             </h1>

//             <p className="text-sm md:text-base leading-relaxed mb-8">
//               Soft Silk Sarees blend lightweight comfort with timeless elegance,
//               featuring vibrant hues and intricate zari work—perfect for any
//               occasion.
//             </p>

//             <a
//               href="/collections/soft-silk"
//               className="inline-flex items-center justify-center bg-white text-black uppercase tracking-wider text-sm font-medium px-12 py-3 transition hover:bg-black hover:text-white"
//             >
//               Shop Now
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }









'use client';

import Image from 'next/image';

export default function SoftSilkHero() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap');
        html,
        body {
          font-family: 'Cardo', serif;
        }
      `}</style>

      <section className="relative w-full h-[38vh] md:h-[70vh] overflow-hidden ">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/softsilk_saree.webp"
            alt="Softsilk Sarees"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Mobile Image */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/softsilk_saree_mobile_view.webp"
            alt="Softsilk Sarees Mobile"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 md:px-20">
          <div className="max-w-xl text-white text-center md:text-left">
            <h1 className="uppercase tracking-[0.3em] font-bold text-3xl md:text-4xl mb-4 relative inline-block">
              SOFTSILK
              <span className="block w-12 h-[2px] bg-white mt-2 mx-auto md:mx-0"></span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-8">
              Soft Silk Sarees blend lightweight comfort with timeless elegance,
              featuring vibrant hues and intricate zari work—perfect for any
              occasion.
            </p>

            <a
              href="/collections/?category=soft-silk"
              className="inline-block bg-white text-black uppercase tracking-widest font-bold px-12 py-2 border border-black transition hover:bg-black hover:text-white"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
