"use client";
import React, {useState, useEffect} from "react";
import { SlArrowLeft } from "react-icons/sl";
import Link from "../../../node_modules/next/link";
import axios from 'axios'

interface Venue {
    _id: string;
    venue_name: string;
}
interface Genre {
    _id: string;
    genre_name: string;
}

interface User {
    _id: string;
    isArtist: boolean;
  }

const UploadForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [concertName, setConcertName] = useState("");
    const [concertDate, setConcertDate] = useState("");
    const [concertStart, setConcertStart] = useState("");
    const [concertDoors, setConcertDoors] = useState("");
    const [concertDescription, setConcertDescription] = useState("");
    const [concertVenueId, setConcertVenueId] = useState("");
    const [concertVenueName, setConcertVenueName] = useState("");
    const [isArtist, setIsArtist] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Add state for visibility
    const [genres, setGenres] = useState<any[]>([]);
    const [artist, setArtist] = useState<any[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
    const [data, setData] = useState({
        username: "unknown",
        userId: null,
        userEmail: "unknown"
    });
    const [user, setUser] = React.useState({
        newpassword: "",
        email: "",
        password: "",
        confirmpassword: "",
        newUsername: "",
    });

    useEffect(() => {
        fetchVenues();
        fetchGenres();
        getUserDetails()
    }, []);

    const fetchVenues = async () => {
        try {
            const response = await fetch("/api/data/venueData");
            if (response.ok) {
                const data = await response.json();
                setVenues(data.data as Venue[]);
                console.log(data)
            }
        } catch (error) {
            console.error("Error fetching venues: ", error);
        }
    };
    

    const fetchGenres = async () => {
        try {
            const response = await fetch("/api/data/genreData");
            if (response.ok) {
                const data = await response.json();
                setGenres(data.data as Genre[]);
            }
        } catch (error) {
            console.error("Error fetching artists: ", error);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/cookieUser");
            console.log(res.data);
            const userData = res.data.data;
            const adminData: User = res.data.data;
            if (adminData.isArtist) {
                setIsArtist(true)
            } 
            setGenres(res.data.data.genres);
            setArtist(res.data.data.artist);
            
            setData({
                username: userData.username,
                userId: userData._id,
                userEmail: userData.email,
            });
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        const data = new FormData();
        data.set("file", file);
        data.set("Concert_artist_name", artist[0].artist_name);
        data.set("Concert_artist_email", artist[0].artist_email);
        data.set("Concert_artist_id", artist[0]._id);
        data.set("Concert_genre_id", artist[0].artist_genre[0].genre_id);
        data.set("Concert_genre_name", artist[0].artist_genre[0].genre_name);
        data.set("Concert_name", concertName);
        data.set("Concert_date", concertDate);
        data.set("Concert_start", concertStart);
        data.set("Concert_doors", concertDoors);
        data.set("Concert_description", concertDescription);
        data.set("Concert_venue_id", selectedVenue!._id);
        data.set("Concert_venue_name", selectedVenue!.venue_name);
        data.set("isVisible", isVisible.toString());

        const res = await fetch("/api/data/uploadConcert/", {
            method: "POST",
            body: data,
        });

        const responseData = await res.json();
        
        if (responseData.success) {
            // Upload successful, show success message or perform other actions
            setLoading(false);
            showUploadMessage();
        } else {
            // Upload failed, display error message to the user
            setError(responseData.error || "Error uploading artist.");
            setLoading(false);
        }
    };

    const showUploadMessage = () => {
        const concertUploadedMessage = document.getElementById(
            "concertUploadedMessage"
        );
        const uploadConcertForm = document.getElementById("uploadConcertForm");
        concertUploadedMessage?.classList.remove("hidden");
        concertUploadedMessage?.classList.add("grid"); // Add the "grid" class to make it visible
        uploadConcertForm?.classList.add("hidden");
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex flex-col w-full md:w-4/6 gap-6 mb-24">
            <h1 className="dark:text-white font-bold text-3xl">Upload a concert / <span className="text-[#5311BF] dark:text-purple-500">{data.username}</span></h1>
            {artist.map((artist: any) => (
            <form
                id="uploadConcertForm"
                className="flex flex-col gap-8 w-full"
                onSubmit={onSubmit}
            >

                {/* Concert artist */}
                <p className="mt-8 text-sm"><span className="brand_purple dark:text-purple-500">*</span> Theese values can not be changed.</p>
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_name" className="text-sm">Concert artist <span className="brand_purple dark:text-purple-500">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_name"
                        name="artist_name"
                        value={artist.artist_name}
                        readOnly
                    />
                </div>

                <div className="hidden">
                    <label htmlFor="artist_name" className="text-sm">Concert artist <span className="brand_purple text-2xl">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_email"
                        name="artist_email"
                        value={artist.artist_email}
                        readOnly
                    />
                </div>

                <div className="hidden">
                    <label htmlFor="artist_name">Concert artist <span className="brand_purple text-2xl">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_name"
                        name="artist_name"
                        value={artist._id}
                        readOnly
                    />
                </div>

                {/* Concert genre */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="genre" className="text-sm">Concert genre <span className="brand_purple dark:text-purple-500">*</span></label>
                    <input
                        className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="genre"
                        name="genre"
                        value={artist.artist_genre[0].genre_name}
                        readOnly
                    />
                </div>

                {/* Concert name */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_name" className="text-sm">Concert name</label>
                    <input
                        className="input_field"
                        type="text"
                        name="Concert_name"
                        value={concertName}
                        onChange={(e) => setConcertName(e.target.value)}
                        placeholder="Concert Name"
                    />
                </div>

                {/* Concert date */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_date" className="text-sm">Concert date:</label>
                    <input
                        className="input_field"
                        type="date"
                        name="Concert_date"
                        value={concertDate}
                        onChange={(e) => setConcertDate(e.target.value)}
                        placeholder="Concert Date"
                    />
                </div>

                {/* Concert start time */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_start" className="text-sm">Concert start time:</label>
                    <input
                        className="input_field"
                        type="time"
                        name="Concert_start"
                        value={concertStart}
                        onChange={(e) => setConcertStart(e.target.value)}
                        placeholder="Concert start time"
                    />
                </div>

                {/* Doors open */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_doors" className="text-sm">Doors open at:</label>
                    <input
                        className="input_field"
                        type="time"
                        name="Concert_doors"
                        value={concertDoors}
                        onChange={(e) => setConcertDoors(e.target.value)}
                        placeholder="Concert Doors"
                    />
                </div>

                {/* Description */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_description" className="text-sm">
                        Concert description
                    </label>
                    <input
                        className="input_field"
                        type="text"
                        name="Concert_description"
                        value={concertDescription}
                        onChange={(e) => setConcertDescription(e.target.value)}
                        placeholder="Concert Description"
                    />
                </div>


                {/* Select venue */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_venue" className="text-sm">Venue</label>
                    <select
                        className="input_field"
                        value={selectedVenue ? selectedVenue._id : ""}
                        onChange={(e) =>
                            setSelectedVenue(
                                venues.find(
                                    (venue) => venue._id === e.target.value
                                ) || null
                            )
                        }
                    >
                        <option value="">Select a venue</option>
                        {venues && venues.map((venue) => (
                            <option key={venue._id} value={venue._id}>
                                {venue.venue_name}
                            </option>
                        ))}
                    </select>
                    
                    <input
                        readOnly={true}
                        className="hidden"
                        type="text"
                        name="Concert_venue_name"
                        value={selectedVenue ? selectedVenue.venue_name : ""}
                        onChange={(e) => setConcertVenueName(e.target.value)}
                        placeholder="venue Name"
                    />

                    <input
                        readOnly={true}
                        className="hidden"
                        type="text"
                        name="Concert_venue_id"
                        value={selectedVenue ? selectedVenue._id : ""}
                        onChange={(e) => setConcertVenueId(e.target.value)}
                        placeholder="Venue ID"
                    />

                    <div className="flex items-center gap-4 mt-8">
                    <label htmlFor="isVisible" className="text-base brand_purple dark:text-purple-500">A visible concert that can be seen by everyone</label>
                    <input
                        type="checkbox"
                        id="isVisible"
                        name="isVisible"
                        className="bg-purple-100 brand_purple dark:text-purple-500"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                    />
                    </div>
                </div>

                {/* Upload image */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="file" className="text-sm">Upload image</label>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                <button
                    className="primary_btn mt-4"
                    type="submit"
                    value="upload"
                >
                    {loading ? "Processing" : "Confirm and upload concert"}
                </button>

                {error && (
                    <div className="pt-4">
                        <h2 className=" text-red-500">{error}</h2>
                    </div>
                )}
            </form>
            ))}

            <div id="concertUploadedMessage" className="hidden">
                <h2 className="text-2xl">Concert uploaded successfully 🎉</h2>
                <div className="flex gap-4 mt-8">
                    <a
                        className="primary_btn"
                        href="/user-upload-concert"
                    >
                        Upload another
                    </a>
                    <a
                        className="secondary_btn"
                        href="/concerts"
                    >
                        See all concerts
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UploadForm;