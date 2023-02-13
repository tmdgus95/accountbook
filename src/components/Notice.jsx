// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper";

export default function Notice() {
    return (
        <>
            <div className="inner">
                <Swiper
                    direction={"vertical"}
                    cssMode={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    loop="true"
                    className="mySwiper"
                >
                    <SwiperSlide>안녕1</SwiperSlide>
                    <SwiperSlide>안녕2</SwiperSlide>
                    <SwiperSlide>안녕3</SwiperSlide>
                    <SwiperSlide>안녕4</SwiperSlide>
                    <SwiperSlide>안녕5</SwiperSlide>
                    <SwiperSlide>안녕6</SwiperSlide>
                    <SwiperSlide>안녕7</SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}
