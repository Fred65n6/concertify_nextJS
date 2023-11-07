"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface Genre {
    _id: string;
    genre_name: string;
}

const ShowGenres: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/data/genreData");
                setGenres(response.data.data);
                console.log(response);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchData();
    }, []);

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGenre = event.target.value;
        setSelectedGenres([...selectedGenres, selectedGenre]);
        setSelectedGenre(""); // Clear the selectedGenre
    };

    return (
        <div>
            <label htmlFor="genreSelect">Select genres: </label>
            <select
                className="p-4"
                id="genreSelect"
                onChange={handleGenreChange}
                value={selectedGenre}
            >
                <option value="">Select a Genre</option>
                {genres.map((genre) => (
                    <option key={genre._id} value={genre.genre_name}>
                        {genre.genre_name}
                    </option>
                ))}
            </select>

            <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8 pb-40 pt-10">
                {selectedGenres.map((genre, index) => (
                    <input
                        className="brand_gradient text-white py-2 px-2 text-center rounded-full"
                        type="text"
                        value={genre}
                        key={index}
                        readOnly // Prevents user from editing the input
                    />
                ))}
            </div>
        </div>
    );
};

export default ShowGenres;
