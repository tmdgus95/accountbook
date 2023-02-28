import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { BsPencilFill } from "react-icons/bs";
import ExpendEditModal from "../components/ExpendEditModal";
import { FaTrashAlt } from "react-icons/fa";

const ExpenseDetailPage = () => {
    const { expenseId } = useParams();
    const navigate = useNavigate();
    const {
        state: { expense },
    } = useLocation();
    // console.log(expense.expenseSeq);
    const { Authorization } = useAuthContext();
    const [editModal, setEditModal] = useState(false);
    const handleEdit = () => {
        setEditModal(true);
    };
    const [expenseDetail, setExpenseDetail] = useState();
    const fetchData = () => {
        const header = {
            headers: {
                Authorization,
            },
        };
        axios
            .get(
                `http://192.168.0.208:9090/api/accountbook/list/expense/detail?eiSeq=${expenseId}`,
                header
            )
            .then((res) => setExpenseDetail(res.data.expenseDetail))
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
                    `http://192.168.0.208:9090/api/accountbook/expense/delete?eiSeq=${expenseId}`,
                    header
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었습니다."))
                .then(navigate("/couplehome"))
                .catch((err) => console.log(err));
    };

    const handleDeleteImg = () => {
        let deleteConfirm = window.confirm("삭제하시겠습니까?");
        const header = {
            headers: {
                Authorization,
            },
        };
        deleteConfirm === true &&
            axios
                .delete(
                    `http://192.168.0.208:9090/api/accountbook/expense/img/delete?eiSeq=${expenseId}`,
                    header
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었습니다."))
                .then(navigate("/couplehome"))
                .catch((err) => console.log(err));
    };

    console.log(expenseDetail && expenseDetail);
    // console.log(expenseDetail && expenseDetail.imageUri);
    return (
        <div>
            <BsPencilFill onClick={handleEdit} />
            {editModal && (
                <ExpendEditModal
                    setEditModal={setEditModal}
                    expense={expense}
                    expenseId={expenseId}
                />
            )}
            <FaTrashAlt onClick={handleDelete} />
            {expenseDetail && expenseDetail.category}
            {expenseDetail.imageUri && (
                <img
                    src={`http://192.168.0.208:9090/api/accountbook/img/${expenseDetail.imageUri}`}
                    alt="이미지"
                />
            )}
            <br />
            <button onClick={handleDeleteImg}>이미지삭제버튼</button>
        </div>
    );
};

export default ExpenseDetailPage;
