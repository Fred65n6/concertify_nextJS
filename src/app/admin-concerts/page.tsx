"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SlUser } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import { RiEdit2Fill } from "react-icons/ri";
import {SlMusicToneAlt} from "react-icons/sl";


interface Concert {
    _id: string;
    concert_artist: {
        artist_id: string;
        artist_name: string;
        artist_instagram: string;
        artist_youtube: string;
        artist_facebook: string;
        artist_twitter: string;
        artist_spotify: string;
    };
    concert_date: string;
    concert_description: string;
    concert_image: string;
    concert_name: string;
    concert_start: string;
    concert_genre: {
        genre_id: string;
        genre_name: string;
    };
    concert_venue: {
        venue_id: string;
        venue_name: string;
        venue_address: string;
        venue_location: string;
    };
    concert_doors: string;
}

const Admin: React.FC = () => {
//   const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;
  const [concerts, setConcerts] = useState<[]>([]);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/data/concertData");
            setConcerts(response.data.data);
        } catch (error) {
            console.error("Error fetching concerts:", error);
        }
    };

    fetchData();
}, []);


  const totalConcerts = concerts.length;

  const openDeleteModule = (concert: Concert) => {
    setSelectedConcert(concert);
    const deleteConcertModule = document.getElementById("delete_concert_id");
    deleteConcertModule?.classList.remove("hidden");
    deleteConcertModule?.classList.add("grid");
};

const closeDeleteModule = () => {
  const deleteConcertModule = document.getElementById("delete_concert_id");
  deleteConcertModule?.classList.add("hidden");
  deleteConcertModule?.classList.remove("grid");
};


const openEditModule = (concert: Concert) => {
    setSelectedConcert(concert);
    const deleteConcertModule = document.getElementById("edit_concert_id");
    deleteConcertModule?.classList.remove("hidden");
    deleteConcertModule?.classList.add("grid");
};

const closeEditModule = () => {
  const deleteConcertModule = document.getElementById("edit_concert_id");
  deleteConcertModule?.classList.add("hidden");
  deleteConcertModule?.classList.remove("grid");
};

  const handleDeleteConcert = async (concertId: string) => {
    try {
      const res = await fetch('/api/admin/deleteConcert', {
        method: 'DELETE',
        body: JSON.stringify({ concertId }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error(errorText);
      } else {
        const result = await res.json();
        if (result.success) {
          console.log(result.message);
        //   setConcerts((prevConcert) => prevConcert.filter((concert) => concert._id !== concertId)); // Removing the deleted user from the state
          closeModule();
        } else {
          console.error(result.error);
        }
      }
    } catch (error) {
      console.error('Error deleting concert:', error);
    }
  };



  return (
    <>
      <LoginPage />
      <SignupPage />
      <div>
        <h1 className="font-bold text-4xl pb-4 pt-8">Admin / <span className="text-[#5311BF] dark:text-[#8e0bf5]">concerts</span></h1>

        <section className="flex gap-8 my-8">
          <div className="flex flex-col gap-4 align-middle">
            <div className="flex gap-2">
              <SlMusicToneAlt className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5" id="user" />
              <span>There are {totalConcerts} concerts in total</span>
            </div>
          </div>
        </section>

        <form className="flex flex-col items-center gap-8 pb-12">
          <table className="w-full">
            <thead>
              <tr className="lg:flex justify-start w-full">
                <th className="text-left w-1/2">Concert id</th>
                <th className="text-left w-1/2">Concert name</th>
                <th className="text-left w-1/2">Artist</th>
                <th className="text-left w-1/2">Venue</th>
                <th className="text-right w-1/12"></th>
                <th className="text-right w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {concerts?.map((concert) => (
                <tr key={concert._id} className="flex justify-start w-full">
                  <td className="text-left w-1/2">{concert._id}</td>
                  <td className="text-left w-1/2">{concert.concert_name}</td>
                  <td className="text-left w-1/2">{concert.concert_artist.artist_name}</td>
                  <td className="text-left w-1/2">{concert.concert_venue.venue_name}</td>
                  <td className="text-right w-1/12">
                    <button
                      type="button"
                      className="text-[#5311BF]"
                      onClick={() => openEditModule(concert)}
                    >
                        <RiEdit2Fill />
                    </button>
                  </td>
                  <td className="text-right w-1/12">
                    <button
                      type="button"
                      className="text-[#5311BF]"
                      onClick={() => openDeleteModule(concert)}
                    >

                      <AiFillDelete
                        className="fill-[#5311BF] dark:fill-[#8e0bf5] w-5 h-5"
                        id="deleteConcert"
                        value="upload"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>


    {/* DELETE CONCERT MODULE */}
      {selectedConcert && (
      <div id="delete_concert_id" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
        <div className="p-10 flex flex-col items-center justify-center w-[600px] bg-white rounded-lg dark:bg-[#202124]">
          <button
              type="button"
              onClick={closeDeleteModule}
              className="cursor-pointer ml-[75%]"
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
              >
                  <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m7 7l10 10M7 17L17 7"
                  />
              </svg>
          </button>
            <div className="flex flex-col gap-4 justify-center text-center items-center">
                <h1 className="dark:text-white font-bold text-3xl">Are you sure?</h1>
                <p className="dark:text-white">
                You are about to delete{" "}
                <span className="italic font-bold">{selectedConcert.concert_name}</span>. This action can not be reverted.
            </p>
            <button 
                type="button"
                onClick={() => handleDeleteConcert(selectedConcert._id)}
                className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
                Yes I am sure
            </button>
            </div>
        </div>
      </div>
      )}

    {/* EDIT CONCERT MODULE */}
    {selectedConcert && (
    <div id="edit_concert_id" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
    <div className="p-10 flex flex-col items-center justify-center w-[600px] bg-white rounded-lg dark:bg-[#202124]">
        <button
            type="button"
            onClick={closeEditModule}
            className="cursor-pointer ml-[75%]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m7 7l10 10M7 17L17 7"
                />
            </svg>
        </button>

        <div className="flex flex-col gap-4 justify-center text-center items-center">
        <input
            readOnly={true}
            className="bg-slate-100 p-4 w-72 hidden"
            type="text"
            name="concert_id"
            value={selectedConcert._id}
            />

            <input
                readOnly={true}
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="concert_name"
                value={selectedConcert.concert_name}
            />

            <input
                readOnly={true}
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="concert_description"
                value={selectedConcert.concert_description}
            />


        {/* <button 
            type="button"
            onClick={() => handleSaveChanges(selectedConcert._id)}
            className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
            Save changes
        </button> */}

        </div>
    </div>
    </div>
    )}

    </>
  );
};

export default Admin;