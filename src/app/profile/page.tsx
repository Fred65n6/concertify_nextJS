"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            setLoading(true);
            await axios.get("/api/users/logout");
            console.log("log out successfull");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("api/users/cookie_user");
        console.log(res.data);
        setData(res.data.data._id);
    };

    return (
        <div className="flex flex-col items-center height-screen">
            <h1>{loading ? "Logging out" : "Profile"}</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-3 bg-green-500 rounded-md">
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={"/profile/${data}"}>{data}</Link>
                )}
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Get user details
            </button>
        </div>
    );
}
