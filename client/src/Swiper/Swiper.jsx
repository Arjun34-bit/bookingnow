import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Swipers = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <div
          className="bg-cover bg-center h-[400px] flex items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg')",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
            Find & Book the Best Hotels & Restaurants
          </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="bg-cover bg-center h-[400px] flex items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://assets.architecturaldigest.in/photos/676c150b3afb923090218032/16:9/w_1616,h_909,c_limit/Untitled%20design%20-%202024-12-25T195152.755.jpg')",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
            Find & Book the Best Hotels & Restaurants
          </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="bg-cover bg-center h-[400px] flex items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/4d/eb/7b/photo-booth-to-remember.jpg?w=600&h=-1&s=1')",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
            Find & Book the Best Hotels & Restaurants
          </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="bg-cover bg-center h-[400px] flex items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://urlaubschecker.at/wp-content/uploads/2020/07/Wie-kommt-ein-Hotel-an-seine-Sterne_.png')",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
            5 Star Hotels & more
          </h1>
        </div>
      </SwiperSlide>
      ...
    </Swiper>
  );
};

export default Swipers;
