"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SlUser, SlArrowRight, SlTrash } from "react-icons/sl";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import Link from "next/link";
import { CgClose } from "react-icons/cg";


interface User {
  _id: string;
  username: string;
  email: string;
}

const Admin: React.FC = () => {
  const [concerts, setConcerts] = useState<[]>([]);
  const [artists, setArtists] = useState<[]>([]);
  const [venues, setVenues] = useState<[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

useEffect(() => {
  const fetchData = async () => {
        try {
          const shouldReload = localStorage.getItem('shouldReload');
            if (shouldReload) {
              localStorage.removeItem('shouldReload');
              window.location.reload();
            }
            const response = await axios.get("/api/data/userData");
            setUsers(response.data.data);
            const responseVenues = await axios.get("/api/data/venueData");
            setVenues(responseVenues.data.data);
            const responseConcerts = await axios.get("/api/data/concertData");
            setConcerts(responseConcerts.data.data);
            const responseArtists = await axios.get("/api/data/artistData");
            setArtists(responseArtists.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
  }, []);

  const totalConcerts = concerts.length;
  const totalVenues = venues.length;
  const totalArtists = artists.length;
  const totalUsers = users.length;

  const openModule = (user: User) => {
    setSelectedUser(user);
    const deleteUserModule = document.getElementById("delete_user_module");
    deleteUserModule?.classList.remove("hidden");
    deleteUserModule?.classList.add("grid");
  };

  const closeModule = () => {
    const deleteUserModule = document.getElementById("delete_user_module");
    deleteUserModule?.classList.add("hidden");
    deleteUserModule?.classList.remove("grid");
  };

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
          setUsers(elm => elm.filter(user => user._id !== userId)); // Removing the deleted user from the state
          closeModule();
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
          <article className="bg-purple-100 w-full gap-2 py-8 rounded-lg align-middle justify-start px-8 flex flex-col hover:bg-purple-200">
            <div className="flex justify-between">
              <p className="font-thin text-sm text-black">Total concerts</p>
              <SlArrowRight
                    className="fill-gray-600 dark:gray-600 w-4 h-4 pt-1"
                    id="arrow_right"
                    />
            </div>
            <span className="font-bold text-2xl text-[#5311BF]">{totalConcerts}</span>
          </article>
          </Link>

          <Link href={"/admin-artists/"} className="w-full">
          <article className="bg-purple-100 gap-2 py-8 rounded-lg align-middle justify-start px-8 flex flex-col hover:bg-purple-200">
            <div className="flex justify-between">
                <p className="font-thin text-sm text-black">Total artists</p>
                <SlArrowRight
                    className="fill-gray-600 dark:gray-600 w-4 h-4 pt-1"
                    id="arrow_right"
                    />
              </div>
              <span className="font-bold text-2xl text-[#5311BF]">{totalArtists}</span>
          </article>
          </Link>

          <Link href={"/admin-venues/"} className="w-full">
          <article className="bg-purple-100 w-full gap-2 py-8 rounded-lg align-middle justify-start px-8 flex flex-col hover:bg-purple-200">
            <div className="flex justify-between">
                <p className="font-thin text-sm text-black">Total venues</p>
                <SlArrowRight
                    className="fill-gray-600 dark:gray-600 w-4 h-4 pt-1"
                    id="arrow_right"
                    />
              </div>
              <span className="font-bold text-2xl text-[#5311BF]">{totalVenues}</span>
          </article>
          </Link>
        </section>

        <h2 className="font-bold text-xl pb-4 pt-8">Users</h2>
        <section className="flex gap-8 mb-8">
          <div className="flex flex-col gap-4 align-middle">
            <div className="flex gap-2">
              <SlUser className="stroke-[#5311BF] dark:stroke-purple-500 w-5 h-5" id="user" />
              <span>{totalUsers}</span>
            </div>
          </div>
        </section>


        <form className="flex flex-col items-center gap-8 pb-12">
          <div className="overflow-x-auto w-full">
            <table className="table-auto min-w-full">
              <thead>
                <tr className=" text-[#5311BF] dark:text-purple-500">
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">User email</th>
                  <th className="px-4 py-2 text-right"></th>
                </tr>
              </thead>
              <tbody className="[&>*:nth-child(odd)]:bg-purple-100 dark:[&>*:nth-child(odd)]:bg-[#23124b]">
                {users?.map((user) => (
                  <tr key={user._id} className="">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => openModule(user)}
                      >
                        <SlTrash className="fill-[#5311BF] dark:fill-white w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>

      </div>

      {/* DELETE USER MODAL */}
      {selectedUser && (
      <div id="delete_user_module" className="fixed top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
        <div className="p-10 flex flex-col items-center justify-center w-fill md:w-[600px] m-4 bg-white rounded-lg dark:bg-[#23124b]">
        <button
            type="button"
            onClick={closeModule}
            className="cursor-pointer ml-[100%]"
            >
            <CgClose/>
          </button>
         

          <div className="flex flex-col gap-4 justify-center text-center items-center">
            <div className="flex gap-2">
              <h1 className="dark:text-white font-bold text-3xl">Are you sure?</h1>
            </div>
            <p className="dark:text-white">
              You are about to delete{" "}
              <span className="italic font-bold">{selectedUser.username}</span>. This action can not be reverted.
          </p>
          <button 
            type="button"
            onClick={() => handleDeleteUser(selectedUser._id)}
            className="primary_btn">
            Yes I am sure
          </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Admin;