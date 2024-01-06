"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "../../../../node_modules/next/link";
import VenueCard from "@/app/components/venueCard/page";
import LoginPage from "@/app/login/page";
import SignupPage from "@/app/signup/page";
import BreadcrumbComp from "@/app/components/breadCrumbs/page";
import {SlLocationPin, SlCalender, SlUserFollowing, SlArrowRight} from "react-icons/sl";

interface VenueSingle {
  _id: string;
  venue_name: string;
  venue_address: string;
  venue_size: string;
  venue_location: string;
  venue_description: string;
  venue_image: string;
}

export default function SingleVenue() {
  const params = useParams();
  const id = params.id;
  const [venues, setVenues] = useState<VenueSingle[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<VenueSingle | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/venueData");
        setVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchData();
  }, []);

  // Use a useEffect to update the selectedVenue when the 'id' or 'venues' array changes
  useEffect(() => {
    if (id && venues.length > 0) {
      const matchingVenue = venues.find((venue) => venue._id === id);
      setSelectedVenue(matchingVenue || null);
    } else {
      setSelectedVenue(null);
    }
  }, [id, venues]);

  return (
    <div className="py-8">
      <LoginPage />
      <SignupPage />
      <BreadcrumbComp />
      {selectedVenue ? (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 pb-12 w-full">
          <figure>
            <Image
              src={`https://storage.googleapis.com/concertify/${selectedVenue.venue_image}`}
              width={200}
              height={200}
              alt="concert"
              className="h-full object-cover w-full rounded-lg"
            />
          </figure>

          <section className="venue_information">
          <h1 className="text-3xl font-bold p-2">{selectedVenue.venue_name}</h1>
            <ul className="flex flex-col gap-4 pt-4">
              {/* Location */}
              <li className="flex gap-2">
                <SlLocationPin
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                  id="favourites"
                />
                <p className="text-gray-600 text-sm dark:text-gray-200 align-middle">
                  {selectedVenue.venue_address}, {selectedVenue.venue_location}
                </p>
              </li>
              {/* Venue Size */}
              <li className="flex gap-2">
                <SlUserFollowing
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                  id="venue_size"
                />
                <p className="text-gray-600 text-sm dark:text-gray-200 align-middle">
                  {selectedVenue.venue_size} people
                </p>
              </li>
              {/* Todays program */}
              {/* <li className="flex gap-2">
                <SlCalender
                  className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                  id="date"
                />
                <p className="text-gray-600 text-sm dark:text-gray-200 align-middle">
                  What is on today?
                </p>
                <hr />
              </li> */}
            </ul>
            <div className="pt-4 mt-4">
              <p className="text-gray-600 text-sm dark:text-gray-300 align-middle">
                {selectedVenue.venue_description}
              </p>
            </div>
          </section>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Event schedule section */}
      {/* {selectedVenue ? (
        <section className="pb-12">
          <h2 className="text-2xl font-bold">
            Event Schedule at <span className="brand_purple dark:text-purple-500">{selectedVenue.venue_name}</span>
          </h2>
          <div></div>
        </section>
      ) : (
        <p>Loading...</p>
      )} */}
      
      {/* Other venues section */}
      <section className="pb-36 md:pt-8 pt-12 overflow-hidden">
        <h2 className="font-bold text-2xl">
            <span className="text-[#5311BF] dark:text-purple-500">Venues</span> you need to experience
        </h2>
        <div className="flex gap-4  md:gap-4 overflow-x-scroll no-scrollbar md:height-[300px]">
            <VenueCard />
        </div>
        <Link
            className="justify-end flex items-center brand_purple dark:text-purple-500"
            href="/venues"
        >
            View all venues
            <SlArrowRight
            className="fill-gray-600 dark:gray-600 w-4 h-4 pt-1"
            id="arrow_right"
            />

        </Link>
    </section>
    </div>
  );
}
