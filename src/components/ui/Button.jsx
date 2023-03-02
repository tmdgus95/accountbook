import React from "react";
import styled from "styled-components";

const Button = ({ children }) => {
    return <Btn>{children}</Btn>;
};

const Btn = styled.button`
    background: #fbe300;
    font-size: 24px;
    border-radius: 8px;
    padding: 8px;
    margin: 0 2px;
`;

export default Button;
