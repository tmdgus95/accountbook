import React from "react";
import styled from "styled-components";

const CoupleHome = () => {
    return (
        <div>
            <ImgCover>
                <Box>
                    <img
                        src="/images/home.avif"
                        alt="사진"
                        style={{ width: "500px", height: "500px" }}
                    />
                    <div>
                        <p style={{ fontSize: "30px" }}>
                            단순한 연애는 끝났다.
                        </p>
                        <br />
                        <Name>똑똑한 연애의 시작, 커플가계부</Name>
                        <br />
                        <p style={{fontSize:"20px",color:"#999"}}>
                            지금 연애하고 계신가요?
                            <br />
                            커플가계부를 시작하세요!
                            <br />
                            커플가계부는 연인과 더 똑똑하게
                            <br />
                            소통하고 미래도 준비할 수 있는
                            <br />
                            어플입니다.
                        </p>
                    </div>
                </Box>
            </ImgCover>
        </div>
    );
};
const ImgCover = styled.div`
    /* background: url("images/couple.png");
    background-repeat: no-repeat;
    background-size: cover; */
    max-width: 1280px;
    height: 71vh;
    margin: 0 auto;
`;

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    gap: 100px;
`;

const Name = styled.p`
    font-size: 50px;
    font-weight: 800;
    color: #ffd700;
`;
export default CoupleHome;
