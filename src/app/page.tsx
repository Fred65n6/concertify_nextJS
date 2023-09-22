// pages/index.js
import React from "react";
import Nav from "@/app/components/nav/page";
import {hasCookie} from "@/helpers/cookieHelper";

export default function Home() {
    const showComponent = hasCookie("token");

    return (
        <div>
            {showComponent ? (
                // Render your component here
                <Nav />
            ) : // Render something else or nothing
            null}
        </div>
    );
}
