import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../context/AuthContext";

const NoticeUpdateModal = ({ setModal, notice }) => {
    const [memo, setMeno] = useState("");
    const [file, setFile] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const handleChangeMemo = (e) => setMeno(e.target.value);
    const handleChangeImg = (e) => setFile(e.target.files[0]);
    const navigate = useNavigate();

    const { Authorization } = useAuthContext();

    console.log(notice);
    useEffect(() => {
        if (file || file.length > 0) {
            const image = file;
            setImagePreview(URL.createObjectURL(image));
            console.log(image);
        }
    }, [file]);
    const imageInput = useRef();

    const handleOnClickImage = () => {
        imageInput.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        const header = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization,
            },
        };
        const body = {
            memo,
            niNiiSeq: notice,
            niMbiSeq: 96,
        };
        const blob = new Blob([JSON.stringify(body)], {
            type: "application/json",
        });
        formData.append("noticeVO", blob);
        formData.append("file", file);
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/notice/update?noticeNo=${notice}`,
                formData,
                header
            )
            .then((res) => {
                alert("수정되었어요.")
                navigate("/couplehome");
                
                console.log(res);
            
            })
            
            .then(() => setModal(false));
    };

    return (
        <div>
            <Wrap>
                <Inner>
                    {/* header */}
                    <Top> 내용 수정 </Top>

                    {/* boby */}
                    <Body>
                        <form onSubmit={handleSubmit}>
                            <p className="px-5">
                                <Content
                                    placeholder="내용을 입력하세요."
                                    onChange={handleChangeMemo}
                                    autoFocus
                                ></Content>
                            </p>
                            <div className="pl-5">
                                <img
                                    src={
                                        imagePreview
                                            ? imagePreview
                                            : "/images/white_bg.png"
                                    }
                                    alt="imagePreview"
                                    className="w-64 h-64 mb-2"
                                />
                                <input
                                    type="file"
                                    onChange={handleChangeImg}
                                    className="hidden"
                                    ref={imageInput}
                                />
                                <button
                                    type="button"
                                    onClick={handleOnClickImage}
                                    className="bg-orange-200 p-3 mt-1 mb-4 rounded-xl text-lg"
                                >
                                    이미지업로드
                                </button>
                            </div>
                        </form>
                    </Body>
                    {/*footer*/}
                    <div
                        className="flex items-center justify-end 
                    p-6 mt-4 border-t border-solid border-slate-200 rounded-b"
                    >
                        <button
                            className="text-black-500 background-transparent font-bold uppercase px-6 py-2 
                            text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                            type="button"
                            onClick={() => setModal(false)}
                        >
                            취소
                        </button>
                        <button
                            className="bg-main text-black active:bg-main font-bold uppercase text-sm px-6 py-3 
                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                            type="button"
                            onClick={(e) => handleSubmit(e)}
                        >
                            변경
                        </button>
                    </div>
                </Inner>
            </Wrap>
        </div>
    );
};

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
    padding: 2% 30%;
    top: 0;
    left: 0;
`;

const Inner = styled.div`
    background: white;
    border-radius: 5px;
    width: 500px;
    height: 950px;
    margin: 0 auto;
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    padding: 20px;
    border-bottom: 1px solid #ddd;
`;

const Content = styled.textarea`
    width: 100%;
    height: 400px;
    margin: 0 auto;
    padding: 10px;
    resize: none;
    outline: none;
`;

const Body = styled.div`
    position: relative;
    display: block;
    height: 750px;
`;
export default NoticeUpdateModal;
