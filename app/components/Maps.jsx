
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
//     if (!sliderRef.current) return;
//     sliderRef.current.scrollBy({
//       left: dir === "left" ? -280 : 280,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="bg-[#fafafa]">
//       {/* INSTAGRAM */}
//       <div className="max-w-[1770px] mx-auto pt-[40px] sm:pt-[55px] pb-[30px] sm:pb-[40px] text-center px-4">
//         <h2 className="uppercase text-[22px] sm:text-[25px] tracking-[0.08em] text-[#232323] mb-[20px] sm:mb-[15px] font-sans">
//   #Hamsini ON INSTAGRAM
// </h2>
// <p className="text-[17px] sm:text-[18px] text-[#3c3c3c] max-w-[1100px] mx-auto mb-[45px] sm:mb-[35px] leading-[30px] sm:leading-[28px] font-sans">
//   We love to interact with our followers! Follow @Hamsini_silks and drop a
//   comment to let us know you're there. Your thoughts mean the world to us
// </p>
//         <div className="relative mb-[35px] sm:mb-0">
//           {/* LEFT ARROW */}
//           <button
//             onClick={() => scroll("left")}
//             className="absolute  text-black left-[6px] sm:left-[10px] top-1/2 -translate-y-1/2 w-[38px] sm:w-[42px] h-[38px] sm:h-[42px] bg-white border rounded-full flex items-center justify-center shadow z-10"
//           >
//             ‹
//           </button>

//           {/* SLIDER */}
//           <div
//             ref={sliderRef}
//             className="flex gap-[16px] sm:gap-[14px] overflow-x-auto scroll-smooth no-scrollbar px-[6px]"
//           >
//             {images.map((src, i) => (
//               <div
//                 key={i}
//                 className="group min-w-[260px] sm:min-w-[320px] lg:min-w-[350px] aspect-square relative overflow-hidden border bg-black"
//               >
//                 <img
//                   src={src}
//                   alt="Hamsini Silks"
//                   className="w-full h-full object-cover transition-transform duration-500 lg:group-hover:scale-110"
//                 />

//                 <div className="absolute inset-[12px] sm:inset-[14px] border border-white pointer-events-none opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition" />

//                 {/* <div className="absolute inset-0 flex flex-col items-center justify-between p-[16px] sm:p-[18px] text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition">
//                   <span className="text-[14px] sm:text-[16px] tracking-widest">
//                     PSR
//                   </span>

//                   <span className="text-[16px] sm:text-[18px] tracking-[0.25em] uppercase text-center leading-[22px]">
//                     Kanchipuram
//                     <br />
//                     Silk Saree
//                   </span>
//                 </div> */}
//               </div>
//             ))}
//           </div>

//           {/* RIGHT ARROW */}
//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-[6px] sm:right-[10px] text-black top-1/2 -translate-y-1/2 w-[38px] sm:w-[42px] h-[38px] sm:h-[42px] bg-white border rounded-full flex items-center justify-center shadow z-10"
//           >
//             ›
//           </button>
//         </div>

//         <a
//           href="https://www.instagram.com/psr_silks/"
//           className="inline-block mt-[10px] sm:mt-[25px] px-[36px] py-[12px] bg-[#232323] text-white uppercase text-[15px] sm:text-[14px] tracking-widest border border-[#232323] hover:bg-white hover:text-[#232323] transition"
//         >
//           View Gallery
//         </a>
//       </div>

//       {/* STORE */}
//       <div className="text-center pt-[25px] sm:pt-[4px] pb-[45px] sm:pb-[40px] px-4">
//         <h2 className="text-[24px] sm:text-[26px] tracking-[0.08em] text-[#232323] mb-[22px] sm:mb-[18px] font-sans">
//           Visit our Hamsini Store
//         </h2>

//         <p className="max-w-[1100px] mx-auto text-[16px] sm:text-[17px] leading-[30px] sm:leading-[26px] text-[#3c3c3c] mb-[35px] sm:mb-[30px] fon-sans">
//           Experience the epitome of elegance by visiting our flagship store and
//           exploring our array of exquisite store. We extend our warm welcome to
//           our other branches located in your cities.
//         </p>

//         <a
//           href="#"
//           className="inline-block px-[42px] text-black  py-[14px] border border-[#232323] uppercase tracking-widest text-[17px] sm:text-[18px] hover:bg-[#232323] hover:text-white transition font-sans font-bold"
//         >
//           Our Other Branches
//         </a>
//       </div>

