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


interface Artist {
  _id: string;
  artist_name: string;
  artist_full_name: string;
  artist_nation: string;
  artist_description: string;
  artist_image: string;
  artist_dob: string;
  artist_genre: {
      genre_id: string;
      genre_name: string;
  };
}

const Admin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;
  const [artists, setArtists] = useState<[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/data/artistData");
            setArtists(response.data.data);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    fetchData();
}, []);


  const totalArtists = artists.length;

  const openDeleteModule = (artist: Artist) => {
    setSelectedArtist(artist);
    const deleteArtistModule = document.getElementById("delete_artist_id");
    deleteArtistModule?.classList.remove("hidden");
    deleteArtistModule?.classList.add("grid");
};

const closeDeleteModule = () => {
  const deleteArtistModule = document.getElementById("delete_artist_id");
  deleteArtistModule?.classList.add("hidden");
  deleteArtistModule?.classList.remove("grid");
};

const openEditModule = (artist: Artist) => {
    setSelectedArtist(artist);
    const deleteArtistModule = document.getElementById("edit_artist_id");
    deleteArtistModule?.classList.remove("hidden");
    deleteArtistModule?.classList.add("grid");
};

const closeEditModule = () => {
  const deleteArtistModule = document.getElementById("edit_artist_id");
  deleteArtistModule?.classList.add("hidden");
  deleteArtistModule?.classList.remove("grid");
};

  const handleDeleteArtist = async (artistId: string) => {
    try {
      const res = await fetch('/api/admin/deleteArtist', {
        method: 'DELETE',
        body: JSON.stringify({ artistId }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error(errorText);
      } else {
        const result = await res.json();
        if (result.success) {
          console.log(result.message);
          setArtists((prevArtist) => prevArtist.filter((artist) => artist._id !== artistId)); // Removing the deleted artist from the state
          closeDeleteModule();
        } else {
          console.error(result.error);
        }
      }
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };



  return (
    <>
      <LoginPage />
      <SignupPage />
      <div>
        <h1 className="font-bold text-4xl pb-4 pt-8">Admin / <span className="text-[#5311BF] dark:text-[#8e0bf5]">artists</span></h1>

        <section className="flex gap-8 my-8">
          <div className="flex flex-col gap-4 align-middle">
            <div className="flex gap-2">
              <SlMusicToneAlt className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5" id="user" />
              <span>There are {totalArtists} artists in total</span>
            </div>
          </div>
        </section>

        <form className="flex flex-col items-center gap-8 pb-12">
          <table className="w-full">
            <thead>
              <tr className="lg:flex justify-start w-full">
                <th className="text-left w-1/2">Artist id</th>
                <th className="text-left w-1/2">Artist name</th>
                <th className="text-left w-1/2">Full name</th>
                <th className="text-right w-1/12"></th>
                <th className="text-right w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {artists?.map((artist) => (
                <tr key={artist._id} className="flex justify-start w-full">
                  <td className="text-left w-1/2">{artist._id}</td>
                  <td className="text-left w-1/2">{artist.artist_name}</td>
                  <td className="text-left w-1/2">{artist.artist_full_name}</td>
                  <td className="text-right w-1/12">
                    <button
                      type="button"
                      className="text-[#5311BF]"
                      onClick={() => openEditModule(artist)}
                    >
                        <RiEdit2Fill />
                    </button>
                  </td>
                  <td className="text-right w-1/12">
                    <button
                      type="button"
                      className="text-[#5311BF]"
                      onClick={() => openDeleteModule(artist)}
                    >

                      <AiFillDelete
                        className="fill-[#5311BF] dark:fill-[#8e0bf5] w-5 h-5"
                        id="deleteArtist"
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


    {/* DELETE ARTISTK MODULE */}
      {selectedArtist && (
      <div id="delete_artist_id" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
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
                <span className="italic font-bold">{selectedArtist.artist_name}</span>. This action can not be reverted.
            </p>
            <button 
                type="button"
                onClick={() => handleDeleteArtist(selectedArtist._id)}
                className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
                Yes I am sure
            </button>
            </div>
        </div>
      </div>
      )}

    {/* EDIT ARTIST MODULE */}
    {selectedArtist && (
    <div id="edit_artist_id" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
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
            className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
            type="text"
            name="artist_id"
            value={selectedArtist._id}
            />

            <input
                readOnly={true}
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="artist_name"
                value={selectedArtist.artist_name}
            />


        <button 
            // type="button"
            // onClick={() => handleSaveChanges(selectedArtist._id)}
            className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
            Save changes
        </button>

        </div>
    </div>
    </div>
    )}

    </>
  );
};

export default Admin;