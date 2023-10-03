import React from "react";
import SearchResults from "../searchResults/page";

interface SearchResultsProps {
    results: {username: string}[]; // An array of objects with a 'name' property
}

const SearchResultsList: React.FC<SearchResultsProps> = ({results}) => {
    // Your component logic here
    return (
        <div className="absolute top-[10%]">
            <div className=" p-4 rounded-md max-h-24 overflow-y-scroll">
                {results.map((result, id) => {
                    return <SearchResults result={result} key={id} />;
                })}
            </div>
        </div>
    );
};

export default SearchResultsList;
