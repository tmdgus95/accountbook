import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
    .object({
        name: yup.string("문자를 입력하세요").required("이름을 입력하세요"),
        startDay: yup
            .string("숫자를 입력하세요")
            .required("비밀번호를 입력하세요"),
    })
    .required();

const BankbookCreateModal = ({ setCreateBank, setBankBookNumber }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        const body = {
            name: data.name,
            startDay: data.startDay,
        };
        axios
            .post("http://192.168.0.208:9090/api/shareaccount/join", body)
            .then((res) => {
                console.log(res);
                return res.data.accountCode;
            })
            .then((code) => setBankBookNumber(code));
        setCreateBank(false);
    };
    const inpustStlye =
        "outline-none mb-5 mt-2 focus:border-none focus:outline-main rounded-xl px-3";
    return (
        <div className="w-full h-full absolute bg-black bg-opacity-50 z-10 top-0 p-60 px-96 ">
            <div className="bg-white rounded-xl py-4">
                <div className="w-full text-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-2xl">
                            이름
                            <br />
                            <input
                                className={inpustStlye}
                                {...register("name")}
                            />
                        </label>
                        <p>{errors.name?.message}</p>

                        <label className="text-2xl">
                            우리의 1일
                            <br />
                            <input
                                className={inpustStlye}
                                {...register("startDay")}
                                placeholder="yyyy-mm-dd"
                            />
                        </label>
                        <p>{errors.startDay?.message}</p>

                        <button className="text-2xl bg-main rounded-xl p-3 mb-3 mr-4">
                            개설하기
                        </button>

                        <button
                            onClick={() => setCreateBank(false)}
                            className="text-2xl bg-main rounded-xl p-3 mb-3"
                        >
                            닫기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BankbookCreateModal;