//       {/* MAP */}
//       <div className="w-full h-[300px] sm:h-[360px]">
//         {/* <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832.527516002243!2d76.95891024039015!3d11.018826631831745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858f92cb41ca1%3A0xd811a4d7a055f7cd!2sPSR%20Silk%20Sarees!5e0!3m2!1sen!2sin!4v1711431568161!5m2!1sen!2sin"
//           className="w-full h-full border-0"
//           loading="lazy"
//         /> */}
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

import { useRef, useMemo } from "react";

export default function Map() {
  const sliderRef = useRef(null);

  /* IMAGE SLIDER (UNCHANGED) */
  const images = [
    "https://www.psrsilks.com/cdn/shop/files/t1.webp?v=1742362090",
    "https://www.psrsilks.com/cdn/shop/files/t3.webp?v=1742362146",
    "https://www.psrsilks.com/cdn/shop/files/t4.webp?v=1742362166",
    "https://www.psrsilks.com/cdn/shop/files/t5.webp?v=1742362198",
    "https://www.psrsilks.com/cdn/shop/files/t6.webp?v=1742362217",
  ];

  /* 🎥 PLAYABLE DUMMY SAREE / FASHION VIDEOS */
  const sareeVideos = [
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  ];

  /* 🔀 RANDOMIZE VIDEOS EVERY LOAD */
  const randomVideos = useMemo(() => {
    return [...sareeVideos].sort(() => Math.random() - 0.5).slice(0, 3);
  }, []);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#fafafa]">
      {/* INSTAGRAM HEADER */}
      <div className="max-w-[1770px] mx-auto pt-[40px] pb-[40px] text-center px-4">
        <h2 className="uppercase text-[22px] sm:text-[25px] tracking-[0.08em] text-[#232323] mb-[18px] font-sans">
          #Hamsini ON INSTAGRAM
        </h2>

        <p className="text-[17px] text-[#3c3c3c] max-w-[1100px] mx-auto mb-[40px] leading-[30px] font-sans">
          Follow @Hamsini_silks for the latest saree collections, styling ideas
          and customer stories.
        </p>

        {/* IMAGE SLIDER */}
        <div className="relative mb-[55px]">
          <button
            onClick={() => scroll("left")}
            className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white border rounded-full shadow z-10"
          >
            ‹
          </button>

          <div
            ref={sliderRef}
            className="flex gap-[16px] overflow-x-auto scroll-smooth no-scrollbar px-[6px]"
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="min-w-[280px] lg:min-w-[340px] aspect-square overflow-hidden border bg-black"
              >
                <img
                  src={src}
                  alt="Hamsini Silks"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white border rounded-full shadow z-10"
          >
            ›
          </button>
        </div>

        {/* 🎥 SAREE VIDEOS SECTION */}
        <div className="max-w-[1200px] mx-auto">
          <h3 className="text-[22px] tracking-wide text-[#232323] mb-6 font-sans">
            Sarees in Motion
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomVideos.map((src, i) => (
              <div
                key={i}
                className="relative w-full max-h-[380px] aspect-[4/5] rounded-lg overflow-hidden shadow bg-black"
              >
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            ))}
          </div>
        </div>

        {/* VIEW INSTAGRAM */}
        <a
          href="https://www.instagram.com/hamsini_silks/"
          target="_blank"
          className="inline-block mt-[35px] px-[36px] py-[12px] bg-[#232323] text-white uppercase tracking-widest hover:bg-white hover:text-[#232323] border border-[#232323] transition"
        >
          View Instagram
        </a>
      </div>

      {/* STORE SECTION */}
      <div className="text-center pt-[20px] pb-[45px] px-4">
        <h2 className="text-[24px] tracking-[0.08em] text-[#232323] mb-[18px] font-sans">
          Visit our Hamsini Store
        </h2>

        <p className="max-w-[1100px] mx-auto text-[16px] leading-[30px] text-[#3c3c3c] mb-[30px] font-sans">
          Experience elegance in person by visiting our flagship store or one of
          our branches near you.
        </p>

        <a
          href="#"
          className="inline-block px-[42px] py-[14px] border border-[#232323] uppercase tracking-widest hover:bg-[#232323] hover:text-white transition font-bold"
        >
          Our Other Branches
        </a>
      </div>

      {/* NO SCROLLBAR */}
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
