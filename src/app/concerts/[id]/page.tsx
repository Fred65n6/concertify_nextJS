"use client";

import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import SignupPage from "@/app/signup/page";
import LoginPage from "@/app/login/page";
import { PiHeartStraightFill, PiHeartStraightLight } from "react-icons/pi";
import BreadcrumbComp from "@/app/components/breadCrumbs/page";
import { BsArrowRight } from "react-icons/bs";
import {
    SlLocationPin,
    SlStar,
    SlMusicToneAlt,
    SlClock,
    SlControlPlay,
    SlCalender
} from "react-icons/sl";

interface ConcertSingle {
    concert_id: string;
    concert_artist: {
        artist_id: string;
        artist_name: string;
        artist_instagram: string;
        artist_youtube: string;
        artist_facebook: string;
        artist_twitter: string;
        artist_spotify: string;
    };
    concert_date: string;
    concert_description: string;
    concert_image: string;
    concert_name: string;
    concert_start: string;
    concert_genre: {
        genre_id: string;
        genre_name: string;
    };
    concert_venue: {
        venue_id: string;
        venue_name: string;
        venue_address: string;
        venue_location: string;
    };
    concert_doors: string;
}

const SingleConcert: React.FC = () => {
    const [userData, setUserData] = useState<string | null>(null);
    const [data, setData] = useState("loading");
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const id = params.id;
    const [concerts, setConcerts] = useState<ConcertSingle[]>([]);
    const [selectedConcert, setSelectedConcert] = useState<ConcertSingle | null>(null);
    const [isInFavorites, setIsInFavorites] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/data/concertData");
                setConcerts(response.data.data);
            } catch (error) {
                console.error("Error fetching concerts:", error);
            }
        };
        fetchData();
        getFavouriteDetails();
        getUserDetails();
    }, []);

    // GET USER COOKIE
    const getFavouriteDetails = async () => {
        try {
            const res = await axios.get("/api/users/cookieUser");
            console.log(res.data);
            const userData = res.data.data;
            if (userData && userData.favourites) {
                const favoriteConcertIds = userData.favourites.map(
                    (favourite: any) => favourite.favourite_concert_id
                );
                console.log("Favorite Concert IDs:", favoriteConcertIds);

                if (favoriteConcertIds.includes(id)) {
                    console.log(`The ID ${id} is in favorites.`);
                    setIsInFavorites(true);
                } else {
                    console.log(`The ID ${id} is not in favorites.`);
                    setIsInFavorites(false);
                }
            } else {
                console.log("No favorites or data found");
            }
        } catch (error) {
            console.error("Error fetching user details: ", error);
        }
    };


    const getUserDetails = async () => {
        const res = await axios.get("/api/users/cookieUser");
        setIsLoggedIn(true)
        console.log(res.data);
        setUserData(res.data.data._id);
    };

    useEffect(() => {
        if (id && concerts.length > 0) {
            const matchingConcert = concerts.find(
                (concert) => concert.concert_id === id
            );
            setSelectedConcert(matchingConcert || null);
        } else {
            setSelectedConcert(null);
        }
    }, [id, concerts]);

    const deleteFavourite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!selectedConcert) {
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.set("Favourite_user_id", userData || "");
        data.set("Favourite_concert_id", selectedConcert.concert_id);

        try {
            const res = await fetch("/api/data/deleteFavourite/", {
                method: "DELETE",
                body: data,
            });
            if (!res.ok) {
                const errorText = await res.text();
                console.error(errorText);
            } else {
                setIsInFavorites(false);
                setLoading(false);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!selectedConcert) {
            return;
        }

        const data = new FormData();
        data.set("Favourite_concert_id", selectedConcert.concert_id);
        data.set("Favourite_concert_image", selectedConcert.concert_image);
        data.set("Favourite_concert_name", selectedConcert.concert_name);
        data.set("Favourite_concert_date", selectedConcert.concert_date);
        data.set(
            "Favourite_concert_artist",
            selectedConcert.concert_artist?.artist_name
        );
        data.set(
            "Favourite_concert_venue",
            selectedConcert.concert_venue?.venue_name
        );
        data.set("Favourite_user_id", userData || "");
        try {
            const res = await fetch("/api/data/addFavourite/", {
                method: "POST",
                body: data,
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error(errorText);
            } else {
                setLoading(false);
                setIsInFavorites(true);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
        
    };

    return (
        <div>
            <LoginPage />
            <SignupPage />
            <BreadcrumbComp />
            {selectedConcert ? (
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 pb-20">
                    <figure>
                        <Image
                            src={`https://storage.googleapis.com/concertify/${selectedConcert.concert_image}`}
                            width={200}
                            height={200}
                            alt="concert"
                            className="h-[400px] object-cover object-top w-full rounded-lg"
                        />
                    </figure>
                    <section>

                        <div className="flex items-center justify-between py-8 md:py-0">
                            <h1 className="text-3xl font-bold my-2">
                                {selectedConcert.concert_name}
                            </h1>
                            
                            {isLoggedIn ? ( 
                            <div className="">
                            {isInFavorites ?(
                                <form
                                    className="flex flex-col items-center gap-8"
                                    onSubmit={deleteFavourite}
                                >
                                    <input
                                        readOnly={true}
                                        className="bg-slate-100 p-4 w-72 hidden"
                                        type="text"
                                        name="Favourite_concert_id"
                                        value={selectedConcert.concert_id}
                                    />
                                    <input
                                        readOnly={true}
                                        className="bg-slate-100 p-4 w-72 hidden"
                                        type="text"
                                        name="Favourite_user_id"
                                        value={data}
                                    />

                                    <button
                                        id="addedToFavourites"
                                        className="flex items-center place-content-center rounded-full bg-purple-100 brand_purple w-10 h-10 hover:bg-purple-200"
                                        type="submit"
                                        value="upload"
                                    >
                                        <PiHeartStraightFill
                                            className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                                            id="favourites"
                                        />
                                    </button>
                                </form>
                            ) : (
                                <form
                                    className="flex flex-col items-center gap-8"
                                    onSubmit={onSubmit}
                                >
                                    <input
                                        readOnly={true}
                                        className="bg-slate-100 p-4 w-72 hidden"
                                        type="text"
                                        name="Favourite_concert_id"
                                        value={selectedConcert.concert_id}
                                    />
                                    <input
                                        readOnly={true}
                                        className="bg-slate-100 p-4 w-72 hidden"
                                        type="text"
                                        name="Favourite_concert_image"
                                        value={selectedConcert.concert_image}
                                    />
                                    <input
                                        readOnly={true}
                                        className="bg-slate-100 p-4 w-72 hidden"
                                        type="text"
                                        name="Favourite_concert_name"
                                        value={selectedConcert.concert_name}
                                    />
                                    <input
                                        readOnly={true}
                                        className="bg-slate-100 p-4 w-72 hidden"
                                        type="text"
                                        name="Favourite_concert_date"
                                        value={selectedConcert.concert_date}
                                    />
                                    <input
                                        readOnly={true}
                                        className="bg-slate-100 p-4 w-72 hidden"
                                        type="text"
                                        name="Favourite_concert_artist"
                                        value={
                                            selectedConcert.concert_artist
                                                .artist_name
                                        }
                                    />
                                    <input
                                        readOnly={true}
                                        className="bg-slate-100 p-4 w-72 hidden"
                                        type="text"
                                        name="Favourite_user_id"
                                        value={data}
                                    />

                                    <button
                                        className="flex items-center place-content-center rounded-full bg-purple-100 brand_purple w-10 h-10  hover:bg-purple-200"
                                        type="submit"
                                        value="upload"
                                    >
                                        <PiHeartStraightLight
                                            className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                                            id="favourites"
                                        />
                                    </button>
                                </form>
                            )}
                            </div>
                            ): 
                            <div></div>
                            }
                        </div>

                        <ul className="flex flex-col gap-4">
                            <li className="flex gap-2">
                                <SlMusicToneAlt
                                    className="stroke-gray-600 dark:stroke-gray-200 w-5 h-5"
                                    id="genre"
                                />
                                <p className="text-gray-600 text-sm dark:text-gray-200 align-middle">
                                    {selectedConcert.concert_genre.genre_name}
                                </p>
                            </li>

                            {/* More about the artist*/}
                            <Link
                                href={
                                    "/artists/" +
                                    selectedConcert.concert_artist.artist_id
                                }
                                key={selectedConcert.concert_artist.artist_id}
                            >
                                <li className="flex gap-2">
                                    <SlStar
                                        className="fill-[#5311BF] dark:fill-purple-500 w-5 h-5"
                                        id="artist"
                                    />
                                    <p className="text-[#5311BF] dark:text-purple-500 text-sm align-middle">
                                        Read more about{" "}
                                        {
                                            selectedConcert.concert_artist
                                                .artist_name
                                        }
                                    </p>
                                </li>
                            </Link>

                            {/* Concert date*/}
                            <li className="flex gap-2">
                                <SlCalender
                                    className="stroke-gray-600 dark:stroke-gray-200 w-5 h-5"
                                    id="date"
                                />
                                <p className="text-gray-600 text-sm dark:text-gray-200 align-middle">
                                    {selectedConcert.concert_date}
                                </p>
                            </li>

                            {/* Doors open*/}
                            <li className="flex gap-2">
                                <SlClock
                                    className="stroke-gray-600 dark:stroke-gray-200 w-5 h-5"
                                    id="doors"
                                />
                                <p className="text-gray-600 text-sm dark:text-gray-200 align-middle">
                                    Doors open: {selectedConcert.concert_doors}
                                </p>
                            </li>

                            {/* Concert start*/}
                            <li className="flex gap-2">
                                <SlControlPlay
                                    className="stroke-gray-600 dark:stroke-gray-200 w-5 h-5"
                                    id="concert_start"
                                />
                                <p className="text-gray-600 text-sm dark:text-gray-200 align-middle">
                                    Concert start:{" "}
                                    {selectedConcert.concert_start}
                                </p>
                            </li>

                            {/* Venue*/}
                            <Link
                                href={
                                    "/venues/" +
                                    selectedConcert.concert_venue.venue_id
                                }
                                key={selectedConcert.concert_venue.venue_id}
                            >
                            <li className="flex gap-2">
                                <SlLocationPin
                                        className="fill-[#5311BF] dark:fill-purple-500 w-5 h-5"
                                        id="location"
                                />
                                    <p className="text-[#5311BF] dark:text-purple-500 text-sm align-middle">
                                    {selectedConcert.concert_venue.venue_name}
                                </p>
                            </li>
                            </Link>



                            {/* See all concerts*/}
                            {/* <li className="flex gap-2">
                                <Link className="flex gap-2" href="/concerts/">
                                    <BsArrowRight
                                        className="fill-[#5311BF] dark:fill-purple-500 w-5 h-5"
                                        id="se_all"
                                    />
                                    <p className="text-[#5311BF] dark:text-purple-500 text-sm align-middle">
                                        See all concerts
                                    </p>
                                </Link>
                            </li> */}
                        </ul>

                        <div className="border-t-[1px] border-[#979C9E] dark:border-[#23124b] pt-4 mt-4">
                            <p className="text-gray-600 text-sm dark:text-gray-200 align-middle">
                                {selectedConcert.concert_description}
                            </p>
                        </div>
                    </section>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SingleConcert;
