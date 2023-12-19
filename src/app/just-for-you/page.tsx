"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Filter from "../components/filter/page";
import BreadcrumbComp from "../components/breadCrumbs/page";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";

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

const JFYLoopview: React.FC = () => {
    const [concerts, setConcerts] = useState<ConcertCard[]>([]);
    const [filteredConcerts, setFilteredConcerts] = useState<ConcertCard[]>([]);
    const [userGenres, setUserGenres] = useState<string[]>([]);
    const [userVenues, setUserVenues] = useState<string[]>([])

    const getUserDetails = async () => {
        try {
          const res = await axios.get("/api/users/cookieUser");
          const userData = res.data.data;
    
          // Extract genre_names from the user's genres array
          const genres = userData.genres.map((genre:any) => genre.genre_name);
          const venues = userData.venues.map((venue:any) => venue.venue_name);
  
          setUserGenres(genres);
          setUserVenues(venues);

          console.log(venues)

        } catch (error: any) {
          console.error(error.message);
        }
      };

    useEffect(() => {
        fetchData();
        getUserDetails();
    }, [userGenres, userVenues]);

    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: ConcertCard[] }>("/api/data/concertData");
            const filteredConcerts = response.data.data.filter(
                (concert) =>
                  userVenues.includes(concert.concert_venue.venue_name) 
                  && concert.isVisible !== false || 
                  userGenres.includes(concert.concert_genre.genre_name) 
                  && concert.isVisible !== false 
              ).reverse();
              setConcerts(filteredConcerts);
        } catch (error) {
            console.error("Error fetching concerts:", error);
        }
    };


    const handleDataFiltered = (filteredData: ConcertCard[]) => {
        setFilteredConcerts(filteredData);
    };

    return (
        <>
            <LoginPage />
            <SignupPage />
            <BreadcrumbComp />
            <Filter data={concerts} onDataFiltered={handleDataFiltered} />
            <h1 className="font-bold text-4xl pb-4 pt-8">Concerts just for you:</h1>
            <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8 pb-20">
                {filteredConcerts.map((concert) => (
                    <article className="w-auto" key={concert.concert_id}>
                        <Link
                            href={"/concerts/" + concert.concert_id}
                            key={concert.concert_id}
                        >
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
                        <div className="flex gap-2">
                            <p className="font-bold text-gray-600 text-sm dark:text-gray-400">
                            {concert.concert_venue?.venue_name},
                            </p>
                            <p className="text-gray-600 text-sm dark:text-gray-400">
                                <span className="mr-2 ">
                                    {concert.concert_date} 
                                </span>
                            </p>
                           
                        </div>
                        <div className="">
                        <p className="opacity-50 dark:text-slate-400">
                            {concert.concert_genre?.genre_name}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
};

export default JFYLoopview;
