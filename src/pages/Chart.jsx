import * as React from "react";
import ChartPie from "../components/ChartPie";
import ChartLine from "../components/ChartLine";
import styled from "styled-components";

const Piechart = () => {
    return (
        <div>
            <Expense>지출</Expense>
            <ChartPie />
            <ChartLine />
        </div>
    );
};
const Expense = styled.div`
    width: 100%;
    background: #fbe300;
    text-align: center;
`;
export default Piechart;
