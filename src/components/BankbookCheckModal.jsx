import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
    .object({
        code: yup.string("문자를 입력하세요").required("코드를 입력하세요"),
    })
    .required();

const BankbookCheckModal = ({ setCheckBank }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/shareaccount/check?accountCode=${data.code}`
            )
            .then((res) => {
                console.log(res.data.message);
                alert(res.data.message);
            });

        setCheckBank(false);
    };
    const inpustStlye =
        "outline-none mb-5 mt-2 focus:border-none focus:outline-main rounded-xl px-3";
    return (
        <div className="w-full h-full absolute bg-black bg-opacity-50 z-10 top-0 p-60 px-96 ">
            <div className="bg-white rounded-xl py-4">
                <div className="w-full text-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-2xl">
                            통장코드
                            <br />
                            <input
                                className={inpustStlye}
                                {...register("code")}
                                placeholder="통장코드입력"
                            />
                        </label>
                        <p>{errors.code?.message}</p>

                        <button className="text-2xl bg-main rounded-xl p-3 mb-3 mr-4">
                            확인하기
                        </button>

                        <button
                            onClick={() => setCheckBank(false)}
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

export default BankbookCheckModal;
