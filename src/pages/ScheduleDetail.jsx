import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import ScheduleEditModal from "../components/ScheduleEditModal";
import styled from "styled-components";

const ScheduleDetail = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();
    const { Authorization } = useAuthContext();
    const [editModal, setEditModal] = useState(false);
    const handleEdit = () => {
        setEditModal(true);
    };
    const [scheduleDetail, setScheduleDetail] = useState();
    const fetchData = () => {
        const header = {
            headers: {
                Authorization,
            },
        };
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/schedule/couple/detail?saiSeq=${scheduleId}`,
                header
            )
            .then((res) => {
                console.log(res.data);
                setScheduleDetail(res.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = () => {
        let deleteConfirm = window.confirm("삭제하시겠습니까?");
        const header = {
            headers: {
                Authorization,
            },
        };
        deleteConfirm === true &&
            axios
                .delete(
                    `${process.env.REACT_APP_API_URL}/api/calendar/delete?siSeq=${scheduleId}`,
                    header
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었습니다."))
                .then(navigate("/couplehome"))
                .catch((err) => console.log(err));
    };

    return (
        <Inner>
            <Memo>
                <div className="flex justify-end gap-2 mb-3">
                    <BsPencilFill
                        onClick={handleEdit}
                        className="text-5xl cursor-pointer text-main p-2 bg-black rounded-lg"
                    />
                    <FaTrashAlt
                        onClick={handleDelete}
                        className="text-5xl cursor-pointer text-main p-2 bg-black rounded-lg"
                    />
                </div>
                {scheduleDetail && (
                    <p className="pb-3">메모 {scheduleDetail.memo}</p>
                )}
                {scheduleDetail && (
                    <p className="pb-3">시작날짜 {scheduleDetail.stdate}</p>
                )}
                {scheduleDetail && (
                    <p className="pb-3">끝날짜 {scheduleDetail.eddate}</p>
                )}
                {scheduleDetail && (
                    <img
                        src={`http://192.168.0.208:9090/api/schedule/img/${scheduleDetail.scheimg}`}
                        alt="스케쥴"
                        className="mx-auto max-h-96"
                    ></img>
                )}
            </Memo>

            {editModal && (
                <ScheduleEditModal
                    setEditModal={setEditModal}
                    scheduleId={scheduleId}
                />
            )}
        </Inner>
    );
};

const Inner = styled.div`
    max-width: 750px;
    height: 709px;
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

export default ScheduleDetail;
