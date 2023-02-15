import React from "react";
import { useState } from "react";

import styled from "styled-components";

const SelectOption = () => {
    const [val, setVal] = useState();

    // 성별 라디오 이벤트 핸들러
    const handleRadio = (e) => {
        const { name, id } = e.target;
        // const isCheck = e.target.checked;
        setVal({ ...val, [name]: id });
    };

    // 에러 정보 관리 객체
    const [Err, setErr] = useState({});
    const check = (_val) => {
        const errs = {};
        // 성별 체크
        if (_val.gender === "") {
            errs.gender = "성별을 선택하세요.";
        }
        return errs;
    };
    return (
        <>
            <Box>
                
                    <div style={{ textAlign: "center", marginBottom:"10px" }}>SELECTOR</div>
                    
                        <input
                            type="radio"
                            id="common"
                            name="gender"
                            onChange={handleRadio}
                        />
                        <label htmlFor="common" style={{marginRight:"5px"}}>Common</label>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            onChange={handleRadio}
                        />
                        <label htmlFor="male" style={{marginRight:"5px"}}>Male</label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            onChange={handleRadio}
                        />
                        <label htmlFor="female" style={{marginRight:"5px"}}>Female</label>
                        <span className="err">{Err.gender}</span>
                    
               
            </Box>
        </>
    );
};

const Box = styled.div`
position: absolute;
right: 0;
    display: inline-block;
    border: 1px solid #000;
    padding: 5px;
    border-radius: 5px;
`;

export default SelectOption;
