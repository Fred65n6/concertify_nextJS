import {SearchResult} from "../searchResults/page";

export const SearchResultsList = ({results}) => {
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return <SearchResult result={result.artist_name} key={id} />;
            })}
        </div>
    );
};
