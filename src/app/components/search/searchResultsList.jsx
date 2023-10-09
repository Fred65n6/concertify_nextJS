import {SearchResult} from "@/app/components/search/searchResults";

export const SearchResultsList = ({results}) => {
    return (
        <div className="absolute pl-4 w-72">
            {results.map((result, id) => {
                return <SearchResult result={result.artist_name} key={id} />;
            })}
        </div>
    );
};
