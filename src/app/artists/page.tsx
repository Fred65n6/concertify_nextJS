"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

// Can we create the interface global?
interface ArtistLoop {
    _id: string;
    artist_name: string;
    artist_image: string;
    artist_concert: {
        concert_name: string;
        concert_image: string;
        concert_date: string;

    };
    artist_genre: {
        genre_id: string;
        genre_name: string;
    };
    concert_venue: {
        venue_id: string;
        venue_name: string;
        venue_location: string;
    };
}

const ArtistLoopview: React.FC = () => {
    const [artists, setArtists] = useState<ArtistLoop[]>([]);
    const [filteredArtists, setFilteredArtists] = useState<ArtistLoop[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/data/concertData");
                setArtists(response.data.data);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1 className="font-bold text-4xl pb-4">All artists</h1>
            <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
                {filteredArtists?.map((artist) => (
                    <article className="w-auto" key={artist._id}>
                        <Link
                            href={"/artists/" + artist._id}
                            key={artist._id}
                        >
                            <Image
                                src={"/" + artist.artist_image}
                                width={200}
                                height={200}
                                alt="artist"
                                className="rounded-lg object-cover w-full h-[200px]"
                            />
                        </Link>

                        <h4 className="text-black text-xl font-bold dark:text-white">
                            {artist.artist_name}
                        </h4>
                    </article>
                ))}
            </div>
        </>
    );
};

export default ArtistLoopview;
