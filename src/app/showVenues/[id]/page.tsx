"use client";

import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import axios from "axios";

interface Venue {
    _id: string;
    venue_name: string;
    venue_address: string;
    // Add other properties from your Venue model
}

export default function SingleVenue() {
    const params = useParams();
    const id = params.id;
    const [venues, setVenues] = useState<Venue[]>([]);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

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
        <div style={{padding: 40}}>
            {selectedVenue ? (
                <div>
                    <h2 className="text-4xl font-bold my-2">
                        Venue name: {selectedVenue.venue_name}
                    </h2>
                    <hr />
                    <p className="text-xl my-2">
                        Venue address: {selectedVenue.venue_address}
                    </p>
                    {/* Add more venue details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
