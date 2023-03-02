import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputDatePicker from "./InputDatePicker";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SlClose } from "react-icons/sl";

yup.setLocale({
    mixed: {
        default: "사용할 수 없는 값입니다.",
        required: "필수 입력입니다.",
        oneOf: "다음 값 중 하나여야 합니다.: ${values}",
        notOneOf: "다음 값 중 하나가 아니어야 합니다.: ${values}",
        notType: function notType(_ref) {
            let path = _ref.path,
                type = _ref.type,
                value = _ref.value,
                originalValue = _ref.originalValue;
            let isCast = originalValue != null && originalValue !== value;
            let msg = "";
            if (type === "number") {
                msg = "숫자를 입력하세요";
            } else if (type === "date") {
                msg = "날짜 형식으로 입력해주세요.";
            } else {
                msg = path + " 항목은 `" + type + "` 형식으로 입력해주세요.";
            }

            // if (value === null) {
            //   msg +=
            //     '\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`';
            // }

            return msg;
        },
        defined: "정의되지 않았습니다.",
    },
    string: {
        length: "${length}자로 입력해주세요.",
        min: "${min}자 이상 입력바랍니다.",
        max: "${max}자 까지 입력됩니다.",
        email: "이메일 형식이 아닙니다.",
    },
});
const schema = yup
    .object({
        price: yup
            .number()
            .positive("양수를 입력하세요")
            .integer("정수를 입력하세요")
            .required("금액을 입력하세요"),
        selectedDate: yup
            .string("문자를 입력하세요")
            .required("날짜를 입력하세요"),
        memo: yup.string("문자를 입력하세요").required("메모를 입력하세요"),
        gender: yup.string().required("성별을 선택하세요"),
        cateSeq: yup.string().required("카테고리를 선택하세요"),
    })
    .required();

const ExpendEditModal = ({ setEditModal, expense, expenseId }) => {
    const navigate = useNavigate();
    const { Authorization } = useAuthContext();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    console.log(expense.expenseSeq);

    const [file, setFile] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const handleChangeImg = (e) => setFile(e.target.files[0]);
    useEffect(() => {
        if (file || file.length > 0) {
            const image = file;
            setImagePreview(URL.createObjectURL(image));
        }
    }, [file]);
    const imageInput = useRef();
    const onCickImageUpload = () => {
        imageInput.current.click();
    };

    const onSubmit = (data) => {
        // console.log(file);
        const header = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization,
            },
        };
        const formData = new FormData();
        formData.append("file", file && file);
        const body = {
            updatePrice: data.price,
            updateDate: data.selectedDate,
            updateMemo: data.memo,
            updateStatus: data.gender,
            updateCateSeq: data.cateSeq,
        };
        const blob = new Blob([JSON.stringify(body)], {
            type: "application/json",
        });
        formData.append("json", blob);
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/accountbook/expense/update?eiSeq=${expenseId}`,
                formData,
                header
            )
            .then((res) => console.log(res.data))
            .then(alert("저장되었습니다."))
            .then(setEditModal(false))
            .then(navigate("/couplehome"))
            .catch((err) => console.log(err));
    };

    return (
        <Wrap>
            <Inner>
                <Title>지출 수정</Title>
                <SlClose
                    onClick={() => setEditModal(false)}
                    className="absolute top-8 right-6 cursor-pointer text-[40px]"
                />
                <form onSubmit={handleSubmit(onSubmit)} className="relative">
                    <p>날짜</p>
                    <InputDatePicker
                        control={control}
                        {...register("selectedDate")}
                    />
                    <span className="text-red-500 pl-10">
                        {errors.selectedDate && errors.selectedDate.message}
                    </span>
                    <p>작성자</p>
                    <select {...register("gender")}>
                        <option value="">작성자를 선택하세요</option>
                        <option value="1">나</option>
                        <option value="2">우리</option>
                    </select>
                    <span className="text-red-500 pl-10">
                        {errors.gender && errors.gender.message}
                    </span>
                    <br />
                    <p>카테고리</p>
                    <select {...register("cateSeq")} className="mb-4">
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
                    <span className="text-red-500 pl-10">
                        {errors.cateSeq && errors.cateSeq.message}
                    </span>
                    <br />
                    <label>
                        금액 <br />{" "}
                        <input {...register("price")} className="mt-2" /> 원
                    </label>
                    <span className="text-red-500 pl-4">
                        {errors.price?.message}
                    </span>
                    <br />
                    <label>
                        메모 <br />{" "}
                        <input {...register("memo")} className="mt-2" />
                    </label>
                    <span className="text-red-500 pl-10">
                        {errors.memo?.message}
                    </span>
                    <br />
                    <input
                        type="file"
                        accept="image/*"
                        ref={imageInput}
                        onChange={handleChangeImg}
                        className="hidden"
                    />
                    <button
                        className="bg-orange-200 p-3 mt-1 mb-4 rounded-xl text-lg"
                        onClick={onCickImageUpload}
                        type="button"
                    >
                        이미지업로드
                    </button>
                    <img
                        src={
                            imagePreview === ""
                                ? "/images/white_bg.png"
                                : imagePreview
                        }
                        alt=""
                        className="w-[340px] h-44"
                    />
                    <SubmitBt onClick={handleSubmit(onSubmit)}>
                        저장하기
                    </SubmitBt>
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
    padding: 3% 30% 2% 30%;
    top: 0;
    left: 0;
`;
const Inner = styled.div`
    position: relative;
    height: 950px;
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
            font-size: 16px;
            color: rgba(0, 0, 0, 0.88);
            padding: 1%;
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
        padding: 1.2%;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        transition: border 0.2s, box-shadow 0.2s;
        &:focus {
            border-color: #4096ff;
            box-shadow: 0 0 0 2px rgb(5 145 255 / 10%);
            outline: none;
        }
    }
`;
const Title = styled.div`
    text-align: center;
    font-size: 40px;
    font-weight: 600;
`;
const SubmitBt = styled.div`
    position: absolute;
    right: 5px;
    bottom: -90px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fbe300;
    font-size: 28px;
    font-weight: 600;
    cursor: pointer;
`;

export default ExpendEditModal;
