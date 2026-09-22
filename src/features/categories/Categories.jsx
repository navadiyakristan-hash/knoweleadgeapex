import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCategories } from './CategoriesSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Categories = () => {
  const categories = useSelector(selectCategories);
  console.log('categories :>> ', categories);
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 sm:px-6 md:px-10  mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-black font-serif pl-6 text-center mb-6">
        Shop by Category
      </h2>

      <Swiper
        modules={[ Autoplay]}
        spaceBetween={16}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
       
        pagination={{ clickable: true }}
        className="pb-6 w-full"
      >
        {categories?.map((category) => (
          <SwiperSlide key={category._id}>
            <div
              className="cursor-pointer w-full bg-transparent backdrop-brightness-100   rounded-xl shadow-md p-4 hover:scale-105 transition-transform flex flex-col items-center"
              onClick={() => navigate(`/products?category=${category._id}`)}

             
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full sm:h-36 md:h-40 bg-transparent object-contain rounded mb-3"
              />
              <p className="text-base sm:text-lg font-semibold text-center group-hover:text-emerald-600 transition-colors">
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
