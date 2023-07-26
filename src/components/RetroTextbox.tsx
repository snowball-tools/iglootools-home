import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RetroTextbox: React.FC = () => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(text);
    setText("");
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="w-1/2"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
          >
            <label className="mb-4 text-2xl text-white">Passkey Name</label>
            <div className="relative p-5 bg-gray-700 rounded">
              <input
                className="w-full h-full text-lg bg-transparent text-white outline-none"
                style={{ caretColor: "white" }}
                value={text}
                placeholder="ex. Beep Boop"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400"
            >
              Submit
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className="w-1/2 p-5 text-2xl text-white text-center"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
          >
            Thanks for your submission!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RetroTextbox;
