import { useState, useEffect } from "react";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
];

const AnimatedCircles: React.FC = () => {
  const [currentCircle, setCurrentCircle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCircle < 9) {
        setCurrentCircle((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 300); // Interval between each circle's animation start

    return () => clearInterval(interval);
  }, [currentCircle]);

  return (
    <div className="flex justify-center items-center h-screen">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`absolute w-10 h-10 ${
            colors[index]
          } rounded-full transform 
            ${index <= currentCircle ? "animate-grow" : ""}`}
          style={{ animationDelay: `${index * 0.3}s` }}
        ></div>
      ))}
    </div>
  );
};

export default AnimatedCircles;
