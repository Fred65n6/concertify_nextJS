"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {SlArrowRight, SlArrowLeft} from "react-icons/sl";

interface ConcertCard {
    _id: string;
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

const ConcertCard: React.FC = () => {
    const [concerts, setConcerts] = useState<ConcertCard[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const concertsPerPage = 4;

    // ----- Fetch data with useEffect since it is a client site
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

    // ----- Calculate the start and end indexes of venues to display on the current page
    const startIndex = (currentPage - 1) * concertsPerPage;
    const endIndex = startIndex + concertsPerPage;

    // ----- Slice the venues array to display only the venues for the current page
    const concertsToDisplay = concerts.slice(startIndex, endIndex);

    // ----- Function to handle next page
    const nextPage = () => {
        if (currentPage < Math.ceil(concerts.length / concertsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // ----- Function to handle previous page
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {concertsToDisplay?.map((concert) => (
                <article className="flex-shrink-0 grid pb-8" key={concert._id}>
                    <Link href={"/concerts/" + concert._id} key={concert._id}>
                        <Image
                            src={"/" + concert.concert_image}
                            width={200}
                            height={200}
                            alt="concert"
                            className="rounded-lg  object-cover w-full h-[200px]"
                        />
                    </Link>

                    <h4 className="text-black text-xl font-bold dark:text-white">
                        {concert.concert_artist
                            ? concert.concert_artist.artist_name
                            : "Unknown Artist"}{" "}
                        -{" "}
                        {concert.concert_name
                            ? concert.concert_name
                            : "Unknown concert_name"}
                    </h4>

                    <p className="text-gray-600 text-sm dark:text-gray-400">
                        <span className="font-bold mr-1">
                            {concert.concert_venue?.venue_name},{" "}
                        </span>
                        {concert.concert_date}
                    </p>
                </article>
            ))}

            <div className="pagination hidden md:flex gap-8 md:place-self-end md:col-end-5">
                {currentPage > 1 && (
                    <button
                        onClick={previousPage}
                        className="pagination-button flex items-center"
                    >
                        <SlArrowLeft
                            className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
                            id="explore"
                        />
                        Previous
                    </button>
                )}
                <button
                    onClick={nextPage}
                    className={`flex items-center pagination-button ${
                        currentPage ===
                        Math.ceil(concerts.length / concertsPerPage)
                            ? "disabled"
                            : ""
                    }`}
                >
                    Next
                    <SlArrowRight
                        className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
                        id="explore"
                    />
                </button>
            </div>
        </>
    );
};

export default ConcertCard;
