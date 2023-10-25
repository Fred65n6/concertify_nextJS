"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";

const Filter: React.FC<any> = ({data, onDataFiltered}) => {
    const [dateFilter, setDateFilter] = useState<string>("");
    const [artistFilter, setArtistFilter] = useState<string>("");
    const [venueFilter, setVenueFilter] = useState<string>("");
    const [genreFilter, setGenreFilter] = useState<string>("");
    const [filteredData, setFilteredData] = useState<any[]>(data); // Initialize with the original data
    const [venues, setVenues] = useState<string[]>([]); // State for venue names
    const [genres, setGenres] = useState<string[]>([]); // State for venue names

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

    // Fetch genres from the API
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get("/api/data/genreData"); // Replace with your actual API endpoint
                const genreData = response.data.data;
                const genreNames = genreData.map(
                    (genre: any) => genre.genre_name
                );
                setGenres(genreNames);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        // Filter data based on artist, venue, and date filters
        const newFilteredData = data.filter((item: any) => {
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

        // Update the filtered data and call the callback if it's different
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
                        <path
                            fill="currentColor"
                            d="M12 12q.825 0 1.413-.588T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .825.588 1.413T12 12Zm0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.5-1.988 5.438T12 22Z"
                        />
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
                        <path
                            fill="currentColor"
                            d="M12 14q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm-4 0q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm8 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14Zm-4 4q-.425 0-.713-.288T11 17q0-.425.288-.713T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18Zm-4 0q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18Zm8 0q-.425 0-.713-.288T15 17q0-.425.288-.713T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10Z"
                        />
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
                        <path
                            fill="currentColor"
                            d="m12 18.275l-4.15 2.5q-.275.175-.575.15t-.525-.2q-.225-.175-.35-.438t-.05-.587l1.1-4.725L3.775 11.8q-.25-.225-.312-.513t.037-.562q.1-.275.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15q.275 0 .537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45q.1.275.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437q-.225.175-.525.2t-.575-.15l-4.15-2.5Z"
                        />
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
                        <path
                            fill="currentColor"
                            d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm0 7q-.425 0-.713-.288T11 20v-2.1q-2.325-.3-3.95-1.925t-1.975-3.9q-.075-.425.225-.75T6.1 11q.35 0 .625.262t.35.638q.325 1.75 1.7 2.925T12 16q1.85 0 3.225-1.175t1.7-2.925q.075-.375.362-.638t.638-.262q.475 0 .775.325t.225.75q-.35 2.275-1.975 3.9T13 17.9V20q0 .425-.288.713T12 21Z"
                        />
                    </svg>
                    Search for artists
                </label>

                <input
                    name="artist"
                    type="text"
                    className=""
                    placeholder="search by artist name"
                    value={artistFilter}
                    onChange={(e) => setArtistFilter(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Filter;
