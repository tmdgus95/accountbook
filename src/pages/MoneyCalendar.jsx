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
import { useAuthContext } from "../context/AuthContext";
import SelectOption from "../components/SelectOption";
import CalendarDetail from "../components/CalendarDetail";

const MoneyCalendar = () => {
    const { Authorization } = useAuthContext();
    const [calendarDetailModal, setCalendarDetailModal] = useState(false);

    // 사용자타입
    const [type, setType] = useState("couple");

    // 월별데이터
    const [expenseData, setExpenseData] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [totalMoney, setTotalMoney] = useState();
    const monthExpenseMoney =
        expenseData &&
        expenseData.reduce((acc, cur) => {
            return acc + cur.expenseSum;
        }, 0);
    const monthImportMoney =
        expenseData &&
        expenseData.reduce((acc, cur) => {
            return acc + cur.importSum;
        }, 0);

    // 선택된 날짜
    const [date, setDate] = useState(new Date());
    // console.log(new Date());
    // 사용 X ?
    // const [month, setMonth] = useState(null);

    // 월별 총합 (월 공유지출수입조회) 받아온 데이터
    useEffect(() => {
        const header = {
            headers: {
                Authorization,
            },
        };

        typeSelector(type, date, header, setExpenseData);
        // axios
        //     .get(
        //         `http://192.168.0.208:9090/api/accountbook/list/month/otherperson?year=${moment(
        //             date
        //         ).format("YYYY")}&month=${moment(date).format("MM")}`,
        //         header
        //     )
        //     .then((res) => {
        //         console.log(res.data.expenseImportTotalList);
        //         setExpenseData(res.data.expenseImportTotalList);
        //     });

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

        axios
            .get(
                `http://192.168.0.208:9090/api/accountbook/list/totalprice`,
                header
            )
            .then((res) => setTotalMoney(res.data.myAccountInfoVO));
    }, [date, type]);

    // useEffect(() => {
    //     console.log(expenseData);
    // }, [expenseData]);

    // useEffect(() => {
    //     console.log("날짜", date);
    // }, [date]);

    // 캘린더 내용 출력
    const showTile = ({ date, view }) => {
        let html = [];
        let obj = expenseData.find((item) => {
            if (item.dt === moment(date).format("YYYY-MM-DD")) {
                return item;
            }
        });

        let obj2 = schedule.find((item) => {
            if (item.stdate === moment(date).format("YYYY-MM-DD")) {
                return item;
            }
        });

        if (obj !== undefined) {
            html.push(
                <div key={obj.dt}>
                    <span>지출 {obj.expenseSum}</span>
                    <br />
                    <span>수입 {obj.importSum ? obj.importSum : 0}</span>
                </div>
            );
            if (obj2 !== undefined) {
                html.push(<span>일정 {obj2.memo}</span>);
            }
            return <div>{html}</div>;
        }
        return null;
    };

    const onClickDay = (e) => {
        setDate(e);

        // 클릭할경우 <CalendarDetail date= e />
        setCalendarDetailModal(true);
    };

    const onViewChange = (e) => {
        // console.log(e.activeStartDate);
        setDate(e.activeStartDate);
    };

    console.log(totalMoney && totalMoney);

    return (
        <>
            <Wrap>
                {calendarDetailModal && (
                    <CalendarDetail
                        date={date}
                        setCalendarDetailModal={setCalendarDetailModal}
                    />
                )}

                <SelectOption setType={setType} />
                <Calendar
                    formatDay={(locale, date) => moment(date).format("D")}
                    // 일요일부터 출력
                    calendarType="US"
                    // 날짜 선택시 날짜 변경
                    onChange={(e) => onClickDay(e)}
                    onClickMonth={setDate}
                    onActiveStartDateChange={onViewChange}
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
                        <span>{monthImportMoney}원</span>
                        <span>{monthExpenseMoney}원</span>
                        <span>{monthImportMoney - monthExpenseMoney}원</span>
                    </Bottom>
                </Summary>
                <Summary>
                    <Top>
                        <span>총 수입</span>
                        <span>총 지출</span>
                        <span>총 합계</span>
                    </Top>
                    <Bottom>
                        <span>{totalMoney && totalMoney.totalImport}원</span>
                        <span>{totalMoney && totalMoney.totalExpense}원</span>
                        <span>{totalMoney && totalMoney.balance}원</span>
                    </Bottom>
                </Summary>
            </Wrap>
        </>
    );
};

function typeSelector(type, date, header, setExpenseData) {
    if (type === "couple") {
        axios
            .get(
                `http://192.168.0.208:9090/api/accountbook/list/month/${type}?year=${moment(
                    date
                ).format("YYYY")}&month=${moment(date).format("MM")}`,
                header
            )
            .then((res) => {
                setExpenseData(res.data.month);
            });
    } else {
        axios
            .get(
                `http://192.168.0.208:9090/api/accountbook/list/month/${type}?year=${moment(
                    date
                ).format("YYYY")}&month=${moment(date).format("MM")}`,
                header
            )
            .then((res) => {
                setExpenseData(res.data.expenseImportTotalList);
            });
    }
}

const Wrap = styled.div`
    padding: 1%;
    .react-calendar {
        width: 100%;
        height: 658px;
    }
    .react-calendar__navigation__label > span {
        font-size: 32px;
        font-weight: 900;
        color: black;
        margin: 0;
    }
    .react-calendar button {
        border-collapse: collapse;
        height: 90px !important;
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
    height: 88px;
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
