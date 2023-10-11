"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import minds_of_99 from "public/concert_images/minds_tour.jpeg";

const ArtistCard = () => {
    return (
        <>
            <article className="rounded-lg max-h-fit w-full flex flex-col justify-between gap-2 mb-6 lg:mb-0">
                <Link className="" href="/">
                    <Image
                        src={minds_of_99}
                        width={200}
                        height={200}
                        alt="artist"
                        className="rounded-lg w-full"
                    />
                </Link>
                <div className="flex flex-col">
                    <h3 className="text-black text-xl font-bold dark:text-white">
                        The Minds of 99
                    </h3>
                    <p className="text-gray-600 text-sm dark:text-gray-400">
                        21. June 2024
                    </p>
                    <p className="text-gray-600 text-sm dark:text-gray-400">
                        <span className="font-bold text-sm">Royal Arena</span>,
                        Copenhagen S
                    </p>
                </div>
            </article>
        </>
    );
};

export default ArtistCard;
