'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Genre {
  _id: string;
  genre_name: string;
}

interface ShowGenresProps {
  onSubmit: (selectedGenres: string[], email: string) => void;
}

const ShowGenres: React.FC<ShowGenresProps> = ({ onSubmit }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
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
        const response = await axios.get<{ data: Genre[] }>("/api/data/genreData");
        setGenres(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setLoading(false);
        setError("Error fetching genres");
      }
    };
    fetchData();
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    setSelectedGenres([...selectedGenres, selectedGenre]);
    setSelectedGenre(""); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Modify the structure of selectedGenres to include both genre_name and _id
      const genresWithIds = genres
        .filter((genre) => selectedGenres.includes(genre.genre_name))


        console.log(genresWithIds)
        console.log(email)
      await axios.post("/api/data/addGenre", {
        selectedGenres: genresWithIds,
        email,
      });
      console.log('user genre added')

      // ... (rest of the code remains unchanged)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  if (loading) {
    return <div>Loading genres...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <label htmlFor="genreSelect">Select genres: </label>
      <select
        className="p-4"
        id="genreSelect"
        onChange={handleGenreChange}
        value={selectedGenre}
      >
        <option value="">Select a Genre</option>
        {genres.map((genre) => (
          <option key={genre._id} value={genre.genre_name}>
            {genre.genre_name}
          </option>
        ))}
      </select>

    <form action="" onSubmit={handleSubmit}>
      <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8 pb-40 pt-10">
        {selectedGenres.map((genre, index) => (
          <input
            className="brand_gradient text-white py-2 px-2 text-center rounded-full"
            type="text"
            value={genre}
            key={index}
            readOnly 
          />
        ))}
      </div>

      <label htmlFor="emailInput">Email: </label>
      <input
        type="email"
        id="emailInput"
        value={user.email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2"
      />

      <button type="submit" value="upload" className="rounded-full mt-4 bg-purple-700 text-white px-4 py-2 ml-4">
        Submit
      </button>
      </form>
    </div>
  );
};

export default ShowGenres;
