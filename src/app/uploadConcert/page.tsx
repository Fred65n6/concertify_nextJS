"use client";

import {useState} from "react";

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File>();
    const [concertName, setConcertName] = useState("");
    const [concertDescription, setConcertDescription] = useState("");
    const [concertGenreId, setConcertGenreId] = useState("");
    const [concertGenreName, setConcertGenreName] = useState("");
    const [concertArtistId, setConcertArtistId] = useState("");
    const [concertArtistName, setConcertArtistName] = useState("");
    // const [concertVenueName, setConcertVenueName] = useState("");
    // const [concertVenueID, setConcertVenueID] = useState("");
    // const [concertArtistName, setConcertArtistName] = useState("");
    // const [concertArtistID, setConcertArtistID] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        try {
            const data = new FormData();
            data.set("file", file);
            data.set("Concert_name", concertName);
            data.set("Concert_description", concertDescription);
            data.set("Concert_genre_id", concertGenreId);
            data.set("Concert_genre_name", concertGenreName);
            data.set("Concert_artist_id", concertArtistId);
            data.set("Concert_artist_name", concertArtistName);
            // data.set("Concert_artist_name", concertArtistName);
            // data.set("Concert_artist_id", concertArtistID);
            // data.set("Concert_venue_name", concertVenueName);
            // data.set("Concert_venue_id", concertVenueID);

            const res = await fetch("/api/data/uploadConcert/", {
                method: "POST",
                body: data,
            });
            console.log("concert uploaded");
            // handle the error
            if (!res.ok) throw new Error(await res.text());
        } catch (e: any) {
            // Handle errors here
            console.error(e);
        }
    };

    return (
        <form className="grid gap-4 items-center pb-12" onSubmit={onSubmit}>
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_name"
                value={concertName}
                onChange={(e) => setConcertName(e.target.value)}
                placeholder="Concert Name"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_description"
                value={concertDescription}
                onChange={(e) => setConcertDescription(e.target.value)}
                placeholder="Concert Description"
            />

            {/* <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_artist_name"
                value={concertArtistName}
                onChange={(e) => setConcertArtistName(e.target.value)}
                placeholder="Artist Name"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_artist_id"
                value={concertArtistID}
                onChange={(e) => setConcertArtistID(e.target.value)}
                placeholder="Artist ID"
            /> */}
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_artist_name"
                value={concertArtistName}
                onChange={(e) => setConcertArtistName(e.target.value)}
                placeholder="Artist Name"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_artist_id"
                value={concertArtistId}
                onChange={(e) => setConcertArtistId(e.target.value)}
                placeholder="Artist ID"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_genre_name"
                value={concertGenreName}
                onChange={(e) => setConcertGenreName(e.target.value)}
                placeholder="Genre Name"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_genre_id"
                value={concertGenreId}
                onChange={(e) => setConcertGenreId(e.target.value)}
                placeholder="Genre ID"
            />
            {/* <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_venue_name"
                value={concertVenueName}
                onChange={(e) => setConcertVenueName(e.target.value)}
                placeholder="Venue Name"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_venue_id"
                value={concertVenueID}
                onChange={(e) => setConcertVenueID(e.target.value)}
                placeholder="Venue ID"
            /> */}
            <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
            />

            <input
                className="brand_gradient text-white rounded-full py-2 px-4 mt-8"
                type="submit"
                value="Upload"
            />
        </form>
    );
};

export default UploadForm;
