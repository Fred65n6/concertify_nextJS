"use client";
import React, {useState} from "react";
import ThemeSwitcher from "../switchTheme/page";
import Search from "../search/page";

const TopNav = () => {
    return (
        <>
            <div className="hidden  w-full m-0 px-8 md:flex justify-end items-center   ">
                <Search />
                <ThemeSwitcher />
            </div>
        </>
    );
};

export default TopNav;
