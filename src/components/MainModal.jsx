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
                    <div>
                        <span>{nameChange(modalBt)}</span>
                        <SlClose
                            onClick={handleChangeModal}
                            className="absolute top-2 right-0 cursor-pointer"
                        />
                    </div>
                    <ButtonWrap>
                        <button onClick={() => setModalBt(0)}>지출</button>
                        <button onClick={() => setModalBt(1)}>수입</button>
                        <button onClick={() => setModalBt(2)}>일정</button>
                    </ButtonWrap>
                </Top>
                {modalBt === 0 && <ExpendModal setModal={setModal} />}
                {modalBt === 1 && <IncomeModal setModal={setModal} />}
                {modalBt === 2 && <ScheduleModal setModal={setModal} />}
            </Inner>
        </Wrap>
    );
};

function nameChange(_modalBt) {
    if (_modalBt === 0) {
        return "지출 등록";
    } else if (_modalBt === 1) {
        return "수입 등록";
    } else {
        return "일정 등록";
    }
}

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
    padding: 3% 30% 2% 30%;
    top: 0;
    left: 0;
`;
const Inner = styled.div`
    height: 950px;
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    font-size: 40px;
    div {
        display: flex;
        align-items: center;
        span {
            font-size: 40px;
            font-weight: 600;
        }
    }
`;
const ButtonWrap = styled.div`
    position: relative;
    display: flex;
    gap: 20px;
    margin-left: 470px;
    margin-top: 10px;
    button {
        font-size: 25px;
        padding: 5px 8px;
        border-radius: 10px;
        background-color: #fbe300;
    }
`;

export default MainModal;
