// export const products = [
//   {
//     id: 1,
//     title: "Peacock Blue Patola Silk Cotton Saree",
//     category: "patola-silk-cotton",
//     price: 4410,
//     images: ["/p1.jpg", "/p1-hover.jpg"],
//     fabric: "Patola Pochampally",
//     inStock: true,
//     isNew: true,
//   },
//   {
//     id: 2,
//     title: "Pale Oak Patola Silk Cotton Saree",
//     category: "patola-silk-cotton",
//     price: 4410,
//     images: ["/p2.jpg", "/p2-hover.jpg"],
//     fabric: "Patola Pochampally",
//     inStock: true,
//     isNew: true,
//   },

//   {
//     id: 3,
//     title: "Soft Silk Saree",
//     category: "soft-silk",
//     price: 5890,
//     images: ["/soft1.jpg", "/soft2.jpg"],
//     fabric: "Soft Silk",
//     inStock: true,
//     isNew: false,
//   },

//   {
//     id: 4,
//     title: "Cotton Saree",
//     category: "cotton",
//     price: 1990,
//     images: ["/cotton1.jpg", "/cotton2.jpg"],
//     fabric: "Cotton",
//     inStock: true,
//     isNew: false,
//   },
// ];
export const products = [
  // PATOLA
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: `Patola Silk Cotton Saree ${i + 1}`,
    category: "patola-silk-cotton",
    price: 4200 + i * 100,
   images: ["https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543&width=1920", "https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543&width=1920"],
     inStock: i !== 5,
    date: 20240101 + i,
    isNew: true,
  })),

  // GEORGETTE
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: i + 7,
    title: `Georgette Laser Embroidery Saree ${i + 1}`,
    category: "georgette-sarees",
    price: 2500 + i * 300,
   images: ["https://tse1.mm.bing.net/th/id/OIP.1jcK8WLK0fWgYSvQmePjCQHaHa?pid=Api&P=0&h=180", "https://tse1.mm.bing.net/th/id/OIP.1jcK8WLK0fWgYSvQmePjCQHaHa?pid=Api&P=0&h=180"],
     inStock: true,
    date: 20240201 + i,
    isNew: i < 2,
  })),

  // SOFT SILK
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: i + 13,
    title: `Soft Silk Saree ${i + 1}`,
    category: "soft-silk",
    price: 5800 + i * 250,
    images: ["https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543&width=1920", "https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543&width=1920"],
    inStock: true,
    date: 20240301 + i,
    isNew: false,
  })),

  // COTTON
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: i + 19,
    title: `Cotton Saree ${i + 1}`,
    category: "bengal-cotton",
    price: 1800 + i * 150,
    images: ["https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543&width=1920", "https://www.psrsilks.com/cdn/shop/files/vaichitrya_kanjivaram.webp?v=1741094543&width=1920"],
        inStock: i % 2 === 0,
    date: 20240401 + i,
    isNew: false,
  })),

  // FANCY
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: i + 25,
    title: `Fancy Saree ${i + 1}`,
    category: "assam-sarees",
    price: 3500 + i * 200,
   images: ["https://tse1.mm.bing.net/th/id/OIP.1jcK8WLK0fWgYSvQmePjCQHaHa?pid=Api&P=0&h=180", "https://tse1.mm.bing.net/th/id/OIP.1jcK8WLK0fWgYSvQmePjCQHaHa?pid=Api&P=0&h=180"],
     inStock: true,
    date: 20240501 + i,
    isNew: true,
  })),


   ...Array.from({ length: 6 }).map((_, i) => ({
    id: i + 19,
    title: `Materials ${i + 1}`,
    category: "dress-materials",
    price: 1800 + i * 150,
  images: ["https://tse1.mm.bing.net/th/id/OIP.1jcK8WLK0fWgYSvQmePjCQHaHa?pid=Api&P=0&h=180", "https://tse1.mm.bing.net/th/id/OIP.1jcK8WLK0fWgYSvQmePjCQHaHa?pid=Api&P=0&h=180"],
      inStock: i % 2 === 0,
    date: 20240401 + i,
    isNew: false,
  })),
];
