"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavLogged = () => {
    const openLoginModule = () => {
        const loginModule = document.getElementById("login_module");
        loginModule?.classList.remove("hidden");
        loginModule?.classList.add("grid");
    };

<<<<<<< HEAD
  return (
    <nav className="px-8">
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
          <ul className="flex gap-10 brand_purple dark:text-[#8e0bf5]">
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
        <div className="flex gap-4">
          <button className="rounded-full bg-purple-100 brand_purple w-32 py-3 hover:bg-purple-200">
            <Link href="/signup">Sign up</Link>
          </button>
          <button
            type="button"
            onClick={openLoginModule}
            className="rounded-full w-32 brand_gradient text-white hover:bg-purple-200"
          >
            Log in
          </button>
        </div>
      </div>
      {/* Mobile Nav Logged in */}
      <div className="flex md:hidden p-4 fixed bottom-0 w-full bg-white">
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
                src="../explore_btn.svg"
                width="25"
                height="25"
                alt="button"
              />
              Explore
            </Link>
          </li>
          <li>
            <Link className="flex flex-col items-center" href="/login">
              <Image
                src="../profile_btn.svg"
                width="25"
                height="25"
                alt="button"
              />
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
=======
    return (
        <nav className="px-8">
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
                <div className="flex gap-4">
                    <button className="rounded-full bg-purple-100 brand_purple w-32 py-3 hover:bg-purple-200">
                        <Link href="/signup">Sign up</Link>
                    </button>
                    <button
                        type="button"
                        onClick={openLoginModule}
                        className="rounded-full w-32 brand_gradient text-white hover:bg-purple-200"
                    >
                        Log in
                    </button>
                </div>
            </div>
            {/* Mobile Nav Logged in */}
            <div className="flex md:hidden p-4 fixed bottom-0 w-full bg-white">
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
                            href="/login"
                        >
                            <Image
                                src="../profile_btn.svg"
                                width="25"
                                height="25"
                                alt="button"
                            />
                            Log in
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
>>>>>>> full_text_search
};

export default NavLogged;
