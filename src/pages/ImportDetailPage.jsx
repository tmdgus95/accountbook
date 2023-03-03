import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import IncomeEditModal from "../components/IncomeEditModal";
import styled from "styled-components";

const ImportDetailPage = () => {
    const { importId } = useParams();
    const navigate = useNavigate();
    const {
        state: { income },
    } = useLocation();
    // console.log(income.importSeq);
    const { Authorization } = useAuthContext();
    const [editModal, setEditModal] = useState(false);
    const handleEdit = () => {
        setEditModal(true);
    };
    const [importDetail, setImportDetail] = useState();
    // console.log(importId);
    const fetchData = () => {
        const header = {
            headers: {
                Authorization,
            },
        };
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/accountbook/list/import/detail?iiSeq=${importId}`,
                header
            )
            .then((res) => setImportDetail(res.data.importDetail))
            .catch((err) => console.log(2, err));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = () => {
        let deleteConfirm = window.confirm("삭제하시겠습니까?");
        const header = {
            headers: {
                Authorization,
            },
        };
        deleteConfirm === true &&
            axios
                .delete(
                    `${process.env.REACT_APP_API_URL}/api/accountbook/import/delete?iiSeq=${importId}`,
                    header
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었습니다."))
                .then(navigate("/calendar"))
                .catch((err) => console.log(err));
    };

    console.log(importDetail && importDetail);

    return (
        <>
            <Inner>
                <Memo>
                    <div className="flex justify-end gap-2 mb-3">
                        <BsTrashFill
                            onClick={handleDelete}
                            style={{
                                fontSize: "50px",
                                cursor: "pointer",
                                color: "#FBE300",
                                padding: "10px",
                                background: "black",
                                borderRadius: "10px",
                            }}
                        />
                        <BsPencilFill
                            onClick={handleEdit}
                            style={{
                                fontSize: "50px",
                                cursor: "pointer",
                                color: "#FBE300",
                                padding: "10px",
                                background: "black",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                    <p>
                        작성자 :{" "}
                        {importDetail && who(importDetail.importStatus)}
                    </p>
                    <p>
                        금액 :{" "}
                        {importDetail &&
                            importDetail.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                    </p>
                    <p>메모 : {importDetail && importDetail.memo}</p>
                </Memo>
            </Inner>
            {editModal && (
                <IncomeEditModal
                    setEditModal={setEditModal}
                    income={income}
                    importId={importId}
                />
            )}
        </>
        // <div>
        //     <BsPencilFill onClick={handleEdit} />
        //     {editModal && (
        //         <IncomeEditModal
        //             setEditModal={setEditModal}
        //             income={income}
        //             importId={importId}
        //         />
        //     )}
        //     <BsTrashFill onClick={handleDelete} />
        //     {importDetail && importDetail.price}
        //     <br />
        //     {importDetail && importDetail.memo}
        //     <br />
        //     작성자 {importDetail && who(importDetail.importStatus)}
        // </div>
    );
};

function who(target) {
    if (target === 0) {
        return "우리";
    } else if (target === 1) {
        return "나";
    } else {
        return "연인";
    }
}

const Inner = styled.div`
    max-width: 700px;
    height: 754px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 10px;
`;

const Memo = styled.div`
    position: relative;
    width: 700px;
    height: 750px;
    font-size: 30px;
    text-align: left;
    border-radius: 6px;
    p {
        padding-bottom: 10px;
    }
`;

export default ImportDetailPage;
