"use client";
import VenueSchedule from "@/app/components/venueSchedule/page";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Venue {
  _id: string;
  venue_name: string;
  venue_address: string;
  // Add other properties from your Venue model
}

const VenueSingleview: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/venueData"); // Replace with your actual API endpoint
        setVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Venues</h1>
      <ul className="flex gap-8">
        {venues.map((venue) => (
          <li className="grid gap-2" key={venue._id}>
            <div className="">{venue.venue_name}</div>
            <div className="">{venue.venue_address}</div>
          </li>

          // Add other properties from your Venue model as needed
        ))}
      </ul>
    </div>
  );
};

export default VenueSingleview;
