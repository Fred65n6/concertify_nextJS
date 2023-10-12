"use client";
import React, { useState, ChangeEvent } from "react";

interface SearchInputProps {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

export const NavSearchBar: React.FC<SearchInputProps> = ({ setResults }) => {
  const [input, setInput] = useState<string>("");

  const fetchData = (value: string) => {
    const apiUrlArtists = "/api/data/artistData";

    fetch(apiUrlArtists)
      .then((response) => response.json())
      .then((json) => {
        const results = json.data.filter((artist: any) => {
          return (
            value &&
            artist &&
            artist.artist_name &&
            artist.artist_name.toLowerCase().includes(value)
          );
        });
        setResults(results);
        console.log(results);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="rounded-full py-4 w-72">
      <div className="flex gap-2 items-center mx-2">
        <input
          type="text"
          className="outline-none dark:text-black"
          placeholder="Search by artist"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target.value)
          }
        />
      </div>
    </div>
  );
};
