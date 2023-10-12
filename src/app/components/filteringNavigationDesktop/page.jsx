"use client";
import React from "react";
import { useState } from "react";
import { NavSearchBar } from "./navSearch";
import { NavSearchResultsList } from "./navResultsList";

function FilteringNavDesktop() {
  const [results, setResults] = useState([]);

  return (
    <>
      <div className="border-2 border-purple-600 rounded-full py-6 px-8 grid grid-col-5 ">
        <div className="flex justify-between">
          <div>
            <div>
              <div className="flex pb-1">
                <img src="../Location.svg" className="pr-2" />
                <p className="font-medium">Location</p>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
                <img src="../pricetag.svg" className="pr-2" />
                <p className="font-medium">Price</p>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
                <img src="../calendar.svg" className="pr-2" />
                <p className="font-medium">Date</p>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
                <img src="../artist.svg" className="pr-2" />
                <p className="font-medium">Artist</p>
              </div>
              <div className="App">
                <div className="search-bar-container">
                  <NavSearchBar setResults={setResults} />
                  {results && results.length > 0 && (
                    <NavSearchResultsList results={results} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="rounded-full w-32 brand_gradient text-white hover:bg-purple-200 "
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default FilteringNavDesktop;
