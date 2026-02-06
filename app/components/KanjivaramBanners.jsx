
// 'use client';
// import { useRouter } from "next/navigation";

// import Image from 'next/image';

// export default function KanjivaramBanners() {
//   const router = useRouter();
//   return (
//     <>
//       {/* FONT */}
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap');
//         html,
//         body {
//           font-family: 'Cardo', serif;
//         }
//       `}</style>

//       <main className="w-full bg-white">

//         {/* ===== SECTION 1 ===== */}
//     {/* <section className="grid grid-cols-1 md:grid-cols-2 border border-[#2a2a2a]"> */}

// <section className="grid grid-cols-1 md:grid-cols-2">

//           {/* IMAGE */}
//           <div className="relative h-[220px] md:h-[600px] overflow-hidden group" style={{width:"100%"}}>
//             <Image
//               src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920"
//               alt="Bridal Kanjivaram"
//               fill
//               className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//             />
//           </div>

//           {/* CONTENT */}
//           <div className="flex items-center justify-center p-4 md:p-12">
//             <div className="max-w-md text-center py-4 md:py-16">
//              <h2 className="uppercase text-[22px] md:text-[28px] font-sans mb-3 md:mb-4 text-[#1f1f1f]">
//                 Bridal Kanjivaram
//               </h2>

//             <p className="text-[15px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] mb-8 md:mb-14 font-sans">

//                 Step into our exclusive Bridal Collection and find sarees that
//                 blend tradition with timeless glamour. Perfectly crafted for
//                 your special day, each piece is a masterpiece of style and grace.
//               </p>

//            <button
//   onClick={() => router.push(`/product?id=1`)}
//   className="inline-block bg-[#1f1f1f] text-white px-10 md:px-14 py-3 md:py-4 uppercase tracking-[0.1em] text-[14px] md:text-[18px] font-bold"
// >
//   Shop Now
// </button>

//             </div>
//           </div>
//         </section>

//         {/* ===== SECTION 2 ===== */}
//  {/* <section className="grid grid-cols-1 md:grid-cols-2 mt-8 border border-[#2a2a2a]"> */}
// <section className="grid grid-cols-1 md:grid-cols-2 mt-8">

//           {/* CONTENT */}
//           <div className="flex items-center justify-center p-4 md:p-12 order-2 md:order-1">
//             <div className="max-w-md text-center py-4 md:py-16">
//           <h2 className="uppercase text-[22px] md:text-[28px] font-bold font-sans mb-3 md:mb-4 text-[#1f1f1f]">
//   Shrestha Kanjivaram
// </h2>


//         <p className="text-[15px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] mb-8 md:mb-14 font-sans">
//   Elevate your style with the Shrestha Kanjivaram saree, a
//   masterpiece of luxurious silk and intricate zari craftsmanship.
//   Perfect for weddings and grand occasions.
// </p>


//            <button
//   onClick={() => router.push(`/product?id=2`)}
//   className="inline-block bg-[#1f1f1f] text-white px-10 md:px-14 py-3 md:py-4 uppercase tracking-[0.1em] text-[14px] md:text-[18px] font-bold"
// >
//   Shop Now
// </button>

//             </div>
//           </div>

//           {/* IMAGE */}
//           <div className="relative h-[220px] md:h-[600px] overflow-hidden group order-1 md:order-2">
//             <Image
//               src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
//               alt="Shrestha Kanjivaram"
//               fill
//               className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//             />
//           </div>
//         </section>

//         {/* ===== SECTION 3 ===== */}
//    {/* <section className="grid grid-cols-1 md:grid-cols-2 mt-8 border border-[#2a2a2a]"> */}
// <section className="grid grid-cols-1 md:grid-cols-2 mt-8">

//           {/* IMAGE */}
//           <div className="relative h-[220px] md:h-[600px] overflow-hidden group">
//             <Image
//               src="https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492"
//               alt="Smartika Kanjivaram"
//               fill
//               className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//             />
//           </div>

//           {/* CONTENT */}
//           <div className="flex items-center justify-center p-4 md:p-12">
//             <div className="max-w-md text-center py-4 md:py-16">
//            <h2 className="uppercase text-[22px] md:text-[28px] font-bold font-sans mb-3 md:mb-4 text-[#1f1f1f]">

