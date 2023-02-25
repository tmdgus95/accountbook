import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ImportDetailPage = () => {
    const { importId } = useParams();
    const { Authorization } = useAuthContext();
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

    return (
        <div>
            {importDetail && importDetail.price}
            {importDetail && importDetail.memo}
        </div>
    );
};

export default ImportDetailPage;
