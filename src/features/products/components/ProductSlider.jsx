import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { selectProducts } from '../ProductSlice';
import { ProductCard } from './ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ProductSlider = () => {
  const products = useSelector(selectProducts);
  const navigate = useNavigate();

  if (!products || products.length < 4) {
    return (
      <div className="py-10 px-4 text-center text-gray-500">
        Not enough products to display in slider.
      </div>
    );
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-10">
      <h2 className="text-h3 font-bold text-xl sm:text-2xl text-center mb-8">
        Trending Products
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 1.3 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className="p-12">
            <div onClick={() => navigate(`/product-details/${product._id}`)} className="cursor-pointer">
              <ProductCard {...product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductSlider;