//                 Smartika Kanjivaram
//               </h2>
//              <p className="text-[15px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] mb-8 md:mb-14 font-sans">
//                 Discover the timeless beauty of Traditional Kanchipuram Sarees,
//                 crafted with rich silks and intricate designs. Perfect for
//                 weddings and festive occasions, each saree reflects heritage
//                 and culture.
//               </p>

//            <button
//   onClick={() => router.push(`/product?id=3`)}
//   className="inline-block bg-[#1f1f1f] text-white px-10 md:px-14 py-3 md:py-4 uppercase tracking-[0.1em] text-[14px] md:text-[18px] font-bold"
// >
//   Shop Now
// </button>

//             </div>
//           </div>
//         </section>

//         {/* ===== SECTION 4 (md:mt-8 ONLY) ===== */}
//      {/* <section className="grid grid-cols-1 md:grid-cols-2 mt-8 border border-[#2a2a2a]"> */}
// {/* <section className="grid grid-cols-1 md:grid-cols-2 mt-8 border-0 md:border md:border-[#2a2a2a]"> */}
// <section className="grid grid-cols-1 md:grid-cols-2 mt-8  md:pb-8 ">

//           {/* CONTENT */}
//           <div className="flex items-center justify-center p-4 md:p-12 order-2 md:order-1">
//             <div className="max-w-md text-center py-4 md:py-16">
//             <h2 className="uppercase text-[22px] md:text-[28px] font-bold mb-3 md:mb-4 text-[#1f1f1f]">

//                 Vaichitrya Kanjivaram
//               </h2>

//               <p className="text-[15px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] mb-8 md:mb-14">

//                 A stunning blend of vibrant colours, intricate designs and
//                 unmatched elegance, designed for statement occasions.
//               </p>

//           <button
//   onClick={() => router.push(`/product?id=4`)}
//   className="inline-block bg-[#1f1f1f] text-white px-10 md:px-14 py-3 md:py-4 uppercase tracking-[0.1em] text-[14px] md:text-[18px] font-bold"
// >
//   Shop Now
// </button>

//             </div>
//           </div>

//           {/* IMAGE */}
//           <div className="relative h-[220px] md:h-[600px] overflow-hidden group order-1 md:order-2">
//             <Image
//               src="https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543"
//               alt="Vaichitrya Kanjivaram"
//               fill
//               className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//             />
//           </div>
//         </section>

//       </main>
//     </>
//   );
// }



'use client';
import { useRouter } from "next/navigation";

import Image from 'next/image';

