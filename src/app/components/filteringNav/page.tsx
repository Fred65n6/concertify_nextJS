"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

const locations = [
  { id: 1, name: "DR Koncerthus" },
  { id: 2, name: "Royal Arena" },
  { id: 3, name: "Vega" },
  { id: 4, name: "Culture Box" },
  { id: 5, name: "Den Grå Hal" },
  { id: 6, name: "Rust" },
];

const FilteringNav = () => {
  const [selected, setSelected] = useState(locations[0]);
  const [query, setQuery] = useState("");

  const filteredLocation =
    query === ""
      ? locations
      : locations.filter((location) =>
          location.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

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
              {/* onChange: gør at det valgte spillested bliver vist */}
              {/* <Combobox value={selected} onChange={setSelected}>  */}
              <Combobox onChange={setSelected}>
                <div className="relative mt-1">
                  <Combobox.Button>
                    {/* KAN IKKE FÅ DENNE HER PLACEHOLDER TIL AT VIRKE EFTER SIDEN ER LOADED */}
                    <Combobox.Input
                      className=" py-2 pl-3 pr-10 font-light cursor-pointer focus:bg-purple-50 hover:bg-purple-50 rounded-full focus:outline-none"
                      placeholder="Search by venue"
                      displayValue={(locations) => locations.name}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </Combobox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredLocation.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredLocation.map((location) => (
                          <Combobox.Option
                            key={location.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-purple-100 hover:bg-purple-200"
                                  : "text-black"
                              }`
                            }
                            value={location}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {location.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  ></span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
                <img src="../pricetag.svg" className="pr-2" />
                <p className="font-medium">Price</p>
              </div>
              <p className="font-thin">$ - $$$$</p>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
                <img src="../calender.svg" className="pr-2" />
                <p className="font-medium">Date</p>
              </div>
              <p className="font-thin">Search by date</p>
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
                <img src="../microphone.svg" className="pr-2" />
                <p className="font-medium">Artist</p>
              </div>
              <p className="font-thin">Search by artist</p>
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
};

export default FilteringNav;
