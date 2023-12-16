"use client";

import axios from "axios";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import ThemeSwitcher from "../../components/switchTheme/page";
import { CgClose } from "react-icons/cg";
import { SlLogout, SlClose, SlStar, SlMusicToneAlt, SlGlobeAlt, SlBubble, SlUser, SlTrash, SlPencil } from "react-icons/sl";
import Image from "next/image";
import User from "@/models/userModel"
import {PiBalloon} from "react-icons/pi";
import ConcertCard from "@/app/components/concertCard/page";
import Link from "../../../../node_modules/next/link";


interface Genre {
    _id: string;
    genre_name: string;
  }

interface Venue {
    _id: string;
    venue_name: string;
}

interface Artist {
    artist_name: string;
    artist_dob: string;
    artist_image: string;
    artist_nation: string;
    artist_full_namde: string;
    artist_genre:string;
}

interface User {
    _id: string;
    isArtist: boolean;
  }

  interface Concert {
    concert_id: string;
    concert_artist: {
        artist_id: string;
        artist_name: string;
        artist_instagram: string;
        artist_youtube: string;
        artist_facebook: string;
        artist_twitter: string;
        artist_spotify: string;
    };
    concert_date: string;
    concert_description: string;
    concert_image: string;
    concert_name: string;
    concert_start: string;
    concert_artist_email: string;
    concert_genre: {
        genre_id: string;
        genre_name: string;
    };
    concert_venue: {
        venue_id: string;
        venue_name: string;
        venue_address: string;
        venue_location: string;
    };
    concert_doors: string;
    isVisible: boolean;
}


