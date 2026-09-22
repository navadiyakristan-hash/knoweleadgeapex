import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';

export const ProductBanner = ({ images }) => {
  return (
    <div className="w-full  relative"> {/* Fullscreen height */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full max-h-screen"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Banner Image ${index + 1}`}
              className="w-full   object-cover" // Covers full background
            />
          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  );
};

// PropTypes Validation
ProductBanner.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
