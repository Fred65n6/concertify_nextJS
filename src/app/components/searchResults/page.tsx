import React from "react";

interface SearchResultsProps {
    result: {artist_name: string}; // Define the type of 'result'
}

const SearchResults: React.FC<SearchResultsProps> = ({result}) => {
    return (
        <div className="bg-slate-100 pr-40 pl-6 hover:bg-slate-200 p-4 dark:text-black">
            {result.artist_name}
        </div>
    );
};

export default SearchResults;
