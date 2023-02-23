import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = yup
    .object({
        name: yup.string().required(),
        password: yup
            .string("숫자를 입력하세요")
            .required("비밀번호를 입력하세요"),
        nickName: yup.string().required(),
    })
    .required();

const Mypage = () => {
    const { Authorization, setUser } = useAuthContext();
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("file", data.image && data.image[0]);
        const body = {
            name: data.name,
            password: data.password,
            nickName: data.nickName,
        };
        const blob = new Blob([JSON.stringify(body)], {
            type: "application/json",
        });
        formData.append("json", blob);

        const header = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization,
            },
        };

        axios
            .post(
                "http://192.168.0.208:9090/api/member/change",
                formData,
                header
            )
            .then((res) => console.log(res))
            .then(alert("변경성공"))
            .then(setUser(""))
            .then(navigate("/"));
    };

    const fetchdata = async () => {
        const header = {
            headers: {
                Authorization,
            },
        };

        return axios
            .get("http://192.168.0.208:9090/api/member/info", header)
            .then((res) => {
                setUserInfo(res.data);
                return res.data;
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const inpustStlye =
        "outline-none mb-5 mt-2 focus:border-none focus:outline-main rounded-xl px-3";

    return (
        <div className="flex w-full text-center justify-around">
            <div>
                <p className="text-4xl bg-main w-fit text-white p-2 rounded-lg mx-auto mb-4">
                    회원정보 변경
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("image")}
                        id="picture"
                        type="file"
                        accept="image/*"
                    />
                    <br />

                    <label className="text-2xl">
                        이름 <br />{" "}
                        <input className={inpustStlye} {...register("name")} />
                    </label>
                    <p>{errors.email?.message}</p>

                    <label className="text-2xl">
                        비밀번호 <br />
                        <input
                            className={inpustStlye}
                            {...register("password")}
                        />
                    </label>
                    <p>{errors.password?.message}</p>
                    <label className="text-2xl">
                        별명 <br />
                        <input
                            className={inpustStlye}
                            {...register("nickName")}
                        />
                    </label>
                    <p>{errors.nickName?.message}</p>
                    <button>변경</button>
                </form>
                <button>회원탈퇴</button>
            </div>
            <div>
                <div className="text-4xl bg-main w-fit text-white p-2 rounded-lg mx-auto mb-4">
                    회원정보
                </div>
                <div className="text-lg mb-4 flex flex-col border-2 rounded-2xl w-60 border-main">
                    <span>이메일</span>
                    <span className="font-bold text-xl">
                        {userInfo && userInfo.mbiBasicEmail}
                    </span>
                </div>
                <div className="text-lg mb-4 flex flex-col border-2 rounded-2xl w-60 border-main">
                    <span>이름 </span>
                    <span className="font-bold text-xl">
                        {userInfo && userInfo.name}
                    </span>
                </div>
                <div className="text-lg mb-4 flex flex-col border-2 rounded-2xl w-60 border-main">
                    <span>우리 1일</span>
                    <span className="font-bold text-xl">
                        {userInfo && userInfo.startDay}
                    </span>
                </div>
                <div className="text-lg mb-4 flex flex-col border-2 rounded-2xl w-60 border-main">
                    <span>생일</span>
                    <span className="font-bold text-xl">
                        {userInfo && userInfo.birth}
                    </span>
                </div>
                <div className="text-lg mb-4 flex flex-col border-2 rounded-2xl w-60 border-main">
                    <span>별명</span>
                    <span className="font-bold text-xl">
                        {userInfo && userInfo.nickName}
                    </span>
                </div>
                <div className="text-lg mb-4 flex flex-col border-2 rounded-2xl w-60 border-main">
                    <span>통장이름</span>
                    <span className="font-bold text-xl">
                        {userInfo && userInfo.shareAccountName}
                    </span>
                </div>
                <div className="text-lg mb-4 flex flex-col border-2 rounded-2xl w-60 border-main">
                    <span>통장만든날</span>
                    <span className="font-bold text-xl">
                        {userInfo && userInfo.shareAccountStartDay}
                    </span>
                </div>
                <div className="text-lg mb-4 flex flex-col border-2 rounded-2xl w-60 border-main">
                    <span>통장코드</span>
                    <span className="font-bold text-xl">
                        {userInfo && userInfo.shareAccountCode}
                    </span>
                </div>
            </div>
        </div>
    );
};

// "memberSeq": 1,
// "mbiBasicEmail": "1234@1234",
// "gender": 0,
// "name": "string",
// "startDay": "2023-02-23",
// "birth": "2023-02-23",
// "nickName": "string",
// "shareAccountName": "우리통장",
// "shareAccountStartDay": "2022-01-12",
// "shareAccountCode": "VDcEKfGW6F",
// "memberImgName": "string",
// "memberImgURL": "string"
export default Mypage;
