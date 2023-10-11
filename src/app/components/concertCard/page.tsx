"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import concertImageBeyonce from "public/artist_images/beyonce_2023_tour.webp";

interface Concert {
    _id: string;
    concert_name: string;
    concert_date: number;
    concert_image: string;
}

const ConcertCard: React.FC = () => {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const concertsPerPage = 4;

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

    // Calculate the start and end indexes of venues to display on the current page
    const startIndex = (currentPage - 1) * concertsPerPage;
    const endIndex = startIndex + concertsPerPage;

    // Slice the venues array to display only the venues for the current page
    const concertsToDisplay = concerts.slice(startIndex, endIndex);

    // Function to handle next page
    const nextPage = () => {
        if (currentPage < Math.ceil(concerts.length / concertsPerPage)) {
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
            {concertsToDisplay.map((concert) => (
                <article className="flex-shrink-0 h-[300px]" key={concert._id}>
                    <Link href={"/concerts/" + concert._id} key={concert._id}>
                        <Image
                            src={"/concert_images/" + concert.concert_image}
                            width={200}
                            height={200}
                            alt="concert"
                            className="rounded-lg  object-cover w-[300px] h-[200px]"
                        />
                    </Link>

                    <div className="text-black text-xl font-bold dark:text-white pt-2">
                        {concert.concert_name}
                    </div>
                    <div className="text-gray-600 text-sm dark:text-gray-400 pt-2">
                        {concert.concert_date}
                    </div>
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
                        currentPage ===
                        Math.ceil(concerts.length / concertsPerPage)
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

export default ConcertCard;
