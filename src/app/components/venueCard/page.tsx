"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import venueImage from "public/images/venue-vega.jpeg";
import beyonce from "public/images/beyonce_2023_tour.webp";

interface Venue {
    _id: string;
    venue_name: string;
    venue_address: string;
}

const VenueCard: React.FC = () => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    // const venuesPerPage =
    //     typeof window !== "undefined" && window.innerWidth <= 768 ? 1 : 4; // Change venuesPerPage based on screen
    const venuesPerPage = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/data/venueData");
                setVenues(response.data.data);
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        };

        fetchData();
    }, []);

    // Calculate the start and end indexes of venues to display on the current page
    const startIndex = (currentPage - 1) * venuesPerPage;
    const endIndex = startIndex + venuesPerPage;

    // Slice the venues array to display only the venues for the current page
    const venuesToDisplay = venues.slice(startIndex, endIndex);

    // Function to handle next page
    const nextPage = () => {
        if (currentPage < Math.ceil(venues.length / venuesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle previous page
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {venuesToDisplay.map((venue) => (
                <article className="flex-shrink-0" key={venue._id}>
                    {/* <ul className="md:flex gap-8">
                        <li className="grid gap-2 w-[500px]"> */}
                    <Link href={"/venues/" + venue._id} key={venue._id}>
                        <Image
                            src={venueImage}
                            width={200}
                            height={200}
                            alt="concert"
                            className="rounded-lg w-fit"
                        />
                    </Link>

                    <div className="text-black text-xl font-bold dark:text-white">
                        {venue.venue_name}
                    </div>
                    <div className="text-gray-600 text-sm dark:text-gray-400">
                        {venue.venue_address}
                    </div>
                    {/* </li>
                    </ul> */}
                </article>
            ))}

            <div className="hidden pagination md:flex gap-8 md:place-self-end md:col-end-5">
                {currentPage > 1 && (
                    <button
                        onClick={previousPage}
                        className="pagination-button flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 22 22"
                        >
                            <path
                                fill="#5311bf"
                                d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12q0-.2.063-.375T8.7 11.3l4.6-4.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L10.8 12Z"
                            />
                        </svg>
                        Previous
                    </button>
                )}
                <button
                    onClick={nextPage}
                    className={`flex items-center pagination-button ${
                        currentPage === Math.ceil(venues.length / venuesPerPage)
                            ? "disabled"
                            : ""
                    }`}
                >
                    Next
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
                </button>
            </div>
        </>
    );
};

export default VenueCard;
