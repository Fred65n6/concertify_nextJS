"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import LoginPage from "@/app/login/page";
import ConcertCard from "./components/concertCard/page";
import ArtistCard from "./components/artistCard/page";
import VenueCard from "./components/venueCard/page";
import SearchInput from "@/app/components/searchBar/page";

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
                <h1 className="text-4xl font-bold">
                    Experience Copenhagen through live music
                </h1>
            )}
            <div className="">
                <LoginPage />
            </div>

            {/* Popular */}
            <section className="py-20 border-b-[1px] border-gray-200 dark:border-stone-800">
                <h2 className="font-bold text-xl mb-4">Popular concerts</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <ConcertCard />
                    <ConcertCard />
                    <ConcertCard />
                    <ConcertCard />
                </div>
            </section>

            {/* Artists */}
            <section className="py-20 border-b-[1px] border-gray-200 dark:border-stone-800">
                <h2 className="font-bold text-xl mb-4">
                    Artists you might like
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                </div>
            </section>

            {/* Venues */}
            <section className="py-20">
                <h2 className="font-bold text-xl mb-4">
                    Venues you need to experiece
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <VenueCard />
                    <VenueCard />
                    <VenueCard />
                    <VenueCard />
                </div>
            </section>
        </div>
    );
}
