import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputDatePicker from "./InputDatePicker";
import { useState } from "react";

import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

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

const ScheduleModal = () => {
    const { Authorization } = useAuthContext();
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

    const onSubmit = (data) => {
        const header = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization,
            },
        };
        const formData = new FormData();
        formData.append("file", data.image && data.image[0]);
        const body = {
            price: data.price,
            memo: data.memo,
            date: data.selectedDate,
            status: data.gender,
            cateSeq: data.cateSeq,
        };
        const blob = new Blob([JSON.stringify(body)], {
            type: "application/json",
        });
        formData.append("json", blob);
        axios
            .post(
                "http://192.168.0.208:9090/api/accountbook/expense/add",
                formData,
                header
            )
            .then((res) => console.log(res));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <span className="text-red-500 pl-10">
                {errors.cateSeq && errors.cateSeq.message}
            </span>
            <br />
            <p>이미지 업로드</p>
            <input
                {...register("image")}
                id="picture"
                type="file"
                name="image"
                accept="image/*"
                className="focus:outline-none mb-3"
            />
            <img
                src={imagePreview}
                alt="imagePreview"
                className="max-w-[55%] mb-4"
            />
            <label>
                금액 <br /> <input {...register("price")} /> 원
            </label>
            <span className="text-red-500 pl-4">{errors.price?.message}</span>
            <br />
            <label>
                메모 <br /> <input {...register("memo")} />
            </label>
            <span className="text-red-500 pl-10">{errors.memo?.message}</span>
            <button onClick={handleSubmit(onSubmit)}>전송</button>
        </form>
    );
};

export default ScheduleModal;
