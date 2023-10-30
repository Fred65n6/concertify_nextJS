"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SlHeart } from "react-icons/sl";
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
  // Add other properties from your Venue model
}
const FavouriteList: React.FC = () => {
  const [favourites, setArtists] = useState<Favourite[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/favouriteData"); // Replace with your actual API endpoint
        setArtists(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BreadcrumbComp
        homeElement={"Home"}
        separator={<span> | </span>}
        activeClasses="brand_purple_breadcrumb"
        containerClasses="flex py-5 brand_purple opacity-70"
        listClasses="hover:underline mx-2 font-bold brand_purple opacity-70"
        capitalizeLinks
      />
      <div>
        <h1 className="font-bold text-4xl pb-4 pt-8">Favourites</h1>
        <ul className="flex gap-8">
          {favourites.map((favourite) => (
            <article className="w-auto" key={favourite._id}>
              {/* <Link href={"/concerts/" + favourite._id} key={favourite._id}> */}
              <Image
                src={"/" + favourite.favourite_concert_image}
                width={200}
                height={200}
                alt="favourite"
                className="rounded-lg object-cover w-full h-[200px]"
              />
              {/* </Link> */}
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
                <button
                  className="flex items-center place-content-center rounded-full bg-purple-100 brand_purple w-10 h-10  hover:bg-purple-200"
                  type="submit"
                  value="upload"
                >
                  <SlHeart
                    className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                    id="favourites"
                  />
                </button>
              </div>
              {/* <p className="text-gray-600 text-sm dark:text-gray-400">
                <span className="font-bold mr-1">
                  {favourite.favourite_concert_venue}
                </span>
                {favourite.favourite_concert_date}
              </p> */}
            </article>

            // Add other properties from your Venue model as needed
          ))}
        </ul>
      </div>
    </>
  );
};

export default FavouriteList;
