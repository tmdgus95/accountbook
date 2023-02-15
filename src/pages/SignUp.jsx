import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BankbookCreateModal from "../components/BankbookCreateModal";

const schema = yup
    .object({
        email: yup.string("문자를 입력하세요").required("이메일을 입력하세요"),
        pw: yup
            .number("숫자를 입력하세요")
            .positive("양수를 입력하세요")
            .integer("정수를 입력하세요")
            .required("비밀번호를 입력하세요"),
        name: yup.string().required(),
        nickname: yup.string().required(),
        code: yup.string(),
    })
    .required();

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    이메일 <input {...register("email")} />
                </label>
                <p>{errors.email?.message}</p>

                <label>
                    비밀번호 <input {...register("pw")} />
                </label>
                <p>{errors.pw?.message}</p>

                <label>
                    이름 <input {...register("name")} />
                </label>
                <p>{errors.name?.message}</p>

                <label>
                    별명 <input {...register("nickname")} />
                </label>
                <p>{errors.nickname?.message}</p>

                <label>
                    참여코드 <input {...register("code")} />
                </label>
                <p>{errors.code?.message}</p>
                <button>회원가입</button>
            </form>
            <BankbookCreateModal />
            <button>통장개설</button>
            <p>
                이미 회원이신가요? <Link to={"/login"}>로그인</Link>
            </p>
        </div>
    );
};

export default SignUp;

// 이메일 비밀번호 이름 닉네임 참여코드 통장개설 이름 사귄날
