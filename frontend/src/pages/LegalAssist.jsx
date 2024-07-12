import React from "react";
import ChatUI from "../components/ChatUI";
import apiUri from '../config/apiUri';

const LegalAssist = () => {
    // useEffect(() => {
    //   const handleBeforeUnload = () => {
    //     fetch(`${apiUri.legalAssist}/end-session`, { method: "POST" })
    //       .then((response) => response.text())
    //       .then((data) => console.log(data))
    //       .catch((error) => console.error("Error ending session:", error));
    //   };
    //   // Add event listener for beforeunload
    //   window.addEventListener("beforeunload", handleBeforeUnload);

    //   return () => {
    //     // Cleanup: Remove event listener when component unmounts
    //     window.removeEventListener("beforeunload", handleBeforeUnload);
    //   };
    // }, []);

    return (
        <div className="flex-grow p-4">
            <div className="lg:mx-[23vw]">
                <ChatUI apiUri={apiUri.legalAssist} />
            </div>
        </div>
    );
}

export default LegalAssist