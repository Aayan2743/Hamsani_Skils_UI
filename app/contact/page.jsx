// "use client";

// import { useState } from "react";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     alert("Thank you for contacting Hamsini Silks. We will get back to you shortly 🌸");

//     setFormData({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     });
//   }

//   return (
//     <main className="w-full bg-white text-gray-800">

//       {/* 🌍 GOOGLE MAP */}
//       <section className="w-full h-[420px]" aria-label="Store Location Map">
//         <iframe
//           title="Hamsini Silks Location"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.081981725011!2d78.3579!3d17.5183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c7283503ff%3A0x7cf5f4751c6aac90!2sMiyapur%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1709999999999"
//           width="100%"
//           height="100%"
//           loading="lazy"
//           className="border-0"
//         />
//       </section>

//       {/* 📞 CONTACT DETAILS */}
//       <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

//         {/* LEFT INFO */}
//         <div className="md:col-span-2 space-y-10">

//           <header>
//             <h1 className="text-3xl font-bold text-green-900 mb-4">
//               Contact Hamsini Silks
//             </h1>
//             <p className="text-gray-600">
//               We’d love to hear from you. Reach out for product enquiries,
//               custom orders, or store information.
//             </p>
//           </header>

//           <div>
//             <h3 className="text-lg font-semibold text-green-900 mb-2">
//               Our Address
//             </h3>
//             <p className="text-gray-700">
              
//               Hyderabad, Telangana – 500055
//             </p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-green-900 mb-2">
//               Phone
//             </h3>
//             <p className="text-gray-700">+91 9133616616</p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-green-900 mb-2">
//               Working Hours
//             </h3>
//             <p className="text-gray-700">Monday – Friday: 8:00 AM – 6:00 PM</p>
//             {/* <p className="text-gray-700">Saturday & Sunday: Closed</p> */}
//           </div>
//         </div>

//         {/* ✉️ CONTACT FORM */}
//         <div className="border-l border-gray-300 pl-10">
//           <h2 className="text-2xl font-bold text-green-900 mb-6">
//             Leave a Message
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
//               required
//             />

//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Your Email"
//               className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
//               required
//             />

//             <input
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               placeholder="Subject"
//               className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
//               required
//             />

//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="5"
//               placeholder="Your Message"
//               className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
//               required
//             />

//             <button
//               type="submit"
//               className="bg-green-800 text-white px-6 py-3 rounded-md hover:bg-green-900 transition"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* 💬 WHATSAPP FLOAT */}
//       <a
//         href="https://wa.me/918790876525"
//         aria-label="Chat with Hamsini Silks on WhatsApp"
//         className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:scale-105 transition"
//       >
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
//           alt="WhatsApp"
//           className="w-10 h-10"
//         />
//       </a>
//     </main>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import api from "../utils/apiInstance";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [contactData, setContactData] = useState(null);

//   /* ================= FETCH CONTACT SETTINGS ================= */

//   useEffect(() => {
//     async function fetchContact() {
//       try {
//         const res = await api.get("ecom/contact-setting");

//         if (res.data?.status) {
//           setContactData(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching contact settings:", error);
//       }
//     }

//     fetchContact();
//   }, []);

//   /* ================= FORM HANDLERS ================= */

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     alert("Thank you for contacting us. We will get back to you shortly 🌸");

//     setFormData({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     });
//   }
//    console.log("Contact data:", contactData); // Debug log
//   return (
//     <main className="w-full bg-white text-gray-800">

//       {/* GOOGLE MAP */}
//       {/* <section className="w-full h-[420px]" aria-label="Store Location Map">
//         <iframe
//           title="Hamsini Silks Location"
//           src={contactData?.google_map_url }
//           width="100%"
//           height="100%"
//           loading="lazy"
//           className="border-0"
//         />
//       </section> */}

//       {/* CONTACT DETAILS */}
//       <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

//         {/* LEFT INFO */}
//         <div className="md:col-span-2 space-y-10">

//           <header>
//             <h1 className="text-3xl font-bold text-green-900 mb-4">
//               {contactData?.title || "Contact Us"}
//             </h1>

//             <p className="text-gray-600">
//               {contactData?.description || "Loading..."}
//             </p>
//           </header>

