import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ExpenseDetailPage = () => {
    const { expenseId } = useParams();
    const { Authorization } = useAuthContext();
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

    // console.log(expenseDetail && expenseDetail);
    // console.log(expenseDetail && expenseDetail.imageUri);
    return (
        <div>
            {expenseDetail && expenseDetail.category}
            {/* {expenseDetail && (
                <img
                    src={`http://192.168.0.208:9090/api/accountbook/img/${expenseDetail.imageUri}`}
                    alt="이미지"
                />
            )} */}
        </div>
    );
};

export default ExpenseDetailPage;
