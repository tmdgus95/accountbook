import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BankbookCreateModal from "../components/BankbookCreateModal";
import { useState } from "react";

const schema = yup
    .object({
        mbiBasicEmail: yup
            .string("문자를 입력하세요")
            .required("이메일을 입력하세요"),
        password: yup
            .string("숫자를 입력하세요")
            .required("비밀번호를 입력하세요"),
        gender: yup.number().required(),
        name: yup.string().required(),
        mbiStartDay: yup.string().required(),
        mbiBrith: yup.string().required(),
        nickName: yup.string().required(),
        accountNumber: yup.string(),
    })
    .required();

const SignUp = () => {
    const [createBank, setCreateBank] = useState(false);
    const [bankBookNumber, setBankBookNumber] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);
    const inpustStlye =
        "outline-none mb-5 mt-2 focus:border-none focus:outline-main rounded-xl px-3";
    return (
        <div className="w-full text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-2xl">
                    이메일
                    <br />
                    <input
                        className={inpustStlye}
                        {...register("mbiBasicEmail")}
                    />
                </label>
                <p>{errors.mbiBasicEmail?.message}</p>

                <label className="text-2xl">
                    비밀번호
                    <br />
                    <input className={inpustStlye} {...register("password")} />
                </label>
                <p>{errors.password?.message}</p>

                <label className="text-2xl">
                    성별
                    <br />
                    <select {...register("gender")}>
                        <option value="">성별을 선택하세요</option>
                        <option value="1">여자</option>
                        <option value="0">남자</option>
                    </select>
                </label>
                <p>{errors.gender && errors.gender.message}</p>

                <label className="text-2xl">
                    이름
                    <br />
                    <input className={inpustStlye} {...register("name")} />
                </label>
                <p>{errors.name?.message}</p>

                <label className="text-2xl">
                    사귄날
                    <br />
                    <input
                        className={inpustStlye}
                        {...register("mbiStartDay")}
                    />
                </label>
                <p>{errors.mbiStartDay?.message}</p>

                <label className="text-2xl">
                    생일
                    <br />
                    <input className={inpustStlye} {...register("mbiBrith")} />
                </label>
                <p>{errors.mbiStartDay?.message}</p>

                <label className="text-2xl">
                    별명
                    <br />
                    <input className={inpustStlye} {...register("nickName")} />
                </label>
                <p>{errors.nickName?.message}</p>

                <label className="text-2xl">
                    통장번호
                    <br />
                    <input
                        className={inpustStlye}
                        {...register("accountNumber")}
                    />
                </label>
                <p>{errors.accountNumber?.message}</p>
                <button className="text-2xl bg-main rounded-xl p-3 mb-3">
                    회원가입
                </button>
            </form>
            {createBank && (
                <BankbookCreateModal
                    setCreateBank={setCreateBank}
                    setBankBookNumber={setBankBookNumber}
                />
            )}
            <button className="text-2xl bg-main rounded-xl p-3 mb-3">
                <span onClick={() => setCreateBank((prev) => !prev)}>
                    통장개설
                </span>
            </button>

            <p>
                이미 회원이신가요?{" "}
                <Link className="text-blue-300" to={"/login"}>
                    로그인
                </Link>
            </p>
        </div>
    );
};

export default SignUp;

// 이메일 비밀번호 이름 닉네임 참여코드 통장개설 이름 사귄날
