"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import venueVega from 'public/images/venue-vega.jpeg'



const VenueCard = () => {
    return (
        <>
        <article className="rounded-lg max-h-fit flex flex-col justify-between gap-2 mb-6 lg:mb-0">
            <Link className="" href="/">
                <Image
                   src={venueVega}
                    width="full"
                    height="full"
                    alt="venue"
                    className="rounded-lg w-full"
                />
            </Link>
            <div className="flex flex-col">
                <h3 className="text-black text-xl font-bold dark:text-white">Vega</h3>
                <p className="text-gray-600 text-sm dark:text-gray-400">Copenhagen V</p>
            </div>
            
        </article>
        </>
    );
};

export default VenueCard;