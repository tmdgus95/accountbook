import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ExpendModal from "./ExpendModal";
import IncomeModal from "./IncomeModal";
import ScheduleModal from "./ScheduleModal";
import { SlClose } from "react-icons/sl";

const MainModal = ({ setModal }) => {
    const handleChangeModal = () => {
        setModal(false);
    };
    const [modalBt, setModalBt] = useState(0);
    return (
        <Wrap>
            <Inner>
                <Top>
                    <SlClose
                        onClick={handleChangeModal}
                        style={{ cursor: "pointer" }}
                    />
                    <span>
                        {nameChange(modalBt)}
                        입력
                    </span>
                    <button onClick={() => setModalBt(0)}>지출</button>
                    <button onClick={() => setModalBt(1)}>수입</button>
                    <button onClick={() => setModalBt(2)}>일정</button>
                </Top>
                {modalBt === 0 && <ExpendModal />}
                {modalBt === 1 && <IncomeModal />}
                {modalBt === 2 && <ScheduleModal />}
            </Inner>
        </Wrap>
    );
};

function nameChange(_modalBt) {
    if (_modalBt === 0) {
        return "지출";
    } else if (_modalBt === 1) {
        return "수입";
    } else {
        return "일정";
    }
}

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
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    font-size: 30px;
`;

export default MainModal;
