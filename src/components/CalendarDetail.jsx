import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

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
                "http://192.168.0.208:9090/api/accountbook/list/day/couple?year=2023&month=2&day=22",
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
