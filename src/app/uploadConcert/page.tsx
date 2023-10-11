"use client";

import {useState} from "react";

export default function UploadForm() {
    const [file, setFile] = useState<File>();
    const [concertArtist, setConcertArtist] = useState("");
    const [concertName, setConcertName] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        try {
            const data = new FormData();
            data.set("file", file);
            data.set("Concert_artist", concertArtist);
            data.set("Concert_name", concertName);

            const res = await fetch("/api/data/uploadConcert/", {
                method: "POST",
                body: data,
            });
            console.log("image uploaded");
            // handle the error
            if (!res.ok) throw new Error(await res.text());
        } catch (e: any) {
            // Handle errors here
            console.error(e);
        }
    };

    return (
        <form className="grid gap-4 items-center" onSubmit={onSubmit}>
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_artist"
                value={concertArtist}
                onChange={(e) => setConcertArtist(e.target.value)}
                placeholder="artist"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_name"
                value={concertName}
                onChange={(e) => setConcertName(e.target.value)}
                placeholder="name"
            />
            <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
            />
            <input
                className="brand_gradient text-white rounded-full py-2 px-4"
                type="submit"
                value="Upload"
            />
        </form>
    );
}
