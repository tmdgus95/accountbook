import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import moment from "moment/moment";

const CalendarDetail = ({ setCalendarDetailModal, date }) => {
    const { Authorization } = useAuthContext();
    const fetchData = () => {
        const header = {
            headers: {
                Authorization,
            },
        };
        axios
            .get(
                `http://192.168.0.208:9090/api/accountbook/list/day/couple?year=${moment(
                    date
                ).format("YYYY")}&month=${moment(date).format(
                    "MM"
                )}&day=${moment(date).format("DD")}`,
                header
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleClose = () => {
        setCalendarDetailModal(false);
    };

    return (
        <div className="w-full h-full absolute bg-black bg-opacity-50 z-10 top-0 p-60 px-96 ">
            <div className="bg-white rounded-xl py-4">
                <button onClick={handleClose}>닫기</button>
            </div>
        </div>
    );
};

export default CalendarDetail;
