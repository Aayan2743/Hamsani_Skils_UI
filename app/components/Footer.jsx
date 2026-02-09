
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaPinterestP,
//   FaYoutube,
//   FaXTwitter,
// } from "react-icons/fa6";

// /* ================= FOOTER NAV DATA ================= */

// const footerLinks = [
//   {
//     title: "PSR SILK SAREES",
//     items: [
//       { label: "Home", href: "/" },
//       { label: "Events", href: "/events" },
//       { label: "About Us", href: "/about" },
//       { label: "Blogs", href: "/blogs" },
//       // { label: "Perception", href: "/perception" },
//       { label: "Store Locator", href: "/store" },
//       // { label: "Showroom Stories", href: "/showroom-stories" },
//     ],
//   },
//   {
//     title: "OUR POLICIES",
//     items: [
//       { label: "FAQ's", href: "/faqs" },
//       { label: "Disclaimer", href: "/disclaimer" },
//       { label: "Privacy Policy", href: "/privacy-policy" },
//       { label: "Shipping Policy", href: "/shipping-policy" },
//       // { label: "Safety & Silk Tips", href: "/silk-tips" },
//       { label: "Terms & Conditions", href: "/terms" },
//       { label: "Exchange & Return Policy", href: "/returns" },
//     ],
//   },
//   {
//     title: "REACH US",
//     items: [
     
    
//       { label: "Contact Us", href: "/contact" },
     
//     ],
//   },
 
// ];
// const customerCare = {
//   title: "CUSTOMER CARE",
//   items: [
//     "Time : 10 Am – 7 Pm",
//     "Working Days : Mon – Sat",
//     "Whatsapp : 7540005884",
//     "Customercare@hamishinisilks.in",
//   ],
// };

// const socialLinks = [
//   { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61587415783400#" },
//   { icon: <FaInstagram />, href: "https://www.instagram.com/hamsinisilks/?hl=en" },
//   // { icon: <FaPinterestP />, href: "/" },
//   // { icon: <FaYoutube />, href: "/" },
//   // { icon: <FaXTwitter />, href: "/" },
// ];

// /* ================= COMPONENT ================= */

// export default function Footer() {
//   const [open, setOpen] = useState(null);

//   const toggle = (title) => {
//     setOpen(open === title ? null : title);
//   };

//   const heading =
//   "uppercase text-[18px] font-bold tracking-[0.02em] mb-6 font-sans";

// const link =
//   "text-[14px] leading-[32px] tracking-[0.02em] text-[#f8f8f8] hover:underline block font-sans";


//   return (
//     <footer className="bg-[#232323] text-[#f8f8f8]">
//       <div className="max-w-[1200px] mx-auto px-6 py-[50px]">

//         {/* ================= DESKTOP ================= */}
//        <div className="hidden md:grid grid-cols-5 gap-12">

//   {/* DYNAMIC SECTIONS */}
//   {footerLinks.slice(0, 3).map((section) => (
//     <div key={section.title}>
//       <h3 className={heading}>{section.title}</h3>

//       {section.items.map((item) => (
//         <Link key={item.label} href={item.href} className={link}>
//           {item.label}
//         </Link>
//       ))}
//     </div>
//   ))}

//   {/* CUSTOMER CARE – STATIC (NO LINKS) */}
//   <div>
//     <h3 className={heading}>CUSTOMER CARE</h3>

//     {[
      
//       "Time : 10 Am – 7 Pm",
//       "Working Days : Mon – Sat",
//       "Whatsapp : 7540005884",
//       "Customercare@hamishinisilks.in",
//     ].map((i) => (
//       <p key={i} className={link}>
//         {i}
//       </p>
//     ))}
//   </div>

//   {/* CERTIFICATION */}
//   <div className="flex items-start">
//     <Image
//       src="/footer/silkmark.png"
//       width={280}
//       height={80}
//       alt="Silk Mark Certification"
//     />
//   </div>

// </div>


