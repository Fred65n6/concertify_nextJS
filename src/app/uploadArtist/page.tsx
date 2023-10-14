"use client";
import React, {useState} from "react";
("");

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [artistName, setArtistName] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        const data = new FormData();
        data.set("file", file);
        data.set("Artist_name", artistName);

        const res = await fetch("/api/data/uploadArtist/", {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(errorText);
        }

        if (res.ok) {
            showUploadMessage();
        }
    };

    const showUploadMessage = () => {
        const concertUploadedMessage = document.getElementById(
            "concertUploadedMessage"
        );
        const uploadArtistForm = document.getElementById("uploadArtistForm");
        concertUploadedMessage?.classList.remove("hidden");
        concertUploadedMessage?.classList.add("grid"); // Add the "grid" class to make it visible
        uploadArtistForm?.classList.add("hidden");
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex-col items-center flex">
            <form
                id="uploadConcertForm"
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

                <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <input
                    className="brand_gradient px-4 py-2 cursor-pointer text-white rounded-full w-72"
                    type="submit"
                    value="upload"
                />
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
