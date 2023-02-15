import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        name: yup.string("문자를 입력하세요").required("이메일을 입력하세요"),
        firstdate: yup
            .number("숫자를 입력하세요")
            .positive("양수를 입력하세요")
            .integer("정수를 입력하세요")
            .required("비밀번호를 입력하세요"),
    })
    .required();

const BankbookCreateModal = () => {
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
                    이름 <input {...register("name")} />
                </label>
                <p>{errors.email?.message}</p>

                <label>
                    우리의 1일 <input {...register("firstdate")} />
                </label>
                <p>{errors.pw?.message}</p>

                <button>로그인</button>
            </form>
        </div>
    );
};

export default BankbookCreateModal;
