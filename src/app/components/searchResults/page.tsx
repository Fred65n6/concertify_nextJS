import React from "react";

interface SearchResultsProps {
    result: {username: string}; // Define the type of 'result'
}

const SearchResults: React.FC<SearchResultsProps> = ({result}) => {
    return (
        <div className="bg-slate-100 pr-32 hover:bg-slate-200 p-4">
            {result.username}
        </div>
    );
};

export default SearchResults;
