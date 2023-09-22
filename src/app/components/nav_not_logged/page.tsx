import React from "react";
import Link from "next/link";
import {hasCookie} from "@/helpers/cookieHelper";

const nav_logged = () => {
    const showComponent = hasCookie("token");

    return (
        <nav className="flex justify-between p-4">
            <div className="">
                <p>Your not logged in</p>
            </div>
            <div className="">
                <ul className="flex gap-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        {showComponent ? ( // Render your component here
                            <Link href="/profile">Profile</Link>
                        ) : (
                            <Link href="/login">Sign in</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default nav_logged;
