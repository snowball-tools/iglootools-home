import React, { useState } from "react";

const RetroTextbox: React.FC = () => {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(text); // replace this with your submit logic
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="relative p-5 bg-gray-700 rounded">
          <input
            className="w-full h-full text-lg bg-transparent text-white outline-none"
            style={{ caretColor: "white" }}
            value={text}
            placeholder="Passkey Name (ie Igloo)"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RetroTextbox;
