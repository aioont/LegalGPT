import React, { useState } from "react";
import DocUploadUI from "../components/DocUploadUI";
import styles from "./styles/MarkdownStyles.module.css";
import apiUri from "../config/apiUri";
import ChatUI from "../components/ChatUI";

const LegalCitations = () => {
  const [docUploaded, setDocUploaded] = useState("");
  const [result, setAnalysis] = useState("No document uploaded.");

  if (docUploaded === "") {
    return (
      <DocUploadUI
        apiUri={apiUri.legalCitations}
        afterUpload={(docName, result) => {
          setDocUploaded(docName);
          setAnalysis(result);
          console.log(result);
        }}
      />
    );
  }
  return (
    <div className="grid grid-cols-2">
      <div className="block p-[1rem] pr-0 pl-[2vw]">
        <ChatUI apiUri={apiUri.legalCitations} context={result} />
      </div>
      <div className="flex-grow overflow-hidden overflow-y-scroll h-[88vh] py-5 px-8 mx-[2vw] my-[2vh] bg-gray-100 rounded-[1em] shadow-lg shadow-gray-300">
        <h5 className="text-[1.1em] text-center text-slate-700 font-bold">
          Citation Analysis of '{docUploaded}'
        </h5>
        <hr className="mt-[.7em] border-slate-500 mb-[.7em]" />
        <div
          className={styles.markdownContent}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </div>
    </div>
  );
};

export default LegalCitations;
