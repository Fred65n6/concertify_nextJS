"use client";

import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import axios from "axios";

interface Concert {
    _id: string;
    concert_name: string;
}

export default function SingleConcert() {
    const params = useParams();
    const id = params.id;
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

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

 // Use a useEffect to update the selectedConcert when the 'id' or 'concerts' array changes
 useEffect(() => {
    if (id && concerts.length > 0) {
        const matchingConcert = concerts.find((concert) => concert._id === id);
        setSelectedConcert(matchingConcert || null);
    } else {
        setSelectedConcert(null);
    }
}, [id, concerts]);

return (
    <div style={{padding: 40}}>
        {selectedConcert ? (
            <div>
                <h2 className="text-4xl font-bold my-2">
                    Concert name: {selectedConcert.concert_name}
                </h2>
                {/* Add more concert details as needed */}
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    )
};
