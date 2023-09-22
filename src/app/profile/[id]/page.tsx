"use client";

import axios from "axios";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";

export default function UserProfile({params}: any) {
    const [data, setData] = useState({
        username: "nothing",
        userId: null, // Initialize with null or a suitable default value
    });

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
        </div>
    );
}
