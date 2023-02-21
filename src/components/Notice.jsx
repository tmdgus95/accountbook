import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

import { AiOutlinePlusCircle } from "react-icons/ai";
import NoticeModal from "./NoticeModal";

export default function Notice() {
    const [noticeList, setNoticeList] = useState([]);

    const fetchData = () => {
        axios
            .get("http://192.168.0.208:9090//api/notice/list")
            .then((res) => console.log(res));
        // .then((list) => setNoticeList(list));
    };
    
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {modal && <NoticeModal setModal={setModal} />}
            <Banner className="inner">
                <span className="flex justify-between items-center px-5">
                    공지사항
                    <AiOutlinePlusCircle
                        style={{
                            fontSize: "30px",
                            paddingBottom: "2px",
                            cursor: "pointer",
                        }}
                        onClick={() => setModal(true)}
                    />
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
