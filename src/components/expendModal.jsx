import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SlClose } from "react-icons/sl";
import { BsCheckCircle } from "react-icons/bs";

const schema = yup
    .object({
        price: yup
            .number("숫자를 입력하세요")
            .positive("양수를 입력하세요")
            .integer("정수를 입력하세요")
            .required("금액을 입력하세요"),
        memo: yup.string("문자를 입력하세요").required("메모를 입력하세요"),
        gender: yup.string().required("성별을 선택하세요"),
        category: yup.string().required("카테고리를 선택하세요"),
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
            <div>
                <SlClose />
                <span>지출 입력</span>
                <BsCheckCircle />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>날짜</p>

                <span>성별</span>
                <select {...register("gender")}>
                    <option value="">성별을 선택하세요</option>
                    <option value="woman">여자</option>
                    <option value="man">남자</option>
                </select>
                <p>{errors.gender && errors.gender.message}</p>

                <br />

                <span>카테고리</span>
                <select {...register("category")}>
                    <option value="">카테고리를 선택하세요</option>
                    <option value="food">음식</option>
                    <option value="cultural">문화생활</option>
                </select>
                <p>{errors.category && errors.category.message}</p>

                <br />

                <p>이미지 업로드</p>

                <label>
                    금액 <input {...register("price")} />
                </label>
                <p>{errors.price?.message}</p>

                <label>
                    메모 <input {...register("memo")} />
                </label>
                <p>{errors.memo?.message}</p>
                <button>버튼</button>
            </form>
        </>
    );
};

export default ExpendModal;
