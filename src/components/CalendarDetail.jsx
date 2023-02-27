import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CalendarDetail = ({ setCalendarDetailModal, date }) => {
    const { Authorization } = useAuthContext();
    const navigate = useNavigate();
    const [expenseList, setExpenseList] = useState();
    const [imcomeList, setImcomeList] = useState();
    const [schedule, setSchedule] = useState();

    const fetchData = () => {
        const header = {
            headers: {
                Authorization,
            },
        };
        // console.log(moment(date).format("YYYY"));
        // console.log(moment(date).format("MM"));
        // console.log(moment(date).format("DD"));
        axios
            .get(
                `http://192.168.0.208:9090/api/accountbook/list/day/couple?year=${moment(
                    date
                ).format("YYYY")}&month=${moment(date).format(
                    "MM"
                )}&day=${moment(date).format("DD")}`,
                header
            )
            .then((res) => {
                console.log(res.data);
                setExpenseList(res.data.expenseList);
                setImcomeList(res.data.imcomeList);
            })
            .catch((err) => console.log(err));

        axios
            .get(
                `http://192.168.0.208:9090/api/schedule/couple/month?year=${moment(
                    date
                ).format("YYYY")}&month=${moment(date).format("MM")}`,
                header
            )
            .then((res) => {
                setSchedule(res.data.scheduleList1);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClose = () => {
        setCalendarDetailModal(false);
    };

    console.log(schedule && schedule);

    return (
        <div className="w-full h-full absolute bg-black bg-opacity-50 z-10 top-0 p-60 px-96 ">
            <div className="bg-white rounded-xl py-4">
                <button onClick={handleClose}>닫기</button>
                <p>지출</p>
                <ul>
                    {expenseList &&
                        expenseList.map((expense) => (
                            <li
                                onClick={() =>
                                    navigate(
                                        `/expensedetail/${expense.expenseSeq}`,
                                        { state: { expense } }
                                    )
                                }
                                key={expense.expenseSeq}
                            >
                                {expense.expense}
                            </li>
                        ))}
                    {expenseList && expenseList.length === 0 && (
                        <li>없다!!!</li>
                    )}
                </ul>
                <p>수입</p>
                <ul>
                    {imcomeList &&
                        imcomeList.map((income) => (
                            <li
                                onClick={() =>
                                    navigate(
                                        `/importdetail/${income.importSeq}`,
                                        { state: { income } }
                                    )
                                }
                                key={income.importSeq}
                            >
                                {income.income}
                            </li>
                        ))}
                    {imcomeList && imcomeList.length === 0 && <li>없다!!!</li>}
                </ul>
                <p>일정</p>
                <ul>
                    {schedule &&
                        schedule.map((item) => (
                            <li
                                key={uuidv4()}
                                onClick={() =>
                                    navigate(`/scheduledetail/${item.mbiseq}`)
                                }
                            >
                                {item.memo}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default CalendarDetail;
