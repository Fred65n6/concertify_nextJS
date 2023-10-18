"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";

const Filter = ({data, onDataFiltered}) => {
    const [dateFilter, setDateFilter] = useState("");
    const [artistFilter, setArtistFilter] = useState("");
    const [venueFilter, setVenueFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [venues, setVenues] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get("/api/data/venueData");
                const venueData = response.data.data;
                const venueNames = venueData.map((venue) => venue.venue_name);
                setVenues(venueNames);
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        };

        fetchVenues();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get("/api/data/genreData");
                const genreData = response.data.data;
                const genreNames = genreData.map((genre) => genre.genre_name);
                setGenres(genreNames);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const newFilteredData = data.filter((item) => {
            const artistName = item.concert_artist.artist_name.toLowerCase();
            const venueName = item.concert_venue.venue_name.toLowerCase();
            const genreName = item.concert_genre.genre_name.toLowerCase();
            const concertDate = new Date(item.concert_date)
                .toISOString()
                .substr(0, 10)
                .toLowerCase();

            return (
                artistName.includes(artistFilter.toLowerCase()) &&
                venueName.includes(venueFilter.toLowerCase()) &&
                genreName.includes(genreFilter.toLowerCase()) &&
                concertDate.includes(dateFilter.toLowerCase())
            );
        });

        if (JSON.stringify(newFilteredData) !== JSON.stringify(filteredData)) {
            setFilteredData(newFilteredData);
            onDataFiltered(newFilteredData);
        }
    }, [
        artistFilter,
        venueFilter,
        dateFilter,
        genreFilter,
        data,
        onDataFiltered,
    ]);

    return (
        <div className="border-[1px] rounded-full my-8 border-solid border-purple-800 flex py-6 px-12 justify-between">
            <div className="">
                <label
                    className="text-lg font-bold flex gap-2 mb-4 items-center"
                    htmlFor="venue"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        {/* Venue SVG Path */}
                    </svg>
                    Search venues
                </label>
                <select
                    name="venue"
                    value={venueFilter}
                    onChange={(e) => setVenueFilter(e.target.value)}
                >
                    <option className="border-none t-2" value="">
                        All Venues
                    </option>
                    {venues.map((venue) => (
                        <option
                            className="border-none"
                            key={venue}
                            value={venue}
                        >
                            {venue}
                        </option>
                    ))}
                </select>
            </div>

            <div className="">
                <label
                    className="text-lg font-bold flex gap-2 mb-4 items-center"
                    htmlFor="date"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        {/* Date SVG Path */}
                    </svg>
                    Search by date
                </label>
                <input
                    name="date"
                    type="date"
                    placeholder="Filter by date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
            </div>

            <div className="">
                <label
                    className="text-lg font-bold flex gap-2 mb-4 items-center"
                    htmlFor="genre"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        {/* Genre SVG Path */}
                    </svg>
                    Search by genre
                </label>
                <select
                    name="genre"
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="">
                <label
                    className="text-lg font-bold flex gap-2 mb-2 mt-2 items-center"
                    htmlFor="artist"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        {/* Artist SVG Path */}
                    </svg>
                    Search for artists
                </label>

                <input
                    name="artist"
                    type="text"
                    className="border-none"
                    placeholder="search by artist name"
                    value={artistFilter}
                    onChange={(e) => setArtistFilter(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Filter;
