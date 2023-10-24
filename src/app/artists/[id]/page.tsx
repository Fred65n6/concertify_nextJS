"use client";

import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {SlStar, SlCalender, SlMusicToneAlt} from "react-icons/sl";

import {HiOutlineArrowRight} from "react-icons/hi";
import {PiBalloon} from "react-icons/pi";


interface ArtistSingle {
    _id: string;
    artist_name: string;
    artist_description: string;
    artist_image: string;
    artist_dob: string;
    artist_genre: string;
}
    

export default function SingleArtist() {
    const params = useParams();
    const id = params.id;
    const [artists, setArtists] = useState<ArtistSingle[]>([]);
    const [selectedArtist, setSelectedArtist] =
        useState<ArtistSingle | null>(null);


        useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/data/artistData");
                setArtists(response.data.data);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (id && artists.length > 0) {
            const matchingArtist = artists.find(
                (artist) => artist._id === id
            );
            setSelectedArtist(matchingArtist || null);
        } else {
            setSelectedArtist(null);
        }
    }, [id, artists]);

    return (
        <div>
            {selectedArtist ? (
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                    <figure>
                        <Image
                            src={"/./artist_images/" + selectedArtist.artist_image}
                            width={200}
                            height={200}
                            alt="artist image"
                            className="h-auto w-full rounded-lg"
                        />
                    </figure>
                    <section>
                        <h1 className="text-3xl font-bold my-2">
                            {selectedArtist.artist_name}
                        </h1>

                        <ul className="flex flex-col gap-4">
                            {/* Full name*/}
                                <li className="flex gap-2">
                                    <SlStar className="fill-gray-600 text-sm dark:fill-gray-400 w-5 h-5" id="artist_fullname" />
                                    <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                    Full name: {selectedArtist.artist_name}
                                    </p>
                                </li>

                                {/* Genre*/}
                                <li className="flex gap-2">
                                    <SlMusicToneAlt className="fill-gray-600 text-sm dark:fill-gray-400 w-5 h-5" id="artist_fullname" />
                                    <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                    Genre: {selectedArtist.artist_genre}
                                    </p>
                                </li>


                            {/* Date of birth*/}
                            <li className="flex gap-2">
                                    <PiBalloon className="fill-gray-600 text-sm dark:fill-gray-400 w-5 h-5" id="dob" />
                                    <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                        Born:
                                    </p>
                            </li>

                            {/* Next concert near you*/}
                                <li className="flex gap-2">
                                    <SlCalender className="fill-gray-600 text-sm dark:fill-gray-400 w-5 h-5" id="see_all" />
                                    <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                        Next concert near you:
                                    </p>
                            </li>



                            {/* See all concerts*/}
                            <li className="flex gap-2">
                                <Link className="flex gap-2" href="/concerts/">
                                    <HiOutlineArrowRight className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5" id="se_all" />
                                    <p className="text-[#5311BF] dark:text-[#8e0bf5] text-sm align-middle">
                                        See all concerts
                                    </p>
                                </Link>
                            </li>

                            
                        </ul>

                        <div className="border-t-[1px] border-[#979C9E] pt-4 mt-4">
                            <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                                {selectedArtist.artist_description}
                            </p>
                        </div>
                    </section>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
