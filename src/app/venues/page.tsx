"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import VenueCard from "../components/venueCard/page";
import venueImage from "public/images/venue-vega.jpeg";
import Link from "next/link";
import Image from "next/image";
interface Venue {
    _id: string;
    venue_name: string;
    venue_address: string;
    // Add other properties from your Venue model
}

const VenueList: React.FC = () => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

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

    return (
        <>
            <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
                {venues.map((venue) => (
                    <article className="w-auto" key={venue._id}>
                        {/* <ul className="md:flex gap-8">
                        <li className="grid gap-2 w-[500px]"> */}
                        <Link href={"/venues/" + venue._id} key={venue._id}>
                            <Image
                                src={venueImage}
                                width={200}
                                height={200}
                                alt="concert"
                                className="rounded-lg md:w-fit"
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
            </div>
        </>
    );
};

export default VenueList;
