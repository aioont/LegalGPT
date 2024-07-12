import React from "react";
import ChatUI from "../components/ChatUI";

const QnA_IPC_API_URI = "http://localhost:8080/qna-ipc"; // TODO: To be changed and masked

const QnA_IPC = () => {
    return (
        <div className="flex-grow p-4">
            <div>
                <ChatUI apiUri={QnA_IPC_API_URI} />
            </div>
        </div>
    );
}

export default QnA_IPC