export default function KanjivaramBanners() {
  const router = useRouter();
  return (
    <>
      {/* FONT */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap');
        html,
        body {
          font-family: 'Cardo', serif;
        }
      `}</style>

      <main className="w-full bg-white">

        {/* ===== SECTION 1 ===== */}
    {/* <section className="grid grid-cols-1 md:grid-cols-2 border border-[#2a2a2a]"> */}

<section className="grid grid-cols-1 md:grid-cols-2 border-0">

          {/* IMAGE */}
          <div className="relative h-[220px] md:h-[600px] overflow-hidden group">
            <Image
              src="https://www.psrsilks.com/cdn/shop/files/bridal.webp?v=1741094381&width=1920"
              alt="Bridal Kanjivaram"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>

          {/* CONTENT */}
          <div className="flex items-center justify-center p-4 md:p-12">
            <div className="max-w-md text-center py-4 md:py-16">
             <h2 className="uppercase text-[22px] md:text-[28px] font-bold mb-3 md:mb-4 text-[#1f1f1f]">

                Bridal Kanjivaram
              </h2>

            <p className="text-[15px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] mb-8 md:mb-14">

                Step into our exclusive Bridal Collection and find sarees that
                blend tradition with timeless glamour. Perfectly crafted for
                your special day, each piece is a masterpiece of style and grace.
              </p>

           <button
  onClick={() => router.push(`/product?id=1`)}
  className="inline-block bg-[#1f1f1f] text-white px-10 md:px-14 py-3 md:py-4 uppercase tracking-[0.1em] text-[14px] md:text-[18px] font-bold"
>
  Shop Now
</button>

            </div>
          </div>
        </section>

        {/* ===== SECTION 2 ===== */}
 {/* <section className="grid grid-cols-1 md:grid-cols-2 mt-8 border border-[#2a2a2a]"> */}
<section className="grid grid-cols-1 md:grid-cols-2 mt-8 ">

          {/* CONTENT */}
          <div className="flex items-center justify-center p-4 md:p-12 order-2 md:order-1">
            <div className="max-w-md text-center py-4 md:py-16">
           <h2 className="uppercase text-[22px] md:text-[28px] font-bold mb-3 md:mb-4 text-[#1f1f1f]">

                Shrestha Kanjivaram
              </h2>

         <p className="text-[15px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] mb-8 md:mb-14">

                Elevate your style with the Shrestha Kanjivaram saree, a
                masterpiece of luxurious silk and intricate zari craftsmanship.
                Perfect for weddings and grand occasions.
              </p>

           <button
  onClick={() => router.push(`/product?id=2`)}
  className="inline-block bg-[#1f1f1f] text-white px-10 md:px-14 py-3 md:py-4 uppercase tracking-[0.1em] text-[14px] md:text-[18px] font-bold"
>
  Shop Now
</button>

            </div>
          </div>

          {/* IMAGE */}
          <div className="relative h-[220px] md:h-[600px] overflow-hidden group order-1 md:order-2">
            <Image
              src="https://www.psrsilks.com/cdn/shop/files/shrestha_kanjivaram.webp?v=1741094440"
              alt="Shrestha Kanjivaram"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        </section>
        {/* ===== SECTION 3 ===== */}
   {/* <section className="grid grid-cols-1 md:grid-cols-2 mt-8 border border-[#2a2a2a]"> */}
<section className="grid grid-cols-1 md:grid-cols-2 mt-8">

          {/* IMAGE */}
          <div className="relative h-[220px] md:h-[600px] overflow-hidden group">
            <Image
              src="https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492"
              alt="Smartika Kanjivaram"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>

          {/* CONTENT */}
          <div className="flex items-center justify-center p-4 md:p-12">
            <div className="max-w-md text-center py-4 md:py-16">
           <h2 className="uppercase text-[22px] md:text-[28px] font-bold mb-3 md:mb-4 text-[#1f1f1f]">

                Smartika Kanjivaram
              </h2>

             <p className="text-[15px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] mb-8 md:mb-14">

                Discover the timeless beauty of Traditional Kanchipuram Sarees,
                crafted with rich silks and intricate designs. Perfect for
                weddings and festive occasions, each saree reflects heritage
                and culture.
              </p>

           <button
  onClick={() => router.push(`/product?id=3`)}
  className="inline-block bg-[#1f1f1f] text-white px-10 md:px-14 py-3 md:py-4 uppercase tracking-[0.1em] text-[14px] md:text-[18px] font-bold"
>
  Shop Now
</button>

            </div>
          </div>
        </section>

        {/* ===== SECTION 4 (md:mt-8 ONLY) ===== */}
     {/* <section className="grid grid-cols-1 md:grid-cols-2 mt-8 border border-[#2a2a2a]"> */}
{/* <section className="grid grid-cols-1 md:grid-cols-2 mt-8 border-0 md:border md:border-[#2a2a2a]"> */}
<section className="grid grid-cols-1 md:grid-cols-2 mt-8  md:pb-8 border-0 md:border md:border-[#2a2a2a]">

          {/* CONTENT */}
          <div className="flex items-center justify-center p-4 md:p-12 order-2 md:order-1">
            <div className="max-w-md text-center py-4 md:py-16">
            <h2 className="uppercase text-[22px] md:text-[28px] font-bold mb-3 md:mb-4 text-[#1f1f1f]">

                Vaichitrya Kanjivaram
              </h2>

              <p className="text-[15px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] mb-8 md:mb-14">

                A stunning blend of vibrant colours, intricate designs and
                unmatched elegance, designed for statement occasions.
              </p>

          <button
  onClick={() => router.push(`/product?id=4`)}
  className="inline-block bg-[#1f1f1f] text-white px-10 md:px-14 py-3 md:py-4 uppercase tracking-[0.1em] text-[14px] md:text-[18px] font-bold"
>
  Shop Now
</button>

            </div>
          </div>

          {/* IMAGE */}
          <div className="relative h-[220px] md:h-[600px] overflow-hidden group order-1 md:order-2">
            <Image
              src="https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543"
              alt="Vaichitrya Kanjivaram"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        </section>

      </main>
    </>
  );
}
