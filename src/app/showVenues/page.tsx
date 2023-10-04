"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface Venue {
    _id: string;
    venue_name: string;
    venue_address: string;
    // Add other properties from your Venue model
}

const VenueList: React.FC = () => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const venuesPerPage = 4; // Number of venues to show per page

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

    // Calculate the start and end indexes of venues to display on the current page
    const startIndex = (currentPage - 1) * venuesPerPage;
    const endIndex = startIndex + venuesPerPage;

    // Slice the venues array to display only the venues for the current page
    const venuesToDisplay = venues.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <ul className="flex gap-8">
                {venuesToDisplay.map((venue) => (
                    <li className="grid gap-2" key={venue._id}>
                        <div className="">{venue.venue_name}</div>
                        <div className="">{venue.venue_address}</div>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {/* Generate pagination links based on the number of venues */}
                {Array.from({
                    length: Math.ceil(venues.length / venuesPerPage),
                }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`bg-black text-white pagination-button ${
                            currentPage === index + 1 ? "active" : ""
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VenueList;
