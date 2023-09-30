"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import beyonce_tour from 'public/images/beyonce_2023_tour.webp'



const ConcertCard = () => {
    return (
        <>
        <article className="rounded-lg max-h-fit flex flex-col justify-between gap-2 mb-6 lg:mb-0">
            <Link className="" href="/">
                <Image
                   src={beyonce_tour}
                    width="full"
                    height="full"
                    alt="concert"
                    className="rounded-lg w-fit"
                />
            </Link>
            <div className="flex flex-col">
                <h3 className="text-black text-xl font-bold dark:text-white">Beyonce - RENAISSANCE WORLD TOUR</h3>
                <p className="text-gray-600 text-sm dark:text-gray-400">6. September 2023</p>
                <p className="text-gray-600 text-sm dark:text-gray-400"><span className="font-bold text-sm">Royal Arena</span>, Copenhagen S</p>
            </div>
            
        </article>

        </>
    );
};

export default ConcertCard;