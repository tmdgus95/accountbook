import React from "react";
import styled from "styled-components";

const ProfileCard = ({ name }) => {
    const imageURL = "/images/starbucks.png";
    return (
        <div>
            <Img>
                <img
                    src={imageURL}
                    alt="사진"
                    style={{ width: "100px", height: "100px", margin: "10px" }}
                />
                <span>{name}</span>
            </Img>
            <div></div>
        </div>
    );
};

const Img = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;
export default ProfileCard;
