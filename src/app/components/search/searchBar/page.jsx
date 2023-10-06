"use client";
import {useState} from "react";
import {FaSearch} from "react-icons/fa";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        const apiUrl = "/api/data/artistData";

        fetch(apiUrl)
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
        <div className="bg-slate-100 p-2 rounded-full m-4">
            <div className="flex gap-2 items-center mx-2">
                <FaSearch className="fill-slate-400" id="search-icon" />
                <input
                    type="text"
                    className="bg-slate-100 outline-none dark:text-black"
                    placeholder="Type to search..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
        </div>
    );
};
