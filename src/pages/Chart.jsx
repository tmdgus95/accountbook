import * as React from "react";
import ChartPie from "../components/ChartPie";
import styled from "styled-components";

const data = [
    { cate: "생필품", extotal: 112 },
    { cate: "의료/건강", extotal: 450 },
    { cate: "패션", extotal: 11 },
    { cate: "여행", extotal: 60112 },
    { cate: "교육", extotal: 24548 },
    { cate: "오락", extotal: 34660 },
    { cate: "미용", extotal: 24436 },
    { cate: "카페", extotal: 1286 },
    { cate: "주거비", extotal: 24324 },
    { cate: "편의점", extotal: 10000 },
    { cate: "식비", extotal: 100 },
    { cate: "문화/여가", extotal: 100 },
];

const Piechart = () => {
    // const pieChartData = data.map((item) => ({
    //     id: item.cate,
    //     label: item.cate,
    //     value: item.extotal,
    // }));

    return (
        <div>
            <Expense>지출</Expense>
            <ChartPie />
        </div>
    );
};
const Expense = styled.div`
    width: 100%;
    background: #fbe300;
    text-align: center;
`;
export default Piechart;
