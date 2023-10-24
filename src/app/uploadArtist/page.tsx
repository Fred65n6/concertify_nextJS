"use client";
import React, {useState, useEffect} from "react";
import {request} from "http";

interface Genre {
    _id: string;
    genre_name: string;
}

const UploadForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [artistName, setArtistName] = useState("");
    const [artistNation, setArtistNation] = useState("");

    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [artistGenreId, setArtistGenreId] = useState("");
    const [artistGenreName, setArtistGenreName] = useState("");


    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch("/api/data/genreData");
                if (response.ok) {
                    const data = await response.json();
                    setGenres(data.data as Genre[]);
                }
            } catch (error) {
                console.error("Error fetching genres: ", error);
            }
        };

        fetchGenres();
    }, []);



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        if (!file) return request;

        const data = new FormData();
        data.set("file", file);
        data.set("Artist_name", artistName);
        data.set("Artist_genre_id", selectedGenre!._id);
        data.set("Artist_genre_name", selectedGenre!.genre_name);

        data.set("Artist_nation", artistNation);

        const res = await fetch("/api/data/uploadArtist/", {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(errorText);
        }

        if (res.ok) {
            setLoading(false);
            showUploadMessage();
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
        <div className="flex-col items-center flex">
            <form
                id="uploadArtistForm"
                className="flex flex-col items-center gap-8 pb-12"
                onSubmit={onSubmit}
            >
                <input
                    className="bg-slate-100 p-4 w-72"
                    type="text"
                    name="Artist_name"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Artist Name"
                />

                <select
                    className="p-4 w-72"
                    value={selectedGenre ? selectedGenre._id : ""}
                    onChange={(e) =>
                    setSelectedGenre(
                    genres.find(
                    (genre) => genre._id === e.target.value
                        ) || null
                    )
                    }
                >
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                        <option key={genre._id} value={genre._id}>
                            {genre.genre_name}
                        </option>
                    ))}
                </select>
                <input
                    readOnly={true}
                    className="bg-slate-300 p-4 w-72 text-slate-500 hidden"
                    type="text"
                    name="Artist_genre_name"
                    value={selectedGenre ? selectedGenre.genre_name : ""}
                    onChange={(e) => setArtistGenreName(e.target.value)}
                    placeholder="artist genre name"
                />
                <input
                    readOnly={true}
                    className="bg-slate-300 p-4 w-72 text-slate-500 hidden"
                    type="text"
                    name="Concert_genre_id"
                    value={selectedGenre ? selectedGenre._id : ""}
                    onChange={(e) => setArtistGenreId(e.target.value)}
                    placeholder="artist genre name"
                />

                <input
                    className="bg-slate-100 p-4 w-72"
                    type="text"
                    name="Artist_nation"
                    value={artistNation}
                    onChange={(e) => setArtistNation(e.target.value)}
                    placeholder="Artist Nation"
                />

                <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button
                    className="brand_gradient px-4 py-2 cursor-pointer text-white rounded-full w-72"
                    type="submit"
                    value="upload"
                >
                    {loading ? "Processing" : "Upload"}
                </button>
            </form>
            <div
                id="artistUploadedMessage"
                className="gap-8 text-center hidden"
            >
                <h2 className="text-2xl">Artist Uploaded!</h2>
                <a
                    className="brand_gradient py-2 px-4 text-white rounded-full"
                    href="/uploadArtist"
                >
                    Upload another
                </a>
            </div>
        </div>
    );
};

export default UploadForm;
