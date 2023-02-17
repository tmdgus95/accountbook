import React from "react";
import styled from "styled-components";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <FootContainer>
                <FootUl>
                    <li>대표 : 숭현이와 아이들</li>
                    <li>주소 : 대구광역시 중구 중앙대로 394, 제일빌딩 5F</li>
                    <li>이메일 : 가계부@github.com</li>

                    <span
                        className="text-xs tracking-wider"
                        style={{ color: "#999", fontSize: "14px" }}
                    >
                        (주) COPYRIGHT 가계부 ALL RIGHTS RESERVED.
                    </span>
                </FootUl>
                <Icon>
                    <IoLogoInstagram />
                    <FaFacebookSquare />
                    <AiOutlineMail />
                </Icon>
            </FootContainer>
        </footer>
    );
};
const FootContainer = styled.div`
    width: 100%;
    display: flex;
    background: #fbe300;
    flex-direction: column;
    text-align: start;
    padding: 40px 135px;
`;
const FootUl = styled.ul`
    list-style: none;
    line-height: 25px;
`;

const Icon = styled.div`
    font-size: 25px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: absolute;
    right: 135px;
`;
export default Footer;
