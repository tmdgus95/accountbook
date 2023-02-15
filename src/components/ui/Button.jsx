import React from "react";
import styled from "styled-components";

const Button = ({ children }) => {
    return <Btn>{children}</Btn>;
};

const Btn = styled.button`
    background: #fbe300;
    border-radius: 4px;
    padding: 4px;
    margin: 0 2px;
`;

export default Button;
