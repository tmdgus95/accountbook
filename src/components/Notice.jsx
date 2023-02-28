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
import { useAuthContext } from "../context/AuthContext";

export default function Notice() {
    const { Authorization, user } = useAuthContext();
    const [noticeList, setNoticeList] = useState([]);
    const member = user && user.mbiSeq;

    const fetchData = () => {
        const header = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization,
            },
        };

        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/notice/list?memberNo=${member}`,
                header
            )
            .then((res) => setNoticeList(res.data.list))
            .catch((err) => console.log(err));
    };

    const [modal, setModal] = useState(false);

    console.log(member);
    useEffect(() => {
        fetchData();
    }, [member]);

    return (
        <>
            {modal && <NoticeModal setModal={setModal} />}
            <Banner className="inner">
                {/* <span className="flex justify-between items-center px-5 ">
                    공지사항
                    
                    <AiOutlinePlusCircle
                        style={{
                            fontSize: "30px",
                            paddingBottom: "2px",
                            cursor: "pointer",
                        }}
                        onClick={() => setModal(true)}
                    />
                </span> */}
                <span>공지사항</span>
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
                                <p>
                                    <Link to={`/noticedetail/${notice.niSeq}`}>
                                        {notice.niMemo}
                                    </Link>
                                    <span className="text-black font-thin pl-4">
                                        {notice.niDate}
                                    </span>
                                </p>
                                {/* <Link to={`/noticedetail/${notice.niSeq}`}>
                                    {notice.niMemo}
                                <p>{notice.niDate}</p>
                                </Link> */}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div>
                    <AiOutlinePlusCircle
                        style={{
                            fontSize: "30px",
                            cursor: "pointer",
                            marginRight: "6px",
                            marginTop: "6px",
                        }}
                        onClick={() => setModal(true)}
                    />
                </div>
            </Banner>
        </>
    );
}
const Banner = styled.div`
    display: flex;
    margin: 0 auto;
    line-height: 45px;
    height: 45px;
    width: 600px;
    border-radius: 10px;
    border: 1px solid gray;
    background: #fff;
    opacity: 0.8;
    span {
        position: absolute;
        margin-left: 6px;
        font-size: 18px;
    }
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
const Date = styled.span``;
