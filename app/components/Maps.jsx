
// "use client";

// import { useRef } from "react";

// export default function Map() {
//   const sliderRef = useRef(null);

//   /* IMAGE SLIDER */
//  const images = [
//     "https://th.bing.com/th/id/OIP.HRcHsNr7cuDbkwAMj5OmZgHaLH?w=208&h=305&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // Red bridal saree
//   "https://th.bing.com/th/id/OIP.EdLuOfZ_rXKl1PumzVNx-AHaLF?w=204&h=305&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // Golden silk saree
//   "https://th.bing.com/th/id/OIP.erOnXfVur0adgOKfqgVw2wHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // Green saree
//   "https://th.bing.com/th/id/OIP.Vhw4sI7_0d2FjigP6W2KjQHaKH?w=208&h=285&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // Pink traditional saree
//   "https://th.bing.com/th/id/OIP.HRcHsNr7cuDbkwAMj5OmZgHaLH?w=208&h=305&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // Red bridal saree
//   "https://th.bing.com/th/id/OIP.EdLuOfZ_rXKl1PumzVNx-AHaLF?w=204&h=305&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // Golden silk saree
//   "https://th.bing.com/th/id/OIP.erOnXfVur0adgOKfqgVw2wHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // Green saree
//   "https://th.bing.com/th/id/OIP.Vhw4sI7_0d2FjigP6W2KjQHaKH?w=208&h=285&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // Pink traditional saree

// ];


//   /* INSTAGRAM LINKS */
//   const instagramPosts = [
//     "https://www.instagram.com/p/DUasaFvkf4b/",
//     "https://www.instagram.com/p/DUe-hV0ES3O/",
//     "https://www.instagram.com/p/DUasaFvkf4b/",
//   ];
//   const scroll = (direction) => {
//     if (!sliderRef.current) return;
//     sliderRef.current.scrollBy({
//       left: direction === "left" ? -320 : 320,
//       behavior: "smooth",
//     });
//   };

//   /* CLEAN EMBED URL */
//   const getCleanEmbedUrl = (url) => {
//     const cleanUrl = url.replace("/p/", "/reel/");
//     return `${cleanUrl}embed/?muted=1`;
//   };

//   return (
//     <section className="bg-[#fafafa]">
//       <div className="max-w-[1770px] mx-auto pt-10 pb-14 text-center px-4">
//         <h2 className="uppercase text-[22px] sm:text-[25px] tracking-[0.08em] text-[#232323] mb-4">
//           #Hamsini on Instagram
//         </h2>

//         <p className="text-[17px] text-[#3c3c3c] max-w-[1100px] mx-auto mb-10 leading-[30px]">
//           Follow @Hamsini_silks for the latest saree collections, styling ideas
//           and customer stories.
//         </p>

//         {/* IMAGE SLIDER */}
//         <div className="relative mb-16">
//           <button
//             type="button"
//             onClick={() => scroll("left")}
//             className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border rounded-full shadow z-10"
//           >
//             ‹
//           </button>

//           <div
//             ref={sliderRef}
//             className="flex gap-4 overflow-x-auto scroll-smooth px-2 no-scrollbar"
//           >
//             {images.map((src, index) => (
//               <div
//                 key={index}
//                 className="min-w-[280px] lg:min-w-[340px] aspect-square overflow-hidden bg-black border"
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
//             type="button"
//             onClick={() => scroll("right")}
//             className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border rounded-full shadow z-10"
//           >
//             ›
//           </button>
//         </div>

//         {/* INSTAGRAM VIDEOS */}
//         <div className="max-w-[1200px] mx-auto">
//           <h3 className="text-[22px] mb-6 text-[#232323]">
//             Sarees in Motion
//           </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center overflow-hidden">
//   {instagramPosts.map((url, index) => (
//     <div
//       key={index}
//       style={{ width: 400, height: 400 }}
//       className="relative overflow-hidden rounded-xl bg-black shadow-md"
//     >
//       <div className="absolute inset-0 overflow-hidden" style={{ top: '-65px' }}>
//         <iframe
//           src={getCleanEmbedUrl(url)}
//           scrolling="no"
//           frameBorder="0"
//           style={{ width: '100%', height: 'calc(100% + 65px)' }}
//           allow="autoplay; encrypted-media; picture-in-picture"
//         />
//       </div>
//     </div>
//   ))}
// </div>


//         </div>

//         {/* VIEW INSTAGRAM */}
//         <a
//           href="https://www.instagram.com/hamsinisilks/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block mt-10 px-9 py-3 bg-[#232323] text-white uppercase tracking-widest border border-[#232323] transition hover:bg-white hover:text-[#232323]"
//         >
//           View Instagram
//         </a>
//       </div>

//       {/* GLOBAL SCROLLBAR HIDE */}
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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Map() {
  const sliderRef = useRef(null);

  /* IMAGE SLIDER */
  const images = [
    "https://th.bing.com/th/id/OIP.HRcHsNr7cuDbkwAMj5OmZgHaLH?w=208&h=305&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    "https://th.bing.com/th/id/OIP.EdLuOfZ_rXKl1PumzVNx-AHaLF?w=204&h=305&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    "https://th.bing.com/th/id/OIP.erOnXfVur0adgOKfqgVw2wHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    "https://th.bing.com/th/id/OIP.Vhw4sI7_0d2FjigP6W2KjQHaKH?w=208&h=285&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    "https://th.bing.com/th/id/OIP.HRcHsNr7cuDbkwAMj5OmZgHaLH?w=208&h=305&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    "https://th.bing.com/th/id/OIP.EdLuOfZ_rXKl1PumzVNx-AHaLF?w=204&h=305&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    "https://th.bing.com/th/id/OIP.erOnXfVur0adgOKfqgVw2wHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    "https://th.bing.com/th/id/OIP.Vhw4sI7_0d2FjigP6W2KjQHaKH?w=208&h=285&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  ];

  /* INSTAGRAM LINKS */
  const instagramPosts = [
    "https://www.instagram.com/p/DUasaFvkf4b/",
    "https://www.instagram.com/p/DUe-hV0ES3O/",
    "https://www.instagram.com/p/DUasaFvkf4b/",
  ];

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

        {/* UPDATED IMAGE CAROUSEL */}
        <div className="mb-16 max-w-[1400px] mx-auto">
          <Carousel
            autoPlay
            infiniteLoop
            interval={2000}
            transitionTime={700}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            swipeable
            emulateTouch
            stopOnHover={false}
            centerMode
            centerSlidePercentage={33}
          >
            {images.map((src, index) => (
              <div key={index} className="px-3">
                <div className="h-[350px] overflow-hidden rounded-xl shadow-md">
                  <img
                    src={src}
                    alt="Hamsini Silks"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </Carousel>
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
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ top: "-65px" }}
                >
                  <iframe
                    src={getCleanEmbedUrl(url)}
                    scrolling="no"
                    frameBorder="0"
                    style={{ width: "100%", height: "calc(100% + 65px)" }}
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
    </section>
  );
}
