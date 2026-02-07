
// "use client";

// import { useRef, useMemo } from "react";

// export default function Map() {
//   const sliderRef = useRef(null);

//   /* IMAGE SLIDER (UNCHANGED) */
//   const images = [
//     "https://www.psrsilks.com/cdn/shop/files/t1.webp?v=1742362090",
//     "https://www.psrsilks.com/cdn/shop/files/t3.webp?v=1742362146",
//     "https://www.psrsilks.com/cdn/shop/files/t4.webp?v=1742362166",
//     "https://www.psrsilks.com/cdn/shop/files/t5.webp?v=1742362198",
//     "https://www.psrsilks.com/cdn/shop/files/t6.webp?v=1742362217",
//   ];

//   /* 🎥 PLAYABLE DUMMY SAREE / FASHION VIDEOS */
//   const sareeVideos = [
//     "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
//     "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
//     "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//     "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//     "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
//   ];

//   /* 🔀 RANDOMIZE VIDEOS EVERY LOAD */
//   const randomVideos = useMemo(() => {
//     return [...sareeVideos].sort(() => Math.random() - 0.5).slice(0, 3);
//   }, []);

//   const scroll = (dir) => {
//     if (!sliderRef.current) return;
//     sliderRef.current.scrollBy({
//       left: dir === "left" ? -280 : 280,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="bg-[#fafafa]">
//       {/* INSTAGRAM HEADER */}
//       <div className="max-w-[1770px] mx-auto pt-[40px] pb-[40px] text-center px-4">
//         <h2 className="uppercase text-[22px] sm:text-[25px] tracking-[0.08em] text-[#232323] mb-[18px] font-sans">
//           #Hamsini ON INSTAGRAM
//         </h2>

//         <p className="text-[17px] text-[#3c3c3c] max-w-[1100px] mx-auto mb-[40px] leading-[30px] font-sans">
//           Follow @Hamsini_silks for the latest saree collections, styling ideas
//           and customer stories.
//         </p>

//         {/* IMAGE SLIDER */}
//         <div className="relative mb-[55px]">
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white border rounded-full shadow z-10"
//           >
//             ‹
//           </button>

//           <div
//             ref={sliderRef}
//             className="flex gap-[16px] overflow-x-auto scroll-smooth no-scrollbar px-[6px]"
//           >
//             {images.map((src, i) => (
//               <div
//                 key={i}
//                 className="min-w-[280px] lg:min-w-[340px] aspect-square overflow-hidden border bg-black"
//               >
//                 <img
//                   src={src}
//                   alt="Hamsini Silks"
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white border rounded-full shadow z-10"
//           >
//             ›
//           </button>
//         </div>

//         {/* 🎥 SAREE VIDEOS SECTION */}
//         <div className="max-w-[1200px] mx-auto">
//           <h3 className="text-[22px] tracking-wide text-[#232323] mb-6 font-sans">
//             Sarees in Motion
//           </h3>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {randomVideos.map((src, i) => (
//               <div
//                 key={i}
//                 className="relative w-full max-h-[380px] aspect-[4/5] rounded-lg overflow-hidden shadow bg-black"
//               >
//                 <video
//                   src={src}
//                   className="w-full h-full object-cover"
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VIEW INSTAGRAM */}
//         <a
//           href="https://www.instagram.com/hamsini_silks/"
//           target="_blank"
//           className="inline-block mt-[35px] px-[36px] py-[12px] bg-[#232323] text-white uppercase tracking-widest hover:bg-white hover:text-[#232323] border border-[#232323] transition"
//         >
//           View Instagram
//         </a>
//       </div>

//       {/* STORE SECTION */}
//       <div className="text-center pt-[20px] pb-[45px] px-4">
//         <h2 className="text-[24px] tracking-[0.08em] text-[#232323] mb-[18px] font-sans">
//           Visit our Hamsini Store
//         </h2>

//         <p className="max-w-[1100px] mx-auto text-[16px] leading-[30px] text-[#3c3c3c] mb-[30px] font-sans">
//           Experience elegance in person by visiting our flagship store or one of
//           our branches near you.
//         </p>

//         <a
//           href="#"
//           className="inline-block px-[42px] py-[14px] border border-[#232323] uppercase tracking-widest hover:bg-[#232323] hover:text-white transition font-bold"
//         >
//           Our Other Branches
//         </a>
//       </div>

//       {/* NO SCROLLBAR */}
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

import { useRef, useState, useEffect } from "react";

export default function Map() {
  const sliderRef = useRef(null);

  /* IMAGE SLIDER */
  const images = [
    "https://www.psrsilks.com/cdn/shop/files/t1.webp?v=1742362090",
    "https://www.psrsilks.com/cdn/shop/files/t3.webp?v=1742362146",
    "https://www.psrsilks.com/cdn/shop/files/t4.webp?v=1742362166",
    "https://www.psrsilks.com/cdn/shop/files/t5.webp?v=1742362198",
    "https://www.psrsilks.com/cdn/shop/files/t6.webp?v=1742362217",
  ];

  /* 🎥 BETTER SAREE / FASHION VIDEOS */
    const sareeVideos = [
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  ];

//   // const sareeVideos = [
//   "https://www.bing.com/videos/riverview/relatedvideo?q=online+saree+videos&mid=DF9FE27E6506F4235779DF9FE27E6506F4235779&churl=https%3a%2f%2fwww.youtube.com%2fchannel%2fUCZi3qINXb1t4tAsslJVWDmA&mmscn=stvo&FORM=VCGVRP",
//   "https://www.bing.com/videos/riverview/relatedvideo?q=online+saree+videos&mid=DF9FE27E6506F4235779DF9FE27E6506F4235779&churl=https%3a%2f%2fwww.youtube.com%2fchannel%2fUCZi3qINXb1t4tAsslJVWDmA&mmscn=stvo&FORM=VCGVRP",
// // ];

  /* RANDOMIZE CLIENT-SIDE ONLY */
  const [randomVideos, setRandomVideos] = useState([]);

  useEffect(() => {
    const shuffled = [...sareeVideos].sort(() => Math.random() - 0.5).slice(0, 3);
    setRandomVideos(shuffled);
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
        {randomVideos.length > 0 && (
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
        )}

        {/* VIEW INSTAGRAM */}
        <a
          href="https://www.instagram.com/hamsini_silks/"
          target="_blank"
          className="inline-block mt-[35px] px-[36px] py-[12px] bg-[#232323] text-white uppercase tracking-widest hover:bg-white hover:text-[#232323] border border-[#232323] transition"
        >
          View Instagram
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
