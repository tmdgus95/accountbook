import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/ui/Button";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import SearchPwModal from "../components/SearchPwModal";

const schema = yup
    .object({
        email: yup.string("문자를 입력하세요").required("이메일을 입력하세요"),
        password: yup
            .string("숫자를 입력하세요")
            .required("비밀번호를 입력하세요"),
    })
    .required();

const Login = () => {
    const { setUser } = useAuthContext();
    const navigate = useNavigate();
    const [searchPw, setSearchPw] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const body = { email: data.email, password: data.password };
        axios

            .post(`${process.env.REACT_APP_API_URL}/api/member/login`, body)
            .then((res) => {
                res.data.Authentication === null &&
                    alert(`통장번호는 ${res.data.shareAccountCode}입니다.`);
                setUser(res.data);
                res.data.Authentication === null
                    ? navigate("/")
                    : navigate("/couplehome");
            })
            .catch((err) => alert(err));
    };

    const inpustStlye =
        "outline-none mb-5 mt-2 focus:border-none focus:outline-main rounded-xl px-3 placeholder:text-center";
    return (
        <div className="w-full text-center h-login pt-48">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-2xl">
                    이메일
                    <br />
                    <input
                        placeholder="이메일을 입력하세요"
                        className={inpustStlye}
                        {...register("email")}
                    />
                </label>
                <p className="text-red-600">{errors.email?.message}</p>

                <label className="text-2xl">
                    비밀번호
                    <br />
                    <input
                        placeholder="비밀번호를 입력하세요"
                        type="password"
                        className={inpustStlye}
                        {...register("password")}
                    />
                </label>
                <p className="text-red-600">{errors.password?.message}</p>

                <button className="bg-main p-2 px-6 text-xl rounded-xl m-1 duration-300 opacity-80 hover:scale-110 hover:opacity-100 ">
                    로그인
                </button>
            </form>
            <p className="mt-5 text-xl">
                아직 회원이 아니신가요?{" "}
                <Link style={{ color: "blue" }} to={"/signup"}>
                    회원가입
                </Link>
            </p>
            <p className="mt-5 text-xl">
                비밀번호를 잊으셨나요?{" "}
                <button
                    className="bg-main p-2 px-6 rounded-xl m-1 duration-300 opacity-80 hover:scale-110 hover:opacity-100 "
                    onClick={() => setSearchPw((prev) => !prev)}
                >
                    비밀번호 찾기
                </button>
            </p>
            {searchPw && <SearchPwModal setSearchPw={setSearchPw} />}
        </div>
    );
};

export default Login;
