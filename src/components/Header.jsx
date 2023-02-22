import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { set } from "react-hook-form";

const Header = () => {
    const { Authorization, setUser } = useAuthContext();
    const navigate = useNavigate();
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
                        onClick={() => {
                            setUser((prev) => "");
                            navigate("/");
                        }}
                        className="bg-main p-2 rounded-xl m-2"
                    >
                        <Link to={"/login"}>로그아웃</Link>
                    </button>
                ) : (
                    <>
                        <button className="bg-main p-2 rounded-xl m-2">
                            <Link to={"/login"}>로그인</Link>
                        </button>

                        <button className="bg-main p-2 rounded-xl m-2">
                            <Link to={"/signup"}>회원가입</Link>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
