// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import NoticeModal from "../components/NoticeModal";
import NoticeUpdateModal from "../components/NoticeUpdateModal";

const NoticeDetail = () => {
    const { notice } = useParams();
    const [detail, setDetail] = useState();
    const { Authorization } = useAuthContext();
    const [modal, setModal] = useState(false);

    let navigate = useNavigate();

    const handleDelete = () => {
        let deleteConfirm = window.confirm("진짜 삭제할꺼야?");
        deleteConfirm === true &&
            axios
                .delete(
                    `http://192.168.0.208:9090/api/notice/delete?noticeNo=${notice}`
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었어..."))
                .then(() => navigate("/couplehome"))
                .catch((err) => console.log(err));
    };

    const fetchData = () => {
        const header = {
            headers: {
                Authorization,
            },
        };
        axios
            .get(
                `http://192.168.0.208:9090/api/notice/detail?noticeNo=${notice}`,
                header
            )
            .then((res) => console.log(res.data));
        // .then((list) => setDetail(list));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <p>1</p>
            <button onClick={handleDelete}>삭제</button>
            <BsPencilFill
                onClick={() => {
                    setModal(true);
                }}
            />
            {modal && <NoticeUpdateModal notice={notice} setModal={setModal} />}
        </>
        // <div>
        //     <p>메모{detail.niMemo}</p>
        //     <p>날짜{detail.niDate}</p>
        //     <img src={`${detail.niiUri}`} alt="사진" />
        // </div>
        // <div>
        //     <p>메모{detail.noticeInfo.niMemo}</p>
        //     <p>날짜{detail.noticeInfo.niDate}</p>
        //     <img src={`${detail.niiUri}`} alt="사진" />
        // </div>
    );
};

export default NoticeDetail;
