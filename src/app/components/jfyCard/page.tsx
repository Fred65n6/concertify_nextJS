"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

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

const JfyCard: React.FC = () => {
    const [concerts, setConcerts] = useState<ConcertCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [userGenres, setUserGenres] = useState<string[]>([]);
    const [userVenues, setUserVenues] = useState<string[]>([])
  
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/cookieUser");
        const userData = res.data.data;
  
        // Extract genre_names from the user's genres array
        const genres = userData.genres.map((genre:any) => genre.genre_name);
        const venues = userData.genres.map((venue:any) => venue.venue_name);

        setUserGenres(genres);
        setUserVenues(venues)
  
        setLoading(false); // Set loading to false after successful data retrieval
      } catch (error: any) {
        console.error(error.message);
        setLoading(false); // Set loading to false on error
      }
    };
  
    // ----- Fetch data with useEffect since it is a client site
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ data: ConcertCard[] }>("/api/data/concertData");
                setConcerts(response.data.data.filter(concert => concert.isVisible !== false && userGenres.includes(concert.concert_genre.genre_name) || userVenues.includes(concert.concert_venue.venue_name)));
            } catch (error) {
                console.error("Error fetching concerts:", error);
            }
        };
  
      fetchData();
      getUserDetails();
    }, [userGenres, userVenues]);
  
    const concertsToDisplay = concerts.slice().reverse();

  return (
    <>
      {concertsToDisplay?.map((concert) => (
        <article className="flex-shrink-0 grid md:pt-8 pb-8" key={concert.concert_id}>
          <Link href={"/concerts/" + concert.concert_id} key={concert.concert_id}>

            <Image
              src={`https://concertify.s3.eu-central-1.amazonaws.com/${concert.concert_image}`}
              width={200}
              height={200}
              alt="concert"
              className="rounded-lg object-cover w-full h-[200px]"
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

export default JfyCard;