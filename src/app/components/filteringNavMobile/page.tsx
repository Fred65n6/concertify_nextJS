"use client";
import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Menu } from "@headlessui/react";

function FilteringNavMobile() {
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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="lg:flex lg:justify-between">
      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? "" : "hidden"}`}>
        {/* Mobile Location Dropdown */}
        <div className="mb-4">
          <p className="font-medium">Location</p>
          <Combobox onChange={setSelected}>
            <div className="relative mt-1">
              <Combobox.Button>
                <Combobox.Input
                  className="py-2 pl-3 pr-10 font-light cursor-pointer focus:bg-purple-50 hover:bg-purple-50 rounded-full focus:outline-none"
                  placeholder="Search by venue"
                  displayValue={(locations) => locations.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Combobox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {locations.map((location) => (
                    <Combobox.Option
                      key={location.id}
                      className="relative cursor-default select-none py-2 pl-10 pr-4 text-black"
                      value={location}
                    >
                      <span className="block truncate font-normal">
                        {location.name}
                      </span>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        {/* Add similar mobile filters here */}
      </div>

      {/* Filtering Options */}
      <div className="lg:w-1/4">
        {/* Desktop Filter Options */}
        <div className="hidden lg:block">
          {/* Location */}
          <div className="mb-4">
            <p className="font-medium">Location</p>
            <Combobox onChange={setSelected}>
              <div className="relative mt-1">
                <Combobox.Button>
                  <Combobox.Input
                    className="py-2 pl-3 pr-10 font-light cursor-pointer focus:bg-purple-50 hover:bg-purple-50 rounded-full focus:outline-none"
                    placeholder="Search by venue"
                    displayValue={(locations) => locations.name}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </Combobox.Button>
                <Transition
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {locations.map((location) => (
                      <Combobox.Option
                        key={location.id}
                        className="relative cursor-default select-none py-2 pl-10 pr-4 text-black"
                        value={location}
                      >
                        <span className="block truncate font-normal">
                          {location.name}
                        </span>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>

          {/* Add similar desktop filters here */}
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden mt-4">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-400 py-2 pl-3 pr-2 font-light cursor-pointer focus:bg-purple-50 hover:bg-purple-50 rounded-full"
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilteringNavMobile;
