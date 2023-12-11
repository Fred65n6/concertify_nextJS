"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import LoginPage from "@/app/login/page";
import SignupPage from "./signup/page";
import ConcertCard from "./components/concertCard/page";
import VenueCard from "./components/venueCard/page";
import Link from "next/link";
import {SlArrowRight, SlArrowLeft} from "react-icons/sl";
import JfyCard from "./components/jfyCard/page";
import {hasCookie} from "@/helpers/cookieHelper";
import { cookies } from "next/headers";


export default function Home() {
    const router = useRouter();
    const [showComponent, setShowComponent] = useState(false);
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
            const hasAdminToken = document.cookie.includes('adminToken=');
            const hasArtistToken = document.cookie.includes('artistToken=');
            const hasToken = document.cookie.includes('token=');

        // Set showComponent to true if any of the tokens is present
        setShowComponent(hasAdminToken || hasToken|| hasArtistToken);
            setLoading(false); // Set loading to false after successful data retrieval
        } catch (error: any) {
            console.error(error.message);
            setLoading(false); // Set loading to false on error
        }
    };

    useEffect(() => {
        const shouldReload = localStorage.getItem('shouldReload');
            if (shouldReload) {
              localStorage.removeItem('shouldReload');
              window.location.reload();
            }
        getUserDetails();
    }, []);

    return (
        <>
        <LoginPage />
        <SignupPage />
        <div className="grid pt-8">
            {loading ? (
                <h1 className="text-4xl font-bold">Loading...</h1>
            ) : data.username ? (
                <h1 className="text-4xl font-bold">
                    Welcome back{" "}
                    <span className="brand_purple dark:text-purple-500">{data.username}</span>
                </h1>
            ) : (
                <h1 className="text-3xl md:text-4xl font-bold">
                    Experience <span className="brand_purple dark:text-purple-500">Copenhagen</span>{" "} <span className="md:hidden"><br /></span>
                    through <span className="brand_purple dark:text-purple-500">live music</span>
                </h1>
            )}

            {showComponent ? ( 
                    <section className="md:pt-24 pt-12 pb-4 md:h-[600px]">
                    <h2 className="font-bold text-2xl pb-4 md:pb-2">
                    <span className="text-[#5311BF] dark:text-purple-500">Concerts </span>
                        just for
                        <span className="text-[#5311BF] dark:text-purple-500"> you</span>
                    </h2>
                    <div className="flex md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar">
                        <JfyCard />
                    </div>
                    <Link
                        className="justify-end flex items-center brand_purple dark:text-purple-500"
                        href="/just-for-you"
                    >
                        View all recommended concerts
                        <SlArrowRight
                            className="w-4 h-4"
                            id="arrow_right"
                        />
                    </Link>
                </section>
            ): (
                <section className="py-12">
                </section>
            )}


            {/* Concerts */}
            <section className="md:pt-0 pt-12 pb-24">
                <h2 className="font-bold text-2xl pb-4 md:pb-2">
                    <span className="text-[#5311BF] dark:text-purple-500">Concerts</span> you need to experience
                </h2>
                <div className="flex md:grid grid-cols-4 md:gap-4 overflow-x-hidden no-scrollbar">
                    <ConcertCard />
                </div>
                <Link
                    className="justify-end flex items-center brand_purple dark:text-purple-500"
                    href="/concerts"
                >
                    View all concerts
                    <SlArrowRight
                        className="w-4 h-4"
                        id="arrow_right"
                    />
                </Link>
            </section>

            {/* Venues */}
            <section className="pb-36 md:pt-0 pt-12">
                <h2 className="font-bold text-2xl pb-4">
                    <span className="text-[#5311BF] dark:text-purple-500">Venues</span> you need to experience
                </h2>
                <div className="flex gap-4 md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar md:height-[300px]">
                    <VenueCard />
                </div>
                <Link
                    className="justify-end flex items-center brand_purple dark:text-purple-500 md:hidden"
                    href="/venues"
                >
                    View all venues
                    <SlArrowRight
                    className="fill-gray-600 dark:gray-600 w-4 h-4 pt-1"
                    id="arrow_right"
                    />

                </Link>
            </section>
        </div>
        </>
    );
}
