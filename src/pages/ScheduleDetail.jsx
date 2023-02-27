import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import ScheduleEditModal from "../components/ScheduleEditModal";

const ScheduleDetail = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();
    const { Authorization } = useAuthContext();
    const [editModal, setEditModal] = useState(false);
    const handleEdit = () => {
        setEditModal(true);
    };
    const [scheduleDetail, setScheduleDetail] = useState();
    // const fetchData = () => {
    //     const header = {
    //         headers: {
    //             Authorization,
    //         },
    //     };
    //     axios
    //         .get(
    //             `http://192.168.0.208:9090/api/accountbook/list/expense/detail?eiSeq=${scheduleId}`,
    //             header
    //         )
    //         .then((res) => setScheduleDetail(res.data.expenseDetail))
    //         .catch((err) => console.log(err));
    // };
    // useEffect(() => {
    //     fetchData();
    // }, []);

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
                    `http://192.168.0.208:9090/api/accountbook/expense/delete?eiSeq=${scheduleId}`,
                    header
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었습니다."))
                .then(navigate("/couplehome"))
                .catch((err) => console.log(err));
    };

    return (
        <div>
            {scheduleId}
            {editModal && (
                <ScheduleEditModal
                    setEditModal={setEditModal}
                    scheduleId={scheduleId}
                />
            )}
            <BsPencilFill onClick={handleEdit} />
            <FaTrashAlt onClick={handleDelete} />
        </div>
    );
};

export default ScheduleDetail;
