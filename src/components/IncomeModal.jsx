import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputDatePicker from "./InputDatePicker";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    })
    .required();

const IncomeModal = ({ setModal }) => {
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

    const onSubmit = (data) => {
        const header = {
            headers: {
                Authorization,
            },
        };
        const body = {
            price: data.price,
            memo: data.memo,
            importStatus: data.gender,
            importDate: data.selectedDate,
        };
        axios
            .post(
                "http://192.168.0.208:9090/api/accountbook/import/add",
                body,
                header
            )
            .then((res) => console.log(res))
            .then(alert("저장되었습니다."))
            .then(setModal(false))
            .then(navigate("/couplehome"));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <p>날짜</p>
            <InputDatePicker control={control} {...register("selectedDate")} />
            <span className="text-red-500 pl-10">
                {errors.selectedDate && errors.selectedDate.message}
            </span>
            <p>성별</p>
            <select {...register("gender")}>
                <option value="">성별을 선택하세요</option>
                <option value="1">나</option>
                <option value="2">우리</option>
            </select>
            <span className="text-red-500 pl-10">
                {errors.gender && errors.gender.message}
            </span>
            <br />
            <label>
                금액 <br /> <input {...register("price")} /> 원
            </label>
            <span className="text-red-500 pl-4">{errors.price?.message}</span>
            <br />
            <label>
                메모 <br /> <input {...register("memo")} />
            </label>
            <span className="text-red-500 pl-10">{errors.memo?.message}</span>
            <SubmitBt onClick={handleSubmit(onSubmit)}>저장하기</SubmitBt>
        </form>
    );
};

const SubmitBt = styled.div`
    position: absolute;
    right: 20px;
    bottom: -165px;
    padding: 15px 25px;
    border-radius: 10px;
    background-color: #fbe300;
    font-size: 28px;
    font-weight: 600;
    cursor: pointer;
`;

export default IncomeModal;
