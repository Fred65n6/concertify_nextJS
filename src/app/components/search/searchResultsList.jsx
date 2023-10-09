import {SearchResult} from "@/app/components/search/searchResults";

export const SearchResultsList = ({results}) => {
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return <SearchResult result={result.artist_name} key={id} />;
            })}
        </div>
    );
};
