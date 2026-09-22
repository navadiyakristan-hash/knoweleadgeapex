import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { selectBrands } from './BrandSlice';

import 'swiper/css';
// import brandSlice from './BrandSlice';


export const Brand = () => {
  const brands = useSelector(selectBrands); // Fetch brands from Redux
  const navigate = useNavigate();
// console.log('brands', brands)
  return (
    <section className="py-2 px-6 md:px-10 ">
      <h2 className="text-2xl from-neutral-900 text-black font-serif font-bold text-center mb-6">Brand in Foucs</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
    
       
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false ,reverseDirection: true}}
        className="w-full h-full"
      >
        {brands?.map((brand) => (
          <SwiperSlide key={brand._id}>
            <div
              className=" cursor-pointer w-full h-full  shadow-2xl  hover:text-black-500 bg-transparent  group
               rounded-lg  p-4   flex flex-col   items-center justify-center hover:scale-105   transition-transform"
               onClick={() => navigate(`/products?brand=${brand._id}`)}

            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-32    object-fill  rounded mb-4"
              />
              <p className="text-lg text-pretty font-semibold group-hover:text-2xl">{brand.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
