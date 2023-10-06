"use client";
import {useState} from "react";

import {SearchBar} from "./searchBar/page";
import {SearchResultsList} from "./searchResultsList/page";

function Search() {
    const [results, setResults] = useState([]);

    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBar setResults={setResults} />
                {results && results.length > 0 && (
                    <SearchResultsList results={results} />
                )}
            </div>
        </div>
    );
}

export default Search;
