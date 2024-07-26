import React from "react";

const Message = ({ message, type }) => {
  return (
    <div
      className={`flex w-full ${
        type === "send" ? "justify-start" : "justify-end"
      }`}
    >
      {type === "send" ? (
        <div className=" bg-violet-700 p-6 text-neutral-300 rounded-b-2xl rounded-tr-2xl">
          {message}
        </div>
      ) : (
        <div className=" bg-black p-6 text-neutral-300 rounded-b-2xl rounded-tr-2xl">
          {message}
        </div>
      )}
    </div>
  );
};

export default Message;
