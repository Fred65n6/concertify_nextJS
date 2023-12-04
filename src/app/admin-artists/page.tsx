"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import { RiEdit2Fill } from "react-icons/ri";
import {SlMusicToneAlt, SlArrowLeft, SlPlus, SlQuestion} from "react-icons/sl";
import Link from "../../../node_modules/next/link";
import { CgClose } from "react-icons/cg";

interface Artist {
  _id: string;
  artist_name: string;
  artist_full_name: string;
  artist_nation: string;
  artist_description: string;
  artist_email: string;
  artist_image: string;
  artist_dob: string;
  artist_genre: {
      genre_id: string;
      genre_name: string;
  };
}

const AdminArtistsOverview: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);


  const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [artistName, setArtistName] = useState("");
    const [artistFullName, setArtistFullName] = useState("");
    const [artistNation, setArtistNation] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const [artistDob, setArtistDob] = useState("");
  
  useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
  try {
      const response = await axios.get("/api/data/artistData");
      setArtists(response.data.data);
  } catch (error) {
      console.error("Error fetching artists:", error);
  }
};


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
          setArtists(elm => elm.filter(artist => artist._id !== artistId));
          closeDeleteModule();
        } else {
          console.error(result.error);
        }
      }
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };
  

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (file) {
        try {
            const data = new FormData();
            data.set("file", file);
            data.set("artist_id", selectedArtist!._id);
            data.set("artist_name", artistName);
            data.set("artist_full_name", artistFullName);
            data.set("artist_description", artistDescription);
            data.set("artist_email", selectedArtist!.artist_email);
            data.set("artist_dob", artistDob);
            data.set("artist_nation", artistNation);

            console.log(data)

            const res = await fetch("/api/data/editArtist/", {
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
            data.set("artist_id", selectedArtist!._id);
            data.set("artist_name", artistName);
            data.set("artist_full_name", artistFullName);
            data.set("artist_description", artistDescription);
            data.set("artist_dob", artistDob);
            data.set("artist_nation", artistNation);
            data.set("artist_email", selectedArtist!.artist_email);
            console.log(data)
        
            const res = await fetch("/api/data/editArtist/", {
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
            console.error("Error uploading artist without file: ", error);
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
        <h1 className="font-bold text-4xl pb-4 pt-8">Admin / <span className="text-[#5311BF] dark:text-purple-500">artists</span></h1>

        <section className="flex w-full justify-between py-8 items-center border-b-[1px] border-gray-100 dark:border-[#23124b]">
            <div className="flex gap-2">
              <SlMusicToneAlt className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5" id="user" />
              <span>There are <span className="text-[#5311BF] dark:text-purple-500 font-bold">{totalArtists}</span> artists in total</span>
            </div>
              <button className="secondary_btn">
              <Link href="/admin-upload-artist">Upload new artist</Link>
              <SlPlus/>
          </button>
        </section>

        <form className="flex flex-col items-center gap-8 py-8">
          <table className="w-full">
            <thead>
            <tr className="lg:flex justify-start w-full mb-4 text-[#5311BF] dark:text-purple-500">
                <th className="text-left w-1/2">Artist id</th>
                <th className="text-left w-1/2">Artist name</th>
                <th className="text-left w-1/2">Full name</th>
                <th className="text-right w-1/12"></th>
                <th className="text-right w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {artists?.map((artist) => (
                <tr key={artist._id} className="flex justify-start w-full mb-2">
                  <td className="text-left w-1/2">{artist._id}</td>
                  <td className="text-left w-1/2">{artist.artist_name}</td>
                  <td className="text-left w-1/2">{artist.artist_full_name}</td>
                  <td className="text-right w-1/12">
                    <button
                      type="button"
                      onClick={() => openEditModule(artist)}
                    >
                        <RiEdit2Fill className="fill-[#5311BF] dark:fill-white"/>
                    </button>
                  </td>
                  <td className="text-right w-1/12">
                    <button
                      type="button"
                      onClick={() => openDeleteModule(artist)}
                    >

                      <AiFillDelete
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
        </form>
      </div>


    {/* DELETE ARTIST MODAL */}
      {selectedArtist && (
      <div id="delete_artist_id" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
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
              <span className="italic font-bold">{selectedArtist.artist_name}</span>. This action can not be reverted.
            </p>
            <button 
                type="button"
                onClick={() => handleDeleteArtist(selectedArtist._id)}
                className="primary_btn">
                Yes I am sure
            </button>
            </div>
        </div>
      </div>
      )}

    {/* EDIT ARTIST MODAL */}
    {selectedArtist && (
    <div id="edit_artist_id" className="fixed overflow-scroll top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
      <div className="p-10 grid md_grid-cols-2 items-center justify-center w-[600px] bg-white rounded-lg dark:bg-[#12082a]">
        <button
          type="button"
          onClick={closeEditModule}
          className="cursor-pointer ml-[100%]"
          >
          <CgClose/>
        </button>

        <form
                key={selectedArtist.artist_name}
                id="uploadArtistForm"
                onSubmit={onSubmit}
                >
                <div className="grid md:grid-cols-2 gap-8 w-full">
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_name">Artist name <span className="brand_purple text-2xl">*</span></label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_name"
                        name="artist_name"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder={selectedArtist.artist_name}
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_name">Artist id<span className="brand_purple text-2xl">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_id"
                        name="artist_id"
                        value={selectedArtist._id}
                        readOnly
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_name">Artist email<span className="brand_purple text-2xl">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_email"
                        name="artist_email"
                        value={selectedArtist.artist_email}
                        readOnly
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_full_name">Full name</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_full_name"
                        name="artist_full_name"
                        value={artistFullName}
                        onChange={(e) => setArtistFullName(e.target.value)}
                        placeholder={selectedArtist.artist_full_name}
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_description">Description</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_description"
                        name="artist_description"
                        value={artistDescription}
                        placeholder={selectedArtist.artist_description}
                        onChange={(e) => setArtistDescription(e.target.value)}
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_full_name">Date of birth</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="date"
                        id="artist_dob"
                        name="artist_dob"
                        value={artistDob}
                        onChange={(e) => setArtistDob(e.target.value)}
                        placeholder={selectedArtist.artist_dob}
                    />
                </div>

                

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_nation">Artist nationality</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        name="artist_nation"
                        value={artistNation}
                        onChange={(e) => setArtistNation(e.target.value)}
                        placeholder={selectedArtist.artist_nation}
                    />
                </div>

                <div className="form-group flex flex-col gap-2">
                    <label htmlFor="file">Upload image</label>
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

export default AdminArtistsOverview;