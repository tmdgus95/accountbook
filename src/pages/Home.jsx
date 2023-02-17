import React from "react";
import ProfileCard from "../components/ProfileCard";
import Notice from "../components/Notice";
import styled from "styled-components";
import HeartDay from "../components/HeartDay";
import Footer from "../components/Footer";
import SelectOption from "../components/SelectOption";

const Home = () => {
    return (
        <div>
            <ImgCover>
                <SelectOption />
                <div style={{ height: "150px" }}></div>
                <Notice />
                <Photo>
                    <ProfileCard img="/images/jenny.jpg" name=" 제니" />
                    <HeartDay />
                    <ProfileCard img="images/bb.jpg" name="뷔" />
                </Photo>
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
export default Home;
