import React, { useState } from "react";

interface RetroTextboxProps {
  onSubmit: (text: string) => void;
}

const RetroTextbox: React.FC<RetroTextboxProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <label className="mb-4 text-2xl text-white">Passkey Name</label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(text);
        }}
      >
        <div className="relative p-5 bg-gray-700 rounded">
          <input
            className="w-full h-full text-lg bg-transparent text-white outline-none"
            style={{ caretColor: "white" }}
            value={text}
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
