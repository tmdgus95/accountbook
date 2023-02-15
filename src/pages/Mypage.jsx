import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        name: yup.string().required(),
        password: yup
            .string("숫자를 입력하세요")
            .required("비밀번호를 입력하세요"),
        nickName: yup.string().required(),
    })
    .required();

const Mypage = () => {
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
            <p>회원정보 변경</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    이름 <input {...register("name")} />
                </label>
                <p>{errors.email?.message}</p>

                <label>
                    비밀번호 <input {...register("password")} />
                </label>
                <p>{errors.password?.message}</p>
                <label>
                    별명 <input {...register("nickName")} />
                </label>
                <p>{errors.nickName?.message}</p>
                <button>변경</button>
            </form>
            <button>회원탈퇴</button>
        </div>
    );
};

export default Mypage;
