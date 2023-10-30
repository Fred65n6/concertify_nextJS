"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SlMagnifier, SlHeart, SlHome, SlUser } from "react-icons/sl";
import Search from "../search/page";
import ThemeSwitcher from "../switchTheme/page";

// import Search from "../search/page";

const nav_logged = () => {
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

          <ul className="flex gap-10 brand_purple">
            <li>
              <Link className="flex gap-2 items-center" href="/">
                <SlHome
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                  id="home"
                />
                {/* <span className="text-md text-[#5311BF] dark:text-[#8e0bf5]">
                                    Home
                                </span> */}
              </Link>
            </li>
            <li>
              <Link className="flex gap-2 items-center" href="/favourites">
                <SlHeart
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                  id="favourites"
                />
                {/* <span className="text-md text-[#5311BF] dark:text-[#8e0bf5]">
                                    Favourites
                                </span> */}
              </Link>
            </li>
            <li>
              <Link className="flex gap-2 items-center" href="/concerts">
                <SlMagnifier
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                  id="explore"
                />
                {/* <span className="text-md text-[#5311BF] dark:text-[#8e0bf5]">
                                    Explore
                                </span> */}
              </Link>
            </li>
          </ul>
        </div>
        <Search />
        <div className="">
          <button className="rounded-full px-8 py-2 bg-purple-100 brand_purple flex items-center gap-2 m-auto hover:bg-purple-200">
            <Link href="/profile/${data}">Profile</Link>
            <SlUser
              className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
              id="user"
            />
          </button>
        </div>
        <ThemeSwitcher />
      </div>

      {/* Mobile Nav Logged in */}
      <div className="flex md:hidden p-4 fixed bottom-0 w-full bg-white dark:bg-[#121212]">
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
            <Link className="flex flex-col items-center" href="/favourites">
              <SlHeart
                className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                id="favourites"
              />
              Favourites
            </Link>
          </li>
          <li>
            <Link className="flex flex-col items-center" href="/concerts">
              <SlMagnifier
                className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                id="explore"
              />
              Explore
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-col items-center"
              href="/profile/${data}"
            >
              <SlUser
                className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                id="user"
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
