
// "use client";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// // import defaultImage from "../utils/homepage.jpg";
// export default function HeroSection() {
//   return (
//     <main className="w-full overflow-hidden">
//       {/* HERO CAROUSEL */}
//       <section className="relative w-full">
//         <Carousel
//           autoPlay
//           infiniteLoop
//           interval={2500}
//           transitionTime={800}
//           showThumbs={false}
//           showStatus={false}
//           showArrows={false}
//           swipeable
//           emulateTouch
//           stopOnHover={false}
//         >
//           {/* SLIDE 1 */}
//           <div className="w-full h-[320px] md:h-[450px]">
//             {/* Desktop */}
//             <img
//   src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
//   className="hidden md:block w-full h-full object-cover"
// />

//             {/* Mobile */}
//             <img
//               src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920"
//               alt="Hamsini Silks Mobile Banner 1"
//               className="block md:hidden w-full h-full object-cover"
//             />
//           </div>

//           {/* SLIDE 2 */}
//           <div className="w-full h-[320px] md:h-[450px]">
//             {/* Desktop */}
//             <img
//  src="/softsilk_saree.webp"
//   className="hidden md:block w-full h-full object-cover"
// />

//             {/* Mobile */}
//             <img
//               src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920"
//               alt="Hamsini Silks Mobile Banner 2"
//               className="block md:hidden w-full h-full object-cover"
//             />
//           </div>
//         </Carousel>
//       </section>

//       {/* TEXT SECTION */}
//       <section className="bg-white">
//         <div className="max-w-[1170px] mx-auto px-5 md:px-6 text-center py-8 md:py-10">
//           <h2 className="text-[22px] md:text-[25px] font-bold text-black font-sans">
//             Welcome to Hamsini Silks
//           </h2>

//           <p className="mt-2 md:mt-3 text-[16px] md:text-[18px] leading-[1.8] md:leading-[2] text-black max-w-[320px] md:max-w-4xl mx-auto font-sans">
//             Discover timeless beauty and unmatched craftsmanship at Hamsini Silks.
//             From luxurious silk sarees for grand occasions to elegant drapes for
//             everyday wear, our collection celebrates your style and India’s rich
//             textile heritage with vibrant colors, intricate designs, and
//             exceptional quality.
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }


"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function HeroSection() {
  return (
    <main className="w-full overflow-hidden">
      {/* HERO CAROUSEL */}
      <section className="relative w-full">
        <Carousel
          autoPlay
          infiniteLoop
          interval={2500}
          transitionTime={800}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          swipeable
          emulateTouch
          stopOnHover={false}
        >
          {/* SLIDE 1 */}
          <div className="w-full h-[320px] md:h-[450px]">
            <img
              src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
              className="hidden md:block w-full h-full object-cover"
              alt="Kanjivaram Saree"
            />
            <img
              src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920"
              alt="Bridal Saree"
              className="block md:hidden w-full h-full object-cover"
            />
          </div>

          {/* SLIDE 2 */}
          <div className="w-full h-[320px] md:h-[450px]">
            <img
              src="/softsilk_saree.webp"
              className="hidden md:block w-full h-full object-cover"
              alt="Soft Silk Saree"
            />
            <img
              src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920"
              alt="Bridal Collection"
              className="block md:hidden w-full h-full object-cover"
            />
          </div>
        </Carousel>
      </section>
      <style jsx global>{`
  /* Carousel Arrow Buttons */
  .carousel .control-arrow {
    background: black !important;
    opacity: 0.8 !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 50% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .carousel .control-arrow:hover {
    background: black !important;
    opacity: 1 !important;
  }

  /* Arrow Icon Color */
  .carousel .control-prev.control-arrow:before,
  .carousel .control-next.control-arrow:before {
    border-top: 8px solid transparent !important;
    border-bottom: 8px solid transparent !important;
  }

  .carousel .control-prev.control-arrow:before {
    border-right: 12px solid white !important;
  }

  .carousel .control-next.control-arrow:before {
    border-left: 12px solid white !important;
  }
`}</style>


      {/* TEXT SECTION */}
      <section className="bg-white">
        <div className="max-w-[1170px] mx-auto px-5 md:px-6 text-center py-8 md:py-10">
          <h2 className="text-[22px] md:text-[25px] font-bold text-black font-sans">
            Welcome to Hamsini Silks
          </h2>

          <p className="mt-2 md:mt-3 text-[16px] md:text-[18px] leading-[1.8] md:leading-[2] text-black max-w-[320px] md:max-w-4xl mx-auto font-sans">
            Discover timeless beauty and unmatched craftsmanship at Hamsini Silks.
            From luxurious silk sarees for grand occasions to elegant drapes for
            everyday wear, our collection celebrates your style and India’s rich
            textile heritage with vibrant colors, intricate designs, and
            exceptional quality.
          </p>
        </div>
      </section>

      {/* FEATURED SAREES SECTION */}
      <section className="bg-gray-50 py-10">
     <div className="w-full px-5">

          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              Our Featured Sarees
            </h3>

            <a
              href="/collections"
              className="text-sm md:text-base font-semibold text-black hover:underline"
            >
              View More →
            </a>
          </div>

          {/* Carousel */}
          <Carousel
            autoPlay
            infiniteLoop
            interval={2000}
            transitionTime={700}
            showThumbs={false}
            showStatus={false}
            showArrows={true}   // ✅ arrows enabled
            swipeable
            emulateTouch
            stopOnHover={false}
            centerMode
            centerSlidePercentage={33}
          >
            {/* Saree 1 */}
            <div className="px-2">
              <img
                src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
                alt="Kanjivaram Silk Saree"
                className="rounded-xl h-[350px] object-cover"
              />
            </div>

            {/* Saree 2 */}
            <div className="px-2">
              <img
                src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381"
                alt="Bridal Silk Saree"
                className="rounded-xl h-[350px] object-cover"
              />
            </div>

            {/* Saree 3 */}
            <div className="px-2">
              <img
                src="/softsilk_saree.webp"
                alt="Soft Silk Saree"
                className="rounded-xl h-[350px] object-cover"
              />
            </div>

            {/* Saree 4 */}
            <div className="px-2">
              <img
                src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
                alt="Traditional Silk Saree"
                className="rounded-xl h-[350px] object-cover"
              />
            </div>
          </Carousel>
        </div>
      </section>
    </main>
  );
}

