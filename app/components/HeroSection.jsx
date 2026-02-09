
// export default function HeroSection() {
//   return (
//     <main className="w-full overflow-x-hidden">
//       {/* HERO IMAGE */}
//       <section className="relative w-full">
//         {/* Desktop Image */}
//         <img
//           src="https://www.psrsilks.com/cdn/shop/files/main_banner_header_copy_aeb79531-363d-4f59-ac96-82df1363648f.webp"
//           alt="PSR Silks Banner"
//           className="hidden md:block w-full object-cover"
//         />
//         {/* Mobile Image */}
//         <img
//           src="https://www.psrsilks.com/cdn/shop/files/header_mobile_size_copy_2a452766-c801-46b6-ba68-70531ca343a0.webp"
//           alt="PSR Silks Mobile Banner"
//           className="block md:hidden w-full object-cover"
//         />
//       </section>
//       {/* TEXT SECTION */}
//       <section className="bg-white">
//         <div className="max-w-[1170px] mx-auto px-5 md:px-6 text-center py-8 md:py-10">
//           {/* Heading */}
//           <h2 className="font-[Cardo] text-[22px] md:text-[25px] text-[#000] font-bold font-sans">
//             Welcome to Hamsini Silks
//           </h2>
//           {/* Paragraph */}
//           <p className="mt-2 md:mt-3 text-[16px] md:text-[18px] leading-[1.8] md:leading-[2] text-[#000] max-w-[320px] md:max-w-4xl mx-auto font-sans">
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
// import defaultImage from "../utils/homepage.jpg";
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
            {/* Desktop */}
            <img
  src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
  className="hidden md:block w-full h-full object-cover"
/>

            {/* Mobile */}
            <img
              src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920"
              alt="Hamsini Silks Mobile Banner 1"
              className="block md:hidden w-full h-full object-cover"
            />
          </div>

          {/* SLIDE 2 */}
          <div className="w-full h-[320px] md:h-[450px]">
            {/* Desktop */}
            <img
 src="/softsilk_saree.webp"
  className="hidden md:block w-full h-full object-cover"
/>

            {/* Mobile */}
            <img
              src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920"
              alt="Hamsini Silks Mobile Banner 2"
              className="block md:hidden w-full h-full object-cover"
            />
          </div>
        </Carousel>
      </section>

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
    </main>
  );
}

