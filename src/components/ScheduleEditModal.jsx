import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import * as yup from "yup";
import InputDatePicker from "./InputDatePicker";
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
        selectedDate: yup
            .string("문자를 입력하세요")
            .required("날짜를 입력하세요"),

        memo: yup.string("문자를 입력하세요").required("메모를 입력하세요"),
    })
    .required();
const ScheduleEditModal = ({ setEditModal, scheduleId }) => {
    const { Authorization } = useAuthContext();
    const navigate = useNavigate();
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
        // console.log(data);
        const header = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization,
            },
        };
        const formData = new FormData();
        formData.append("file", data.image && data.image[0]);
        const body = {
            siMemo: data.memo,
            updateStartDate: data.selectedDate,
            updateEndDate: data.selectedDate,
        };
        const blob = new Blob([JSON.stringify(body)], {
            type: "application/json",
        });
        formData.append("json", blob);
        axios
            .post(
                `http://192.168.0.208:9090/api/calendar/update?siSeq=${scheduleId}`,
                formData,
                header
            )
            .then((res) => alert(res.data.message))
            .then(navigate("/"))
            .catch((err) => console.log(err));
    };
    return (
        <Wrap>
            <Inner>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>시작날짜</p>
                    <InputDatePicker
                        control={control}
                        {...register("selectedDate")}
                    />

                    <span className="text-red-500 pl-10">
                        {errors.selectedDate && errors.selectedDate.message}
                    </span>

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
                        메모 <br /> <input {...register("memo")} />
                    </label>
                    <span className="text-red-500 pl-10">
                        {errors.memo?.message}
                    </span>
                    <button onClick={handleSubmit(onSubmit)}>전송</button>
                </form>
                <button onClick={() => setEditModal(false)}>닫기</button>
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

export default ScheduleEditModal;
