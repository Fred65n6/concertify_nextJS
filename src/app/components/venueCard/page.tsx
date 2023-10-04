"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import venueImage from 'public/images/venue-vega.jpeg'



interface Venue {
    _id: string;
    venue_name: string;
    venue_address: string;
}

const VenueCard: React.FC = () => {
    const [venues, setVenues] = useState<Venue[]>([]);

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
        {venues.map((venue) => (
            <article className="rounded-lg max-h-fit flex flex-col justify-between gap-2 mb-6 lg:mb-0">
                <div className="flex flex-col">
                    <ul className="flex gap-8">
                        <li className="grid gap-2" key={venue._id}>
                        <Link className="" href="/">
                        <Image src={venueImage}
                            width="full"
                            height="full"
                            alt="concert"
                            className="rounded-lg w-fit"
                            />
                        </Link>

                            <div className="text-black text-xl font-bold dark:text-white">{venue.venue_name}</div>
                            <div className="text-gray-600 text-sm dark:text-gray-400">{venue.venue_address}</div>
                        </li>
                    </ul>
                </div>
                </article>
        ))}
        </>
    );
};

export default VenueCard;