//           {/* ADDRESS */}
//           <div>
//             <h3 className="text-lg font-semibold text-green-900 mb-2">
//               Our Address
//             </h3>
//             <p className="text-gray-700">
//               {contactData?.address || "Loading..."}
//             </p>
//           </div>

//           {/* PHONE */}
//           <div>
//             <h3 className="text-lg font-semibold text-green-900 mb-2">
//               Phone
//             </h3>
//             <p className="text-gray-700">
//               {contactData?.phone_1}
//               {contactData?.phone_2 && `, ${contactData.phone_2}`}
//             </p>
//           </div>

//           {/* WORKING HOURS */}
//           <div>
//             <h3 className="text-lg font-semibold text-green-900 mb-2">
//               Working Hours
//             </h3>
//             <p className="text-gray-700">
//               {contactData?.working_days} : {contactData?.working_hours}
//             </p>

//             <h3 className="text-lg font-semibold text-green-900 mt-2">
//               Weekend Note
//             </h3>

//             {contactData?.weekend_note && (
//               <p className="text-gray-600">
//                 {contactData.weekend_note}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* CONTACT FORM */}
//         <div className="border-l border-gray-300 pl-10">
//           <h2 className="text-2xl font-bold text-green-900 mb-6">
//             Leave a Message
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
//               required
//             />

//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Your Email"
//               className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
//               required
//             />

//             <input
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               placeholder="Subject"
//               className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
//               required
//             />

//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="5"
//               placeholder="Your Message"
//               className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
//               required
//             />

//             <button
//               type="submit"
//               className="bg-green-800 text-white px-6 py-3 rounded-md hover:bg-green-900 transition"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* WHATSAPP FLOAT */}
//       {contactData?.phone_1 && (
//         <a
//           href={`https://wa.me/${contactData.phone_1}`}
//           className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:scale-105 transition"
//         >
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
//             alt="WhatsApp"
//             className="w-10 h-10"
//           />
//         </a>
//       )}
//     </main>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import api from "../utils/apiInstance";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CONTACT SETTINGS ================= */

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await api.get("ecom/contact-setting");

        if (res.data?.status) {
          setContactData(res.data.data);
        }
      } catch (error) {
        // console.error("Error fetching contact settings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, []);

  /* ================= FORM HANDLERS ================= */

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Thank you for contacting us. We will get back to you shortly 🌸");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="w-full bg-white text-gray-800">

      {/* ================= GOOGLE MAP ================= */}
      {contactData?.google_map_url && (
        <section
          className="w-full h-[420px]"
          aria-label="Store Location Map"
        >
          <div
            className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
            dangerouslySetInnerHTML={{
              __html: contactData.google_map_url,
            }}
          />
        </section>
      )}

      {/* ================= CONTACT DETAILS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

        {/* LEFT INFO */}
        <div className="md:col-span-2 space-y-10">

          <header>
            <h1 className="text-3xl font-bold text-green-900 mb-4">
              {contactData?.title || "Contact Us"}
            </h1>

            <p className="text-gray-600">
              {loading ? "Loading..." : contactData?.description}
            </p>
          </header>

          {/* ADDRESS */}
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Our Address
            </h3>
            <p className="text-gray-700">
              {contactData?.address || "Loading..."}
            </p>
          </div>

          {/* PHONE */}
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Phone
            </h3>
            <p className="text-gray-700">
              {contactData?.phone_1}
              {contactData?.phone_2 && `, ${contactData.phone_2}`}
            </p>
          </div>

          {/* WORKING HOURS */}
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Working Hours
            </h3>
            <p className="text-gray-700">
              {contactData?.working_days} : {contactData?.working_hours}
            </p>

            {/* {contactData?.weekend_note && (
              <>
                <h3 className="text-lg font-semibold text-green-900 mt-4">
                  Weekend Note
                </h3>
                <p className="text-gray-600">
                  {contactData.weekend_note}
                </p>
              </>
            )} */}
          </div>
        </div>

        {/* ================= CONTACT FORM ================= */}
        <div className="border-l border-gray-300 pl-10">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Leave a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />

            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />

            <button
              type="submit"
              className="bg-green-800 text-white px-6 py-3 rounded-md hover:bg-green-900 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ================= WHATSAPP FLOAT ================= */}
      {contactData?.phone_1 && (
        <a
          href={`https://wa.me/${contactData.phone_1}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:scale-105 transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-10 h-10"
          />
        </a>
      )}
    </main>
  );
}
