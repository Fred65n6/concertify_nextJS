"use client";
import React, {useState, ChangeEvent} from "react";
import {FaSearch} from "react-icons/fa";

interface SearchBarProps {
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({setResults}) => {
    const [input, setInput] = useState<string>("");

    const fetchData = (value: string) => {
        fetch("/api/data/artistData")
            .then((response) => response.json())
            .then((json) => {
                const results = json.data.filter((artist: any) =>
                    artist?.artist_name?.toLowerCase().includes(value)
                );
                setResults(results);
                console.log(results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleChange = (value: string) => {
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e.target.value)
                    }
                />
            </div>
        </div>
    );
};

export default SearchBar; // Provide a default export here
