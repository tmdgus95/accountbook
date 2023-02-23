import React from "react";
import styled from "styled-components";

const Statistics = () => {
    return (
        <div>
            <Container className="container">
                <div className="item">A</div>
                <div className="item">B</div>
                <div className="item">C</div>
                <div className="item">D</div>
                <div className="item">E</div>
                <div className="item">F</div>
                <div className="item">G</div>
                <div className="item">H</div>
                <div className="item">i</div>
            </Container>
        </div>
    );
};

const Container = styled.div`
    display: grid;
    height: 80vh;
    border: 1px solid #000;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 150px 150px 150px;
    margin: 0 auto;

    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: skyblue;
    }

    .item:nth-child(1) {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
    }
`;

export default Statistics;
