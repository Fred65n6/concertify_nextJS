"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";

interface FilterComponentProps {
    data: any[]; // Replace 'any' with your specific data type
    onDataFiltered: (filteredData: any[]) => void; // Callback function to pass filtered data
}

const FilterComponent: React.FC<FilterComponentProps> = ({
    data,
    onDataFiltered,
}) => {
    const [artistFilter, setArtistFilter] = useState<string>("");
    const [venueFilter, setVenueFilter] = useState<string>("");
    const [filteredData, setFilteredData] = useState<any[]>(data); // Initialize with the original data
    const [venues, setVenues] = useState<string[]>([]); // State for venue names

    // Fetch venues from the API
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get("/api/data/venueData"); // Replace with your actual API endpoint
                const venueData = response.data.data;
                const venueNames = venueData.map(
                    (venue: any) => venue.venue_name
                );
                setVenues(venueNames);
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        };

        fetchVenues();
    }, []);

    useEffect(() => {
        // Filter data based on artist and venue filters
        const filteredData = data.filter((item) => {
            const artistName = item.concert_artist.artist_name.toLowerCase();
            const venueName = item.concert_venue.venue_name.toLowerCase();

            return (
                artistName.includes(artistFilter.toLowerCase()) &&
                venueName.includes(venueFilter.toLowerCase())
            );
        });

        // Update the filtered data and call the callback
        setFilteredData(filteredData);
        onDataFiltered(filteredData);
    }, [artistFilter, venueFilter, data, onDataFiltered]);

    return (
        <div className="py-8 flex gap-8">
            {/* Input fields for filtering by artist name and venue name */}
            <input
                type="text"
                placeholder="Filter by artist name"
                value={artistFilter}
                onChange={(e) => setArtistFilter(e.target.value)}
            />

            <select
                value={venueFilter}
                onChange={(e) => setVenueFilter(e.target.value)}
            >
                <option value="">All Venues</option>
                {venues.map((venue) => (
                    <option key={venue} value={venue}>
                        {venue}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterComponent;
