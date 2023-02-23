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
            .post("http://192.168.0.208:9090/api/member/logout", {}, header)
            .then((res) => console.log(res))
            .then(setUser((prev) => ""))
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
                        className="bg-main p-2 rounded-xl m-2"
                    >
                        로그아웃
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
