"use client";
import React from "react";
import Link from "next/link";

const nav_logged = () => {
    const handleSignInClick = () => {
        console.log("This works");
    };

    return (
        <nav className="flex justify-between p-4">
            <div className="">
                <p>Your logged in</p>
            </div>
            <div className="">
                <ul className="flex gap-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                        <a onClick={handleSignInClick}>Sign in</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default nav_logged;
