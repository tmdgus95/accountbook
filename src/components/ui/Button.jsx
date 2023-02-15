import React from "react";
import styled from "styled-components";

const Button = ({ content }) => {
    return <Btn>{content}</Btn>;
};

const Btn = styled.button`
    background: #fbe300;
    color: white;
`;

export default Button;
