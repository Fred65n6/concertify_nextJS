"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SlUser } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import Link from "next/link";


interface User {
  _id: string;
  username: string;
  email: string;
}

const Admin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;
  const [concerts, setConcerts] = useState<[]>([]);
  const [artists, setArtists] = useState<[]>([]);
  const [venues, setVenues] = useState<[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/data/userData");
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
      try {
          const responseVenues = await axios.get("/api/data/venueData");
          setVenues(responseVenues.data.data);
      } catch (error) {
          console.error("Error fetching venues:", error);
      }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
      try {
          const responseConcerts = await axios.get("/api/data/concertData");
          setConcerts(responseConcerts.data.data);
      } catch (error) {
          console.error("Error fetching concerts:", error);
      }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
      try {
          const responseArtists = await axios.get("/api/data/artistData");
          setArtists(responseArtists.data.data);
      } catch (error) {
          console.error("Error fetching artists:", error);
      }
  };

  fetchData();
}, []);



  const totalConcerts = concerts.length;
  const totalVenues = venues.length;
  const totalArtists = artists.length;
  const totalUsers = users.length;

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch('/api/admin/deleteUser', {
        method: 'DELETE',
        body: JSON.stringify({ userId }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error(errorText);
      } else {
        const result = await res.json();
        if (result.success) {
          console.log(result.message);
          // Handle success, update state, etc.
        } else {
          console.error(result.error);
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <>
      <LoginPage />
      <SignupPage />
      <div>
        <h1 className="font-bold text-4xl pb-4 pt-8">Admin dashboard</h1>
     <section className="flex gap-4 mt-10">

       <Link href={"/admin-concerts/"} className="w-full">
       <article className="bg-[#F2EEFB] w-full gap-2 py-8 rounded-lg align-middle justify-start px-8 flex flex-col hover:bg-[#dcd6ea]">
         <div className="flex justify-between">
           <p className="font-thin text-sm text-black">Total concerts</p>
         </div>
         <span className="font-bold text-2xl text-[#5311BF]">{totalConcerts}</span>
       </article>
       </Link>


       <Link href={"/admin-artists/"} className="w-full">
       <article className="bg-[#F2EEFB] gap-2 py-8 rounded-lg align-middle justify-start px-8 flex flex-col hover:bg-[#dcd6ea]">
         <div className="flex justify-between">
             <p className="font-thin text-sm text-black">Total artists</p>
           </div>
           <span className="font-bold text-2xl text-[#5311BF]">{totalArtists}</span>
       </article>
       </Link>

       <Link href={"/admin-venues/"} className="w-full">
       <article className="bg-[#F2EEFB] w-full gap-2 py-8 rounded-lg align-middle justify-start px-8 flex flex-col hover:bg-[#dcd6ea]">
         <div className="flex justify-between">
             <p className="font-thin text-sm text-black">Total venues</p>
           </div>
           <span className="font-bold text-2xl text-[#5311BF]">{totalVenues}</span>
       </article>
       </Link>
     </section>

        <h2 className="font-bold text-xl pb-4 pt-8">Users</h2>
        <section className="flex gap-8 mb-8">
          <div className="flex flex-col gap-4 align-middle">
            <div className="flex gap-2">
              <SlUser className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5" id="user" />
              <span>{totalUsers}</span>
            </div>
          </div>
        </section>

        <form className="flex flex-col items-center gap-8 pb-12">
        {users?.map((user) => (
          <div key={user._id}>
            <p>{user.username}</p>
            <input
              readOnly={true}
              className="bg-slate-100 p-4 w-72"
              type="text"
              name="user_id"
              value={user._id}
            />
            <button
              type="button" // Change type to button
              className="text-[#5311BF]"
              onClick={() => handleDeleteUser(user._id)}
            >
              <AiFillDelete
                className="fill-[#5311BF] dark:fill-[#8e0bf5] w-5 h-5"
                id="deleteUser"
                value="upload"
              />
            </button>
          </div>
        ))}
      </form>
      </div>
    </>
  );
};

export default Admin;