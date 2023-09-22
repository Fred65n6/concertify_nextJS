"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";

const nav_logged = () => {
    // const handleSignInClick = () => {
    //     console.log("This works");
    // };

    async function getUserDetails() {
        const res = await axios.get("/api/users/cookie_user");
        console.log(res);
    }

    return (
        <nav className="flex justify-between p-4">
            <div className="">
                <p>You're logged in</p>
            </div>
            <div className="">
                <ul className="flex gap-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/profile/${data}">Profile</Link>
                    </li>
                    <li>
                        <a className="cursor-pointer" onClick={getUserDetails}>
                            Test button
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default nav_logged;
