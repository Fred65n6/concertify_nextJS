"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Progress } from "flowbite-react";
import { SiFacebook, SiGoogle, SiApple } from "react-icons/si";
import { CgClose } from "react-icons/cg";
import Link from "../../../node_modules/next/link";


interface Genre {
  _id: string;
  genre_name: string;
}

interface ShowGenresProps {
  onSubmit: (selectedGenres: string[], email: string) => void;
}

interface Venue {
  _id: string;
  venue_name: string;
}

interface ShowVenuesProps {
  onSubmit: (selectedVenues: string[], email: string) => void;
}

export default function SignupPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    confirmpassword: "",
  });

  const openLoginModule = () => {
    const loginModule = document.getElementById("login_module");
    const signupModule = document.getElementById("signup_module");
    signupModule?.classList.add("hidden");
    loginModule?.classList.remove("hidden");
    loginModule?.classList.add("grid");
  };

  const closeSignupModule = () => {
    const signupModule = document.getElementById("signup_module");
    signupModule?.classList.add("hidden");
    signupModule?.classList.remove("grid");
  };

  // Send information til API'en signup
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      showWelcomePopup();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred during signup.");
      }
      console.log("API signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  const showWelcomePopup = () => {
    const welcomePopup = document.getElementById("welcome_popup");
    const signUpForm = document.getElementById("signup_form");
    if (welcomePopup) {
      welcomePopup.classList.remove("hidden");
      welcomePopup.classList.add("block");
      signUpForm?.classList.add("hidden");
    }
  };

  const closeSignup = () => {
    const signUpWindow = document.getElementById("signup_module");
    if (signUpWindow) {
      signUpWindow.classList.add("hidden");
      signUpWindow.classList.remove("grid");
    }
  }


  const showProfileGenres = () => {
    const profileGenres = document.getElementById("profile_genres");
    const welcomePopup = document.getElementById("welcome_popup");
    if (profileGenres) {
      profileGenres.classList.remove("hidden");
      profileGenres.classList.add("grid");
      welcomePopup?.classList.add("hidden");
    }
  };

  const showProfileVenues = () => {
    const profileVenues = document.getElementById("profile_venues");
    const profileGenres = document.getElementById("profile_genres");
    if (profileVenues) {
      profileVenues.classList.remove("hidden");
      profileVenues.classList.add("block");
      profileGenres?.classList.add("hidden");
    }
  };

  const showMessage = () => {
    const verifiedMessage = document.getElementById("verified_message");
    const signUpForm = document.getElementById("signup_form");
    const profileGenres = document.getElementById("profile_genres");
    const profileVenues = document.getElementById("profile_venues");
    if (verifiedMessage) {
      verifiedMessage.classList.remove("hidden");
      verifiedMessage.classList.add("block");
      signUpForm?.classList.add("hidden");
      profileGenres?.classList.add("hidden");
      profileVenues?.classList.add("hidden");
    }
    console.log("showMessage");
  };

  //DISABLE SIGNUP KNAP, HVIS FELTER IKKE ER UDFYLDT

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.confirmpassword.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    fetchData();
    fetchVenueData();
  }, [user]);

  const fetchVenueData = async () => {
    try {
        const response = await axios.get("/api/data/genreData");
        setGenres(response.data.data);
        console.log(response);
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
  };

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

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    setSelectedGenres([...selectedGenres, selectedGenre]);
    setSelectedGenre(""); 
  };

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

  const handleRemoveGenre = (index: number) => {
    const updatedGenres = [...selectedGenres];
    updatedGenres.splice(index, 1);
    setSelectedGenres(updatedGenres);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const genresWithIds = genres
        .filter((genre) => selectedGenres.includes(genre.genre_name))
        console.log(genresWithIds)
        console.log(user.email)
        showProfileVenues()
      await axios.post("/api/data/addGenre", {
        selectedGenres: genresWithIds,
        email: user.email
      });
      console.log('user genre added')
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleVenueSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const venuesWithIds = venues
        .filter((venue) => selectedVenues.includes(venue.venue_name))
        console.log(venuesWithIds)
        console.log(user.email)
      await axios.post("/api/data/addVenue", {
        selectedVenues: venuesWithIds,
        email: user.email
      });
      console.log('user venue added')
      showMessage();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  
  return (
    <>
      <div id="signup_module" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50"      >
        <div id="signup_form">
          <div className="p-10 mx-4 md:m-0 flex flex-col items-center w-fill md:w-[800px] bg-white rounded-lg dark:bg-[#202124]">
            <button
                  type="button"
                  onClick={closeSignupModule}
                  className="cursor-pointer ml-[100%]"
                  >
                  <CgClose/>
              </button>

              <span className="mb-4 text-3xl font-bold dark:text-black">
                {loading ? "Processing" : "Sign up"}
              </span>
              <p className="mb-6">To get a personalised experience</p>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <label htmlFor="username" className="w-fit text-sm text-gray-600">Username</label>
                    <input
                      className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                      type="text"
                      id="username"
                      value={user.username}
                      onChange={(e) => setUser({ ...user, username: e.target.value })}
                      placeholder="Username"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="email" className="w-fit text-sm text-gray-600">Email</label>
                  <input
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                  />
                </div>

                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="password" className="w-fit text-sm text-gray-600">Password</label>
                  <input
                  className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                  />
                </div>

                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="confirmpassword" className="w-fit text-sm text-gray-600">Confirm password</label>
                  <input
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                    type="password"
                    id="confirmpassword"
                    value={user.confirmpassword}
                    onChange={(e) =>
                      setUser({ ...user, confirmpassword: e.target.value })
                    }
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {error && <div className="text-red-500">{error}</div>}
            
            <button
              onClick={onSignup}
              className="mb-4 mt-8 brand_gradient px-12 py-4 rounded-full text-white"
            >
              {buttonDisabled ? "Please fill out all fields to sign up..." : "Sign up"}
            </button>

            <div className="flex gap-4">
              <span></span>
              <Link href="/">
                <SiGoogle
                  className="fill-gray-600 dark:fill-[#5311BF] w-6 h-6"
                  id="google"
                />
              </Link>
              <Link href="/">
                <SiFacebook
                  className="fill-gray-600 dark:fill-[#5311BF] w-6 h-6"
                  id="facebook"
                />
              </Link>
              <Link href="/">
                <SiApple
                  className="fill-gray-600 dark:fill-[#5311BF] w-6 h-6"
                  id="apple"
                />
              </Link>
            </div>

            <div className="grid gap-4 text-center mt-4">
              <p>
                Already have an account?
                <button
                  type="button"
                  className="text-purple-700 hover:underline pl-1"
                  onClick={openLoginModule}
                >
                  Go to login
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* WELCOME POPUP */}
        <div id="welcome_popup" className="hidden">
          <div className="flex flex-col items-center justify-center py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <img className="my-10" src="../concertify_logo.svg" alt="" />
            <h1 className="my-4 text-3xl font-bold">
              Welcome {user.username}!
            </h1>
            <p className="mb-6 text-center mx-2">
              Great to have you on board! Lets personalize your experience in 2
              simple steps.
            </p>
            <button
              onClick={showProfileGenres}
              className="mb-4 mt-2 brand_gradient px-12 py-4 rounded-full text-white"
            >
              Get Started
            </button>
          </div>
        </div>


        {/* PROFILE GENRES MODUL */}
        <div id="profile_genres" className="m-auto hidden">
          <div className="flex flex-col items-center justify-center py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <div className="w-[300px] lg:w-[500px] mb-10">
              <Progress color="purple" progress={33} />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-center mx-6">
              What music genres do you like?
            </h1>
            <p className="mb-6 text-center mx-6">
              Get your own personalized recommendations
            </p>

            <div>
      
            <form className="grid gap-2 m-auto" action="" onSubmit={handleSubmit}>
            
            <select
                className="p-4 m-auto"
                id="genreSelect"
                onChange={handleGenreChange}
                value={selectedGenre}
              >
                <option value="">Select your favourite genres</option>
                {genres.map((genre) => (
                  <option key={genre._id} value={genre.genre_name}>
                    {genre.genre_name}
                  </option>
                ))}
              </select>
            

              <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8 pb-40 pt-10">
          {selectedGenres.map((genre, index) => (
            <div key={index} className="relative">
              <input
              className="border-2 w-40 border-purple-700 brand_purple py-2 px-2 text-center rounded-full"
              type="text"
                value={genre}
                readOnly 
              />
              <button
                type="button"
                onClick={() => handleRemoveGenre(index)}
                className="absolute -top-1 text-xl brand_purple -right-0 p-2 cursor-pointer"
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
                readOnly
                className="hidden"
              />

                <button type="submit" value="upload" className="rounded-full bg-purple-700 text-white px-4 py-2 m-auto">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>


        {/* PROFILE VENUES MODUL */}

        <div id="profile_venues" className="m-auto hidden">
          <div className="flex flex-col items-center justify-center py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <div className="w-[300px] lg:w-[500px] mb-10">
              <Progress color="purple" progress={66} />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-center mx-6">
              What music venues do you like?
            </h1>
            <p className="mb-6 text-center mx-6">
              Get your own personalized recommendations
            </p>
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
              className="border-2 w-40 border-purple-700 brand_purple py-2 px-2 text-center rounded-full"
              type="text"
              value={venue}
              readOnly
            />
            <button
              type="button"
              onClick={() => handleRemoveVenue(index)}
              className="absolute -top-1 text-xl brand_purple -right-0 p-2 cursor-pointer"
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
        readOnly
      />
      
      <button type="submit" value="upload" className="rounded-full bg-purple-700 text-white px-4 py-2 m-auto">
        Submit
      </button>
    </form>
          </div>
        </div>

        {/* USER SIGN UP DONE */}

        <div id="verified_message" className="hidden">
          <div className="flex flex-col items-center justify-center pt-4 py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <div className="w-[300px] lg:w-[500px] mt-10">
              <Progress color="purple" progress={100} />
            </div>
            <h1 className="text-2xl text-center mx-6 mt-10">
              We've send a link to your email, to verify your account.
            </h1>
            <p className="mt-5 mb-10 text-center">
              Please click that link and login to your account to complete🎉🎉
            </p>
            <button onClick={closeSignup} className="mb-4 mt-2 brand_gradient px-12 py-4 rounded-full text-white">Close window</button>
          </div>
        </div>
      </div>
    </>
  );
}
