import * as React from "react";
import ChartPie from "../components/ChartPie";
import styled from "styled-components";



const Piechart = () => {
    // const pieChartData = data.map((item) => ({
    //     id: item.cate,
    //     label: item.cate,
    //     value: item.extotal,
    // }));

    return (
        <div style={{ textAlign: "center" }}>
            <Expense > 카테고리별 지출</Expense>
            <ChartPie/>
        </div>
    );
};
const Expense = styled.span`
    background: #fbe300;
    padding: 15px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 50px;
`;
export default Piechart;
