import React from "react";
import DropdownMenu from "./DropDownMenu";
import Image from "next/image";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-4 flex items-center">
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
