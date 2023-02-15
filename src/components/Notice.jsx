import styled from "styled-components";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Autoplay } from "swiper";
export default function Notice() {
    return (
        <>
            <Banner className="inner">
                <span style={{position:"absolute",paddingLeft:"5px"}}>공지사항</span>
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
            </Banner>
        </>
    );
}
const Banner = styled.div`
    margin: 0 auto;
    line-height: 50px;
    height: 50px;
    width: 400px;
    border-radius: 5px;
    background: gray;
    .mySwiper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        color: #fff;
        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
        display: block;
        width: 100%;
        height: 100%;
        /* object-fit: cover; */
    }
`;
