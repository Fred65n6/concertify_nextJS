"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "../search/page";
import {GrHomeRounded} from "react-icons/gr";
import {SlGrid, SlHome, SlEmotsmile, SlHeart} from "react-icons/sl";
import ThemeSwitcher from "../switchTheme/page";

const NavLogged = () => {
    const openLoginModule = () => {
        const loginModule = document.getElementById("login_module");
        loginModule?.classList.remove("hidden");
        loginModule?.classList.add("grid");
    };

    const openSignupModule = () => {
        const signupModule = document.getElementById("signup_module");
        signupModule?.classList.remove("hidden");
        signupModule?.classList.add("grid");
    };

    return (
        <nav className="">
            {/* DESKTOP */}
            <div className="hidden lg:flex max-w-[1300px] pt-8 px-8 justify-between items-center m-auto lg:px-14">
                <div className="flex gap-12 items-center w-fit">
                    <Link href="/">
                        <Image
                            src="../concertify_logo.svg"
                            width={150}
                            height={80}
                            alt="concertify_logo"
                        />
                    </Link>
                    <ul className="flex gap-10 brand_purple dark:text-white">
                        <li>
                            <Link
                                className="flex gap-2 items-center"
                                href="/concerts"
                            >
                                <SlGrid
                                    className="fill-[#5311BF] dark:fill-white w-5 h-5"
                                    id="explore"
                                />
                                <span className="text-md text-[#5311BF] dark:text-white">
                                    Explore
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-2 items-center">
                    <Search />
                    <button
                        type="button"
                        onClick={openSignupModule}
                        className="signup_btn"
                    >
                        Signup
                    </button>
                    <button
                        type="button"
                        onClick={openLoginModule}
                        className="login_btn"
                    >
                        Log in
                    </button>
                    <ThemeSwitcher />
                </div>
            </div>

             {/* TABLET NAV */}
            <div className="hidden md:flex max-w-[1300px] pt-8 px-8 justify-between items-center m-auto lg:hidden">
                <div className="flex gap-8 items-center w-fit">
                    <Link href="/">
                        <Image
                        src="../concertify.svg"
                        width={25}
                        height={30}
                        alt="concertify_logo"
                        />
                    </Link>

                    <ul className="flex gap-10 brand_purple">
                        <li>
                        <Link className="flex gap-2 items-center" href="/concerts">
                            <SlGrid
                            className="fill-[#5311BF] dark:fill-white w-5 h-5"
                            id="explore"
                            />
                        </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-2 items-center">
                    <Search />
                    <button
                        type="button"
                        onClick={openSignupModule}
                        className="secondary_btn"
                    >
                        Signup
                    </button>
                    <button
                        type="button"
                        onClick={openLoginModule}
                        className="primary_btn"
                    >
                        Log in
                    </button>
                </div>
            </div>

            {/* MOBILE NAV */}
            <div className="flex md:hidden py-6 px-10 z-50 fixed bottom-0 w-full bg-white dark:bg-[#12082a] dark:border dark:bt-[1px] dark:border-[#23124b] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                <ul className="flex gap-10 brand_purple justify-between w-full items-center">
                    <li>
                        <Link href="/">
                        <Image
                        src="../concertify.svg"
                        width={25}
                        height={30}
                        alt="concertify_logo"
                        />
                    </Link>
                    </li>
                    <li>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={openSignupModule}
                                className="secondary_btn"
                            >
                                Signup
                            </button>
                            <button
                                type="button"
                                onClick={openLoginModule}
                                className="primary_btn"
                            >
                                Log in
                            </button>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavLogged;
