"use client";

import axios from "axios";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function UserProfile({params}: any) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = useState({
        username: "nothing",
        userId: null, // Initialize with null or a suitable default value
    });

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
            // Set a flag in localStorage to indicate a successful login
            localStorage.setItem("successfulLogin", "true");
            window.location.reload();
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/cookie_user");
            console.log(res.data);
            const userData = res.data.data;
            setData({
                username: userData.username,
                userId: userData._id,
                // Add more properties as needed
            });
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        // Fetch user details when the component mounts
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page {data.username}</p>
            {/* Render other properties if needed */}
            <p>User ID: {data.userId}</p>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
}
