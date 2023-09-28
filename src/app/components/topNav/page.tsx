import React from "react";
import ThemeSwitcher from "../switchTheme/page";

const TopNav = () => {
  return (
    <>
      <div className="w-full m-0 px-8 flex justify-end dark:bg-gray-800">
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default TopNav;
