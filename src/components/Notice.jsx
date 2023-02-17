import styled from "styled-components";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Autoplay } from "swiper";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export default function Notice() {
    const [noticeList, setNoticeList] = useState([]);

    const fetchData = () => {
        axios
            .get("http://192.168.0.156:9090/api/notice/list")
            .then((res) => res.data.list)
            .then((list) => setNoticeList(list));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Banner className="inner">
                <span style={{ position: "absolute", paddingLeft: "10px"}}>
                    공지사항
                </span>
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
                    {noticeList.map((notice) => {
                        return (
                            <SwiperSlide key={notice.niSeq}>
                                <Link to={`/noticedetail/${notice.niSeq}`}>
                                    {notice.niMemo}
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Banner>
        </>
    );
}
const Banner = styled.div`
    margin: 0 auto;
    line-height: 45px;
    height: 45px;
    width: 600px;
    border-radius: 10px;
    border: 1px solid gray;
    background: #fff;
    opacity: 0.8;
    .mySwiper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        display: block;
        width: 100%;
        height: 100%;
    }
`;
