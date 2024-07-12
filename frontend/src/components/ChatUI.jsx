import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./styles/ChatMarkdownStyles.module.css";

const ChatUI = ({
  apiUri,
  context = "",
  chatIntro = "Type in a query to find out what you wish to know... 😊",
}) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const message = messageInputRef.current.value;
    if (message.trim()) {
      // Prevent sending empty messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "👤", content: message },
      ]);
      messageInputRef.current.value = "";
      setIsLoading(true);

      try {
        const response = await axios.post(`${apiUri}/chat`, {
          query: message,
          context: context,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "AI", content: response.data.response },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "AI", content: "Sorry, I encountered an error 😔" },
        ]);
        messageInputRef.current.value = message;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mt-1 flex bg-gray-50 rounded-[1.1em] shadow-md">
      <div className="h-[88vh] rounded-[1.1em] w-full flex flex-col bg-inherit">
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto px-4 py-2"
        >
          {messages.length === 0 ? (
            <div className="pt-[30em]">
              <div className="flex justify-center items-center">
                <div className="w-2/3 bg-slate-300 bg-opacity-35 shadow-md rounded-lg p-6 backdrop-filter backdrop-blur-lg">
                  <div className="flex justify-center items-center text-center h-full text-black text-lg ">
                    {chatIntro}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`flex p-4 rounded-lg mb-2 ${
                  message.user !== "AI"
                    ? "bg-blue-100 text-black"
                    : "bg-white text-gray-600"
                }`}
              >
                <span className="mr-3 w-[1.6em] font-bold">
                  {message.user}:
                </span>
                <span
                  className={styles.markdownContent}
                  dangerouslySetInnerHTML={{ __html: message.content }}
                ></span>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-center p-4 rounded-lg mb-2 bg-gray-100">
              <span className="mr-2 font-bold">AI:</span>
              <span>...</span>
            </div>
          )}
        </div>
        <form
          className="flex items-center border-t border-gray-200 p-3"
          onSubmit={sendMessage}
        >
          <input
            ref={messageInputRef}
            placeholder="Type your query..."
            disabled={isLoading}
            className="flex-grow rounded-md mx-3 mb-3 py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-slate-200 focus:bg-slate-100 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="ml-1 mr-3 mb-3 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 disabled:opacity-50 transition-all"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
