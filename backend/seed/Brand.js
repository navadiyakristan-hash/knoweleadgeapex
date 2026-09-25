const Brand = require("../models/Brand");



const brands = [
  { _id: "65a7e20102e12c44f59943da", name: "GARNIER" ,  image:"https://th.bing.com/th/id/OIP.rSi-h6166IA2L2VppaYQGgHaBx?rs=1&pid=ImgDetMain" },
  { _id: "65a7e20102e12c44f59943db", name: "Samsung", image :"https://th.bing.com/th/id/R.249bdf90ed25ef2b97a6aa5c23d994a9?rik=QAjvvpnUKsoDLg&riu=http%3a%2f%2fpngimg.com%2fuploads%2fsamsung_logo%2fsamsung_logo_PNG9.png&ehk=%2fW9ePMTHHsVS0slRmdPhqpc4DLRJHQ8cGkkewyys0lE%3d&risl=&pid=ImgRaw&r=0" },
  { _id: "65a7e20102e12c44f59943dc", name: "OPPO" , image:"https://www.freepnglogos.com/uploads/oppo-logo-png/oppo-logo-png-image-download--5.png"},
  { _id: "65a7e20102e12c44f59943dd", name: "Huawei" ,image :"https://logos-world.net/wp-content/uploads/2020/04/Huawei-Symbol.png" },
  { _id: "65a7e20102e12c44f59943de", name: "Nike" , image :"https://th.bing.com/th/id/R.7ecb22fd61fcaf57bf8b9a17b0098a63?rik=RbiQQpEI1GiB9Q&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f4%2fNike-Logo-Transparent-Background.png&ehk=lWceA5o3dIB7BLwMnH9dZxYB1wbB40OxRA9QciQ%2fQc4%3d&risl=&pid=ImgRaw&r=0" },
  { _id: "65a7e20102e12c44f59943df", name: "Bata" , image :"https://freepngdesign.com/content/uploads/images/p-2700-1-bata-logo-png-transparent-logo-924430378328.png"},
  { _id: "65a7e20102e12c44f59943e0", name: "Adidas" , image:"https://static.vecteezy.com/system/resources/previews/024/806/477/non_2x/adidas-logo-transparent-free-png.png" },


  // { _id: "65a7e20102e12c44f59943e1", name: "Impression of Acqua Di Gio" },

  { _id: "65a7e20102e12c44f59943e2", name: "Lacoste" , image :"https://www.pngmart.com/files/5/Lacoste-Logo-PNG-Transparent-Image.png"},
  // { _id: "65a7e20102e12c44f59943e3", name: "Fog Scent Xpressio", image:"https://static-01.daraz.pk/p/d60b8fd6880a3e238508d7bc921ba069.jpg" },
  // { _id: "65a7e20102e12c44f59943e4", name: "Al Munakh"  },
  // { _id: "65a7e20102e12c44f59943e5", name: "Lord - Al-Rehab" },
  { _id: "65a7e20102e12c44f59943e6", name: "L'Oreal Paris" , image:"https://th.bing.com/th/id/OIP.h78JkeCEWjvXiIYcqQZs-wHaEH?rs=1&pid=ImgDetMain"},
  
  // { _id: "65a7e20102e12c44f59943e7", name: "Hemani Tea"  },
  // { _id: "65a7e20102e12c44f59943e8", name: "Dermive" , image:"https://th.bing.com/th/id/OIP.-Y8TxwyxX3L5FJsrheVvCwHaId?rs=1&pid=ImgDetMain" },

  // { _id: "65a7e20102e12c44f59943e9", name: "ROREC White Rice" },
  // { _id: "65a7e20102e12c44f59943ea", name: "Fair & Clear" , image:"https://th.bing.com/th/id/OIP.wB7Ss0PTRTPwcB3TMszv-gHaDh?rs=1&pid=ImgDetMain"},
  // { _id: "65a7e20102e12c44f59943eb", name: "Saaf & Khaas" },
  // { _id: "65a7e20102e12c44f59943ec", name: "Bake Parlor Big" , image:"https://th.bing.com/th/id/OIP.b1gm4rPZDrSBoBys8Fl7iAAAAA?rs=1&pid=ImgDetMain" },
  // { _id: "65a7e20102e12c44f59943ed", name: "Baking Food Items" , image :" https://chatelaine.com/wp-content/uploads/2017/01/chocolate-chip-muffins-1.jpg" },
  // { _id: "65a7e20102e12c44f59943ee", name: "fauji", image:" "},
  // { _id: "65a7e20102e12c44f59943ef", name: "Dry Rose" },
  // { _id: "65a7e20102e12c44f59943f0", name: "Boho Decor" , image :"https://i.pinimg.com/originals/ae/b1/0a/aeb10ad4f74d35de1dadfa8a3624e507.jpg" },
  // { _id: "65a7e20102e12c44f59943f1", name: "Flying Wooden"  , },
  // { _id: "65a7e20102e12c44f59943f2", name: "LED Lights" , image :"https://m.media-amazon.com/images/I/81g6hH2qu0L._AC_UF1000,1000_QL80_.jpg" },
  // { _id: "65a7e20102e12c44f59943f3", name: "luxury palace" , image:"" },
  // { _id: "65a7e20102e12c44f59943f4", name: "Golden" },
  // { _id: "65a7e20102e12c44f59943f5", name: "Furniture Bed Set" ,image:"https://th.bing.com/th/id/OIP.O7nnVj3-9jQIJkG_xDzGMAAAAA?rs=1&pid=ImgDetMain" },
  // { _id: "65a7e20102e12c44f59943f6", name: "Ratttan Outdoor" , image :""},
  // { _id: "65a7e20102e12c44f59943f7", name: "Kitchen Shelf" },
  // { _id: "65a7e20102e12c44f59943f8", name: "Multi Purpose" , image:"https://www.alloutdoors.com/wp-content/uploads/2016/07/1-145.jpg"},
  // { _id: "65a7e20102e12c44f59943f9", name: "AmnaMart" , image :" "},
  // { _id: "65a7e20102e12c44f59943fa", name: "Professional Wear" , image :"https://th.bing.com/th/id/OIP.SM0e9ba5A1njFXV4c4cMVwHaM9?rs=1&pid=ImgDetMain" },
  // { _id: "65a7e20102e12c44f59943fb", name: "Soft Cotton"  , image :" "},
  // { _id: "65a7e20102e12c44f59943fc", name: "Top Sweater" },
  // { _id: "65a7e20102e12c44f59943fd", name: "RED MICKY MOUSE.." },
  // { _id: "65a7e20102e12c44f59943fe", name: "Digital Printed" },
  // { _id: "65a7e20102e12c44f59943ff", name: "Ghazi Fabric" },
  // { _id: "65a7e20102e12c44f5994400", name: "IELGY" },
  // { _id: "65a7e20102e12c44f5994401", name: "IELGY fashion" },
  // { _id: "65a7e20102e12c44f5994402", name: "Synthetic Leather" },
  // { _id: "65a7e20102e12c44f5994403", name: "Sandals Flip Flops" },
  // { _id: "65a7e20102e12c44f5994404", name: "Maasai Sandals" },
  // { _id: "65a7e20102e12c44f5994405", name: "Arrivals Genuine" },
  // { _id: "65a7e20102e12c44f5994406", name: "Vintage Apparel" },
  // { _id: "65a7e20102e12c44f5994407", name: "FREE FIRE" },
  // { _id: "65a7e20102e12c44f5994408", name: "The Warehouse" },
  // { _id: "65a7e20102e12c44f5994409", name: "Sneakers" },
  // { _id: "65a7e20102e12c44f599440a", name: "Rubber" },
  // { _id: "65a7e20102e12c44f599440b", name: "Naviforce" },
  // { _id: "65a7e20102e12c44f599440c", name: "SKMEI 9117" },
  // { _id: "65a7e20102e12c44f599440d", name: "Strap Skeleton" },
  // { _id: "65a7e20102e12c44f599440e", name: "Stainless" },
  // { _id: "65a7e20102e12c44f599440f", name: "Eastern Watches" },
  // { _id: "65a7e20102e12c44f5994410", name: "Luxury Digital" },
  // { _id: "65a7e20102e12c44f5994411", name: "Watch Pearls" },
  // { _id: "65a7e20102e12c44f5994412", name: "Bracelet" },
  // { _id: "65a7e20102e12c44f5994413", name: "LouisWill" },
  // { _id: "65a7e20102e12c44f5994414", name: "Copenhagen Luxe" },
  // { _id: "65a7e20102e12c44f5994415", name: "Steal Frame" },
  // { _id: "65a7e20102e12c44f5994416", name: "Darojay" },
  // { _id: "65a7e20102e12c44f5994417", name: "Fashion Jewellery" },
  // { _id: "65a7e20102e12c44f5994418", name: "Cuff Butterfly" },
  // { _id: "65a7e20102e12c44f5994419", name: "Designer Sun Glasses" },
  // { _id: "65a7e20102e12c44f599441a", name: "mastar watch" },
  // { _id: "65a7e20102e12c44f599441b", name: "Car Aux" },
  // { _id: "65a7e20102e12c44f599441c", name: "W1209 DC12V" },
  // { _id: "65a7e20102e12c44f599441d", name: "TC Reusable" },
  // { _id: "65a7e20102e12c44f599441e", name: "Neon LED Light" },
  // { _id: "65a7e20102e12c44f599441f", name: "METRO 70cc Motorcycle - MR70" },
  // { _id: "65a7e20102e12c44f5994420", name: "BRAVE BULL" },
  // { _id: "65a7e20102e12c44f5994421", name: "shock absorber" },
  // { _id: "65a7e20102e12c44f5994422", name: "JIEPOLLY" },
  // { _id: "65a7e20102e12c44f5994423", name: "Xiangle" },
  // { _id: "65a7e20102e12c44f5994424", name: "lightingbrilliance" },
  // { _id: "65a7e20102e12c44f5994425", name: "Ifei Home" },
  // { _id: "65a7e20102e12c44f5994426", name: "DADAWU" },
  // { _id: "65a7e20102e12c44f5994427", name: "YIOSI" },
];




// exports.seedBrand = async () => {
//   try {
//     await Brand.insertMany(brands);
//     console.log('Brand seeded successfully');
//   } catch (error) {
//     console.log(error);
//   }
// };


// exports.seedBrand = async () => {
//   try {
//     for (const brand of brands) {
//       await Brand.updateOne(
//         { _id: brand._id }, // Look for existing document
//         { $set: brand }, // Update existing or insert new
//         { upsert: true } // Create if not found
//       );
//     }
//     console.log("Brand seeded successfully with upsert");
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.seedBrand= async()=> {
  try {
    await Brand.deleteMany({});
    await Brand.insertMany(brands);
    console.log("Brand seeded successfully");
  } catch (error) {
    console.log(error);
  }
}


exports.seedBrandDelet = async () => {
  try {
    await Brand.deleteMany({});
    await Brand.insertMany(brands);
    console.log("Brand seeded successfully");
  } catch (error) {
    console.log(error);
  }
};