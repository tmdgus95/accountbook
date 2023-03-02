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
                    `${process.env.REACT_APP_API_URL}/api/notice/delete?noticeNo=${notice}`
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
                `${process.env.REACT_APP_API_URL}/api/notice/detail?noticeNo=${notice}`,
                header
            )
            .then((res) => {
                console.log(res);
                setDetail(res.data);
            })
            .catch((err) => console.log(err));

        // .then((res) => console.log(res.data))
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Inner>
                <Memo>
                    <div className="flex justify-end gap-2 mb-3">
                        <BsTrashFill
                            onClick={handleDelete}
                            style={{
                                fontSize: "50px",
                                cursor: "pointer",
                                color: "#fbe300",
                                padding: "10px",
                                background: "black",
                                borderRadius: "10px",
                            }}
                        >
                            삭제
                        </BsTrashFill>
                        <BsPencilFill
                            onClick={() => {
                                setModal(true);
                            }}
                            style={{
                                fontSize: "50px",
                                cursor: "pointer",
                                color: "#fbe300",
                                padding: "10px",
                                background: "black",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                    {detail && detail.memo}
                    <Date> 등록일 : {detail && detail.date}</Date>
                    {detail && (
                        <img
                            src={`http://192.168.0.208:9090/api/noticeimage/img/${detail.uri}`}
                            alt="사진"
                            style={{
                                width: "500px",
                                height: "500px",
                                margin: "0 auto",
                            }}
                        />
                    )}
                </Memo>

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
    height: 754px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 10px;
`;

const Memo = styled.div`
    width: 750px;
    height: 750px;
    font-size: 30px;
    text-align: center;
    border-radius: 6px;
`;

const Date = styled.p`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 20px;
`;

export default NoticeDetail;
