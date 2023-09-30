"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import minds_of_99 from 'public/images/artist-the-minds-of-99.jpeg'



const ArtistCard = () => {
    return (
        <>
        <article className="rounded-lg max-h-fit w-full flex flex-col justify-between gap-2 lg:w-fit">
            <Link className="" href="/">
                <Image
                   src={minds_of_99}
                    width="full"
                    height="full"
                    alt="button"
                    className="rounded-lg"
                />
            </Link>
            <div className="flex flex-col gap-2">
                <h3 className="text-black text-xl font-bold">The Minds of 99</h3>
                <p className="text-gray-600 text-sm">21. June 2024</p>
                <p className="text-gray-600 text-sm"><span className="font-bold text-sm">Royal Arena</span>, Copenhagen S</p>
            </div>
            
        </article>

        </>
    );
};

export default ArtistCard;