"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "../search/page";
import {GrHomeRounded} from "react-icons/gr";
import {SlMagnifier, SlHome, SlUser} from "react-icons/sl";
import ThemeSwitcher from "../switchTheme/page";

const NavLogged = () => {
    const openLoginModule = () => {
        const loginModule = document.getElementById("login_module");
        loginModule?.classList.remove("hidden");
        loginModule?.classList.add("grid");
    };
    //   ÆNDRINGER HERUNDER
    const openSignupModule = () => {
        const signupModule = document.getElementById("signup_module");
        signupModule?.classList.remove("hidden");
        signupModule?.classList.add("grid");
    };

    return (
        <nav className="">
            {/* Desktop Nav - Logged in */}
            <div className="hidden md:flex justify-between gap-4 py-4 max-w-[1300px] m-auto items-center">
                <div className="flex gap-12 items-center w-full">
                    <Link href="/">
                        <Image
                            src="../concertify_logo.svg"
                            width={150}
                            height={30}
                            alt="concertify_logo"
                        />
                    </Link>
                    <ul className="flex gap-10 brand_purple dark:text-[#8e0bf5]">
                        <li>
                            <Link className="flex gap-2 items-center" href="/">
                                <SlHome
                                    className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                                    id="home"
                                />
                                <span className="text-md text-[#5311BF] dark:text-[#8e0bf5]">
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex gap-2 items-center"
                                href="/concerts"
                            >
                                <SlMagnifier
                                    className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                                    id="explore"
                                />
                                <span className="text-md text-[#5311BF] dark:text-[#8e0bf5]">
                                    Explore
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Search />
                {/* <Search /> */}
                <div className="flex gap-4">
                    {/* <button className="rounded-full bg-purple-100 brand_purple w-32 py-3 hover:bg-purple-200">
                        <Link href="/signup">Sign up</Link>
                    </button> */}
                    <button
                        type="button"
                        onClick={openSignupModule}
                        className="rounded-full bg-purple-100 brand_purple w-32 py-3 hover:bg-purple-200 h-12"
                    >
                        Signup
                    </button>
                    <button
                        type="button"
                        onClick={openLoginModule}
                        className="rounded-full w-32 brand_gradient text-white hover:bg-purple-200 h-12"
                    >
                        Log in
                    </button>
                    <ThemeSwitcher />
                </div>
            </div>
            {/* Mobile Nav Logged in */}
            <div className="flex md:hidden p-4 fixed bottom-0 w-full bg-white">
                <ul className="flex gap-10 brand_purple justify-evenly w-full">
                    <li>
                        <Link className="flex flex-col items-center" href="/">
                            <SlHome
                                className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                                id="home"
                            />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="flex flex-col items-center"
                            href="/concerts"
                        >
                            <SlMagnifier
                                className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                                id="explore"
                            />
                            Explore
                        </Link>
                    </li>
                    <li>
                        <button
                            className="flex flex-col items-center"
                            onClick={openLoginModule}
                        >
                            <SlUser
                                className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                                id="user"
                            />
                            Log in
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavLogged;
