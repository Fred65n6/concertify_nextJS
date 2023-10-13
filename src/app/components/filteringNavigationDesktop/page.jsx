"use client";
import React from "react";
import { useState } from "react";
import { NavSearchBar } from "./navSearch";
import { NavSearchResultsList } from "./navResultsList";
import {LiaDollarSignSolid} from from "react-icons/lia";
import {SlLocationPin, SlCalender, SlStar} from from "react-icons/sl";


function FilteringNavDesktop() {
  const [results, setResults] = useState([]);

  return (
    <>
      <div className="border-2 border-purple-600 rounded-full py-6 px-8 grid grid-col-5 ">
        <div className="flex justify-between">
          <div>
            <div>
              <div className="flex pb-1">
                  <SlLocationPin className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5" id="location" />
                <p className="font-medium">Location</p>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
               <LiaDollarSignSolid className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5" id="date" />
                <p className="font-medium">Price</p>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
                <SlCalender className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5" id="date" />
                <p className="font-medium">Date</p>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
              <SlStar className="fill-[#5311BF] dark:fill-[#8e0bf5] w-5 h-5" id="artist" />
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
