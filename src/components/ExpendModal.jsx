import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SlClose } from "react-icons/sl";
import { BsCheckCircle } from "react-icons/bs";

import InputDatePicker from "./InputDatePicker";
import { useState } from "react";
import styled from "styled-components";

const schema = yup
    .object({
        price: yup
            .number("숫자를 입력하세요")
            .positive("양수를 입력하세요")
            .integer("정수를 입력하세요")
            .required("금액을 입력하세요"),
        memo: yup.string("문자를 입력하세요").required("메모를 입력하세요"),
        gender: yup.string().required("성별을 선택하세요"),
        cateSeq: yup.string().required("카테고리를 선택하세요"),
        image: yup.string().required("이미지를 선택하세요"),
    })
    .required();

const ExpendModal = ({ setModal }) => {
    const [dateError, setDateError] = useState(false);
    const errorMessage = "날짜를 선택해주세요";

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [imagePreview, setImagePreview] = useState("");
    const image = watch("image");

    useEffect(() => {
        if (image && image.length > 0) {
            const file = image[0];
            setImagePreview(URL.createObjectURL(file));
        }
    }, [image]);

    // const onSubmit = (data) => console.log(data);
    const onSubmit = (data) => {
        if (data.installDate === undefined) {
            setDateError(true);
            return;
        }
        setDateError(false);
        console.log(data);
    };

    const handleChange = () => {
        setModal(false);
    };

    return (
        <Wrap>
            <Inner>
                <Top>
                    <SlClose
                        onClick={handleChange}
                        style={{ cursor: "pointer" }}
                    />
                    <span>지출 입력</span>
                    <BsCheckCircle
                        onClick={handleSubmit(onSubmit)}
                        style={{ cursor: "pointer" }}
                    />
                </Top>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>날짜</p>
                    {dateError && errorMessage}
                    <InputDatePicker control={control} />
                    <p>성별</p>
                    <select {...register("gender")}>
                        <option value="">성별을 선택하세요</option>
                        <option value="woman">여자</option>
                        <option value="man">남자</option>
                    </select>
                    <span className="text-red-500 pl-4">
                        {errors.gender && errors.gender.message}
                    </span>
                    <br />
                    <p>카테고리</p>
                    <select {...register("cateSeq")}>
                        <option value="">카테고리를 선택하세요</option>
                        <option value="1">카페</option>
                        <option value="2">의료/건강</option>
                        <option value="3">오락</option>
                        <option value="4">교육</option>
                        <option value="5">여행</option>
                        <option value="6">패션</option>
                        <option value="7">미용</option>
                        <option value="8">생필품</option>
                        <option value="9">통신</option>
                        <option value="10">기타</option>
                        <option value="11">식비</option>
                        <option value="13">편의점</option>
                        <option value="14">문화/여가</option>
                        <option value="15">주거비</option>
                        <option value="16">취미</option>
                        <option value="17">술</option>
                        <option value="18">교통비</option>
                    </select>
                    <span className="text-red-500 pl-4">
                        {errors.cateSeq && errors.cateSeq.message}
                    </span>
                    <br />
                    <p>이미지 업로드</p>
                    <input
                        {...register("image")}
                        id="picture"
                        type="file"
                        className="focus:outline-none mb-3"
                    />
                    <img
                        src={imagePreview}
                        alt="imagePreview"
                        className="max-w-[55%] mb-4"
                    />
                    <label>
                        금액 <br /> <input {...register("price")} />
                    </label>
                    <span className="text-red-500 pl-4">
                        {errors.price?.message}
                    </span>
                    <br />
                    <label>
                        메모 <br /> <input {...register("memo")} />
                    </label>
                    <span className="text-red-500 pl-4">
                        {errors.memo?.message}
                    </span>
                </form>
            </Inner>
        </Wrap>
    );
};

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
    padding: 2% 30%;
    top: 0;
    left: 0;
`;
const Inner = styled.div`
    background: white;
    border-radius: 5px;
    padding: 3%;
    p {
        font-size: 20px;
        margin: 20px 0 10px;
    }
    label {
        font-size: 20px;
        input {
            width: 55%;
            margin-bottom: 15px;
            border: 1px solid #d9d9d9;
            border-radius: 6px;
            transition: border 0.2s, box-shadow 0.2s;
            &:focus {
                border-color: #4096ff;
                box-shadow: 0 0 0 2px rgb(5 145 255 / 10%);
                outline: none;
            }
        }
    }
    select {
        width: 55%;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.88);
        padding: 2%;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        transition: border 0.2s, box-shadow 0.2s;
        &:focus {
            border-color: #4096ff;
            box-shadow: 0 0 0 2px rgb(5 145 255 / 10%);
            outline: none;
        }
    }
`;
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    font-size: 30px;
`;

export default ExpendModal;