//         {/* NEWSLETTER + SOCIAL (DESKTOP) */}
//         <div className="hidden md:flex justify-between items-center mt-16">
//           <div className="flex items-center gap-6">
//             <h3 className="text-[20px] font-bold font-sans">Newsletter Sign Up</h3>
//             <input
//               className="px-4 py-3 text-black w-[260px] bg-white"
//               placeholder="Enter your Email address"
//             />
//             <button className="border border-white px-10 py-3 uppercase font-bold font-sans">
//               Submit
//             </button>
//           </div>

//           <div>
//             <h3 className="uppercase font-bold mb-4 font-sans">
//               Follow us on social
//             </h3>
//             <div className="flex gap-4">
//               {socialLinks.map((item, i) => (
//                 <a
//                   key={i}
//                   href={item.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-10 h-10 bg-white text-black flex items-center justify-center text-lg hover:opacity-80 transition"
//                 >
//                   {item.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ================= MOBILE ================= */}
//         <div className="md:hidden space-y-2">

//           {footerLinks.map((section) => (
//             <div
//               key={section.title}
//               className="border-b border-gray-600 py-4"
//             >
//               <button
//                 onClick={() => toggle(section.title)}
//                 className="w-full flex justify-between items-center uppercase text-[18px] font-bold"
//               >
//                 {section.title}
//                 <span>{open === section.title ? "−" : "+"}</span>
//               </button>

//               {open === section.title && (
//                 <div className="mt-3">
//                   {section.items.map((item) => (
//                     <Link
//                       key={item.label}
//                       href={item.href}
//                       className={link}
//                     >
//                       {item.label}
//                     </Link>
//                   ))}

//                 </div>
//               )}
//             </div>
//           ))}
//  {/* CUSTOMER CARE – STATIC (NO LINKS) */}
//  {/* MOBILE CUSTOMER CARE (TOGGLE) */}
// <div className="border-b border-gray-600 py-4">
//   <button
//     onClick={() => toggle(customerCare.title)}
//     className="w-full flex justify-between items-center uppercase text-[18px] font-bold"
//   >
//     {customerCare.title}
//     <span>{open === customerCare.title ? "−" : "+"}</span>
//   </button>

//   {open === customerCare.title && (
//     <div className="mt-3">
//       {customerCare.items.map((item) => (
//         <p key={item} className={link}>
//           {item}
//         </p>
//       ))}
//     </div>
//   )}
// </div>

//           {/* MOBILE CERTIFICATION */}
//           <div className="flex justify-center pt-6">
//             <Image
//               src="/footer/silkmark.png"
//               width={360}
//               height={90}
//               alt="Silk Mark Certification"
//             />
//           </div>

//           {/* MOBILE NEWSLETTER */}
//           <div className="pt-6">
//             <h3 className="font-bold mb-3">Newsletter Sign Up</h3>
//             <div className="flex flex-col gap-3">
//               <input
//                 className="px-3 py-3 text-black bg-white"
//                 placeholder="Enter your Email address"
//               />
//               <button className="border border-white py-3 uppercase">
//                 Submit
//               </button>
//             </div>
//           </div>

//           {/* MOBILE SOCIAL */}
//           <div className="pt-6 pb-6">
//             <h3 className="uppercase font-bold mb-4">
//               Follow us on social
//             </h3>
//             <div className="flex justify-center gap-6">
//               {socialLinks.map((item, i) => (
//                 <a
//                   key={i}
//                   href={item.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-12 h-12 bg-white text-black flex items-center justify-center text-xl hover:opacity-80 transition"
//                 >
//                   {item.icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// }


"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";

/* ================= FOOTER NAV DATA ================= */

