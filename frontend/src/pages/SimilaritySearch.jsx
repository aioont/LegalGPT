import React, { useState } from "react";
import styles from "./styles/MarkdownStyles.module.css";
import DocUploadUI from "../components/DocUploadUI"
import apiUri from '../config/apiUri';

const SimilaritySearch = () => {
    const [docUploaded, setDocUploaded] = useState("");
    const [result, setSummary] = useState("No document uploaded.")

    if (docUploaded === "") {
        return <DocUploadUI
            apiUri={apiUri.similaritySearch}
            afterUpload={(docName, summary) => { 
                setDocUploaded(docName)
                setSummary(summary)
                console.log(summary)
            }}
        />
    }
    return (
        <div className="flex-grow py-5 px-8 mx-[23%] my-[1vh] bg-gray-100 rounded-[1em] shadow-lg shadow-gray-300">
            <h5 className="text-[1.1em] text-center text-slate-700 font-bold">{docUploaded}</h5>
            <hr className="mt-[.7em] border-slate-500 mb-[.7em]" />
            <div className={styles.markdownContent} dangerouslySetInnerHTML={{ __html: result }} />
        </div>
    );
}

export default SimilaritySearch