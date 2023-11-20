"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SlHeart, SlHome, SlUser, SlGrid } from "react-icons/sl";
import Search from "../search/page";
import ThemeSwitcher from "../switchTheme/page";

const nav_logged = () => {
  return (
    <nav className="">
      {/* DESKTOP NAV */}
      <div className="hidden lg:flex max-w-[1300px] pt-8 px-8 justify-between items-center m-auto lg:px-14">
        <div className="flex gap-8 items-center w-fit">
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
              <Link className="flex gap-2 items-center" href="/concerts">
                <SlGrid
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                  id="explore"
                />
                Explore
              </Link>
            </li>
            <li>
              <Link className="flex gap-2 items-center" href="/favourites">
                <SlHeart
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                  id="favourites"
                />
                Favourites
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center">
        <Search />
          <button className="rounded-full px-8 py-2 bg-purple-100 brand_purple flex items-center gap-2 m-auto hover:bg-purple-200">
            <Link href="/profile/${data}">Profile</Link>
            <SlUser
              className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
              id="user"
            />
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
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                  id="explore"
                />
              </Link>
            </li>
            <li>
              <Link className="flex gap-2 items-center" href="/favourites">
                <SlHeart
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                  id="favourites"
                />
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center">
        <Search />
          <button className="rounded-full px-8 py-2 bg-purple-100 brand_purple flex items-center gap-2 m-auto hover:bg-purple-200">
            <Link href="/profile/${data}">Profile</Link>
            <SlUser
              className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
              id="user"
            />
          </button>
          <ThemeSwitcher />
        </div>
      </div>

      {/* MOBILE NAV */}
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
            <Link className="flex flex-col items-center" href="/concerts">
              <SlGrid
                className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                id="explore"
              />
              Explore
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
