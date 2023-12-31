"use client";
import React, {useState, useEffect} from "react";
import { SlArrowLeft } from "react-icons/sl";
import Link from "../../../node_modules/next/link";

interface Artist {
    artist_id: string;
    artist_name: string;
    // Add more artist properties as needed
}
interface Venue {
    _id: string;
    venue_name: string;
    // Add more artist properties as needed
}
interface Genre {
    _id: string;
    genre_name: string;
    // Add more artist properties as needed
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
    const [concertGenreId, setConcertGenreId] = useState("");
    const [concertGenreName, setConcertGenreName] = useState("");
    const [concertArtistId, setConcertArtistId] = useState("");
    const [concertArtistName, setConcertArtistName] = useState("");
    const [concertVenueId, setConcertVenueId] = useState("");
    const [concertVenueName, setConcertVenueName] = useState("");
    const [isVisible, setIsVisible] = useState(true); // Add state for visibility

    const [artists, setArtists] = useState<Artist[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

    const [venues, setVenues] = useState<Venue[]>([]);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch("/api/data/artistData");
                if (response.ok) {
                    const data = await response.json();
                    setArtists(data.data as Artist[]);
                }
            } catch (error) {
                console.error("Error fetching artists: ", error);
            }
        };

        fetchArtists();
    }, []);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch("/api/data/venueData");
                if (response.ok) {
                    const data = await response.json();
                    setVenues(data.data as Venue[]);
                }
            } catch (error) {
                console.error("Error fetching artists: ", error);
            }
        };

        fetchVenues();
    }, []);

    useEffect(() => {
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

        fetchGenres();
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        const data = new FormData();
        data.set("file", file);
        data.set("Concert_name", concertName);
        data.set("Concert_date", concertDate);
        data.set("Concert_start", concertStart);
        data.set("Concert_doors", concertDoors);
        data.set("Concert_description", concertDescription);
        data.set("Concert_genre_id", selectedGenre!._id);
        data.set("Concert_genre_name", selectedGenre!.genre_name);
        data.set("Concert_artist_id", selectedArtist!.artist_id);
        data.set("Concert_artist_name", selectedArtist!.artist_name);
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
            <Link
                className="flex align-middle gap-2"
                href="/admin-concerts"
            >
            <SlArrowLeft
                className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1"
                id="arrow_right"
                />
                Back to concerts overview
            </Link>
            <h1 className="font-bold text-4xl pb-4">Upload a concert</h1>
            <form
                id="uploadConcertForm"
                className="flex flex-col gap-8 w-full"
                onSubmit={onSubmit}
            >
                {/* Concert name */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_name">Concert name</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        name="Concert_name"
                        value={concertName}
                        onChange={(e) => setConcertName(e.target.value)}
                        placeholder="Concert Name"
                    />
                </div>

                {/* Concert date */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_date">Concert date:</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="date"
                        name="Concert_date"
                        value={concertDate}
                        onChange={(e) => setConcertDate(e.target.value)}
                        placeholder="Concert Date"
                    />
                </div>

                {/* Concert start time */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_start">Concert start time:</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="time"
                        name="Concert_start"
                        value={concertStart}
                        onChange={(e) => setConcertStart(e.target.value)}
                        placeholder="Concert start time"
                    />
                </div>

                {/* Doors open */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_doors">Doors open at:</label>
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
                    <label htmlFor="Concert_description">
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

                {/* Select artist */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_artist">Artist</label>
                    <select
                        className="input_field"
                        value={selectedArtist ? selectedArtist.artist_id : ""}
                        onChange={(e) =>
                            setSelectedArtist(
                                artists.find(
                                    (artist) => artist.artist_id === e.target.value
                                ) || null
                            )
                        }
                    >
                        <option value="">Select an artist</option>
                        {artists.map((artist) => (
                            <option key={artist.artist_id} value={artist.artist_id}>
                                {artist.artist_name}
                            </option>
                        ))}
                    </select>
                    <input
                        readOnly={true}
                        className="hidden"
                        type="text"
                        name="Concert_artist_name"
                        value={selectedArtist ? selectedArtist.artist_name : ""}
                        onChange={(e) => setConcertArtistName(e.target.value)}
                        placeholder="Artist Name"
                    />

                    <input
                        readOnly={true}
                        className="hidden"
                        type="text"
                        name="Concert_artist_id"
                        value={selectedArtist ? selectedArtist.artist_id : ""}
                        onChange={(e) => setConcertArtistId(e.target.value)}
                        placeholder="Artist ID"
                    />
                </div>

                {/* Select venue */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_venue">Venue</label>
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
                        {venues.map((venue) => (
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
                </div>

                {/* Select genre */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="Concert_genre">Genre</label>
                    <select
                        className="input_field"
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
                        className="hidden"
                        type="text"
                        name="Concert_genre_name"
                        value={selectedGenre ? selectedGenre.genre_name : ""}
                        onChange={(e) => setConcertGenreName(e.target.value)}
                        placeholder="venue Name"
                    />
                    <input
                        readOnly={true}
                        className="hidden"
                        type="text"
                        name="Concert_genre_id"
                        value={selectedGenre ? selectedGenre._id : ""}
                        onChange={(e) => setConcertGenreId(e.target.value)}
                        placeholder="Venue ID"
                    />

                    <div className="flex items-center gap-4 mt-8">
                    <label htmlFor="isVisible" className="text-base text-purple-800">* Uncheck this box if you don't want the concert to be public yet:</label>
                    <input
                        type="checkbox"
                        id="isVisible"
                        name="isVisible"
                        className="bg-purple-800 text-purple-800"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                    />
                    </div>
                </div>

                {/* Upload image */}
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                <button
                    className="primary_btn"
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

            <div id="concertUploadedMessage" className="hidden">
                <h2 className="text-2xl">Concert uploaded successfully 🎉</h2>
                <div className="flex gap-4 mt-8">
                    <a
                        className="primary_btn"
                        href="/admin-upload-concert"
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
