import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import moment from "moment/moment";

const CalendarDetail = ({ date }) => {
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

    return <div>{date}1</div>;
};

export default CalendarDetail;