export default function UserProfile({params}: any) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string>("");
    const [isArtist, setIsArtist] = useState(false);
    const [genres, setGenres] = useState<any[]>([]);
    const [venues, setVenues] = useState<any[]>([]);
    const [artist, setArtist] = useState<any[]>([]);
    const [concerts, setConcerts] = useState<any[]>([]);
    const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [concertName, setConcertName] = useState("");
    const [concertStart, setConcertStart] = useState("");
    const [concertDate, setConcertDate] = useState("");
    const [concertDescription, setConcertDescription] = useState("");
    const [concertDoors, setConcertDoors] = useState("");
    const [isVisible, setIsVisible] = useState(true); // Add state for visibility

    const [data, setData] = useState({
        username: "unknown",
        userId: "",
        userEmail: "unknown"
    });

    const [user, setUser] = React.useState({
        newpassword: "",
        email: "",
        password: "",
        confirmpassword: "",
        newUsername: "",
        _id: "",
    });

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get("/api/users/logout");
            console.log("log out successfull");
            localStorage.setItem('shouldReload', 'true');
            router.push("/");
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
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
            setVenues(res.data.data.venues);
            setArtist(res.data.data.artist);
            setConcerts(res.data.data.concerts);
            
            setData({
                username: userData.username,
                userId: userData._id,
                userEmail: userData.email,
            });
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getUserDetails();
        setUser({...user, email: data.userEmail, _id: data.userId});
    }, [data.userEmail, data.userId]);


    // -- MODAL FUNCTIONS
    const openChangePasswordModal = () => {
        const modal = document.getElementById("changePasswordModal");
        modal?.classList.remove("hidden");
        modal?.classList.add("grid");
    };

    const openChangeUsernamedModal = () => {
        const UsernameModal = document.getElementById("changeUsernameModal");
        UsernameModal?.classList.remove("hidden");
        UsernameModal?.classList.add("grid");
    };

    const openDeleteUserModal = () => {
        const modal = document.getElementById("deleteUserModal");
        modal?.classList.remove("hidden");
        modal?.classList.add("grid");
    };

    const closeUsernameModule = () => {
        const changeUsernameModule = document.getElementById("changeUsernameModal");
        changeUsernameModule?.classList.add("hidden");
        changeUsernameModule?.classList.remove("grid");
    };
      
    const closePasswordModule = () => {
        const modal = document.getElementById("changePasswordModal");
        modal?.classList.add("hidden");
        modal?.classList.remove("grid");
    };

    const closeDeleteUserModule = () => {
        const changeUsernameModule = document.getElementById("deleteUserModal");
        changeUsernameModule?.classList.add("hidden");
        changeUsernameModule?.classList.remove("grid");
    };

    const openEditModule = (concert: Concert) => {
        setSelectedConcert(concert);
        const deleteConcertModule = document.getElementById("edit_concert_id");
        deleteConcertModule?.classList.remove("hidden");
        deleteConcertModule?.classList.add("grid");
    };
    
    const closeEditModule = () => {
      const deleteConcertModule = document.getElementById("edit_concert_id");
      deleteConcertModule?.classList.add("hidden");
      deleteConcertModule?.classList.remove("grid");
    };

    const openDeleteModule = (concert: Concert) => {
        setSelectedConcert(concert);
        const deleteConcertModule = document.getElementById("delete_concert_id");
        deleteConcertModule?.classList.remove("hidden");
        deleteConcertModule?.classList.add("grid");
    };
    
    const closeDeleteModule = () => {
      const deleteConcertModule = document.getElementById("delete_concert_id");
      deleteConcertModule?.classList.add("hidden");
      deleteConcertModule?.classList.remove("grid");
    };

    const handleDeleteConcert = async (concertId: string, concertArtistEmail: string) => {
        try {
          const res = await fetch('/api/admin/deleteConcert', {
            method: 'DELETE',
            body: JSON.stringify({ concertId, concertArtistEmail }),
          });
      
          if (!res.ok) {
            const errorText = await res.text();
            console.error(errorText);
          } else {
            const result = await res.json();
            if (result.success) {
              console.log(result.message);
              setConcerts(elm => elm.filter(concert => concert.concert_id !== concertId));
      
              closeDeleteModule();
            } else {
              console.error(result.error);
            }
          }
        } catch (error) {
          console.error('Error deleting concert:', error);
        }
      };

    // -- CHANGE USERNAME
    const changeUsername = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/changeUsername",
                user
            );
            console.log("username changed", response.data);
        } catch (error: any) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred during signup.");
            }
            console.log("API signup failed", error);
        } finally {
            setLoading(false);
            closeUsernameModule();
            window.location.reload();

        }
    };

    // -- DELETE USER
    const deleteUser = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/deleteUser",
                { _id: user._id, password: user.password, email: user.email}
            );
            console.log("User deleted", response.data);
            logout();
        } catch (error) {
            console.error("Delete user failed", error);
        } finally {
            setLoading(false);
            closeUsernameModule();
        }
    };

    // -- CHANGE PASSWORD
    const changePassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/changePassword",
                user
            );
            console.log("password changed", response.data);
        } catch (error: any) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred during signup.");
            }
            console.log("API signup failed", error);
        } finally {
            setLoading(false);
            closeUsernameModule();
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
      
        if (file) {
            try {
                const data = new FormData();
                data.set("file", file);
                data.set("concert_name", concertName);
                data.set("concert_date", concertDate);
                data.set("concert_description", concertDescription);
                data.set("concert_start", concertStart);
                data.set("concert_doors", concertDoors);
                data.set("concert_id", selectedConcert!.concert_artist_email);
                data.set("concert_artist_email", selectedConcert!.concert_id);
                data.set("isVisible", isVisible.toString());
      
                console.log(data)
      
                const res = await fetch("/api/data/editConcert/", {
                    method: "POST",
                    body: data,
                });
      
                if (!res.ok) {
                    const errorText = await res.text();
                    console.error(errorText);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error uploading artist with file: ", error);
            }
        } else {
            try {
      
                const data = new FormData();
                data.set("concert_name", concertName);
                data.set("concert_date", concertDate);
                data.set("concert_description", concertDescription);
                data.set("concert_start", concertStart);
                data.set("concert_doors", concertDoors);
                data.set("concert_artist_email", selectedConcert!.concert_artist_email);
                data.set("concert_id", selectedConcert!.concert_id);
                data.set("isVisible", isVisible.toString());
      
                console.log(data)
            
                const res = await fetch("/api/data/editConcert/", {
                    method: "POST",
                    body: data,
                });
      
                if (!res.ok) {
                    const errorText = await res.text();
                    console.error(errorText);
                } else {
                    setLoading(false);
                    closeEditModule();
                    getUserDetails();
                }
            } catch (error) {
                console.error("Error uploading concert without file: ", error);
            }
        }
      };


    return (
        <div className="grid pt-8">
            <h1 className="dark:text-white font-bold text-3xl">Profile / <span className="text-[#5311BF] dark:text-purple-500">{data.username}</span></h1>
            
            {/* -- IF NORMAL USER: */}
            <section className="flex gap-4 mt-10">
                <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">
                    <h2 className="text-black font-bold text-xl">User info</h2>

                    <div className="flex flex-col item-center justify-between">
                        <p className="text-sm dark:text-black">Email:</p>
                        <div className="flex justify-between">
                            <span className="brand_purple">{data.userEmail}</span>
                           
                        </div>
                    </div>

                    <div className="flex flex-col item-center justify-between">
                        <p className="text-sm dark:text-black">Username:</p>
                        <div className="flex justify-between">
                            <span className="brand_purple">{data.username}</span>
                            <button onClick={openChangeUsernamedModal}>
                                <SlPencil className="dark:fill-black"/>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col item-center justify-between">
                        <p className="text-sm dark:text-black">Password:</p>
                        <div className="flex justify-between">
                            <span className="brand_purple">********</span>
                            <button onClick={openChangePasswordModal}>
                                <SlPencil className="dark:fill-black"/>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8 md:hidden">
                        <p className="text-sm dark:text-black">
                            Dark mode
                        </p>

                        <ThemeSwitcher/>
                    </div>
                </div>
            </section>

            {/* -- IF ARTIST: */}
            <section>
                {isArtist ? (
                <section className="mt-10 flex flex-col gap-12">
                    {/* -- ARTIST INFO */}
                    <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">   
                        <div className="w-full flex justify-between">
                            <h2 className="text-black font-bold text-xl"> Artist info</h2>
                            <button className="brand_purple"><a href="/edit-user-artist"><SlPencil className="fill-black"/></a></button>
                        </div>
                        <div className="flex flex-col w-full md:grid-cols-4 gap-8">
                            {artist.map((artist: any) => (
                                    <article className="w-full flex flex-col-reverse md:flex-row dark:text-black gap-8" key={artist.artist_name}>
                                        <Image
                                        src={`https://concertify.s3.eu-central-1.amazonaws.com/${artist.artist_image}`}
                                        width={200}
                                        height={200}
                                        alt="artist image"
                                        className="h-[400px] w-[400px] rounded-md object-cover"
                                        />
                                        <ul className="w-full grid gap-2">
                                            <li className="flex flex-col item-center ">
                                                <div className="flex gap-2 items-center">
                                                    <SlStar className="fill-black w-4 h-4" id="artist_name"/>
                                                    <p className="text-sm dark:text-black">Artist name:</p>
                                                </div>
                                                    <span className="text-base brand_purple pl-6">{artist.artist_name}</span>
                                            </li>

                                            <li className="flex flex-col item-center ">
                                                <div className="flex gap-2 items-center">
                                                    <SlUser className="fill-black w-4 h-4" id="artist_fullname"/>
                                                    <p className="text-sm dark:text-black">Full name:</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-base brand_purple pl-6">{artist.artist_full_name}</span>
                                                </div>
                                            </li>

                                            <li className="flex flex-col item-center ">
                                                <div className="flex gap-2 items-center">
                                                    <PiBalloon className="fill-black w-4 h-4" id="artist_dob"/>
                                                    <p className="text-sm dark:text-black">Date of birth:</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-base brand_purple pl-6">{artist.artist_dob}</span>
                                                </div>
                                            </li>
                                            
                                            <li className="flex flex-col item-center ">
                                                <div className="flex gap-2 items-center">
                                                    <SlMusicToneAlt className="fill-black w-4 h-4" id="artist_dob"/>
                                                    <p className="text-sm dark:text-black">Genre:</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-base brand_purple pl-6">{artist.artist_genre[0].genre_name}</span>
                                                </div>
                                            </li>

                                            <li className="flex flex-col item-center ">
                                                <div className="flex gap-2 items-center">
                                                    <SlGlobeAlt className="fill-black w-4 h-4" id="artist_dob"/>
                                                    <p className="text-sm dark:text-black">Nationality:</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-base brand_purple pl-6">{artist.artist_nation}</span>
                                                </div>
                                            </li>

                                            <li className="flex flex-col item-center ">
                                                <div className="flex gap-2 items-center">
                                                    <SlBubble className="fill-black w-4 h-4" id="artist_dob"/>
                                                    <p className="text-sm dark:text-black">Description:</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-base brand_purple pl-6">{artist.artist_description}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </article>
                                ))}
                        </div>
                    </div>

                    {/* CONCERTS */}
                    <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">
                        <div className="w-full flex justify-between">
                            <h2 className="text-black font-bold text-xl">Concerts</h2>
                        </div>
                        <div className="flex-col md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar">
                        {concerts.map((concerts: any) => (
                                <article className="flex-shrink-0 grid md:pt-8 pb-8" key={concerts.concert_id}>
                                    <Link href={"/concerts/" + concerts.concert_id} key={concerts.concert_id}>
                                        <Image
                                            src={`https://concertify.s3.eu-central-1.amazonaws.com/${concerts.concert_image}`}
                                            width={200}
                                            height={200}
                                            alt="concert"
                                            className="rounded-lg object-cover w-full h-[200px]"
                                        />
                                    </Link>

                                    <h4 className="text-black text-xl font-bold pt-2">{concerts.concert_name}</h4>
                                    <p className="text-black text-sm pt-2">{concerts.concert_date}</p>
                                    <p className="text-black text-sm pt-2">{concerts.concert_venue[0].venue_name}</p>
                                    <div className="flex gap-2 justify-end">
                                        <div className="text-right w-fit md:w-1/12">
                                            <button
                                                type="button"
                                                onClick={() => openEditModule(concerts)}
                                            ><SlPencil className="fill-[#5311BF]"/>
                                            </button>
                                        </div>

                                        <div className="text-right w-fit md:w-1/12">
                                            <button
                                                type="button"
                                                onClick={() => openDeleteModule(concerts)}
                                            >

                                                <SlTrash
                                                className="fill-[#5311BF] w-5 h-5"
                                                id="deleteConcert"
                                                value="upload"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                        ))}
                        </div>
                    </div>
                </section>
                ) : (
                <div className=""></div>
                )}
            </section>

            
            {/* PREFERENCES */}  
       
            <section className="flex flex-col md:flex-row gap-4 mt-10">
                {/* GENRES */}
                <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">                    
                    <div className="flex flex-col gap-4">
                        <h2 className="text-black font-bold text-xl">Preferred genres</h2>
                            <ul className="flex flex-wrap gap-2">
                                {genres.map((genre: any) => (
                                    <article
                                        className="w-fit rounded-full border-[1px] border-solid border-[#5311BF] py-2 px-8 text-[#5311BF]"
                                        key={genre._id}>
                                        <p>{genre.genre_name}</p>
                                    </article>
                                    ))}
                                </ul>
                        </div>
                </div>

                {/* VENUES */}
                <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">                    
                    <div className="flex flex-col gap-4">
                        <h2 className="text-black font-bold text-xl">Preferred venues</h2>
                        <ul className="flex flex-wrap gap-2">
                            {venues.map((venue: any) => (
                                <article
                                    className="w-fit rounded-full border-[1px] border-solid border-[#5311BF] py-2 px-8 text-[#5311BF]"
                                    key={venue.venue_name}>
                                    <p>{venue.venue_name}</p>
                                </article>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>


            {/* LOG OUT & DELETE USER LINK */}
            <div className="w-full flex justify-between">
                <button
                    onClick={logout}
                    className="w-fit flex gap-2 items-center mt-12 mb-12"
                >
                    <span className="text-[#5311BF] dark:text-white opacity-50">Log out</span>
                    <SlLogout className="fill-[#5311BF] dark:fill-white opacity-50"/>
                    
                </button>

                <button
                    onClick={openDeleteUserModal}
                    className="w-fit flex gap-2 items-center mt-12 mb-12"
                >
                    <span className="text-[#5311BF] dark:text-white opacity-50">Delete user</span> 
                    <SlClose className="fill-[#5311BF] dark:fill-white opacity-50"/>               
                </button>
            </div>

            
            

            {/* CHANGE USERNAME MODAL */}
            <div id="changeUsernameModal" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                <div className="p-10 flex flex-col items-center justify-center w-fill md:w-[600px] m-4 bg-white rounded-lg dark:bg-[#23124b]">
                    <button
                        type="button"
                        onClick={closeUsernameModule}
                        className="cursor-pointer ml-[100%]"
                    >
                        <CgClose/>
                    </button>

                    <div className="flex flex-col w-full gap-2">
                        <span className="w-full text-xl font-semibold text-[#5311BF] dark:text-purple-500 mb-6">Change username</span>
                        <input
                            readOnly={true}
                            className="hidden"
                            type="text"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            placeholder=""
                        />
                        <label htmlFor="password" className="w-fit text-sm text-gray-600 dark:text-gray-100">Choose a new username</label>
                        <input
                            className="input_field"
                            type="text"
                            id="newUsername"
                            placeholder="Start typing..."
                            value={user.newUsername}
                            onChange={(e) =>
                                setUser({...user, newUsername: e.target.value})
                            }
                        
                        />
                        {error && <div className="text-red-500">{error}</div>}

                    </div>

                    <button
                        onClick={changeUsername}
                        className="m-4 brand_gradient px-12 py-4 rounded-full text-white mt-8"
                    >
                        Save
                    </button>
                </div>
            </div>

            {/* CHANGE PASSWORD MODAL */}
            <div id="changePasswordModal" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                <div className="p-10 flex flex-col items-center justify-center w-fill md:w-[600px] m-4 bg-white rounded-lg dark:bg-[#23124b]">
                    <button
                        type="button"
                        onClick={closePasswordModule}
                        className="cursor-pointer ml-[100%]"
                    >
                        <CgClose/>
                    </button>
                    <div className="flex flex-col gap-4 items-center w-full">
                        <span className="w-full text-xl font-semibold text-[#5311BF] dark:text-purple-500 mb-6">Change password</span>
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col w-full gap-2">
                                    <input
                                        readOnly={true}
                                        className="m-2 p-2 rounded-md text-left text-black bg-slate-200 hidden"
                                        type="text"
                                        id="email"
                                        value={user.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                        placeholder=""
                                    />
                                    <label htmlFor="password" className="w-fit text-sm text-gray-600 dark:text-gray-100">Old password</label>
                                    <input
                                        className="input_field"
                                        type="password"
                                        id="password"
                                        value={user.password}
                                        onChange={(e) =>
                                            setUser({...user, password: e.target.value})
                                        }
                                        placeholder="Type your old password..."
                                    />
                                </div>

                                <div className="flex flex-col w-full gap-2">
                                    <label htmlFor="password" className="w-fit text-sm text-gray-600 dark:text-gray-100">New password</label>
                                    <input
                                        className="input_field"
                                        type="password"
                                        id="password"
                                        value={user.newpassword}
                                        onChange={(e) =>
                                            setUser({...user, newpassword: e.target.value})
                                        }
                                        placeholder="Type new password..."
                                    />
                                </div>

                                <div className="flex flex-col w-full gap-2">
                                    <label htmlFor="confirm_password" className="w-fit text-sm text-gray-600 dark:text-gray-100">
                                        Confirm new password
                                    </label>
                                    <input
                                        className="input_field"
                                        type="password"
                                        id="confirm_password"
                                        value={user.confirmpassword}
                                        onChange={(e) =>
                                            setUser({...user, confirmpassword: e.target.value})
                                        }
                                        placeholder="Confirm new password..."
                                    />
                                </div>
                            </div>
                        {error && <div className="text-red-500">{error}</div>}
                    </div>
                    <button
                        onClick={changePassword}
                        className="m-4 brand_gradient px-12 py-4 rounded-full text-white mt-8"
                    >
                        Save
                    </button>
                </div>
            </div>

             {/* DELETE USER MODAL */}
             <div id="deleteUserModal" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                <div className="p-6 md:p-10 flex flex-col items-center justify-center w-fill md:w-[600px] m-4 bg-white rounded-lg dark:bg-[#23124b]">
                    <button
                        type="button"
                        onClick={closeDeleteUserModule}
                        className="cursor-pointer ml-[100%]"
                    >
                        <CgClose/>
                    </button>

                    <div className="flex flex-col w-full gap-2">
                        <span className="w-full text-xl font-semibold text-[#5311BF] dark:text-purple-500 mb-6">Delete user</span>
                        <input
                            readOnly={true}
                            type="text"
                            id="email"
                            className="hidden"
                            value={user._id}
                            placeholder=""
                        />
                        <input
                            readOnly={true}
                            type="text"
                            id="email"
                            className="hidden"
                            value={user.email}
                            placeholder=""
                        />
                        <label htmlFor="password" className="w-fit text-sm text-gray-600 dark:text-gray-100">Type password to delete user</label>
                        <input
                            className="input_field"
                            type="password"
                            id="password"
                            placeholder="Start typing..."
                            value={user.password}
                            onChange={(e) =>
                                setUser({...user, password: e.target.value})
                            }
                        
                        />
                        {error && <div className="text-red-500">{error}</div>}

                    </div>

                    <button
                        onClick={deleteUser}
                        className="mt-8 primary_btn"
                    >
                        Delete my account now
                    </button>
                </div>
            </div>

            {/* DELETE CONCERT MODULE */}
            {selectedConcert && (
            <div id="delete_concert_id" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                <div className="p-10 flex flex-col items-center justify-center w-fill md:w-[600px] m-4 bg-white rounded-lg dark:bg-[#23124b]">
                <button
                    type="button"
                    onClick={closeDeleteModule}
                    className="cursor-pointer ml-[100%]"
                    >
                    <CgClose/>
                    </button>

                    <div className="flex flex-col gap-4 justify-center text-center items-center">
                    <h1 className="dark:text-white font-bold text-3xl">Are you sure?</h1>
                    <p className="dark:text-white">
                    You are about to delete the concert{" "}
                    {/* <div className="">{selectedConcert.concert_artist_email}</div> */}
                    <span className="italic font-bold">{selectedConcert.concert_name}</span>. This action can not be reverted.
                    </p>
                    <button 
                        type="button"
                        onClick={() => handleDeleteConcert(selectedConcert.concert_id, selectedConcert.concert_artist_email)}
                        className="primary_btn">
                        Yes I am sure
                    </button>
                    </div>
                </div>
            </div>
            )}

            {/* EDIT CONCERT MODULE */}
            {selectedConcert && (
            <div id="edit_concert_id" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                <div className="p-10 flex flex-col items-center justify-center w-fill md:w-[600px] m-4 bg-white rounded-lg dark:bg-[#23124b]">
                    <button
                    type="button"
                    onClick={closeEditModule}
                    className="cursor-pointer ml-[100%]"
                    >
                    <CgClose/>
                    </button>
                        <form
                        key={selectedConcert.concert_name}
                        id="uploadArtistForm"
                        onSubmit={onSubmit}
                        >
                        <div className="grid md:grid-cols-2 gap-8 w-full">
                        <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                            <label htmlFor="concert_name">Concert name</label>
                            <input
                                className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                                type="text"
                                id="concert_name"
                                name="concert_name"
                                value={concertName}
                                onChange={(e) => setConcertName(e.target.value)}
                                placeholder={selectedConcert.concert_name}
                            />
                        </div>

                        <div className="hidden">
                            <label htmlFor="artist_name">Concert id</label>
                            <input
                                className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                                type="text"
                                id="concert_id"
                                name="concert_id"
                                value={selectedConcert.concert_id}
                                readOnly
                            />
                        </div>

                        <div className="hidden">
                            <label htmlFor="artist_name">Artist email</label>
                            <input
                                className="brand_gradient text-white border-0 px-8 py-4 rounded-full w-full"
                                type="text"
                                id="concert_artist_email"
                                name="concert_artist_email"
                                value={selectedConcert.concert_artist_email}
                                readOnly
                            />
                        </div>

                        <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                            <label htmlFor="artist_full_name">Concert date</label>
                            <input
                                className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                                type="date"
                                id="concert_date"
                                name="concert_date"
                                value={concertDate}
                                onChange={(e) => setConcertDate(e.target.value)}
                                placeholder={selectedConcert.concert_date}
                            />
                        </div>

                        <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                            <label htmlFor="concert_name">Concert start time </label>
                            <input
                                className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                                type="time"
                                id="concert_start"
                                name="concert_start"
                                value={concertStart}
                                onChange={(e) => setConcertStart(e.target.value)}
                                placeholder={selectedConcert.concert_start}
                            />
                        </div>

                        <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                            <label htmlFor="artist_full_name">Concert doors</label>
                            <input
                                className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                                type="time"
                                id="Concert start"
                                name="Concert start"
                                value={concertDoors}
                                onChange={(e) => setConcertDoors(e.target.value)}
                                placeholder={selectedConcert.concert_doors}
                            />
                        </div>

                        <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                            <label htmlFor="artist_full_name">Concert start time</label>
                            <input
                                className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                                type="text"
                                id="Concert description"
                                name="Concert description"
                                value={concertDescription}
                                onChange={(e) => setConcertDescription(e.target.value)}
                                placeholder={selectedConcert.concert_description}
                            />
                        </div>

                        <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                            <label htmlFor="isVisible" className="">Visibility</label>
                            <div className="flex gap-8">
                                <span className="brand_purple dark:text-purple-500">A visible concert that can be seen by everyone</span>
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


                        <div className="form-group flex flex-col gap-2">
                            <label htmlFor="file">Change image</label>
                            <input
                                type="file"
                                name="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        </div>

                        <button
                            className="brand_gradient px-4 grid m-auto py-2 cursor-pointer mt-8 text-white rounded-full w-72"
                            type="submit"
                            value="upload"
                        >
                            {loading ? "Processing" : "Save changes"}
                        </button>
                    </form>
                    </div>
            </div>
            )}
        </div>
    );
}