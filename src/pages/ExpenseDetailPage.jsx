import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import ExpendEditModal from "../components/ExpendEditModal";
import styled from "styled-components";
import { SlClose } from "react-icons/sl";

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
                `${process.env.REACT_APP_API_URL}/api/accountbook/list/expense/detail?eiSeq=${expenseId}`,
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
                    `${process.env.REACT_APP_API_URL}/api/accountbook/expense/delete?eiSeq=${expenseId}`,
                    header
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었습니다."))
                .then(navigate("/calendar"))
                .catch((err) => console.log(err));
    };

    const handleDeleteImg = () => {
        let deleteConfirm = window.confirm("이미지를 삭제하시겠습니까?");
        const header = {
            headers: {
                Authorization,
            },
        };
        deleteConfirm === true &&
            axios
                .delete(
                    `${process.env.REACT_APP_API_URL}/api/accountbook/expense/img/delete?eiSeq=${expenseId}`,
                    header
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었습니다."))
                .then(navigate("/calendar"))
                .catch((err) => console.log(err));
    };

    console.log(expenseDetail && expenseDetail);
    console.log(expenseDetail && expenseDetail.imageUri);
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
                                color: "#FBE300",
                                padding: "10px",
                                background: "black",
                                borderRadius: "10px",
                            }}
                        />
                        <BsPencilFill
                            onClick={handleEdit}
                            style={{
                                fontSize: "50px",
                                cursor: "pointer",
                                color: "#FBE300",
                                padding: "10px",
                                background: "black",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                    <p>
                        작성자 :{" "}
                        {expenseDetail && who(expenseDetail.expenseStatus)}
                    </p>
                    <p>카테고리 : {expenseDetail && expenseDetail.category}</p>
                    <p>
                        금액 :{" "}
                        {expenseDetail &&
                            expenseDetail.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                    </p>
                    <p>메모 : {expenseDetail && expenseDetail.memo}</p>
                    <p>
                        이미지 :
                        {expenseDetail && (
                            <img
                                src={`${process.env.REACT_APP_API_URL}/api/accountbook/img/${expenseDetail.imageUri}`}
                                // src="1"
                                alt="이미지"
                                className="w-72 h-72 mt-5"
                            />
                        )}
                    </p>
                    <br />
                    {expenseDetail && expenseDetail.imageUri !== null && (
                        <SlClose
                            onClick={handleDeleteImg}
                            className="absolute top-[350px] left-[300px] cursor-pointer text-red-600 hover:scale-125"
                        />
                    )}
                </Memo>
            </Inner>
            {editModal && (
                <ExpendEditModal
                    setEditModal={setEditModal}
                    expense={expense}
                    expenseId={expenseId}
                />
            )}
        </>
        // <div>
        //     <BsPencilFill onClick={handleEdit} />
        //     {editModal && (
        //         <ExpendEditModal
        //             setEditModal={setEditModal}
        //             expense={expense}
        //             expenseId={expenseId}
        //         />
        //     )}
        //     <BsTrashFill onClick={handleDelete} />
        //     <p>카테고리 {expenseDetail && expenseDetail.category}</p>
        //     <p>돈 낸사람 {expenseDetail && who(expenseDetail.expenseStatus)}</p>
        //     <p>메모 {expenseDetail && expenseDetail.memo}</p>
        //     <p>가격 {expenseDetail && expenseDetail.price}</p>

        //     {expenseDetail && (
        //         <img
        //             src={`${process.env.REACT_APP_API_URL}/api/accountbook/img/${expenseDetail.imageUri}`}
        //             // src="1"
        //             alt="이미지"
        //         />
        //     )}
        //     <br />
        //     <button onClick={handleDeleteImg}>이미지삭제버튼</button>
        // </div>
    );
};

function who(target) {
    if (target === 0) {
        return "우리";
    } else if (target === 1) {
        return "나";
    } else {
        return "연인";
    }
}

const Inner = styled.div`
    max-width: 700px;
    height: 754px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 10px;
`;

const Memo = styled.div`
    position: relative;
    width: 700px;
    height: 750px;
    font-size: 30px;
    text-align: left;
    border-radius: 6px;
    p {
        padding-bottom: 10px;
    }
`;

export default ExpenseDetailPage;
