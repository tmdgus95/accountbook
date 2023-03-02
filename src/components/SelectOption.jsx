import React from "react";
import { useState } from "react";
import styled from "styled-components";
const SelectOption = ({ setType }) => {
    const [val, setVal] = useState(0);
    // 성별 라디오 이벤트 핸들러
    const handleRadio = (e) => {
        const { name, id } = e.target;
        setType(id);
        // const isCheck = e.target.checked;
        setVal({ ...val, [name]: id });
    };
    // 에러 정보 관리 객체
    const [Err, setErr] = useState({});
    const check = (_val) => {
        const errs = {};
        // 성별 체크
        if (_val.group === "") {
            errs.group = "분류를 선택하세요.";
        }
        return errs;
    };
    return (
        <>
            <Box>
                <input
                    type="radio"
                    id="couple"
                    name="group"
                    defaultChecked
                    onChange={handleRadio}
                />
                <label htmlFor="couple">공통내역</label>
                <input
                    type="radio"
                    id="person"
                    name="group"
                    onChange={handleRadio}
                />
                <label htmlFor="person">나</label>
                <input
                    type="radio"
                    id="otherperson"
                    name="group"
                    onChange={handleRadio}
                />
                <label htmlFor="otherperson">연인</label>
                <span className="err">{Err.group}</span>
            </Box>
        </>
    );
};
const Box = styled.div`
    position: absolute;
    top: 75px;
    right: 150px;
    display: inline-block;
    padding: 10px;
    border-radius: 5px;
    label {
        margin-left: 7px;
        margin-right: 40px;
        font-size: 25px;
        font-weight: 700;
        color: #000;
    }
`;
export default SelectOption;
