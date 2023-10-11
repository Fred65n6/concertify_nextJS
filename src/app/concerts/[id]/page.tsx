"use client";

import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Concert {
    _id: string;
    concert_name: string;
    concert_date: string;
    concert_image: string;
    concert_artist: string; // TO DO: replace with nested data
    concert_artist_description: string; // TO DO: replace with nested data
}

export default function SingleConcert() {
    const params = useParams();
    const id = params.id;
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [selectedConcert, setSelectedConcert] = useState<Concert | null>(
        null
    );

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
    }, []);

    // Use a useEffect to update the selectedConcert when the 'id' or 'concerts' array changes
    useEffect(() => {
        if (id && concerts.length > 0) {
            const matchingConcert = concerts.find(
                (concert) => concert._id === id
            );
            setSelectedConcert(matchingConcert || null);
        } else {
            setSelectedConcert(null);
        }
    }, [id, concerts]);

    return (
        <div>
            {selectedConcert ? (
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                    <figure>
                        <Image
                            src={"/" + selectedConcert.concert_image}
                            width={200}
                            height={200}
                            alt="concert"
                            className="h-auto w-full rounded-lg"
                        />
                    </figure>
                    <section>
                        <h1 className="text-3xl font-bold my-2">
                            {selectedConcert.concert_name}
                        </h1>

                        <ul className="flex flex-col gap-4">
                            {/* More about the artist*/}
                            <li className="flex gap-2">
                                <Image
                                    src="../star-stroke.svg"
                                    width={24}
                                    height={24}
                                    alt="calendar icon"
                                />
                                <p className="text-[#5311BF] text-sm dark:text-gray-400 align-middle">
                                    Read more about xxx
                                </p>
                            </li>

                            {/* Concert date*/}
                            <li className="flex gap-2">
                                <Image
                                    src="../calendar.svg"
                                    width={24}
                                    height={24}
                                    alt="calendar icon"
                                />
                                <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                    {selectedConcert.concert_date}
                                </p>
                            </li>

                            {/* Doors open*/}
                            <li className="flex gap-2">
                                <Image
                                    src="../clock.svg"
                                    width={24}
                                    height={24}
                                    alt="clock icon"
                                />
                                <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                    <span className="font-bold">
                                        Doors open:{" "}
                                    </span>
                                    19:00
                                </p>
                            </li>

                            {/* Concert start*/}
                            <li className="flex gap-2">
                                <Image
                                    src="../play.svg"
                                    width={24}
                                    height={24}
                                    alt="play icon"
                                />
                                <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                    <span className="font-bold">
                                        Concert starts:{" "}
                                    </span>
                                    20:00
                                </p>
                            </li>

                            {/* Location*/}
                            <li className="flex gap-2">
                                <Image
                                    src="../location.svg"
                                    width={24}
                                    height={24}
                                    alt="location icon"
                                />
                                <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                    Royal Arena, Copenhagen S
                                </p>
                            </li>

                            {/* See all concerts*/}
                            <li className="flex gap-2">
                                <Link className="flex gap-2" href="/concerts/">
                                    <Image
                                        src="../arrow-right.svg"
                                        width={24}
                                        height={24}
                                        alt="arrow icon"
                                    />
                                    <p className="text-[#5311BF] text-sm dark:text-gray-400 align-middle">
                                        See all concerts
                                    </p>
                                </Link>
                            </li>
                        </ul>

                        <div className="border-t-[1px] border-[#979C9E] pt-4 mt-4">
                            <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                Beyoncé has spent over two decades dominating
                                the music industry. She is the most-awarded
                                artist in Grammy history with 32 wins, and has
                                sold 200 million albums worldwide, earning eight
                                Billboard No. 1 hits. As a live performer,
                                Beyoncé’s dynamic stage presence and
                                choreography are unparalleled. Her iconic world
                                tours, including two co-headlining tours with
                                Jay-Z (On the Run Tour I and II), have grossed
                                $767.3 million and sold 8.9 million tickets. In
                                2018, she became the first Black woman to
                                headline Coachella, and her performance (dubbed
                                “Beychella”) is considered one of the festival’s
                                most memorable and record-breaking moments.
                            </p>
                        </div>
                    </section>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
