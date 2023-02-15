import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./ui/Button";

const Header = () => {
    return (
        <HeaderFix>
            <Button>
                <Link to={"/"}>로고</Link>
            </Button>
            <Button>
                <Link to={"/login"}>로그인</Link>
            </Button>
            <Button>
                <Link to={"/login"}>로그아웃</Link>
            </Button>
            <Button>
                <Link to={"/signup"}>회원가입</Link>
            </Button>
        </HeaderFix>
    );
};

const HeaderFix = styled.header``;

export default Header;
