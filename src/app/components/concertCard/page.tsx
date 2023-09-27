"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import beyonce_tour from 'public/images/beyonce_2023_tour.webp'



const ConcertCard = () => {
    return (
        <>
        <article className="rounded-lg max-h-fit w-full flex flex-col justify-between gap-2 lg:w-fit">
            <Link className="" href="/">
                <Image
                   src={beyonce_tour}
                    width="full"
                    height="full"
                    alt="button"
                    className="rounded-lg"
                />
            </Link>
            <div className="flex flex-col gap-2">
                <h3 className="text-black text-xl font-bold">Beyonce - RENAISSANCE WORLD TOUR</h3>
                <p className="text-gray-600 text-sm">6. September 2023</p>
                <p className="text-gray-600 text-sm"><span className="font-bold text-sm">Royal Arena</span>, Copenhagen S</p>
            </div>
            
        </article>

        </>
    );
};

export default ConcertCard;