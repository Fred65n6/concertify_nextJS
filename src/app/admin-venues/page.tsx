"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import {SlMusicToneAlt, SlArrowLeft, SlPlus, SlPencil, SlTrash} from "react-icons/sl";
import Link from "../../../node_modules/next/link";
import { CgClose } from "react-icons/cg";


interface Venue {
    _id: string;
    venue_name: string;
    venue_address: string;
    venue_size: string;
    venue_location: string;
    venue_description: string;
    venue_image: string;
  }
const AdminVenuesOverview: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/data/venueData");
            setVenues(response.data.data);
        } catch (error) {
            console.error("Error fetching venues:", error);
        }
    };

    fetchData();
}, []);


  const totalVenues = venues.length;

  const openDeleteModule = (venue: Venue) => {
    setSelectedVenue(venue);
    const deleteVenueModule = document.getElementById("delete_venue_id");
    deleteVenueModule?.classList.remove("hidden");
    deleteVenueModule?.classList.add("grid");
};

const closeDeleteModule = () => {
  const deleteVenueModule = document.getElementById("delete_venue_id");
  deleteVenueModule?.classList.add("hidden");
  deleteVenueModule?.classList.remove("grid");
};

const openEditModule = (venue: Venue) => {
    setSelectedVenue(venue);
    const deleteVenueModule = document.getElementById("edit_venue_id");
    deleteVenueModule?.classList.remove("hidden");
    deleteVenueModule?.classList.add("grid");
};

const closeEditModule = () => {
  const deleteVenueModule = document.getElementById("edit_venue_id");
  deleteVenueModule?.classList.add("hidden");
  deleteVenueModule?.classList.remove("grid");
};

const handleDeleteVenue = async (venueId: string) => {
  try {
    const res = await fetch('/api/admin/deleteVenue', {
      method: 'DELETE',
      body: JSON.stringify({ venueId }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(errorText);
    } else {
      const result = await res.json();
      if (result.success) {
        console.log(result.message);
        setVenues(elm => elm.filter(venue => venue._id !== venueId));

        closeDeleteModule();
      } else {
        console.error(result.error);
      }
    }
  } catch (error) {
    console.error('Error deleting venue:', error);
  }
};



  return (
    <>
      <LoginPage />
      <SignupPage />
      <div>
      <Link
            className="flex align-middle gap-2"
            href="/admin-dashboard"
        >
            <SlArrowLeft
                className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1"
                id="arrow_right"
                />
                Back to dashboard
        </Link>
        <h1 className="font-bold text-4xl pb-4 pt-8">Admin / <span className="text-[#5311BF] dark:text-purple-500">venues</span></h1>

        <section className="flex flex-col w-full justify-between items-start gap-4 py-8 border-b-[1px] border-gray-100 dark:border-[#23124b] md:flex-row md:items-center md:gap-0">
            <div className="flex gap-2">
              <SlMusicToneAlt className="stroke-[#5311BF] dark:stroke-purple-500 w-5 h-5" id="user" />
              <span>There are <span className="text-[#5311BF] dark:text-purple-500 font-bold">{totalVenues}</span> venues in total</span>
            </div>
            <button className="secondary_btn">
              <Link href="/admin-upload-venue">Upload new venue</Link>
              <SlPlus/>
          </button>
        </section>


        <form className="flex flex-col items-center gap-8 pb-12">
          <div className="overflow-x-auto w-full">
            <table className="table-auto min-w-full">
              <thead>
                <tr className=" text-[#5311BF] dark:text-purple-500">
                  <th className="px-4 py-2 text-left font-semibold">Venue name</th>
                  <th className="px-4 py-2 text-left font-semibold">Address</th>
                  <th className="px-4 py-2 text-left font-semibold">Location</th>
                  <th className="px-4 py-2 text-left font-semibold">Venue size (people)</th>
                  {/* <th className="px-4 py-2 text-right font-semibold"></th> */}
                  <th className="px-4 py-2 text-right font-semibold"></th>
                </tr>
              </thead>
              <tbody className=" [&>*:nth-child(odd)]:bg-purple-100 dark:[&>*:nth-child(odd)]:bg-[#23124b]">
              {venues?.map((venue) => (
                  <tr key={venue._id}>
                    <td className="px-4 py-2">{venue.venue_name}</td>
                    <td className="px-4 py-2">{venue.venue_address}</td>
                    <td className="px-4 py-2">{venue.venue_location}</td>
                    <td className="px-4 py-2">{venue.venue_size}</td>
                    {/* <td className="px-4 py-2 text-right">
                    <button
                      type="button"
                      className="text-[#5311BF] dark:text-white"
                      onClick={() => openEditModule(venue)}
                    >
                        <SlPencil />
                    </button>
                    </td> */}
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        className="text-[#5311BF] dark:text-white"
                        onClick={() => openDeleteModule(venue)}
                      >

                        <SlTrash
                          className="fill-[#5311BF] dark:fill-white w-5 h-5"
                          id="deleteArtist"
                          value="upload"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>


    {/* DELETE VENUE MODAL */}
      {selectedVenue && (
      <div id="delete_venue_id" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
        <div className="p-10 flex flex-col items-center justify-center w-fill md:w-[600px] m-4 bg-white rounded-lg dark:bg-[#23124b]">
        <button
            type="button"
            onClick={closeDeleteModule}
            className="cursor-pointer ml-[100%]"
            >
            <CgClose/>
          </button>
         
            <div className="flex flex-col gap-4 justify-center text-center items-center">
                <h1 className="dark:text-white font-bold text-3xl">Are you sure?</h1>
                <p className="dark:text-white">
                You are about to delete{" "}
                <span className="italic font-bold">{selectedVenue.venue_name}</span>. This action can not be reverted.
            </p>
            <button 
                type="button"
                onClick={() => handleDeleteVenue(selectedVenue._id)}
                className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
                Yes I am sure
            </button>
            </div>
        </div>
      </div>
      )}

    {/* EDIT VENUE MODAL */}
    {selectedVenue && (
      <div id="edit_venue_id" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
        <div className="p-10 flex flex-col items-center justify-center w-fill md:w-[600px] m-4 bg-white rounded-lg dark:bg-[#23124b]">
        <button
            type="button"
            onClick={closeEditModule}
            className="cursor-pointer ml-[100%]"
            >
            <CgClose/>
        </button>

        <div className="flex flex-col gap-4 justify-center text-center items-center">
        <input
            readOnly={true}
            className="hidden"
            type="text"
            name="venue_id"
            value={selectedVenue._id}
            />

        <div className="flex gap-2 items-center">
            <label htmlFor="venue_name">Venue name</label>
            <input
                readOnly={true}
                className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                type="text"
                name="venue_name"
                value={selectedVenue.venue_name}
            />
        </div>


        <button 
            // type="button"
            // onClick={() => handleSaveChanges(selectedVenue._id)}
            className="primary_btn">
            Save changes
        </button>

        </div>
        </div>
      </div>
    )}

    </>
  );
};

export default AdminVenuesOverview;