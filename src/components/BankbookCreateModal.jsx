import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "./ui/Button";

const schema = yup
    .object({
        name: yup.string("문자를 입력하세요").required("이름을 입력하세요"),
        startDay: yup
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
                <p>{errors.name?.message}</p>

                <label>
                    우리의 1일 <input {...register("startDay")} />
                </label>
                <p>{errors.startDay?.message}</p>

                <Button>개설하기</Button>
            </form>
        </div>
    );
};

export default BankbookCreateModal;
