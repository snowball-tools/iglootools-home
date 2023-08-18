import React from "react";

interface InfoViewProps {
  titleText: string;
  subtitleText: string;
  img: string;
}

const InfoView = ({ titleText, subtitleText, img }: InfoViewProps) => {
  return (
    <div className="flex flex-col gap-10 w-full h-[117px] items-center">
      <img src={img} />
      <div className="self-stretch flex flex-col gap-1 items-start">
        <div className="text-xl font-SF_Pro_Rounded font-bold tracking-[0.35] leading-[28px]">
          {titleText}
        </div>
        <div className="text-sm font-['SF_Pro_Text'] tracking-[-0.24] leading-[20px] w-full">
          {subtitleText}
        </div>
      </div>
    </div>
  );
};

export default InfoView;
