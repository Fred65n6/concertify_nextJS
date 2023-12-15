import { useState } from "react";
import { SearchResult } from "@/app/components/search/searchResults";
import Link from "next/link";

export const SearchResultsList = ({ results}) => {
  // const handleLinkClick = () => {
  //   window.location.reload()
  // };

  return (
    <div className="absolute p-4 h-52 overflow-scroll">
      {results.map((result, id) => (
       <Link key={result.concert_id} href={"/concerts/" + result.concert_id}>
       <SearchResult
         result={`${result.concert_name} - ${result.concert_artist.artist_name} - ${result.concert_venue.venue_name}`}
         key={id}
       />
     </Link>
      ))}
    </div>
  );
};