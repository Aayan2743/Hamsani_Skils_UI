

// "use client";

// import { useRef } from "react";

// export default function Map() {
//   const sliderRef = useRef(null);

//   const images = [
//     "https://www.psrsilks.com/cdn/shop/files/t1.webp?v=1742362090",
//     "https://www.psrsilks.com/cdn/shop/files/t3.webp?v=1742362146",
//     "https://www.psrsilks.com/cdn/shop/files/t4.webp?v=1742362166",
//     "https://www.psrsilks.com/cdn/shop/files/t5.webp?v=1742362198",
//     "https://www.psrsilks.com/cdn/shop/files/t6.webp?v=1742362217",
//   ];

//   const scroll = (dir) => {
//     sliderRef.current.scrollBy({
//       left: dir === "left" ? -380 : 380,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="bg-[#fafafa]">
//       {/* INSTAGRAM */}
//       <div className="max-w-[1770px] mx-auto pt-[55px] pb-[40px] text-center px-4">
//         <h2 className="uppercase text-[25px] tracking-[0.08em] text-[#232323] mb-[15px]">
//           #PSR ON INSTAGRAM
//         </h2>

//         <p className="text-[18px] text-[#3c3c3c] max-w-[1100px] mx-auto mb-[35px] leading-[28px]">
//           We love to interact with our followers! Follow @psr_silks and drop a
//           comment to let us know you're there. Your thoughts mean the world to us
//         </p>

//         <div className="relative">
//           {/* arrows */}
//           <button
//             onClick={() => scroll("left")}
//             className="hidden lg:flex absolute left-[-20px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white border rounded-full items-center justify-center shadow z-10"
//           >
//             ‹
//           </button>

//           <div
//             ref={sliderRef}
//             className="flex gap-[12px] overflow-x-auto scroll-smooth no-scrollbar"
//           >
//             {images.map((src, i) => (
//               <div
//                 key={i}
//                 className="min-w-[300px] sm:min-w-[320px] lg:min-w-[350px] aspect-square relative overflow-hidden border"
//               >
//                 <img
//                   src={src}
//                   alt="PSR Silks"
//                   className="w-full h-full object-cover"
//                 />

//                 {/* overlay frame */}
                
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => scroll("right")}
//             className="hidden lg:flex absolute right-[-20px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white border rounded-full items-center justify-center shadow z-10"
//           >
//             ›
//           </button>
//         </div>

//         <a
//           href="https://www.instagram.com/psr_silks/"
//           className="inline-block mt-[25px] px-[32px] py-[10px] bg-[#232323] text-white uppercase text-[14px] tracking-widest border border-[#232323] hover:bg-white hover:text-[#232323] transition"
//         >
//           View Gallery
//         </a>
//       </div>

//       {/* STORE */}
//       <div className="text-center pt-[4px] pb-[40px] px-4">
//         <h2 className="text-[26px] tracking-[0.08em] text-[#232323] mb-[18px]">
//           Visit our PSR Store
//         </h2>

//         <p className="max-w-[1100px] mx-auto text-[17px] leading-[26px] text-[#3c3c3c] mb-[30px] text-black">
//           Experience the epitome of elegance by visiting our flagship store and
//           exploring our array of exquisite store. We extend our warm welcome to
//           our other branches located in your cities. Each branch promises the
//           same dedication to quality and service, ensuring that you can indulge
//           in the luxury of silk sarees no matter where you are.
//         </p>

//         <a
//           href="/pages/our-showrooms"
//           className="inline-block px-[40px] py-[12px] border border-[#232323] uppercase tracking-widest text-[18px] hover:bg-[#232323] hover:text-white transition text-black font-bold"
//         >
//           Our Other Branches
//         </a>
//       </div>

//       {/* MAP */}
//       <div className="w-full h-[360px]">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832.527516002243!2d76.95891024039015!3d11.018826631831745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858f92cb41ca1%3A0xd811a4d7a055f7cd!2sPSR%20Silk%20Sarees!5e0!3m2!1sen!2sin!4v1711431568161!5m2!1sen!2sin"
//           className="w-full h-full border-0"
//           loading="lazy"
//         />
//       </div>

//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }










"use client";

import { useRef } from "react";

