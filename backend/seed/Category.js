const Category = require("../models/Category");

// const categories = [
//   { _id: "65a7e24602e12c44f599442c", name: "smartphones" },
//   { _id: "65a7e24602e12c44f599442d", name: "laptops" },
//   { _id: "65a7e24602e12c44f599442e", name: "fragrances" },
//   { _id: "65a7e24602e12c44f599442f", name: "skincare" },
//   { _id: "65a7e24602e12c44f5994430", name: "groceries" },
//   { _id: "65a7e24602e12c44f5994431", name: "home-decoration" },
//   { _id: "65a7e24602e12c44f5994432", name: "furniture" },
//   { _id: "65a7e24602e12c44f5994433", name: "tops" },
//   { _id: "65a7e24602e12c44f5994434", name: "womens-dresses" },
//   { _id: "65a7e24602e12c44f5994435", name: "womens-shoes" },
//   { _id: "65a7e24602e12c44f5994436", name: "mens-shirts" },
//   { _id: "65a7e24602e12c44f5994437", name: "mens-shoes" },
//   { _id: "65a7e24602e12c44f5994438", name: "mens-watches" },
//   { _id: "65a7e24602e12c44f5994439", name: "womens-watches" },
//   { _id: "65a7e24602e12c44f599443a", name: "womens-bags" },
//   { _id: "65a7e24602e12c44f599443b", name: "womens-jewellery" },
//   { _id: "65a7e24602e12c44f599443c", name: "sunglasses" },
//   { _id: "65a7e24602e12c44f599443d", name: "automotive" },
//   { _id: "65a7e24602e12c44f599443e", name: "motorcycle" },
//   { _id: "65a7e24602e12c44f599443f", name: "lighting" },
// ];




const categories = [
  {
    _id: "65a7e24602e12c44f5994431",
    name: "home-decoration",
    image: "https://www.pngall.com/wp-content/uploads/5/Home-Interior-Design-Transparent.png",
  },
  {
    _id: "65a7e24602e12c44f599442c",
    name: "smartphones",
    image: "https://www.pngmart.com/files/15/Apple-iPhone-12-PNG-HD.png",
  },
  {
    _id: "65a7e24602e12c44f599442d",
    name: "laptops",
    image: "https://pngimg.com/uploads/laptop/laptop_PNG5930.png",
  },
  {
    _id: "65a7e24602e12c44f599442e",
    name: "fragrances",
    image: "https://static.vecteezy.com/system/resources/previews/042/388/788/original/ai-generated-fragrance-jar-on-transparent-background-png.png",
  },
  {
    _id: "65a7e24602e12c44f599442f",
    name: "skincare",
    image: "https://png.pngtree.com/png-clipart/20230425/original/pngtree-skin-care-products-flower-illustration-png-image_9096595.png",
  },
  {
    _id: "65a7e24602e12c44f5994430",
    name: "groceries",
    image: "https://th.bing.com/th/id/R.047a5914fa9b82efa9317d0416469088?rik=PrCF8Q8iC3Mb0Q&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f4%2fGrocery-PNG-Picture.png&ehk=3jqTlIrpQADpJbHbfy9lUi0bE23GHoPymw6SGlkfVrw%3d&risl=&pid=ImgRaw&r=0", // Represents grocery shopping
  },

  {
    _id: "65a7e24602e12c44f5994432",
    name: "furniture",
    image: "https://th.bing.com/th/id/R.ec97c7b1ec771bf6b8ecd1e80fffd3ef?rik=rUS3d6FzL%2fEelw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f06%2fFurniture-PNG-Picture.png&ehk=OQ33QdpU1Ld9xbM8Lu6S9K6ZLyeesKuNRY6DqE8ZzJY%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    _id: "65a7e24602e12c44f5994433",
    name: "tops",
    image: "https://pngimg.com/uploads/tshirt/tshirt_PNG5430.png",
  },
  {
    _id: "65a7e24602e12c44f5994434",
    name: "womens-dresses",
    image: "https://freepngimg.com/thumb/dress/31470-4-dress-transparent-image.png",
  },
  {
    _id: "65a7e24602e12c44f5994435",
    name: "womens-shoes",
    image: "https://www.pngplay.com/wp-content/uploads/15/Black-Heel-Women-Shoe-Transparent-Images.png",
  },
  {
    _id: "65a7e24602e12c44f5994436",
    name: "mens-shirts",
    image: "https://th.bing.com/th/id/R.a1b8b75fbde16a117d84114859fe779c?rik=hsLWDj4KZ%2f0%2fTg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fshirt-png-hd-dress-shirt-png-image-798.png&ehk=RNdcxdaBZgarS1Isr2Zq0VAzYv2dnJS7gghx8c2BevY%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    _id: "65a7e24602e12c44f5994437",
    name: "mens-shoes",
    image: "https://www.pngall.com/wp-content/uploads/5/Men-Shoes.png",
  },
  {
    _id: "65a7e24602e12c44f5994438",
    name: "mens-watches",
    image: "https://pngimg.com/uploads/watches/watches_PNG101421.png",
  },
  {
    _id: "65a7e24602e12c44f5994439",
    name: "womens-watches",
    image: "https://pngimg.com/uploads/watches/watches_PNG9879.png",
  },
  {
    _id: "65a7e24602e12c44f599443a",
    name: "womens-bags",
    image: "https://pngimg.com/uploads/women_bag/women_bag_PNG6422.png",
  },
  // {
  //   _id: "65a7e24602e12c44f599443b",
  //   name: "womens-jewellery",
  //   image: "https://th.bing.com/th/id/OIP.m1q1cROKk212RVyHTpbRwwHaFS?rs=1&pid=ImgDetMain",
  // },
  {
    _id: "65a7e24602e12c44f599443c",
    name: "sunglasses",
    image: "https://pngimg.com/uploads/sunglasses/sunglasses_PNG124.png",
  },
  // {
  //   _id: "65a7e24602e12c44f599443f",
  //   name: "lighting",
  //   image: "https://pngimg.com/uploads/lamp/lamp_PNG101224.png",
  // },
];





exports.seedCategory = async () => {
  try {
    await Category.deleteMany(); // ✅ ensures no conflict
    await Category.insertMany(categories);
    console.log("✅ Categories seeded!");
  } catch (error) {
    console.log("❌ Category Seed Error:", error);
  }
};

