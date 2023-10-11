"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [data, setData] = useState("Loading");

    useEffect(() => {
        // Check if the 'successfulLogin' flag is present in localStorage
        const successfulLogin = localStorage.getItem("successfulLogin");

        if (successfulLogin === "true") {
            // Remove the flag to prevent future reloads
            localStorage.removeItem("successfulLogin");

            // Push the user to the "/profile" route
            router.push("/");
        }
    }, []);

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get("/api/users/logout");
            console.log("log out successfull");
            toast.success("Logout successful");
            // Set a flag in localStorage to indicate a successful login
            localStorage.setItem("successfulLogin", "true");
            window.location.reload();
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("api/users/cookieUser");
        console.log(res.data);
        setData(res.data.data.username);
    };

    useEffect(() => {
        // Fetch user details when the component mounts
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center height-screen">
            <h1 className="text-4xl py-8 flex gap-2">
                {loading ? "Logging out" : "User"}:
                <div className="">{data}</div>
            </h1>
            <h2 className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <Link href={"/profile/${data}"}>{data}</Link>
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