export default function Map() {
  const sliderRef = useRef(null);

  const images = [
    "https://www.psrsilks.com/cdn/shop/files/t1.webp?v=1742362090",
    "https://www.psrsilks.com/cdn/shop/files/t3.webp?v=1742362146",
    "https://www.psrsilks.com/cdn/shop/files/t4.webp?v=1742362166",
    "https://www.psrsilks.com/cdn/shop/files/t5.webp?v=1742362198",
    "https://www.psrsilks.com/cdn/shop/files/t6.webp?v=1742362217",
  ];

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#fafafa]">
      {/* INSTAGRAM */}
      <div className="max-w-[1770px] mx-auto pt-[40px] sm:pt-[55px] pb-[30px] sm:pb-[40px] text-center px-4">
        <h2 className="uppercase text-[22px] sm:text-[25px] tracking-[0.08em] text-[#232323] mb-[20px] sm:mb-[15px]">
          #Hamsini ON INSTAGRAM
        </h2>

        <p className="text-[17px] sm:text-[18px] text-[#3c3c3c] max-w-[1100px] mx-auto mb-[45px] sm:mb-[35px] leading-[30px] sm:leading-[28px]">
          We love to interact with our followers! Follow @Hamsini_silks and drop a
          comment to let us know you're there. Your thoughts mean the world to us
        </p>

        <div className="relative mb-[35px] sm:mb-0">
          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            className="absolute  text-black left-[6px] sm:left-[10px] top-1/2 -translate-y-1/2 w-[38px] sm:w-[42px] h-[38px] sm:h-[42px] bg-white border rounded-full flex items-center justify-center shadow z-10"
          >
            ‹
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-[16px] sm:gap-[14px] overflow-x-auto scroll-smooth no-scrollbar px-[6px]"
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="group min-w-[260px] sm:min-w-[320px] lg:min-w-[350px] aspect-square relative overflow-hidden border bg-black"
              >
                <img
                  src={src}
                  alt="Hamsini Silks"
                  className="w-full h-full object-cover transition-transform duration-500 lg:group-hover:scale-110"
                />

                <div className="absolute inset-[12px] sm:inset-[14px] border border-white pointer-events-none opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition" />

                {/* <div className="absolute inset-0 flex flex-col items-center justify-between p-[16px] sm:p-[18px] text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition">
                  <span className="text-[14px] sm:text-[16px] tracking-widest">
                    PSR
                  </span>

                  <span className="text-[16px] sm:text-[18px] tracking-[0.25em] uppercase text-center leading-[22px]">
                    Kanchipuram
                    <br />
                    Silk Saree
                  </span>
                </div> */}
              </div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-[6px] sm:right-[10px] text-black top-1/2 -translate-y-1/2 w-[38px] sm:w-[42px] h-[38px] sm:h-[42px] bg-white border rounded-full flex items-center justify-center shadow z-10"
          >
            ›
          </button>
        </div>

        <a
          href="https://www.instagram.com/psr_silks/"
          className="inline-block mt-[10px] sm:mt-[25px] px-[36px] py-[12px] bg-[#232323] text-white uppercase text-[15px] sm:text-[14px] tracking-widest border border-[#232323] hover:bg-white hover:text-[#232323] transition"
        >
          View Gallery
        </a>
      </div>

      {/* STORE */}
      <div className="text-center pt-[25px] sm:pt-[4px] pb-[45px] sm:pb-[40px] px-4">
        <h2 className="text-[24px] sm:text-[26px] tracking-[0.08em] text-[#232323] mb-[22px] sm:mb-[18px]">
          Visit our Hamsini Store
        </h2>

        <p className="max-w-[1100px] mx-auto text-[16px] sm:text-[17px] leading-[30px] sm:leading-[26px] text-[#3c3c3c] mb-[35px] sm:mb-[30px]">
          Experience the epitome of elegance by visiting our flagship store and
          exploring our array of exquisite store. We extend our warm welcome to
          our other branches located in your cities.
        </p>

        <a
          href="#"
          className="inline-block px-[42px] text-black  py-[14px] border border-[#232323] uppercase tracking-widest text-[17px] sm:text-[18px] hover:bg-[#232323] hover:text-white transition font-bold"
        >
          Our Other Branches
        </a>
      </div>

      {/* MAP */}
      <div className="w-full h-[300px] sm:h-[360px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832.527516002243!2d76.95891024039015!3d11.018826631831745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858f92cb41ca1%3A0xd811a4d7a055f7cd!2sPSR%20Silk%20Sarees!5e0!3m2!1sen!2sin!4v1711431568161!5m2!1sen!2sin"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
