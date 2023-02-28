import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { BsPencilFill } from "react-icons/bs";
import IncomeEditModal from "../components/IncomeEditModal";
import { FaTrashAlt } from "react-icons/fa";

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
                `http://192.168.0.208:9090/api/accountbook/list/import/detail?iiSeq=${importId}`,
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
                    `http://192.168.0.208:9090/api/accountbook/import/delete?iiSeq=${importId}`,
                    header
                )
                .then((res) => console.log(res))
                .then(alert("삭제되었습니다."))
                .then(navigate("/couplehome"))
                .catch((err) => console.log(err));
    };

    console.log(importDetail && importDetail);

    return (
        <div>
            <BsPencilFill onClick={handleEdit} />
            {editModal && (
                <IncomeEditModal
                    setEditModal={setEditModal}
                    income={income}
                    importId={importId}
                />
            )}
            <FaTrashAlt onClick={handleDelete} />
            {importDetail && importDetail.price}
            <br />
            {importDetail && importDetail.memo}
            <br />
            돈낸사람 {importDetail && who(importDetail.importStatus)}
        </div>
    );
};

function who(target) {
    if (target === 0) {
        return "우리";
    } else if (target === 1) {
        return "나";
    } else {
        return "너";
    }
}

export default ImportDetailPage;
