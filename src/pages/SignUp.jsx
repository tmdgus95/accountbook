import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BankbookCreateModal from "../components/BankbookCreateModal";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import BankbookCheckModal from "../components/BankbookCheckModal";

const schema = yup
    .object({
        mbiBasicEmail: yup
            .string("문자를 입력하세요")
            .required("이메일을 입력하세요"),
        password: yup
            .string("숫자를 입력하세요")
            .required("비밀번호를 입력하세요"),
        gender: yup.number().required(),
        name: yup.string().required(),
        mbiStartDay: yup.string().required(),
        mbiBrith: yup.string().required(),
        nickName: yup.string().required(),
        accountNumber: yup.string(),
    })
    .required();

const SignUp = () => {
    const [createBank, setCreateBank] = useState(false);
    const [checkBank, setCheckBank] = useState(false);
    const [bankBookNumber, setBankBookNumber] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
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

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("file", file && file);
        const body = {
            mbiBasicEmail: data.mbiBasicEmail,
            password: data.password,
            gender: data.gender,
            name: data.name,
            mbiStartDay: data.mbiStartDay,
            mbiBrith: data.mbiBrith,
            nickName: data.nickName,
            accountNumber: bankBookNumber,
        };
        const blob = new Blob([JSON.stringify(body)], {
            type: "application/json",
        });
        formData.append("json", blob);
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/member/join`, formData)
            .then((res) => {
                res.data.message === "회원가입 완료" && alert(res.data.message);
                res.data.message === "회원가입 완료" && navigate("/");
            })
            .catch((err) => alert(err));
    };

    const imageInput = useRef();

    const onCickImageUpload = () => {
        imageInput.current.click();
    };

    const inpustStlye =
        "outline-none mb-5 mt-2 focus:border-none focus:outline-main rounded-xl px-3";
    return (
        <div className="w-full text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-2xl">
                    이메일
                    <br />
                    <input
                        className={inpustStlye}
                        {...register("mbiBasicEmail")}
                    />
                </label>
                <p>{errors.mbiBasicEmail?.message}</p>

                <label className="text-2xl">
                    비밀번호
                    <br />
                    <input className={inpustStlye} {...register("password")} />
                </label>
                <p>{errors.password?.message}</p>

                <label className="text-2xl">
                    성별
                    <br />
                    <select {...register("gender")}>
                        <option value="">성별을 선택하세요</option>
                        <option value="1">여자</option>
                        <option value="0">남자</option>
                    </select>
                </label>
                <p>{errors.gender && errors.gender.message}</p>

                <label className="text-2xl">
                    이름
                    <br />
                    <input className={inpustStlye} {...register("name")} />
                </label>
                <p>{errors.name?.message}</p>

                <label className="text-2xl">
                    사귄날
                    <br />
                    <input
                        className={inpustStlye}
                        {...register("mbiStartDay")}
                    />
                </label>
                <p>{errors.mbiStartDay?.message}</p>

                <label className="text-2xl">
                    생일
                    <br />
                    <input className={inpustStlye} {...register("mbiBrith")} />
                </label>
                <p>{errors.mbiStartDay?.message}</p>

                <label className="text-2xl">
                    별명
                    <br />
                    <input className={inpustStlye} {...register("nickName")} />
                </label>
                <p>{errors.nickName?.message}</p>

                <label className="text-2xl">
                    통장번호
                    <br />
                    <input
                        className={inpustStlye}
                        {...register("accountNumber")}
                        defaultValue={bankBookNumber && bankBookNumber}
                    />
                </label>
                <p>{errors.accountNumber?.message}</p>

                <button
                    type="button"
                    className="text-2xl bg-main rounded-xl p-3 mb-3 mr-3"
                    onClick={() => setCreateBank((prev) => !prev)}
                >
                    통장개설
                </button>

                <button
                    type="button"
                    className="text-2xl bg-main rounded-xl p-3 mb-3"
                    onClick={() => setCheckBank(true)}
                >
                    통장확인
                </button>

                <img
                    src={imagePreview}
                    alt="프로필이미지를 선택하세요"
                    className="w-60 h-60 mb-4 mx-auto"
                />

                <input
                    type="file"
                    onChange={handleChangeImg}
                    ref={imageInput}
                    className="hidden"
                />

                <br />

                <button
                    className="text-2xl bg-main rounded-lg p-3 mb-3 mr-4"
                    onClick={onCickImageUpload}
                    type="button"
                >
                    이미지업로드
                </button>
                <button className="text-2xl bg-main rounded-lg p-3 mb-3">
                    회원가입
                </button>
            </form>
            {createBank && (
                <BankbookCreateModal
                    setCreateBank={setCreateBank}
                    setBankBookNumber={setBankBookNumber}
                />
            )}
            {checkBank && <BankbookCheckModal setCheckBank={setCheckBank} />}

            <p>
                이미 회원이신가요?{" "}
                <Link className="text-blue-300" to={"/login"}>
                    로그인
                </Link>
            </p>
        </div>
    );
};

export default SignUp;
