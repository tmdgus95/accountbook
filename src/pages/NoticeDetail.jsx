// import axios from "axios";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const NoticeDetail = () => {
    const { notice } = useParams();

    const fetchData = () => {
        axios
            .get(
                `http://192.168.0.156:9090/api/notice/detail?memberNo=${notice}`
            )
            .then((res) => console.log(res));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <div>{notice}</div>;
};

export default NoticeDetail;
