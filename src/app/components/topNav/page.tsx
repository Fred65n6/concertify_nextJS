"use client";
import React, {useState} from "react";
import ThemeSwitcher from "../switchTheme/page";

const TopNav = () => {
    return (
        <>
            <div className="hidden  w-full m-0 px-8 md:flex justify-end items-center   ">
                <ThemeSwitcher />
            </div>
        </>
    );
};

export default TopNav;
