import React from "react";
import styled from "styled-components";

const ProfileCard = ({ name, img }) => {
    return (
        <div>
            <Img>
                <img
                    src={img}
                    alt="사진"
                    style={{
                        width: "300px",
                        height: "300px",
                        margin: "10px",
                        borderRadius: "100%",
                    }}
                    />
                    <Name>{name}</Name>
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

const Name = styled.div`
    font-size: xx-large;
    font-weight: 700;
`;
export default ProfileCard;
