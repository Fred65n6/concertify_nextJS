import React from "react";
import SearchResults from "../searchResults/page";

interface SearchResultsProps {
    results: {artist_name: string}[]; // An array of objects with a 'name' property
}

const SearchResultsList: React.FC<SearchResultsProps> = ({results}) => {
    // Your component logic here
    return (
        <div className="absolute top-[45px]">
            <div className=" p-4  max-h-48 overflow-y-scroll">
                {results.map((result, id) => {
                    return <SearchResults result={result} key={id} />;
                })}
            </div>
        </div>
    );
};

export default SearchResultsList;
