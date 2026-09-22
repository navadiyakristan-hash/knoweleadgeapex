// import React from 'react';
// import { motion } from 'framer-motion';
// import { Navbar } from '../features/navigation/components/Navbar';
// import { Footer } from '../features/footer/Footer';
// import { banner4 } from '../assets';
// import { Categories } from './../features/categories/Categories';
// import { Brand } from './../features/brands/Brand';
// import { ProductList } from './../features/products/components/ProductList';
// import { HeroBannerSwiper } from './../Swiper/HeroBannerSwiper';






// export const HomePage = () => {
//   return (
//     <>
//       <Navbar isProductList={true} />
//       <div className="bg-gray-100">

//         {/* ✅ Banner with full image and overlay */}
//         <div className="relative w-full overflow-hidden">
//           {/* ✅ Full image with object-contain */}
//           <img
//             src={banner4}
//             alt="Banner"
//             className="w-full h-auto  object-contain sm:object-contain"
//           />

//           {/* ✅ Overlay Content */}
//           <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-8 z-10">

//           <HeroBannerSwiper />
//             {/* Centered Categories */}
//             <motion.div
//               initial={{ opacity: 0, y: -30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1 }}
//               className=" flex justify-center items-center flex-grow"
//             >
//               <Categories />
//             </motion.div>

//             {/* Bottom-aligned Brand */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1 }}
//               className="w-full pt-4"
//             >
//               <Brand />
//             </motion.div>
//           </div>
//         </div>

//         {/* Product List */}
//         <ProductList />

//         {/* Footer */}
//         <Footer />
//       </div>
//     </>
//   );
// };




// src/pages/HomePage.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Navbar } from '../features/navigation/components/Navbar';
// import { Footer } from '../features/footer/Footer';
// import { banner4 } from '../assets';
// import { Categories } from './../features/categories/Categories';
// import { Brand } from './../features/brands/Brand';
// import { ProductList } from './../features/products/components/ProductList';
// import { HeroBannerSwiper } from './../Swiper/HeroBannerSwiper';

// export const HomePage = () => {
//   return (
//     <>
//       <Navbar isProductList={true} />

//       <div className="relative w-full ">
//         {/* Full Banner Image */}
//         <img
//           src={banner4}
//           alt="Banner"
//           className="     object-contain"
//         />

//         {/* Overlay with stacked Swipers */}
//         <div className="absolute  inset-0 z-10 flex flex-col items-center justify-between pt-10 space-y-8 px-4 overflow-y-auto">
//           <div className="w-full max-w-7xl">
//             <HeroBannerSwiper />
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="w-full max-w-7xl"
//           >
//             <Categories />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="w-full max-w-7xl"
//           >
//             <Brand />
//           </motion.div>
//         </div>
//       </div>

//       <ProductList />
//       <Footer />
//     </>
//   );
// };







// src/pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../features/navigation/components/Navbar';
import { Footer } from '../features/footer/Footer';
import  banner5  from '../assets/images/pexels-n-voitkevich-6214371.jpg';
import { Categories } from './../features/categories/Categories';
import { Brand } from './../features/brands/Brand';
import { ProductList } from './../features/products/components/ProductList';
import { HeroBannerSwiper } from './../Swiper/HeroBannerSwiper';
import PriceCategoryGrid from './../Swiper/PriceCategoryGrid';

export const HomePage = () => {
  return (
    <>
      <Navbar isProductList={true} />

      <div className="relative w-full ">
        {/* Full Banner Image with limited height */}
        

        <img
          src={banner5}
          alt="Banner"
          className="w-full h-[140vh] object-cover"
        />
       


        {/* Overlay with stacked Swipers */}
        
       <div className="absolute inset-0 z-10 flex flex-col items-center justify-between pt-10 space-y-8 px-4 overflow-y-auto">
          <div className="w-full max-w-7xl mt-12">
            <HeroBannerSwiper />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-9xl"
          >
            <Categories />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-9xl"
          >
            <Brand />
          </motion.div>
        </div>
      </div>
<PriceCategoryGrid/>
      <ProductList />
      <Footer />
    </>
  );
};
