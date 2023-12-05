"use client";
import React, {useState, useEffect} from "react";
import {request} from "http";
import axios from 'axios'

interface Genre {
    _id: string;
    genre_name: string;
}

interface Artist {
    artist_name: string;
    artist_dob: string;
    artist_image: string;
    artist_nation: string;
    artist_full_namde: string;
    artist_genre:string;
}

const UploadForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [artistFullName, setArtistFullName] = useState("");
    const [artistNation, setArtistNation] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const [artistDob, setArtistDob] = useState("");
    const [artist, setArtist] = useState<any[]>([]);

    useEffect(() => {
        getUserDetails();
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        if (file) {
            try {
                const data = new FormData();
                data.set("file", file);
                data.set("artist_name", artist[0].artist_name);
                data.set("artist_id", artist[0].artist_id);
                data.set("artist_full_name", artistFullName);
                data.set("artist_description", artistDescription);
                data.set("artist_email", artist[0].artist_email);
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
                    showUploadMessage();
                }
            } catch (error) {
                console.error("Error uploading artist with file: ", error);
            }
        } else {
            try {

                const data = new FormData();
                data.set("artist_name", artist[0].artist_name);
                data.set("artist_email", artist[0].artist_email);
                data.set("artist_id", artist[0].artist_id);
                data.set("artist_full_name", artistFullName);
                data.set("artist_description", artistDescription);
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
                    showUploadMessage();
                }
            } catch (error) {
                console.error("Error uploading artist without file: ", error);
            }
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/cookieUser");
            console.log(res.data);
            const userData = res.data.data;
            setArtist(res.data.data.artist);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const showUploadMessage = () => {
        const artistUploadedMessage = document.getElementById(
            "artistUploadedMessage"
        );
        const uploadArtistForm = document.getElementById("uploadArtistForm");
        artistUploadedMessage?.classList.remove("hidden");
        artistUploadedMessage?.classList.add("grid");
        uploadArtistForm?.classList.add("hidden");
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex flex-col w-full md:w-4/6 gap-6 mb-24">
            <h1 className="font-bold text-4xl pb-4">Edit artist</h1>
            {artist.map((artist: any) => (
    
            <form
                key={artist.artist_name}
                id="uploadArtistForm"
                className="flex flex-col gap-8 w-full"
                onSubmit={onSubmit}
                >
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_name">Artist name <span className="brand_purple text-2xl">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_name"
                        name="artist_name"
                        value={artist.artist_name}
                        readOnly
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_name">Artist name <span className="brand_purple text-2xl">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_name"
                        name="artist_name"
                        value={artist.artist_id}
                        readOnly
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_name">Artist genre <span className="brand_purple text-2xl">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_name"
                        name="artist_name"
                        value={artist.artist_genre[0].genre_name}
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
                        placeholder={artist.artist_full_name}
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
                        placeholder={artist.artist_description}
                        onChange={(e) => setArtistDescription(e.target.value)}
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_description">Artist email</label>
                    <input
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                    type="text"
                    id="artist_email"
                    name="artist_email"
                    defaultValue={artist.artist_email}
                    readOnly
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
                        placeholder={artist.artist_dob}
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
                        placeholder={artist.artist_nation}
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

                <button
                    className="brand_gradient px-4 py-2 cursor-pointer text-white rounded-full w-72"
                    type="submit"
                    value="upload"
                >
                    {loading ? "Processing" : "Confirm"}
                </button>
                <p className="mt-8"><span className="brand_purple text-2xl">*</span> theese values can't be changed</p>
            </form>
            ))}

            
            <div id="artistUploadedMessage" className="hidden">
                <h2 className="text-2xl">Artist editted successfully 🎉</h2>
                <div className="flex gap-4 mt-8">
                </div>
            </div>
        </div>
    );
};

export default UploadForm;