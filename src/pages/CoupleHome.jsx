import React from "react";
import ProfileCard from "../components/ProfileCard";
import Notice from "../components/Notice";
import styled from "styled-components";
import HeartDay from "../components/HeartDay";
import Footer from "../components/Footer";
import SelectOption from "../components/SelectOption";

const CoupleHome = () => {
    return (
        <div>
            <ImgCover>
                <SelectOption />

                <div style={{ height: "150px" }}></div>
                <Notice />
                <Box>
                    <div>
                        단순한 연애는 끝났다.
                        <br />
                        똑똑한 연애의 시작, 커플통장
                        <br />
                        지금 연애하고 계신가요?
                        <br />
                        커플통장을 시작하세요!
                        <br />
                        커플통장은 연인과 더 똑똑하게
                        <br />
                        소통하고 미래도 준비할 수 있는
                        <br />
                        어플입니다.
                    </div>

                    <Photo>
                        <ProfileCard img="/images/jenny.jpg" name=" 제니" />
                        <HeartDay />
                        <ProfileCard img="images/bb.jpg" name="뷔" />
                    </Photo>
                </Box>
            </ImgCover>
        </div>
    );
};
const ImgCover = styled.div`
    background: url("images/jeju.jpg");
    background-repeat: no-repeat;
    background-size: cover;
`;

const Photo = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 55vh;
    margin: 0 auto;
    align-items: center;
`;

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export default CoupleHome;
