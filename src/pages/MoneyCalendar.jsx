import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
// 날짜 관련 라이브러리
import moment from "moment/moment";
// 한글로 출력하게 해줌.
import "moment/locale/ko";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
const MoneyCalendar = () => {
    // 로컬 정보 호출
    const getLocalPost = () => {
        const data = localStorage.getItem("post");
        if (data === null) {
            return [];
        } else {
            return JSON.parse(data);
        }
    };
    useEffect(() => {
        // console.log("날짜호출");
        const body = { saiSeq: "1", year: "2023", month: "02" };
        axios
            .get("http://192.168.0.208:9090/api/accountbook/list/month", body)
            .then((res) => console.log(res));
    }, []);
    const [todoData, setTodoData] = useState(getLocalPost());
    // 선택된 날짜
    const [date, setDate] = useState(new Date());
    // 이미지 출력
    const publicFolder = process.env.PUBLIC_URL;
    // 캘린더 내용 출력
    const showCalendar = ({ date, view }) => {
        console.log("넘어오니?", date);
    };
    const showTile = ({ date, view }) => {
        let html = [];
        let obj = todoData.find((item, index) => {
            if (item.timestamp === moment(date).format("YYYY-MM-DD")) {
                return item;
            }
        });
        if (obj !== undefined) {
            html.push(
                <div key={obj.timestamp}>
                    <span>{obj.title}</span>
                    <span>{obj.content}</span>
                </div>
            );
            return <div>{html}</div>;
        }
        return null;
    };
    return (
        <>
            <Wrap>
                <Calendar
                    formatDay={(locale, date) => moment(date).format("D")}
                    // 일요일부터 출력
                    calendarType="US"
                    // 날짜 선택시 날짜 변경
                    onChange={setDate}
                    // 달력에 출력될 html 작성
                    tileContent={showTile}
                />
                <Summary>
                    <Top>
                        <span>수입</span>
                        <span>지출</span>
                        <span>합계</span>
                    </Top>
                    <Bottom>
                        <span>3,117,000원</span>
                        <span>3,953,930원</span>
                        <span>-836,930원</span>
                    </Bottom>
                </Summary>
            </Wrap>
            {/* 상세 정보 내역 출력 */}
            {/* <div className="calender-detail">
                {todoData && (
                    <div className="calender-detail__item">
                        <div className="calender-detail__title">
                            <img
                                src={`${publicFolder}/images/starbucks.png`}
                                alt="스타벅스"
                                className="calender-detail__icon"
                                style={{ width: 20, height: 20 }}
                            />
                            방문한날
                        </div>
                        <div>{moment(date).format("YYYY년 MM월 DD일")}</div>
                        <div className="calender-detail__date-wrap">
                            {todoData.map((item, index) => item.title)}
                        </div>
                    </div>
                )}
            </div> */}
        </>
    );
};
const Wrap = styled.div`
    padding: 1%;
    .react-calendar {
        width: 100%;
        height: 643px;
    }
    .react-calendar__navigation__label > span {
        font-size: 32px;
        font-weight: 900;
        color: black;
        margin: 0;
    }
    .react-calendar button {
        border-collapse: collapse;
        height: 105px !important;
    }
    .react-calendar__navigation {
        height: 60px !important;
        border-bottom: 1px solid #a0a096;
        border-collapse: collapse;
    }
    .react-calendar__navigation button {
        height: 60px !important;
    }
    .react-calendar__month-view__weekdays {
        border-bottom: 1px solid #a0a096;
        height: 40px;
        font-size: 20px;
    }
    .react-calendar__tile--active {
        background: #4096ff !important;
        color: white;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #4096ff !important;
    }
    .react-calendar__tile--now {
        background: white;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #e6e6e6;
    }
`;
const Summary = styled.div`
    border: 1px solid #a0a096;
    width: 100%;
    height: 100%;
`;
const Top = styled.div`
    display: flex;
    justify-content: space-around;
    span {
        font-size: 30px;
    }
`;
const Bottom = styled.div`
    display: flex;
    justify-content: space-around;
    span {
        font-size: 30px;
    }
`;
export default MoneyCalendar;
