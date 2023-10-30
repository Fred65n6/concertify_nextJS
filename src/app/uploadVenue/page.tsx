"use client";
import React, {useState} from "react";
("");

const UploadForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [venueName, setVenueName] = useState("");
    const [venueAddress, setVenueAddress] = useState("");
    const [venueSize, setVenueSize] = useState("");
    const [venueLocation, setVenueLocation] = useState("");
    const [venueDescription, setVenueDescription] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        const data = new FormData();
        data.set("file", file);
        data.set("Venue_name", venueName);
        data.set("Venue_address", venueAddress);
        data.set("Venue_size", venueSize);
        data.set("Venue_location ", venueLocation);
        data.set("Venue_description", venueDescription);

        const res = await fetch("/api/data/uploadVenue/", {
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
        const venueUploadedMessage = document.getElementById(
            "venueUploadedMessage"
        );
        const uploadVenueForm = document.getElementById("uploadVenueForm");
        venueUploadedMessage?.classList.remove("hidden");
        venueUploadedMessage?.classList.add("grid");
        uploadVenueForm?.classList.add("hidden");
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex-col items-center flex">
            <form
                id="uploadVenueForm"
                className="flex flex-col items-center gap-8 pb-12"
                onSubmit={onSubmit}
            >
                <input
                    className="bg-slate-100 p-4 w-72"
                    type="text"
                    name="Venue_name"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="Venue Name"
                />

                <input
                    className="bg-slate-100 p-4 w-72"
                    type="text"
                    name="Venue_address"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="Venue address"
                />
                <input
                    className="bg-slate-100 p-4 w-72"
                    type="text"
                    name="Venue_location"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                    placeholder="Venue location (like KBH V)"
                />
                <input
                    className="bg-slate-100 p-4 w-72"
                    type="text"
                    name="Venue_size"
                    value={venueSize}
                    onChange={(e) => setVenueSize(e.target.value)}
                    placeholder="Venue size"
                />
                <input
                    className="bg-slate-100 p-4 w-72"
                    type="text"
                    name="Venue_description"
                    value={venueDescription}
                    onChange={(e) => setVenueDescription(e.target.value)}
                    placeholder="Venue description"
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
            <div id="venueUploadedMessage" className="gap-8 text-center hidden">
                <h2 className="text-2xl">Venue Uploaded!</h2>
                <a
                    className="brand_gradient py-2 px-4 text-white rounded-full"
                    href="/uploadVenue"
                >
                    Upload another
                </a>
            </div>
        </div>
    );
};

export default UploadForm;
