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
            <div>
                <SelectOption />
                <div style={{ height: "150px" }}></div>
                <Notice />
                <Photo>
                    <ProfileCard img="/images/bback.png" name="조승현" />
                    <HeartDay />
                    <ProfileCard img="images/starbucks.png" name="뚱이" />
                </Photo>
            </div>
        </div>
    );
};
const Photo = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 80vh;
    margin: 0 auto;
    align-items: center;
`;
export default Home;
