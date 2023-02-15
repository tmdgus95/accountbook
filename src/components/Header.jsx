import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
    return (
        <HeaderFix>
            <button>
                <Link to={"/"}>로고</Link>
            </button>
            <button>
                <Link to={"/login"}>로그인</Link>
            </button>
            <button>
                <Link to={"/login"}>로그아웃</Link>
            </button>
            <button>
                <Link to={"/signup"}>회원가입</Link>
            </button>
        </HeaderFix>
    );
};

const HeaderFix = styled.header``;

export default Header;
