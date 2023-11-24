'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Venue {
  _id: string;
  venue_name: string;
}

interface ShowVenuesProps {
  onSubmit: (selectedVenues: string[], email: string) => void;
}

const ShowVenues: React.FC<ShowVenuesProps> = ({ onSubmit }) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    confirmpassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: Venue[] }>("/api/data/venueData");
        setVenues(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setLoading(false);
        setError("Error fetching venues");
      }
    };
    fetchData();
  }, []);

  const handleVenueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVenue = event.target.value;
    setSelectedVenues([...selectedVenues, selectedVenue]);
    setSelectedVenue(""); 
  };

  const handleRemoveVenue = (index: number) => {
    const updatedVenues = [...selectedVenues];
    updatedVenues.splice(index, 1);
    setSelectedVenues(updatedVenues);
  };


  const handleVenueSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Modify the structure of selectedVenues to include both venue_name and _id
      const venuesWithIds = venues
        .filter((venue) => selectedVenues.includes(venue.venue_name))


        console.log(venuesWithIds)
        console.log(email)
      await axios.post("/api/data/addVenue", {
        selectedVenues: venuesWithIds,
        email,
      });
      console.log('user venue added')

      // ... (rest of the code remains unchanged)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <div>      
      <form action="" className="grid gap-2 m-auto" onSubmit={handleVenueSubmit}>
      <select
        className="p-4 m-auto"
        id="venueSelect"
        onChange={handleVenueChange}
        value={selectedVenue}
      >
        <option value="">Select a Venue</option>
        {venues.map((venue) => (
          <option key={venue._id} value={venue.venue_name}>
            {venue.venue_name}
          </option>
        ))}
      </select>

      <div className="grid m-auto xs:grid-cols-1 md:grid-cols-4 px-6 gap-8 mt-8 pb-20 pt-10">
        {selectedVenues.map((venue, index) => (
          <div key={index} className="relative">
            <input
              className="border-2 border-purple-700 brand_purple py-2 px-2 text-center rounded-full"
              type="text"
              value={venue}
              readOnly
            />
            <button
              type="button"
              onClick={() => handleRemoveVenue(index)}
              className="absolute top-0 right-0 p-2 cursor-pointer brand_purple"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      
      <input
        type="email"
        id="emailInput"
        value={user.email}
        className="hidden"
      />
      
      <button type="submit" value="upload" className="rounded-full bg-purple-700 text-white px-4 py-2 m-auto">
        Submit
      </button>
    </form>
    </div>
  );
};

export default ShowVenues;
