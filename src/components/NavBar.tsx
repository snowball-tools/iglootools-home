import React from "react";
import Logo from "./Logo";
import DropdownMenu from "./DropDownMenu";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-4 flex items-center">
      <Logo />
      <div className="flex flex-grow justify-end hidden">
        <DropdownMenu />
      </div>
    </div>
  );
};

export default NavBar;
