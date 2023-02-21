import axios from "axios";
import React from "react";
import { useState } from "react";
import styled from "styled-components";

const NoticeModal = ({ setModal }) => {
    const [memo, setMeno] = useState("");
    const handleChange = (e) => setMeno(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();

        let body = {
            memo,
        };
        axios
            .put("http://192.168.0.156:9090/api/notice/add", body)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Wrap>
                <Inner>
                    {/* header */}
                    <Top> 내용추가 </Top>

                    {/* boby */}
                    <Body>
                        <form onSubmit={handleSubmit}>
                            <p>
                                <Content
                                    placeholder="내용을 입력하세요."
                                    onChange={handleChange}
                                ></Content>
                            </p>
                        </form>
                    </Body>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setModal(false)}
                        >
                            취소
                        </button>
                        <button
                            className="bg-main text-black active:bg-main font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) => handleSubmit(e)}
                        >
                            추가
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
    width: 100%;
    height: 70%;
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    padding: 20px;
    border-bottom: 1px solid #ddd;
`;

const Body = styled.div`
    height: 500px;
`;

const Content = styled.textarea`
    width: 100%;
    height: 450px;
    margin: 0 auto;
    padding: 10px;
    resize: none;
    outline: none;
`;
export default NoticeModal;
