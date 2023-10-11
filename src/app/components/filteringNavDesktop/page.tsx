"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { Menu } from "@headlessui/react";

function FilteringNavDesktop() {
  const locations = [
    { id: 1, name: "DR Koncerthus" },
    { id: 2, name: "Royal Arena" },
    { id: 3, name: "Vega" },
    { id: 4, name: "Culture Box" },
    { id: 5, name: "Den Grå Hal" },
    { id: 6, name: "Rust" },
  ];

  const prices = [
    { id: 1, price: "100 DKK - 200 DKK" },
    { id: 2, price: "200 DKK - 300 DKK" },
    { id: 3, price: "300 DKK - 400 DKK" },
    { id: 4, price: "400 DKK - 500 DKK" },
    { id: 5, price: "500 DKK - 600 DKK" },
    { id: 6, price: "600 DKK - 700 DKK" },
  ];

  const artists = [
    { id: 1, name: "Beyonce" },
    { id: 2, name: "Taylor Swift" },
    { id: 3, name: "Minds of 99" },
    { id: 4, name: "Celine Dion" },
  ];

  const [value, onChange] = useState(new Date());
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

  const filteredPrice =
    query === ""
      ? prices
      : prices.filter((price) =>
          price.price
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredArtist =
    query === ""
      ? artists
      : artists.filter((artist) =>
          artist.name
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
              <Combobox onChange={setSelected}>
                <div className="relative mt-1">
                  <Combobox.Button>
                    {/* KAN IKKE FÅ DENNE HER PLACEHOLDER TIL AT VIRKE EFTER SIDEN ER LOADED */}
                    <Combobox.Input
                      className=" py-2 pl-3 pr-10 font-light cursor-pointer focus:bg-purple-50 hover:bg-purple-50 rounded-full focus:outline-none"
                      placeholder="$ - $$$$"
                      displayValue={(prices) => prices.price}
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
                      {filteredPrice.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredPrice.map((price) => (
                          <Combobox.Option
                            key={price.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-purple-100 hover:bg-purple-200"
                                  : "text-black"
                              }`
                            }
                            value={price}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {price.price}
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
                <img src="../calender.svg" className="pr-2" />
                <p className="font-medium">Date</p>
              </div>

              {/* <Menu>
                <Menu.Button className="relative mt-1 text-gray-400 py-2 pl-3 pr-10 font-light cursor-pointer focus:bg-purple-50 hover:bg-purple-50 rounded-full">
                  Search by date
                </Menu.Button>
                <Menu.Items>
                  <Menu.Item>
                    {({ active }) => (
                      <a className={`${active && "bg-purple-600 "}`} href="#">
                        <Calendar
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm"
                          onChange={onChange}
                          value={value}
                        />
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu> */}
            </div>
          </div>
          <div className="border-l-2 border-gray-300">
            <div className="pl-6">
              <div className="flex pb-1">
                <img src="../microphone.svg" className="pr-2" />
                <p className="font-medium">Artist</p>
              </div>
              <Combobox onChange={setSelected}>
                <div className="relative mt-1">
                  <Combobox.Button>
                    {/* KAN IKKE FÅ DENNE HER PLACEHOLDER TIL AT VIRKE EFTER SIDEN ER LOADED */}
                    <Combobox.Input
                      className=" py-2 pl-3 pr-10 font-light cursor-pointer focus:bg-purple-50 hover:bg-purple-50 rounded-full focus:outline-none"
                      placeholder="Search by artist"
                      displayValue={(artists) => artists.name}
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
                      {filteredArtist.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredArtist.map((artist) => (
                          <Combobox.Option
                            key={artist.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-purple-100 hover:bg-purple-200"
                                  : "text-black"
                              }`
                            }
                            value={artist}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {artist.name}
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
