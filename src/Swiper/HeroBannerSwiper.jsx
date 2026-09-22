 import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import banner1 from '../assets/Swiper/shirt-25494_1920.png'; 
import banner2 from '../assets/Swiper/woman-6496853_1920.png';
import banner3 from '../assets/Swiper/tennis-7968714_1920.png';
// import banner4 from '../assets/Swiper/tennis-7968714_1920.png'
import banner5 from '../assets/Swiper/watch-42803_1920.png'
import 'swiper/css';

export const HeroBannerSwiper = () => {
  const banners = [
    {
      image: banner2,
      heading: 'Tops, T-Shirts & More',
      subheading: 'Under ₹699 • Allen Solly, ONLY & More',
      cta: 'Shop Now',
},
{
    image: banner5,
    heading: 'MEN & Woman Watches',
    subheading: 'Under ₹699 • Allen Solly, ONLY & More',
    cta: 'Shop Now',
},
    {
      image: banner1,
      heading: 'Men’s Fashion',
      subheading: 'Under ₹999 • Allen Solly, ONLY & More',
      cta: 'Shop Now',
    },
    {
      image: banner3 , 

      heading: 'Footwear',
      subheading: 'Under ₹499 • Allen Solly, ONLY & More',
      cta: 'Shop Now',
    },
    // {
    //     image: banner4,
    //     heading: 'Footwear',
    //     subheading: 'Under ₹499 • Allen Solly, ONLY & More',
    //     cta: 'Shop Now',
    //   },
  ];

  return (
    <section className="w-full overflow-hidden ">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row items-center justify-between mt-12 mx-auto px-6 sm:px-10 py-10">
              <div className="w-full lg:w-1/2 flex justify-center items-center">
                <img
                  src={banner.image}
                  alt="promo"
                  className="w-full max-h-[400px] object-contain"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left flex  flex-col items-center justify-center mt-6 lg:mt-0 px-2 sm:px-6">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">{banner.heading}</h3>
                <p className="text-lg sm:text-xl text-gray-600 mb-4">{banner.subheading}</p>
                <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
                  {banner.cta}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
