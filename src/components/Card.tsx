import React, { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  color: string | undefined;
  textColor: string | undefined;
  borderColor: string | undefined;
}

const Card: React.FC<CardProps> = ({
  color,
  textColor,
  borderColor,
  children,
}) => (
  <div
    className={`${color} flex flex-col justify-center gap-3 mx-px pt-4 pb-4 px-5 rounded-lg ${textColor} ${borderColor}`}
  >
    {children}
  </div>
);

export default Card;
