// import Image from "next/image";

// export default function EventsPage() {
//   return (
//     <main className="bg-white py-10 px-4">

//       {/* Primary SEO Heading */}
//       <h1 className="text-2xl font-bold tracking-wide mb-6">
//         Hamsini Skills – Upcoming Events & Training Programs
//       </h1>

//       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* EVENT 1 */}
//         <article className="border-2 border-gray-300 p-4">
//           <div className="flex flex-col h-full">

//             <Image
//               src="/images/hamsini-event-1.jpg"
//               alt="Hamsini Skills Professional Training Workshop"
//               width={600}
//               height={400}
//               className="w-full h-[320px] object-cover"
//               priority
//             />

//             <div className="mt-4">
//               <h2 className="text-xl font-semibold">
//                 Professional Skill Development Workshop
//               </h2>

//               <p className="text-gray-700 mt-2">
//                 Organized by <strong>Hamsini Skills</strong>, this workshop focuses on
//                 enhancing industry-ready professional and technical skills.
//               </p>

//               <p className="mt-3 text-sm">
//                 <strong>Date:</strong> 18 – 20 April 2025
//               </p>

//               <p className="text-sm">
//                 <strong>Time:</strong> 10:00 AM – 5:00 PM
//               </p>

//               <address className="not-italic text-sm text-gray-600 mt-2">
//                 Training Center, India
//               </address>
//             </div>
//           </div>
//         </article>

//         {/* EVENT 2 */}
//         <article className="border-2 border-gray-300 p-4">
//           <div className="flex flex-col h-full">

//             <Image
//               src="/images/hamsini-event-2.jpg"
//               alt="Hamsini Skills Career Training Exhibition"
//               width={600}
//               height={400}
//               className="w-full h-[320px] object-cover"
//             />

//             <div className="mt-4">
//               <h2 className="text-xl font-semibold">
//                 Career Training & Skills Exhibition
//               </h2>

//               <p className="text-gray-700 mt-2">
//                 A comprehensive <strong>Hamsini Skills</strong> exhibition showcasing
//                 training programs, certifications, and career development paths.
//               </p>

//               <p className="mt-3 text-sm">
//                 <strong>Date:</strong> 25 April 2025
//               </p>

//               <p className="text-sm">
//                 <strong>Time:</strong> 9:30 AM – 6:00 PM
//               </p>

//               <address className="not-italic text-sm text-gray-600 mt-2">
//                 Exhibition Hall, India
//               </address>
//             </div>
//           </div>
//         </article>

//       </section>
//     </main>
//   );
// }







import Image from "next/image";

export const metadata = {
  title: "Hamsini Silk Sarees Exhibition Sale | Upcoming Event",
  description:
    "Hamsini Silk Sarees Exhibition Sale featuring Kanchipuram silk, cotton sarees, fancy sarees and salwar materials. Dates, venue and timings available.",
};

export default function EventsPage() {
  return (
    <main className="bg-white">
 <section className=" py-10 text-center text-white">
  <h1 className="text-4xl font-bold text-green-600">Events</h1>
</section>

      {/* SINGLE EVENT POSTER */}
      <section className="max-w-5xl mx-auto">
        <article className="border border-[#c9a66b] p-3">

          <Image
            src="/evnts.png" // <-- your single poster image
            alt="hamsini Silk Sarees Exhibition Sale at Cumbum from 18 April to 20 April 2025"
            width={900}
            height={1300}
            className="w-full h-auto"
            priority
          />

          {/* SEO CONTENT – NOT VISIBLE */}
          <div className="sr-only">
            <h2>hamsini Silk Sarees Exhibition Sale</h2>
            <p>Date: 18 April 2025 to 20 April 2025</p>
            <p>Time: 10 AM to 8 PM</p>
            <p>
              Venue: Hotel Thatti Vilas, Meeting Hall A/C,
              No.250, L.F. Kumuli Main Road, Near Thambee Theater,
              Cumbum – 625516
            </p>
            <p>
              Categories: Silk Sarees, Cotton Sarees, Fancy Sarees,
              Salwar Materials
            </p>
            <p>
              Regions: Tamil Nadu, Puducherry, Karnataka
            </p>
          </div>

        </article>
      </section>

    </main>
  );
}
