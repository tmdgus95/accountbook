import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { SlClose } from "react-icons/sl";

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
                `${
                    process.env.REACT_APP_API_URL
                }/api/accountbook/list/day/couple?year=${moment(date).format(
                    "YYYY"
                )}&month=${moment(date).format("MM")}&day=${moment(date).format(
                    "DD"
                )}`,
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
                `${
                    process.env.REACT_APP_API_URL
                }/api/schedule/couple/month?year=${moment(date).format(
                    "YYYY"
                )}&month=${moment(date).format("MM")}`,
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
        <div className="w-full h-full absolute bg-black bg-opacity-50 z-10 top-0 left-0 p-60 px-96 ">
            <div className="relative grid grid-cols-3 bg-white rounded-xl p-4 text-2xl">
                <SlClose
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-4xl cursor-pointer"
                />
                <div>
                    <p className="text-3xl mb-4">지출</p>
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
                                    className="mb-1"
                                >
                                    {expense.expense
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    원
                                </li>
                            ))}
                        {expenseList && expenseList.length === 0 && (
                            <li className="text-neutral-400">
                                등록된 지출이 없습니다.
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <p className="text-3xl mb-4">수입</p>
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
                                    className="mb-1"
                                >
                                    {income.income
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    원
                                </li>
                            ))}
                        {imcomeList && imcomeList.length === 0 && (
                            <li className="text-neutral-400">
                                등록된 수입이 없습니다.
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <p className="text-3xl mb-4">일정</p>
                    <ul>
                        {schedule &&
                            schedule.map((item) => (
                                <li
                                    key={uuidv4()}
                                    onClick={() =>
                                        navigate(
                                            `/scheduledetail/${item.siseq}`
                                        )
                                    }
                                    className="mb-1"
                                >
                                    {item.memo}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CalendarDetail;
