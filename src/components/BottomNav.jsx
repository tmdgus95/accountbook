import React from "react";
import styled from "styled-components";
import { FaCalendarCheck } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdQueryStats } from "react-icons/md";
import { BsFillPieChartFill, BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const BottomNav = ({ setModal }) => {
    const { Authorization } = useAuthContext();

    const handleChange = () => {
        setModal(true);
    };

    return (
        <>
            <Fix>
                <FixUl>
                    <FixLi>
                        <Link to={Authorization ? "/calendar" : "/"}>
                            <FaCalendarCheck />
                        </Link>
                    </FixLi>
                    <FixLi>
                        <Link to={Authorization ? "/chart" : "/"}>
                            <BsFillPieChartFill />
                        </Link>
                    </FixLi>
                    <FixLi
                        onClick={() => {
                            Authorization && setModal(true);
                        }}
                    >
                        <AiOutlinePlusCircle style={{ cursor: "pointer" }} />
                    </FixLi>
                    <FixLi>
                        <Link to={Authorization ? "/Statistics" : "/"}>
                            <MdQueryStats />
                        </Link>
                    </FixLi>
                    <FixLi>
                        <Link to={Authorization ? "/mypage" : "/"}>
                            <BsFillPersonFill />
                        </Link>
                    </FixLi>
                </FixUl>
            </Fix>
        </>
    );
};
const Fix = styled.div`
    /* position: fixed; */
    bottom: 160px;
    width: 100%;
    background: black;
`;
const FixUl = styled.div`
    list-style: none;
    display: flex;
    justify-content: space-around;
    font-size: xx-large;
    color: #fbe300;
`;
const FixLi = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-size: 60px;
    opacity: 0.8;
    transition: all 0.5s;
    &:hover {
        opacity: 1;
        scale: 1.1;
    }
    > a {
        flex-direction: column;
        align-items: center;
        display: flex;
        svg {
            display: block;
            color: #fbe300;
        }
    }
`;
export default BottomNav;
