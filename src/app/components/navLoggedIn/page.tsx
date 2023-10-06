"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
// import Search from "../search/page";

const nav_logged = () => {
    return (
        <nav className="">
            {/* Desktop Nav - Logged in */}
            <div className="hidden md:flex justify-between gap-4 py-4 max-w-[1300px] m-auto">
                <div className="flex gap-12 items-center w-full">
                    <Link href="/">
                        <Image
                            src="../concertify_logo.svg"
                            width={150}
                            height={30}
                            alt="concertify_logo"
                        />
                    </Link>

                    <ul className="flex gap-10 brand_purple">
                        <li>
                            <Link className="flex gap-2 items-center" href="/">
                                <Image
                                    src="../home_btn.svg"
                                    width="20"
                                    height="20"
                                    alt="button"
                                />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="flex gap-2 items-center" href="/">
                                <Image
                                    src="../favourites_btn.svg"
                                    width="25"
                                    height="25"
                                    alt="button"
                                />
                                Favourites
                            </Link>
                        </li>
                        <li>
                            <Link className="flex gap-2 items-center" href="/">
                                <Image
                                    src="../explore_btn.svg"
                                    width="25"
                                    height="25"
                                    alt="button"
                                />
                                Explore
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <Search /> */}
                <div className="">
                    <button className="rounded-full px-8 py-2 bg-purple-100 brand_purple flex items-center gap-2 m-auto hover:bg-purple-200">
                        <Link href="/profile/${data}">Profile</Link>
                        <Image
                            src="../profile_btn.svg"
                            width="20"
                            height="20"
                            alt="button"
                        />
                    </button>
                </div>
            </div>
            {/* Mobile Nav Logged in */}
            <div className="flex md:hidden p-4 fixed bottom-0 w-full bg-white dark:bg-[#121212]">
                <ul className="flex gap-10 brand_purple justify-evenly w-full">
                    <li>
                        <Link className="flex flex-col items-center" href="/">
                            <Image
                                src="../home_btn.svg"
                                width="20"
                                height="20"
                                alt="button"
                            />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="flex flex-col items-center" href="/">
                            <Image
                                src="../favourites_btn.svg"
                                width="25"
                                height="25"
                                alt="button"
                            />
                            Favourites
                        </Link>
                    </li>
                    <li>
                        <Link className="flex flex-col items-center" href="/">
                            <Image
                                src="../explore_btn.svg"
                                width="25"
                                height="25"
                                alt="button"
                            />
                            Explore
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="flex flex-col items-center"
                            href="/profile/${data}"
                        >
                            <Image
                                src="../profile_btn.svg"
                                width="25"
                                height="25"
                                alt="button"
                            />
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default nav_logged;
