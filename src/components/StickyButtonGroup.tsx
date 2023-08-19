import React from "react";

interface StickyButtonGroupProps {
  buttons: IglooButtonProps[];
}

interface IglooButtonProps {
  disabled?: boolean;
  label: string;
  onClick: () => void;
  bgColor: string;
  disabledColor?: string;
  textColor: string;
  textSize?: string;
  textWeight?: string;
}

const StickyButtonGroup = ({ buttons }: StickyButtonGroupProps) => (
  <div className="flex flex-col gap-3 items-center mx-1">
    {buttons.map(
      ({
        disabled,
        label,
        onClick,
        disabledColor,
        textColor,
        bgColor,
        textSize,
        textWeight,
      }) => (
        <button
          key={label}
          className={`self-stretch flex flex-col justify-center h-12 shrink-0 items-center rounded-[41px] text-center ${
            textSize ? textSize : "text-md"
          } font-sf_pro_rounded ${
            textWeight ? textWeight : "font-semibold"
          } leading-[20px] ${
            disabledColor
              ? disabledColor
              : "disabled:text-white/10 disabled:bg-disabled-gray"
          } ${textColor} ${bgColor}`}
          disabled={disabled ? disabled : false}
          onClick={onClick}
        >
          {label}
        </button>
      )
    )}
  </div>
);

export default StickyButtonGroup;
