import React from "react";
import styled from "styled-components";
const Footer = () => {
    return (
        <footer>
            <FootContainer>
                <FootTitle>
                    <span className="m-2">가계부</span>
                </FootTitle>
                <FootUl>
                    <li>주소 : 대구광역시 중구 중앙대로 394, 제일빌딩 5F</li>
                    <li>전화 : 053.572.1005</li>
                    <li>이메일 : 가계부@github.com</li>
                    <li>고객만족센터 : 123.4567.8910</li>
                </FootUl>
                <span className="text-xs tracking-wider">
                    (주) COPYRIGHT 가계부 ALL RIGHTS RESERVED.
                </span>
                <div className="h-10"></div>
            </FootContainer>
        </footer>
    );
};
const FootContainer = styled.div`
    /* position: fixed; */
    bottom: 0;
    width: 100%;
    display: block;
    background: #fbe300;
    text-align: center;
    padding: 10px 0;
`;
const FootTitle = styled.div``;
const FootUl = styled.ul`
    list-style: none;
`;
export default Footer;
