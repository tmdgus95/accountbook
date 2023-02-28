import styled from "styled-components";
// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
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
            .then((res) => setDetail(res.data))
            .catch((err) => console.log(err));

        // .then((res) => console.log(res.data))
    };
    console.log(detail && detail);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Inner>
                <div className="flex justify-end gap-5">
                    <BsTrashFill
                        onClick={handleDelete}
                        style={{ fontSize: "30px", cursor: "pointer" }}
                    >
                        삭제
                    </BsTrashFill>
                    <BsPencilFill
                        onClick={() => {
                            setModal(true);
                        }}
                        style={{ fontSize: "30px", cursor: "pointer" }}
                    />
                </div>
                <Memo>
                    {detail.memo}
                    메모
                    <Date> {detail.date}날짜</Date>
                </Memo>
                <img src={`${detail.uri}`} alt="사진" />

                {modal && (
                    <NoticeUpdateModal
                        notice={notice}
                        setModal={setModal}
                        style={{ fontSize: "30px" }}
                    />
                )}
            </Inner>
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

const Inner = styled.div`
    max-width: 750px;

    margin: 0 auto;
`;

const Memo = styled.div`
    width: 750px;
    height: 750px;
    text-align: center;
    background: red;
`;

const Date = styled.p`
    background-color: pink;
    display: flex;
    justify-content: end;
    margin-right: 10px;
`;

export default NoticeDetail;
