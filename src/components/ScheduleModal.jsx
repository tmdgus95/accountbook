import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputDatePicker from "./InputDatePicker";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import styled from "styled-components";

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
        selectedDate: yup
            .string("문자를 입력하세요")
            .required("날짜를 입력하세요"),

        memo: yup.string("문자를 입력하세요").required("메모를 입력하세요"),
    })
    .required();

const ScheduleModal = ({ setModal }) => {
    const { Authorization } = useAuthContext();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,

        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

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
        // console.log(data);
        const header = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization,
            },
        };
        const formData = new FormData();
        formData.append("file", file && file);
        const body = {
            siStartDate: data.selectedDate,
            siEndDate: data.selectedDate,
            siMemo: data.memo,
        };
        const blob = new Blob([JSON.stringify(body)], {
            type: "application/json",
        });
        formData.append("json", blob);
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/api/calendar/put`,
                formData,
                header
            )
            .then((res) => console.log(res))
            .then(alert("스케줄이 등록되었습니다."))
            .then(setModal(false))
            .then(navigate("/"))
            .catch((err) => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <p>시작날짜</p>
            <InputDatePicker control={control} {...register("selectedDate")} />

            <span className="text-red-500 pl-10">
                {errors.selectedDate && errors.selectedDate.message}
            </span>
            {/* <p>끝날짜</p>
            <InputDatePicker control={control} {...register("siEndDate")} />

            <span className="text-red-500 pl-10">
                {errors.siEndDate && errors.siEndDate.message}
            </span> */}
            <br />
            <label>
                메모 <br /> <input {...register("memo")} />
            </label>
            <span className="text-red-500 pl-10">{errors.memo?.message}</span>
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
                    imagePreview === "" ? "/images/white_bg.png" : imagePreview
                }
                alt=""
                className="w-[340px] h-44"
            />
            <SubmitBt onClick={handleSubmit(onSubmit)}>저장하기</SubmitBt>
        </form>
    );
};
const SubmitBt = styled.div`
    position: absolute;
    right: 5px;
    bottom: -328px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fbe300;
    font-size: 28px;
    font-weight: 600;
    cursor: pointer;
`;

export default ScheduleModal;
