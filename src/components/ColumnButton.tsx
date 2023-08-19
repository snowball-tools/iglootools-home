import React from "react";

interface ColumnButtonProps {
  text: string;
  color: string;
  textColor: string;
  onClick: () => void;
}

const ColumnButton: React.FC<ColumnButtonProps> = ({
  text,
  color,
  textColor,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col w-1/2 h-8 items-center py-1 rounded-[41px] text-xs font-sf_pro_text font-semibold tracking-[-0.41] leading-[24px] ${color} ${textColor}`}
  >
    {text}
  </button>
);

export default ColumnButton;
