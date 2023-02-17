import React from "react";
import styled from "styled-components";
const HeartDay = () => {
    return (
        <>
            <Heart>
                <img
                    src="images/heart.svg.png"
                    alt=""
                    style={{ width: 300, height: 300, margin: "10px" }}
                />
                <Day>100일</Day>
            </Heart>
        </>
    );
};

const Heart = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    opacity: 0.7;
    :hover {
        transform: scale(1.5);
        transition: transform 2s;
    }
`;

const Day = styled.span`
    position: absolute;
    display: block;
    margin-top: 100px;
    font-size: xx-large;
    font-weight: 700;
`;
export default HeartDay;
