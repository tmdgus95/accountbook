import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        price: yup
            .number("숫자를 입력하세요")
            .positive("양수를 입력하세요")
            .integer("정수를 입력하세요")
            .required("금액을 입력하세요"),
        memo: yup.string("문자를 입력하세요").required("메모를 입력하세요"),
    })
    .required();

const ExpendModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    금액 <input {...register("price")} />
                </label>
                <p>{errors.price?.message}</p>

                <label>
                    메모 <input {...register("memo")} />
                </label>
                <p>{errors.memo?.message}</p>

                <button>저장</button>
            </form>
        </>
    );
};

export default ExpendModal;
