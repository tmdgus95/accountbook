import React from "react";
import styled from "styled-components";
const Statistics = () => {
    return (
        <>
            <div>
                <Table>
                    <tr>
                        <Td colSpan="2">
                            <div>110,300원</div>
                            <div>남은예산</div>
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            <div>횟수</div>
                            <div>총 지출 횟수</div>
                        </Td>
                        <Td>
                            <div>횟수</div>
                            <div>총 수입 횟수</div>
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            <div>2,751,000원</div>
                            <div>총 지출 금액</div>
                        </Td>
                        <Td>
                            <div>2,751,000원</div>
                            <div>총 수입 금액</div>
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            <div>2,751,000원</div>
                            <div>가장 많이 쓴 날(년,월,일)</div>
                        </Td>
                        <Td>
                            <div>2,751,000원</div>
                            <div>가장 적게 쓴 날(년,월,일)</div>
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            <div>2,751,000원</div>
                            <div>가장 많이 쓴 달(년,월,일)</div>
                        </Td>
                        <Td>
                            <div>2,751,000원</div>
                            <div>가장 적게 쓴 날(년,월,일)</div>
                        </Td>
                    </tr>
                </Table>
            </div>
        </>
    );
};

const Table = styled.table`
    width: 75vw;
    height: 75vh;
    margin: 0 auto;
    padding: 20px;
    text-align: start;
    border-collapse: collapse;
    margin-bottom: 30px;
    margin-top: 30px;
`;

const Td = styled.td`
    padding: 20px;
    border: 1px solid #444444;
    font-size: 20px;
`;

export default Statistics;
