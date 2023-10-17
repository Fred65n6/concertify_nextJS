"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import FilterComponent from "../components/filterComponent/page";

// Can we create the interface global?
interface ConcertLoop {
    _id: string;
    concert_artist: {
        artist_id: string;
        artist_name: string;
    };
    concert_name: string;
    concert_image: string;
    concert_date: string;
    concert_genre: {
        genre_id: string;
        genre_name: string;
    };
    concert_venue: {
        venue_id: string;
        venue_name: string;
        venue_location: string;
    };
}

const ConcertLoopview: React.FC = () => {
    const [concerts, setConcerts] = useState<ConcertLoop[]>([]);
    const [filteredConcerts, setFilteredConcerts] = useState<ConcertLoop[]>([]);

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

    const handleDataFiltered = (filteredData: ConcertLoop[]) => {
        setFilteredConcerts(filteredData);
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("/api/data/concertData");
    //             setConcerts(response.data.data);
    //         } catch (error) {
    //             console.error("Error fetching concerts:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // Render the FilterComponent and pass the data and callback function
    return (
        <>
            <FilterComponent
                data={concerts}
                onDataFiltered={handleDataFiltered}
            />
            <h1 className="font-bold text-4xl pb-4">All concerts</h1>
            <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
                {filteredConcerts.map((concert) => (
                    <article className="w-auto" key={concert._id}>
                        <Link
                            href={"/concerts/" + concert._id}
                            key={concert._id}
                        >
                            <Image
                                src={"/" + concert.concert_image}
                                width={200}
                                height={200}
                                alt="concert"
                                className="rounded-lg object-cover w-full h-[200px]"
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
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-600 text-sm dark:text-gray-400">
                                <span className="font-bold">
                                    {concert.concert_venue?.venue_name},{" "}
                                </span>
                                {concert.concert_venue?.venue_location}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
};

export default ConcertLoopview;
