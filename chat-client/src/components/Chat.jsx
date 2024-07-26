import React, { useEffect, useState } from "react";
import Message from "./Message";
import { io } from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:8000/");
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });
    newSocket.on("response", (msg) => {
      setMessages([
        ...messages,
        {
          type: "recieve",
          msg,
        },
      ]);
    });

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    setMessages([...messages, { type: "send", messages: inputMessage }]);
    socket.emit("Message", inputMessage);
  };
  return (
    <div className="h-screen px-[10rem] py-[5rem] bg-neutral-800">
      <div className="container mx-auto bg-neutral-200 h-full  flex flex-col rounded-3xl">
        <div className="flex-grow flex flex-col gap-10 items-end px-24 py-12">
          <Message type="send" message={"hey how are you doing"} />
          <Message type="recive" message={"i am good"} />
        </div>
        <div className="h-[100px] flex justify-center items-center bg-neutral-200 rounded-b-3xl gap-6">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            type="text"
            className="w-1/2 p-2 rounded-full bg-transparent border-neutral-400 border-2 items-center justify-center placeholder:pl-4 placeholder:text-neutral-500 "
            placeholder="Enter your text"
          />
          <button
            onClick={sendMessage}
            className="rounded-xl bg-neutral-900 text-neutral-300 px-6 py-2 pointer hover:text-white hover:bg-black"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
