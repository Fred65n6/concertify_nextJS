"use client";

import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Concert {
    _id: string;
    artist: {
      artist_id: string;
      artist_name: string;
      artist_instagram: string;
      artist_youtube: string;
      artist_facebook: string;
      artist_twitter: string;
      artist_spotify: string;
    },
    concert_date: string;
    concert_description: string;
    concert_image: string;
    concert_name: string;
    concert_start: string;
    genre: {
      genre_id: string;
      genre_name: string;
    };
    venue: {
      venue_id: string;
      venue_name: string;
      venue_address: string;
      venue_location: string;
    };
    concert_doors: string;
  }

export default function SingleConcert() {
    const params = useParams();
    const id = params.id;
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [selectedConcert, setSelectedConcert] = useState<Concert | null>(
        null
    );

    // Fetch data with useEffect because it is a client site
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
                            src={"/concert_images/" + selectedConcert.concert_image}
                            width={200}
                            height={200}
                            alt="concert"
                            className="h-auto w-full rounded-lg"
                        />
                    </figure>
                    <section>
                        <h1 className="text-3xl font-bold my-2">
                            {selectedConcert.concert_name }
                        </h1>

                        <ul className="flex flex-col gap-4">
                            {/* More about the artist*/}
                            <Link href={"/artists/" + selectedConcert.artist.artist_id} key={selectedConcert.artist.artist_id}>
                                <li className="flex gap-2">
                                    <Image
                                        src="../star-stroke.svg"
                                        width={24}
                                        height={24}
                                        alt="star icon"
                                    />
                                    <p className="text-[#5311BF] text-sm align-middle">
                                    Read more about {selectedConcert.artist.artist_name}
                                    </p>
                                </li>
                            </Link>


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
                                        Doors open: 
                                    </span>
                                    {selectedConcert.concert_doors}
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
                                        Concert start: 
                                    </span>
                                    {selectedConcert.concert_start}
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
                                    {selectedConcert.venue.venue_name}, {selectedConcert.venue.venue_location}
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
}
