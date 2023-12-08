"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SlPlus } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import { RiEdit2Fill } from "react-icons/ri";
import {SlMusicToneAlt, SlArrowLeft, SlQuestion} from "react-icons/sl";
import Link from "../../../node_modules/next/link";
import { CgClose } from "react-icons/cg";

interface Concert {
    concert_id: string;
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
    concert_artist_email: string;
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
    isVisible: boolean;
}


const AdminConcertsOverview: React.FC = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [concertName, setConcertName] = useState("");
  const [concertStart, setConcertStart] = useState("");
  const [concertDate, setConcertDate] = useState("");
  const [concertDescription, setConcertDescription] = useState("");
  const [concertDoors, setConcertDoors] = useState("");
  const [isVisible, setIsVisible] = useState(true); // Add state for visibility


  useEffect(() => {
    fetchData();
}, []);

  const fetchData = async () => {
    try {
        const response = await axios.get("/api/data/concertData");
        setConcerts(response.data.data);
    } catch (error) {
        console.error("Error fetching concerts:", error);
    }
  };

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
        setConcerts(elm => elm.filter(concert => concert.concert_id !== concertId));

        closeDeleteModule();
      } else {
        console.error(result.error);
      }
    }
  } catch (error) {
    console.error('Error deleting concert:', error);
  }
};

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  if (file) {
      try {
          const data = new FormData();
          data.set("file", file);
          data.set("concert_name", concertName);
          data.set("concert_date", concertDate);
          data.set("concert_description", concertDescription);
          data.set("concert_start", concertStart);
          data.set("concert_doors", concertDoors);
          data.set("concert_id", selectedConcert!.concert_artist_email);
          data.set("concert_artist_email", selectedConcert!.concert_id);
          data.set("isVisible", isVisible.toString());

          console.log(data)

          const res = await fetch("/api/data/editConcert/", {
              method: "POST",
              body: data,
          });

          if (!res.ok) {
              const errorText = await res.text();
              console.error(errorText);
          } else {
              setLoading(false);
          }
      } catch (error) {
          console.error("Error uploading artist with file: ", error);
      }
  } else {
      try {

          const data = new FormData();
          data.set("concert_name", concertName);
          data.set("concert_date", concertDate);
          data.set("concert_description", concertDescription);
          data.set("concert_start", concertStart);
          data.set("concert_doors", concertDoors);
          data.set("concert_artist_email", selectedConcert!.concert_artist_email);
          data.set("concert_id", selectedConcert!.concert_id);
          data.set("isVisible", isVisible.toString());

          console.log(data)
      
          const res = await fetch("/api/data/editConcert/", {
              method: "POST",
              body: data,
          });

          if (!res.ok) {
              const errorText = await res.text();
              console.error(errorText);
          } else {
              setLoading(false);
              closeEditModule();
              fetchData();
          }
      } catch (error) {
          console.error("Error uploading concert without file: ", error);
      }
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
        <h1 className="font-bold text-4xl pb-4 pt-8">Admin / <span className="text-[#5311BF] dark:text-purple-500">concerts</span></h1>

        <section className="flex w-full justify-between py-8 items-center border-b-[1px] border-gray-100 dark:border-[#23124b]">
            <div className="flex gap-2">
              <SlMusicToneAlt className="stroke-[#5311BF] dark:stroke-purple-500 w-5 h-5" id="user" />
              <span>There are <span className="text-[#5311BF] dark:text-purple-500 font-bold">{totalConcerts}</span> concerts in total</span>
            </div>
            <button className="secondary_btn">
              <Link href="/admin-upload-concert">Upload new concert</Link>
              <SlPlus/>
          </button>
        </section>

          <form className="">
            <table className="w-full mt-8">
              <thead>
                <tr className="lg:flex justify-start w-full mb-4 text-[#5311BF] dark:text-purple-500">
                  <th className="text-left w-fit md:w-1/2">Concert name</th>
                  <th className="text-left w-fit md:w-1/2">Artist</th>
                  <th className="text-left w-fit md:w-1/2">Date</th>
                  <th className="text-left w-fit md:w-1/2">Venue</th>
                  <th className="text-right w-fit md:w-1/12"></th>
                  <th className="text-right w-fit md:w-1/12"></th>
                </tr>
              </thead>
              <tbody className="mb-8">
                {concerts?.map((concert) => (
                  <tr key={concert.concert_id} className="flex justify-start w-full mb-2">
                    <td className="text-left w-fit md:w-1/2">{concert.concert_name}</td>
                    <td className="text-left w-fit md:w-1/2">{concert.concert_artist.artist_name}</td>
                    <td className="text-left w-fit md:w-1/2">{concert.concert_date}</td>
                    <td className="text-left w-fit md:w-1/2">{concert.concert_venue.venue_name}</td>
                    <td className="text-right w-fit md:w-1/12">
                      <button
                        type="button"
                        onClick={() => openEditModule(concert)}
                      >
                          <RiEdit2Fill className="fill-[#5311BF] dark:fill-white"/>
                      </button>
                    </td>
                    <td className="text-right w-fit md:w-1/12">
                      <button
                        type="button"
                        onClick={() => openDeleteModule(concert)}
                      >

                        <AiFillDelete
                          className="fill-[#5311BF] dark:fill-white w-5 h-5"
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
      <div id="delete_concert_id" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
        <div className="p-10 flex flex-col items-center justify-center w-[600px] bg-white rounded-lg dark:bg-[#12082a]">
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
              <span className="italic font-bold">{selectedConcert.concert_name}</span>. This action can not be reverted.
            </p>
            <button 
                type="button"
                onClick={() => handleDeleteConcert(selectedConcert.concert_id)}
                className="primary_btn">
                Yes I am sure
            </button>
            </div>
        </div>
      </div>
      )}

    {/* EDIT CONCERT MODULE */}
    {selectedConcert && (
      <div id="edit_concert_id" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
              <div className="p-10 grid md_grid-cols-2 items-center justify-center w-[600px] bg-white rounded-lg dark:bg-[#12082a]">
              <button
              type="button"
              onClick={closeEditModule}
              className="cursor-pointer ml-[100%]"
              >
              <CgClose/>
            </button>
                <form
                key={selectedConcert.concert_name}
                id="uploadArtistForm"
                onSubmit={onSubmit}
                >
                <div className="grid md:grid-cols-2 gap-8 w-full">
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="concert_name">Concert name</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="concert_name"
                        name="concert_name"
                        value={concertName}
                        onChange={(e) => setConcertName(e.target.value)}
                        placeholder={selectedConcert.concert_name}
                    />
                </div>

                <div className="hidden">
                    <label htmlFor="artist_name">Concert id</label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="concert_id"
                        name="concert_id"
                        value={selectedConcert.concert_id}
                        readOnly
                    />
                </div>

                <div className="hidden">
                    <label htmlFor="artist_name">Artist email</label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="concert_artist_email"
                        name="concert_artist_email"
                        value={selectedConcert.concert_artist_email}
                        readOnly
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_full_name">Concert date</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="date"
                        id="concert_date"
                        name="concert_date"
                        value={concertDate}
                        onChange={(e) => setConcertDate(e.target.value)}
                        placeholder={selectedConcert.concert_date}
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="concert_name">Concert start time </label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="time"
                        id="concert_start"
                        name="concert_start"
                        value={concertStart}
                        onChange={(e) => setConcertStart(e.target.value)}
                        placeholder={selectedConcert.concert_start}
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_full_name">Concert doors</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="time"
                        id="Concert start"
                        name="Concert start"
                        value={concertDoors}
                        onChange={(e) => setConcertDoors(e.target.value)}
                        placeholder={selectedConcert.concert_doors}
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_full_name">Concert start time</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="Concert description"
                        name="Concert description"
                        value={concertDescription}
                        onChange={(e) => setConcertDescription(e.target.value)}
                        placeholder={selectedConcert.concert_description}
                    />
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <label htmlFor="isVisible" className="text-base text-purple-800">* If this box is checked, the concert will be public</label>
                    <input
                        type="checkbox"
                        id="isVisible"
                        name="isVisible"
                        className="bg-purple-800 text-purple-800"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                    />
                    </div>


                <div className="form-group flex flex-col gap-2">
                    <label htmlFor="file">Change image</label>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>
                </div>

                <button
                    className="brand_gradient px-4 grid m-auto py-2 cursor-pointer mt-8 text-white rounded-full w-72"
                    type="submit"
                    value="upload"
                >
                    {loading ? "Processing" : "Confirm"}
                </button>
            </form>
            </div>
      </div>
    )}

    </>
  );
};

export default AdminConcertsOverview;