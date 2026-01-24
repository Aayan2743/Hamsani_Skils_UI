



export default function HeroSection() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO IMAGE */}
      <section className="relative w-full">
        {/* Desktop Image */}
        <img
          src="https://www.psrsilks.com/cdn/shop/files/main_banner_header_copy_aeb79531-363d-4f59-ac96-82df1363648f.webp"
          alt="PSR Silks Banner"
          className="hidden md:block w-full object-cover"
        />

        {/* Mobile Image */}
        <img
          src="https://www.psrsilks.com/cdn/shop/files/header_mobile_size_copy_2a452766-c801-46b6-ba68-70531ca343a0.webp"
          alt="PSR Silks Mobile Banner"
          className="block md:hidden w-full object-cover"
        />
      </section>

      {/* TEXT SECTION */}
      <section className="bg-white">
        <div className="max-w-[1170px] mx-auto px-5 md:px-6 text-center py-8 md:py-10">
          {/* Heading */}
          <h2 className="font-[Cardo] text-[22px] md:text-[25px] text-[#000] font-bold">
            Welcome to Hamsini Silks
          </h2>

          {/* Paragraph */}
          <p className="mt-2 md:mt-3 text-[16px] md:text-[18px] leading-[1.8] md:leading-[2] text-[#000] max-w-[320px] md:max-w-4xl mx-auto">
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
