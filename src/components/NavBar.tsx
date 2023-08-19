import React from "react";
import DropdownMenu from "./DropDownMenu";
import Image from "next/image";

const NavBar: React.FC = () => {
  return (
    <div className="flex">
      <DropdownMenu />
      <Image
        src="rectangle_portrait_and_arrow_right.svg"
        alt="exit button"
        className="h-5 w-5"
        width={20}
        height={20}
      />
    </div>
  );
};

export default NavBar;
