"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface Concert {
  _id: string;
  concert_name: string;
  concert_venue_fk: string;
  concert_image: string;
}

const ConcertList: React.FC = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/concertData");
        setConcerts(response.data.data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-bold text-4xl pb-4">All concerts</h1>
      <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
        {/* <ConcertCard/> */}
        {concerts.map((concert) => (
          <article className="w-auto" key={concert._id}>
            <Link href={"/concerts/" + concert._id} key={concert._id}>
              <Image
                src={"/concert_images/" + concert.concert_image}
                width={200}
                height={200}
                alt="concert"
                className="rounded-lg w-[300px] h-[200px] object-cover"
              />
            </Link>

            <h4 className="text-black text-xl font-bold dark:text-white">
              {concert.concert_name}
            </h4>
            {/* <p className="text-gray-600 text-sm dark:text-gray-400">
                            {concert.concert_venue_fk}
                        </p> */}
          </article>
        ))}
      </div>
    </>
  );
};

export default ConcertList;
