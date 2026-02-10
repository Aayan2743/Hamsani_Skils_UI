
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
//   // const sareeVideos = [
//   //   "https://www.bing.com/videos/riverview/relatedvideo?q=saree+videos&&mid=A577C77A3886326614BDA577C77A3886326614BD&churl=https%3a%2f%2fwww.youtube.com%2fchannel%2fUCwSbwD0vMDNMsGiR22hVZQw&FORM=VRDGAR",
//   //   "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
//   //   "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//   //   "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//   //   "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
//   // ];


//   const sareeVideos = [
//   "https://example.com/saree-videos/traditional-silk-saree.mp4",
//   "https://example.com/saree-videos/designer-saree-draping.mp4",
//   "https://example.com/saree-videos/banarasi-saree-showcase.mp4",
//   "https://example.com/saree-videos/kanjeevaram-saree-collection.mp4",
//   "https://example.com/saree-videos/modern-saree-styling.mp4",
// ];
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

import { useRef } from "react";

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

  /* INSTAGRAM LINKS */
  const instagramPosts = [
    "https://www.instagram.com/p/DUasaFvkf4b/",
    "https://www.instagram.com/p/DUe-hV0ES3O/",
    "https://www.instagram.com/p/DUasaFvkf4b/",
  ];
  const scroll = (direction) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  /* CLEAN EMBED URL */
  const getCleanEmbedUrl = (url) => {
    const cleanUrl = url.replace("/p/", "/reel/");
    return `${cleanUrl}embed/?muted=1`;
  };

  return (
    <section className="bg-[#fafafa]">
      <div className="max-w-[1770px] mx-auto pt-10 pb-14 text-center px-4">
        <h2 className="uppercase text-[22px] sm:text-[25px] tracking-[0.08em] text-[#232323] mb-4">
          #Hamsini on Instagram
        </h2>

        <p className="text-[17px] text-[#3c3c3c] max-w-[1100px] mx-auto mb-10 leading-[30px]">
          Follow @Hamsini_silks for the latest saree collections, styling ideas
          and customer stories.
        </p>

        {/* IMAGE SLIDER */}
        <div className="relative mb-16">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border rounded-full shadow z-10"
          >
            ‹
          </button>

          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-2 no-scrollbar"
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="min-w-[280px] lg:min-w-[340px] aspect-square overflow-hidden bg-black border"
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
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border rounded-full shadow z-10"
          >
            ›
          </button>
        </div>

        {/* INSTAGRAM VIDEOS */}
        <div className="max-w-[1200px] mx-auto">
          <h3 className="text-[22px] mb-6 text-[#232323]">
            Sarees in Motion
          </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center overflow-hidden">
  {instagramPosts.map((url, index) => (
    <div
      key={index}
      style={{ width: 400, height: 400 }}
      className="relative overflow-hidden rounded-xl bg-black shadow-md"
    >
      <div className="absolute inset-0 overflow-hidden" style={{ top: '-65px' }}>
        <iframe
          src={getCleanEmbedUrl(url)}
          scrolling="no"
          frameBorder="0"
          style={{ width: '100%', height: 'calc(100% + 65px)' }}
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      </div>
    </div>
  ))}
</div>


        </div>

        {/* VIEW INSTAGRAM */}
        <a
          href="https://www.instagram.com/hamsinisilks/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 px-9 py-3 bg-[#232323] text-white uppercase tracking-widest border border-[#232323] transition hover:bg-white hover:text-[#232323]"
        >
          View Instagram
        </a>
      </div>

      {/* GLOBAL SCROLLBAR HIDE */}
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
