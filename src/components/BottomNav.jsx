import React from "react";
import styled from "styled-components";
import { FaCalendarCheck } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
    BsFillPieChartFill,
    BsBarChartLineFill,
    BsFillPersonFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
const BottomNav = () => {
    return (
        <>
            <Fix>
                <FixUl>
                    <FixLi>
                        <Link to="/calendar">
                            <FaCalendarCheck />
                            <span>달력</span>
                        </Link>
                    </FixLi>
                    <FixLi>
                        <Link to="/chart">
                            <BsFillPieChartFill />
                            <span>차트</span>
                        </Link>
                    </FixLi>
                    <FixLi>
                        <Link to="">
                            <AiOutlinePlusCircle style={{ fontSize: "55px" }} />
                        </Link>
                    </FixLi>
                    <FixLi>
                        <Link to="/Statistics">
                            <BsBarChartLineFill />
                            <span>통계</span>
                        </Link>
                    </FixLi>
                    <FixLi>
                        <Link to="/mypage">
                            <BsFillPersonFill />
                            <span>마이페이지</span>
                        </Link>
                    </FixLi>
                </FixUl>
            </Fix>
        </>
    );
};
const Fix = styled.div`
    position: fixed;
    bottom: 180px;
    width: 100%;
    background: gray;
`;
const FixUl = styled.div`
    list-style: none;
    display: flex;
    justify-content: space-around;
    font-size: xx-large;
    color: #fbe300;
    margin-top: 7px;
`;
const FixLi = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    > a {
        flex-direction: column;
        align-items: center;
        display: flex;
        svg {
            display: block;
            color: #fbe300;
        }
        span {
            color: #fbe300;
            display: block;
        }
    }
`;
export default BottomNav;
