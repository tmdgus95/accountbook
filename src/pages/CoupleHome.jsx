import React from "react";
import Notice from "../components/Notice";
import styled from "styled-components";
import SelectOption from "../components/SelectOption";
import ProfileCard from "../components/ProfileCard";
import { useAuthContext } from "../context/AuthContext";

const CoupleHome = () => {
    const { user } = useAuthContext();
    console.log(user);

    return (
        <div>
            <ImgCover>
                <SelectOption />
                <div style={{ height: "150px" }}></div>
                <Notice />
                <div className="z-50 text-center mt-16 text-white">
                    <div style={{ fontSize: "20px" }}>우리 커플</div>
                    <div style={{ fontSize: "80px" }}>
                        {user && user.loveDay}일
                    </div>
                    <div style={{ fontSize: "20px" }}>내일 더 사랑할게</div>
                </div>
                <Celebrate>
                    <div className="absolute mb-20">
                        <ProfileCard user={user} />
                    </div>
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000;
    padding-top: 200px;
    font-size: xx-large;
`;

export default CoupleHome;
