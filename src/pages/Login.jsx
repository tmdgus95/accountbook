import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/ui/Button";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const body = { email: data.email, password: data.password };
        // const body = { email: "email2", password: 1234 };
        axios

            .post("http://192.168.0.208:9090/api/member/login1", body)
            .then((res) => {
                console.log(res.data);
                return res.data;
            })
            .then((user) => setUser(user))
            .then(navigate("/couplehome"));
    };

    const inpustStlye =
        "outline-none mb-5 mt-2 focus:border-none focus:outline-main rounded-xl px-3";
    return (
        <div className="w-full text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-2xl">
                    이메일
                    <br />
                    <input className={inpustStlye} {...register("email")} />
                </label>
                <p>{errors.email?.message}</p>

                <label className="text-2xl">
                    비밀번호
                    <br />
                    <input className={inpustStlye} {...register("password")} />
                </label>
                <p>{errors.password?.message}</p>

                <Button>로그인</Button>
            </form>
            <p>
                아직 회원이 아니신가요?{" "}
                <Link style={{ color: "blue" }} to={"/signup"}>
                    회원가입
                </Link>
            </p>
        </div>
    );
};

export default Login;
