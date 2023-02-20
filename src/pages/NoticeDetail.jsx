// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const NoticeDetail = () => {
    const { notice } = useParams();
    const [detail, setDetail] = useState();

    const fetchData = () => {
        axios
            .get(`http://192.168.0.156:9090/api/notice/uri?noticeNo=${notice}`)
            .then((res) => res.data.list)
            .then((list) => setDetail(list));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        // <div>
        //     <p>메모{detail.niMemo}</p>
        //     <p>날짜{detail.niDate}</p>
        //     <img src={`${detail.niiUri}`} alt="사진" />
        // </div>
        <div>
            <p>메모{detail.noticeInfo.niMemo}</p>
            <p>날짜{detail.noticeInfo.niDate}</p>
            <img src={`${detail.niiUri}`} alt="사진" />
        </div>
    );
};

export default NoticeDetail;
