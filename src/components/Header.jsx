import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./ui/Button";
import { FaHeart } from "react-icons/fa";

const Header = () => {
    return (
        <HeaderFix>
            <Link to={"/"}>
                <FaHeart />
                커플통장
            </Link>
            <div>
                <Button>
                    <Link to={"/login"}>로그인</Link>
                </Button>
                <Button>
                    <Link to={"/login"}>로그아웃</Link>
                </Button>
                <Button>
                    <Link to={"/signup"}>회원가입</Link>
                </Button>
            </div>
        </HeaderFix>
    );
};

const HeaderFix = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
`;

export default Header;
