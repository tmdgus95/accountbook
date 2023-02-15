import React from "react";
import styled from "styled-components";
const HeartDay = () => {
    return (
        <>
            <Heart>
                <img
                    src="images/heart.svg.png"
                    alt=""
                    style={{ width: 100, height: 100, margin: "10px" }}
                />
                <Day>100일</Day>
            </Heart>
        </>
    );
};

const Heart = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
`;

const Day = styled.span`
    position: absolute;
    text-align: center;
    padding: 38px;
    margin-bottom: 5px;
`;
export default HeartDay;
