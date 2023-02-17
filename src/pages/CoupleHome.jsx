import React from "react";
import Notice from "../components/Notice";
import styled from "styled-components";
import SelectOption from "../components/SelectOption";

const CoupleHome = () => {
    return (
        <div>
            <ImgCover>
                <SelectOption />
                <div style={{ height: "150px" }}></div>
                <Notice />
                <Celebrate>
                    <div>우리 사귄지</div>
                    <div>100일</div>
                </Celebrate>
            </ImgCover>
        </div>
    );
};
const ImgCover = styled.div`
    background: url("images/background.jpg");
    background-size: cover;
    background-position: center;
    height: 70vh;
`;
const Celebrate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding-top: 350px;
    font-size: xx-large;
`;

export default CoupleHome;
