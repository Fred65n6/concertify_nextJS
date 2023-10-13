"use client";
import React, {useState, useEffect} from "react";
interface Artist {
    _id: string;
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

        const data = new FormData();
        data.set("file", file);
        data.set("Concert_name", concertName);
        data.set("Concert_date", concertDate);
        data.set("Concert_start", concertStart);
        data.set("Concert_doors", concertDoors);
        data.set("Concert_description", concertDescription);
        data.set("Concert_genre_id", selectedGenre!._id);
        data.set("Concert_genre_name", selectedGenre!.genre_name);
        data.set("Concert_artist_id", selectedArtist!._id);
        data.set("Concert_artist_name", selectedArtist!.artist_name);
        data.set("Concert_venue_id", selectedVenue!._id);
        data.set("Concert_venue_name", selectedVenue!.venue_name);

        const res = await fetch("/api/data/uploadConcert/", {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(errorText);
        }
    };

    return (
        <form className="grid gap-6 items-center pb-12" onSubmit={onSubmit}>
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
                type="date"
                name="Concert_date"
                value={concertDate}
                onChange={(e) => setConcertDate(e.target.value)}
                placeholder="Concert Date"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="time"
                name="Concert_start"
                value={concertStart}
                onChange={(e) => setConcertStart(e.target.value)}
                placeholder="Concert start time"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="time"
                name="Concert_doors"
                value={concertDoors}
                onChange={(e) => setConcertDoors(e.target.value)}
                placeholder="Concert Doors"
            />
            <input
                className="bg-slate-100 p-4 w-72"
                type="text"
                name="Concert_description"
                value={concertDescription}
                onChange={(e) => setConcertDescription(e.target.value)}
                placeholder="Concert Description"
            />
            <select
                className="p-4 w-72"
                value={selectedArtist ? selectedArtist._id : ""}
                onChange={(e) =>
                    setSelectedArtist(
                        artists.find(
                            (artist) => artist._id === e.target.value
                        ) || null
                    )
                }
            >
                <option value="">Select an artist</option>
                {artists.map((artist) => (
                    <option key={artist._id} value={artist._id}>
                        {artist.artist_name}
                    </option>
                ))}
            </select>
            <input
                readOnly={true}
                className="bg-slate-300 p-4 w-72 text-slate-500"
                type="text"
                name="Concert_artist_name"
                value={selectedArtist ? selectedArtist.artist_name : ""}
                onChange={(e) => setConcertArtistName(e.target.value)}
                placeholder="Artist Name"
            />

            <input
                readOnly={true}
                className="bg-slate-300 p-4 w-72 text-slate-500"
                type="text"
                name="Concert_artist_id"
                value={selectedArtist ? selectedArtist._id : ""}
                onChange={(e) => setConcertArtistId(e.target.value)}
                placeholder="Artist ID"
            />
            <select
                className="p-4 w-72"
                value={selectedVenue ? selectedVenue._id : ""}
                onChange={(e) =>
                    setSelectedVenue(
                        venues.find((venue) => venue._id === e.target.value) ||
                            null
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
                className="bg-slate-300 p-4 w-72 text-slate-500"
                type="text"
                name="Concert_venue_name"
                value={selectedVenue ? selectedVenue.venue_name : ""}
                onChange={(e) => setConcertVenueName(e.target.value)}
                placeholder="venue Name"
            />
            <input
                readOnly={true}
                className="bg-slate-300 p-4 w-72 text-slate-500"
                type="text"
                name="Concert_venue_id"
                value={selectedVenue ? selectedVenue._id : ""}
                onChange={(e) => setConcertVenueId(e.target.value)}
                placeholder="Venue ID"
            />
            <select
                className="p-4 w-72"
                value={selectedGenre ? selectedGenre._id : ""}
                onChange={(e) =>
                    setSelectedGenre(
                        genres.find((genre) => genre._id === e.target.value) ||
                            null
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
                className="bg-slate-300 p-4 w-72 text-slate-500"
                type="text"
                name="Concert_genre_name"
                value={selectedGenre ? selectedGenre.genre_name : ""}
                onChange={(e) => setConcertGenreName(e.target.value)}
                placeholder="venue Name"
            />
            <input
                readOnly={true}
                className="bg-slate-300 p-4 w-72 text-slate-500"
                type="text"
                name="Concert_genre_id"
                value={selectedGenre ? selectedGenre._id : ""}
                onChange={(e) => setConcertGenreId(e.target.value)}
                placeholder="Venue ID"
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
    );
};

export default UploadForm;
