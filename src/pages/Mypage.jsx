import React, { useEffect, useRef, useState } from "react";
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
        const formData = new FormData();
        formData.append("file", file && file);
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
                `${process.env.REACT_APP_API_URL}/api/member/change`,
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
            .get(`${process.env.REACT_APP_API_URL}/api/member/info`, header)
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
        <div className="flex w-full text-center h-mypapge justify-around">
            <div>
                <p className="text-4xl bg-main w-fit text-white p-2 rounded-lg mx-auto mb-4">
                    회원정보 변경
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
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

                    <br />
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
                    <button className="bg-main">변경</button>
                </form>
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

export default Mypage;
