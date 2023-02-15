import React from "react";
import ProfileCard from "../components/ProfileCard";
import Notice from "../components/Notice";
import styled from "styled-components";
import HeartDay from "../components/HeartDay";
import Footer from "../components/Footer";
const Home = () => {
    return (
        <div>
            <Notice />
            <Photo>
                <ProfileCard name="조승현" />
                <HeartDay />
                <ProfileCard name="뚱이" />
            </Photo>
        </div>
    );
};
const Photo = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;
export default Home;
