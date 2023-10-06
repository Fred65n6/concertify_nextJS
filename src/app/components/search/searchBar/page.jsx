"use client";
import {useState} from "react";
import {FaSearch} from "react-icons/fa";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("/api/data/artistData")
            .then((response) => response.json())
            .then((json) => {
                const results = json.data.filter((artist) =>
                    artist?.artist_name?.toLowerCase().includes(value)
                );
                setResults(results);
                console.log(results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};
