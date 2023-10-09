"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import LoginPage from "@/app/login/page";
import ConcertCard from "./components/concertCard/page";
import ArtistCard from "./components/artistCard/page";
import VenueCard from "./components/venueCard/page";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Initialize as loading
    const [data, setData] = useState({
        username: "",
        userId: null,
        userEmail: "",
    });
    const [user, setUser] = React.useState({
        email: "",
        newpassword: "",
    });

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/cookieUser");
            const userData = res.data.data;
            setData({
                username: userData.username,
                userId: userData._id,
                userEmail: userData.email,
            });
            setLoading(false); // Set loading to false after successful data retrieval
        } catch (error: any) {
            console.error(error.message);
            setLoading(false); // Set loading to false on error
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const changePassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/reset_password",
                user
            );
            console.log("password changed", response.data);
        } catch (error: any) {
            console.log("password change FAILED", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid pt-8">
            {loading ? (
                <h1 className="text-4xl font-bold">Loading...</h1>
            ) : data.username ? (
                <h1 className="text-4xl font-bold">
                    Welcome back{" "}
                    <span className="brand_purple">{data.userEmail}</span>
                </h1>
            ) : (
                <h1 className="text-2xl md:text-4xl font-bold">
                    Experience Copenhagen through live music
                </h1>
            )}
            <div className="">
                <LoginPage />
            </div>

            {/* Popular */}
            {/* <section className="py-20 border-b-[1px] border-gray-200 dark:border-stone-800">
                <h2 className="font-bold text-xl mb-4">Popular concerts</h2>
                <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <ConcertCard />
                    <ConcertCard />
                    <ConcertCard />
                    <ConcertCard />
                </div>
            </section> */}

            {/* Concerts */}
            <section className="pt-24 pb-10 grid gap-8 md:h-[600px]">
                <h2 className="font-bold text-xl">
                    Concerts you need to experience
                </h2>
                <div className="flex gap-4 md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar md:height-[300px]">
                    <ConcertCard />
                </div>
                <Link
                    className="place-self-end flex items-center md:hidden"
                    href="/concerts"
                >
                    View all venues
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 22 22"
                    >
                        <path
                            fill="#5311bf"
                            d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l3.9-3.9Z"
                        />
                    </svg>
                </Link>
            </section>

            {/* Venues */}
            <section className="pt-10 pb-40 grid gap-8 md:h-[600px]">
                <h2 className="font-bold text-xl">
                    Venues you need to experience
                </h2>
                <div className="flex gap-4 md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar md:height-[300px]">
                    <VenueCard />
                </div>
                <Link
                    className="place-self-end flex items-center md:hidden"
                    href="/venues"
                >
                    View all venues
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 22 22"
                    >
                        <path
                            fill="#5311bf"
                            d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l3.9-3.9Z"
                        />
                    </svg>
                </Link>
            </section>
        </div>
    );
}
