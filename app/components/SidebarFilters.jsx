


// "use client";

// export default function SidebarFilters({
//   stockFilter,
//   setStockFilter,
//   inStock,
//   setInStock,
  
//   price,
//   setPrice,
//   applyPrice,
// }) {
//   return (
//     <aside className="w-[260px] space-y-10 text-black">

//       {/* AVAILABILITY */}
//     <div>
//         <h3 className="font-semibold mb-4 font-sans">AVAILABILITY</h3>
//         <label className="block text-sm">
//           <input
//             type="checkbox"
//             checked={inStock === true}
//             onChange={() => setInStock(inStock === true ? null : true)}
//           />{" "}
//           In Stock
//         </label>
//         <label className="block text-sm">
//           <input
//             type="checkbox"
//             checked={inStock === false}
//             onChange={() => setInStock(inStock === false ? null : false)}
//           />{" "}
//           Out Of Stock
//         </label>
//       </div>


//       {/* PRICE */}
//       <div>
//         <h3 className="font-semibold border-b pb-2 mb-4">
//           PRICE
//         </h3>

//         <input
//           type="range"
//           min={0}
//           max={10000}
//           value={price.max}
//           onChange={(e) =>
//             setPrice({ ...price, max: Number(e.target.value) })
//           }
//           className="w-full accent-blue-600 cursor-pointer"
//         />

//         <div className="flex justify-between text-sm mt-2">
//           <span>₹ {price.min}</span>
//           <span>₹ {price.max}</span>
//         </div>

//         <button
//           onClick={applyPrice}
//           className="w-full bg-blue-800 text-white py-3 mt-4"
//         >
//           APPLY
//         </button>

//           <div>
//         <h3 className="font-semibold border-b pb-2 mb-4 mt-6">
//           SILK SAREE'S 
//         </h3>
//         <img src="https://www.psrsilks.com/cdn/shop/files/smarthika_kanjivaram.webp?v=1741094492&width=1920" alt="Weaving Silk Saree" />
//       </div>
//       </div>
//     </aside>
//   );
// }


"use client";

export default function SidebarFilters({
  stockFilter,
  setStockFilter,
  inStock,
  setInStock,
  price,
  setPrice,
  applyPrice,
}) {
  return (
    <aside className="w-full lg:w-[260px] space-y-10 text-black font-sans">
      {/* AVAILABILITY */}
      {/* <div>
        <h3 className="font-semibold mb-4 font-sans">AVAILABILITY</h3>

        <label className="block text-sm font-sans">
          <input
            type="checkbox"
            checked={inStock === true}
            onChange={() => setInStock(inStock === true ? null : true)}
          />{" "}
          In Stock
        </label>

        <label className="block text-sm font-sans">
          <input
            type="checkbox"
            checked={inStock === false}
            onChange={() => setInStock(inStock === false ? null : false)}
          />{" "}
          Out Of Stock
        </label>
      </div> */}
      {/* PRICE */}
      <div>
        <h3 className="font-semibold border-b pb-2 mb-4 font-sans">
          PRICE
        </h3>
        <input
          type="range"
          min={0}
          max={10000}
          value={price.max}
          onChange={(e) =>
            setPrice({ ...price, max: Number(e.target.value) })
          }
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-2 font-sans">
          <span>₹ {price.min}</span>
          <span>₹ {price.max}</span>
        </div>

        <button
          onClick={applyPrice}
          className="w-full bg-blue-800 text-white py-3 mt-4 font-sans"
        >
          APPLY
        </button>
        <div>
  
        </div>
      </div>
    </aside>
  );
}

