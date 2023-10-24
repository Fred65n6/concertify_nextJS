"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbComp from "../components/breadCrumbs/page";

interface ArtistLoop {
  _id: string;
  artist_name: string;
  artist_image: string;
  artist_genre: {
    genre_id: string;
    genre_name: string;
  };
}

const ArtistLoopview: React.FC = () => {
  const [artists, setArtists] = useState<ArtistLoop[]>([]);
  // const [filteredArtists, setFilteredArtists] = useState<ArtistLoop[]>([]);

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

  return (
    <>
      <BreadcrumbComp
        homeElement={"Home"}
        separator={<span> | </span>}
        containerClasses="flex py-5 brand_purple opacity-70"
        listClasses="hover:underline mx-2 font-bold brand_purple opacity-70"
        capitalizeLinks
      />
      <h1 className="font-bold text-4xl pb-4">All artists</h1>
      <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
        {artists?.map((artist) => (
          <article className="w-auto" key={artist._id}>
            <Link href={"/artists/" + artist._id} key={artist._id}>
              <Image
                src={"/" + artist.artist_image}
                width={200}
                height={200}
                alt="artist_image"
                className="rounded-lg object-cover w-full h-[200px]"
              />
            </Link>

            <h4 className="text-black text-xl font-bold dark:text-white">
              {artist.artist_name}
            </h4>
            <div className="flex flex-col gap-2">
              <p className="text-gray-600 dark:text-slate-400 text-sm align-middle">
                {artist.artist_genre
                  ? artist.artist_genre?.genre_name
                  : "Unknown Genre"}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default ArtistLoopview;
