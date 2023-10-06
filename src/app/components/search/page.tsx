"use client";
import React, {useState} from "react";
import SearchResults from "./searchResults/page";
import SearchResultsList from "./searchResultsList/page";
import {SearchBar} from "./searchBar/page";

const Search = () => {
    const [results, setResults] = useState([]); // Provide an initial empty array of type 'any[]'

    return (
        <div className="grid">
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
        </div>
    );
};

export default Search;
