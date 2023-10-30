"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { SlHeart } from "react-icons/sl";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbComp from "../components/breadCrumbs/page";

interface Favourite {
  _id: string;
  favourite_user_id: string;
  favourite_concert_id: string;
  favourite_concert_image: string;
  favourite_concert_name: string;
  favourite_concert_date: string;
  favourite_concert_artist: string;
  favourite_concert_venue: string;
  // Add other properties from your Venue model
}
const FavouriteList: React.FC = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  const [userData, setUserData] = useState<string | null>(null);
  const [favouriteUserId, setFavouriteUserId] = useState("");
  const [data, setData] = useState("Loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/favouriteData"); // Replace with your actual API endpoint
        setFavourites(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchData();
  }, []);

  // Get User Cookie
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/cookieUser");
    console.log(res.data);
    setUserData(res.data.data._id);
  };

  useEffect(() => {
    // Fetch user details when the component mounts
    getUserDetails();
  }, []);

  const userFavorites = favourites.filter(
    (favourite) => favourite.favourite_user_id === userData
  );

  return (
    <>
      <BreadcrumbComp />
      <div>
        <h1 className="font-bold text-4xl pb-4 pt-8">Favourites</h1>
        <ul className="grid md:grid-cols-4 gap-8">
          {userFavorites.map((favourite) => (
            <article className="w-auto" key={favourite._id}>
              <Link href={"/concerts/" + favourite.favourite_concert_id}>
                <Image
                  src={`https://concertify.s3.eu-central-1.amazonaws.com/${favourite.favourite_concert_image}`}
                  width={200}
                  height={200}
                  alt="favourite"
                  className="rounded-lg object-cover w-full h-[200px]"
                />
              </Link>
              <div className="flex justify-between items-center pt-2">
                <h4 className="text-black text-xl font-bold dark:text-white">
                  {favourite.favourite_concert_artist
                    ? favourite.favourite_concert_artist
                    : "Unknown Artist"}{" "}
                  -{" "}
                  {favourite.favourite_concert_name
                    ? favourite.favourite_concert_name
                    : "Unknown concert_name"}
                </h4>
              </div>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                <span className="font-bold mr-1">
                  {favourite.favourite_concert_venue}:
                </span>
                {favourite.favourite_concert_date}
              </p>
            </article>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FavouriteList;
