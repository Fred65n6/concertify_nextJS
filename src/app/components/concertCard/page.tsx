"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
interface ConcertCard {
  concert_id: string;
  concert_artist: {
    artist_id: string;
    artist_name: string;
    artist_instagram: string;
    artist_youtube: string;
    artist_facebook: string;
    artist_twitter: string;
    artist_spotify: string;
  };
  concert_date: string;
  concert_description: string;
  concert_image: string;
  concert_name: string;
  concert_start: string;
  concert_genre: {
    genre_id: string;
    genre_name: string;
  };
  concert_venue: {
    venue_id: string;
    venue_name: string;
    venue_address: string;
    venue_location: string;
  };
  concert_doors: string;
  isVisible: boolean;
}

const ConcertCard: React.FC = () => {
  const [concerts, setConcerts] = useState<ConcertCard[]>([]);


  // ----- Fetch data with useEffect since it is a client site
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: ConcertCard[] }>("/api/data/concertData");
        // Filter out concerts with isVisible = false
        setConcerts(response.data.data.filter(concert => concert.isVisible !== false));
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchData();
  }, []);

  // ----- Slice the venues array to display only the venues for the current page
  const concertsToDisplay = concerts.slice(-9).reverse();

  return (
    <>
      {concertsToDisplay?.map((concert) => (
        <article className="flex-shrink-0 md:pt-4 pb-8 w-[300px]" key={concert.concert_id}>
          <Link href={"/concerts/" + concert.concert_id} key={concert.concert_id}>

            <Image
              src={`https://storage.googleapis.com/concertify/${concert.concert_image}`}
              width={200}
              height={200}
              alt="concert"
              className="rounded-lg object-cover w-full h-[300px]"
            />
          </Link>

          <h4 className="text-black text-xl font-bold dark:text-white pt-2">
            {concert.concert_artist
              ? concert.concert_artist.artist_name
              : "Unknown Artist"}{" "}
            -{" "}
            {concert.concert_name
              ? concert.concert_name
              : "Unknown concert_name"}
          </h4>

          <p className="text-black text-sm dark:text-gray-400 pt-2">
            <span>
              {concert.concert_venue?.venue_name},{" "}
            </span>
            {concert.concert_date}
          </p>
        </article>
      ))}
    </>
  );
};

export default ConcertCard;
