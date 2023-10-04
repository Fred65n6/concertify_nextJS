"use client";
import React, {useState} from "react";
import ThemeSwitcher from "../switchTheme/page";
import SearchInput from "../searchBar/page";
import SearchResultsList from "../searchResultsList/page";

const TopNav = () => {
    const [results, setResults] = useState([]);

    return (
        <>
            <div className="w-full m-0 px-8 flex justify-end items-center">
                <div className="grid">
                    <SearchInput setResults={setResults} />
                    <SearchResultsList results={results} />
                </div>

                <ThemeSwitcher />
            </div>
        </>
    );
};

export default TopNav;
