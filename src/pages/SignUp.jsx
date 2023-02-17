import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BankbookCreateModal from "../components/BankbookCreateModal";
import Button from "../components/ui/Button";
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
                    이메일 <input {...register("mbiBasicEmail")} />
                </label>
                <p>{errors.mbiBasicEmail?.message}</p>

                <label>
                    비밀번호 <input {...register("password")} />
                </label>
                <p>{errors.password?.message}</p>

                <label>
                    성별 <input {...register("gender")} />
                </label>
                <p>{errors.gender?.message}</p>

                <label>
                    이름 <input {...register("name")} />
                </label>
                <p>{errors.name?.message}</p>

                <label>
                    사귄날 <input {...register("mbiStartDay")} />
                </label>
                <p>{errors.mbiStartDay?.message}</p>

                <label>
                    생일 <input {...register("mbiBrith")} />
                </label>
                <p>{errors.mbiStartDay?.message}</p>

                <label>
                    별명 <input {...register("nickName")} />
                </label>
                <p>{errors.nickName?.message}</p>

                <label>
                    통장번호 <input {...register("accountNumber")} />
                </label>
                <p>{errors.accountNumber?.message}</p>
                <Button>회원가입</Button>
            </form>
            {createBank && <BankbookCreateModal />}
            <Button>
                <span onClick={() => setCreateBank((prev) => !prev)}>
                    통장개설
                </span>
            </Button>

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