const footerLinks = [
  {
    title: "PSR SILK SAREES",
    items: [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
      { label: "About Us", href: "/about" },
      { label: "Blogs", href: "/blogs" },
      { label: "Store Locator", href: "/store" },
    ],
  },
  {
    title: "OUR POLICIES",
    items: [
      { label: "FAQ's", href: "/faqs" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Exchange & Return Policy", href: "/returns" },
    ],
  },
  {
    title: "REACH US",
    items: [
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const customerCare = {
  title: "CUSTOMER CARE",
  items: [
    "Time : 10 Am – 7 Pm",
    "Working Days : Mon – Sat",
    "Whatsapp : 7540005884",
    "Customercare@hamishinisilks.in",
  ],
};

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61587415783400#" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/hamsinisilks/?hl=en" },
];

/* ================= COMPONENT ================= */

export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (title) => {
    setOpen(open === title ? null : title);
  };

  const heading =
    "uppercase text-[18px] font-bold tracking-[0.02em] mb-6 font-sans";

  const link =
    "text-[14px] leading-[32px] tracking-[0.02em] text-[#f8f8f8] hover:underline block font-sans";

  return (
    <footer className="bg-[#5a0f1c] text-[#f8f8f8]">
      <div className="max-w-[1200px] mx-auto px-6 py-[50px]">

        {/* DESKTOP */}
        <div className="hidden md:grid grid-cols-5 gap-12">

          {footerLinks.slice(0, 3).map((section) => (
            <div key={section.title}>
              <h3 className={heading}>{section.title}</h3>

              {section.items.map((item) => (
                <Link key={item.label} href={item.href} className={link}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          {/* CUSTOMER CARE */}
          <div>
            <h3 className={heading}>CUSTOMER CARE</h3>
            {customerCare.items.map((i) => (
              <p key={i} className={link}>
                {i}
              </p>
            ))}
          </div>

          {/* CERTIFICATION */}
          <div className="flex items-start">
            <Image
              src="/footer/silkmark.png"
              width={280}
              height={80}
              alt="Silk Mark Certification"
            />
          </div>
        </div>

        {/* NEWSLETTER + SOCIAL (DESKTOP) */}
        <div className="hidden md:flex justify-between items-center mt-16">
          <div className="flex items-center gap-6">
            <h3 className="text-[20px] font-bold font-sans">Newsletter Sign Up</h3>
            <input
              className="px-4 py-3 text-black w-[260px] bg-white"
              placeholder="Enter your Email address"
            />
            <button className="border border-white px-10 py-3 uppercase font-bold font-sans">
              Submit
            </button>
          </div>

          <div>
            <h3 className="uppercase font-bold mb-4 font-sans">
              Follow us on social
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white text-black flex items-center justify-center text-lg hover:opacity-80 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden space-y-2">

          {footerLinks.map((section) => (
            <div key={section.title} className="border-b border-gray-400 py-4">
              <button
                onClick={() => toggle(section.title)}
                className="w-full flex justify-between items-center uppercase text-[18px] font-bold"
              >
                {section.title}
                <span>{open === section.title ? "−" : "+"}</span>
              </button>

              {open === section.title && (
                <div className="mt-3">
                  {section.items.map((item) => (
                    <Link key={item.label} href={item.href} className={link}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* MOBILE CUSTOMER CARE */}
          <div className="border-b border-gray-400 py-4">
            <button
              onClick={() => toggle(customerCare.title)}
              className="w-full flex justify-between items-center uppercase text-[18px] font-bold"
            >
              {customerCare.title}
              <span>{open === customerCare.title ? "−" : "+"}</span>
            </button>

            {open === customerCare.title && (
              <div className="mt-3">
                {customerCare.items.map((item) => (
                  <p key={item} className={link}>
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE CERTIFICATION */}
          <div className="flex justify-center pt-6">
            <Image
              src="/footer/silkmark.png"
              width={360}
              height={90}
              alt="Silk Mark Certification"
            />
          </div>

          {/* MOBILE NEWSLETTER */}
          <div className="pt-6">
            <h3 className="font-bold mb-3">Newsletter Sign Up</h3>
            <div className="flex flex-col gap-3">
              <input
                className="px-3 py-3 text-black bg-white"
                placeholder="Enter your Email address"
              />
              <button className="border border-white py-3 uppercase">
                Submit
              </button>
            </div>
          </div>

          {/* MOBILE SOCIAL */}
          <div className="pt-6 pb-6">
            <h3 className="uppercase font-bold mb-4">
              Follow us on social
            </h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white text-black flex items-center justify-center text-xl hover:opacity-80 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

