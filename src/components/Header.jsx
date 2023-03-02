import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const Header = () => {
    const { Authorization, setUser } = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        const header = {
            headers: {
                Authorization,
            },
        };
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/member/logout`,
                {},
                header
            )
            .then((res) => console.log(res))
            .then(setUser((prev) => ""))
            .then(alert("로그아웃 되었습니다."))
            .then(navigate("/"))
            .catch((err) => console.log(err));
    };
    return (
        <header className="flex justify-between  w-full px-10 text-lg font-medium">
            <div>
                <Link to={Authorization ? "/couplehome" : "/"} className="flex">
                    <FaHeart className="text-red-400 mt-4 mr-2 text-3xl" />
                    <span className="mt-4">커플통장</span>
                </Link>
            </div>

            <div>
                {Authorization ? (
                    <button
                        onClick={handleLogout}
                        className="bg-main p-2 px-6 text-xl rounded-xl m-1 duration-300 opacity-80 hover:scale-110 hover:opacity-100 "
                    >
                        로그아웃
                    </button>
                ) : (
                    <>
                        <button className="bg-main p-2 px-6 text-xl rounded-xl m-1 duration-300 opacity-80 hover:scale-110 hover:opacity-100 ">
                            <Link to={"/login"}>로그인</Link>
                        </button>

                        <button className="bg-main p-2 px-6 text-xl rounded-xl m-1 duration-300 opacity-80 hover:scale-110 hover:opacity-100 ">
                            <Link to={"/signup"}>회원가입</Link>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
