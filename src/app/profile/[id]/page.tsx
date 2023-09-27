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
        userEmail: "",
    });
    const [user, setUser] = React.useState({
        newpassword: "",
        email: "",
        password: "",
    });

    const showPasswordChangeMessage = () => {
        const changePasswordMessage = document.getElementById(
            "changePasswordMessage"
        );
        const changePasswordForm =
            document.getElementById("changePasswordForm");
        changePasswordMessage?.classList.remove("hidden");
        changePasswordForm?.classList.add("hidden");
    };

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
            const res = await axios.get("/api/users/cookieUser");
            console.log(res.data);
            const userData = res.data.data;
            setData({
                username: userData.username,
                userId: userData._id,
                userEmail: userData.email,
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

    useEffect(() => {
        setUser({...user, email: data.userEmail});
    }, [data.userEmail]);

    const changePassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/changePassword",
                user
            );
            console.log("password changed", response.data);
            showPasswordChangeMessage();
        } catch (error: any) {
            console.log("password change FAILED", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center pt-8">
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
            <div id="changePasswordForm" className="grid my-12">
                <h2 className="text-2xl pb-8">Change password</h2>
                <input
                    readOnly={true}
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200 hidden"
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder=""
                />
                <label htmlFor="password">Type your old password</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({...user, password: e.target.value})
                    }
                    placeholder=""
                />
                <label htmlFor="password">Type your new password</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="password"
                    id="password"
                    value={user.newpassword}
                    onChange={(e) =>
                        setUser({...user, newpassword: e.target.value})
                    }
                    placeholder=""
                />
                <button
                    onClick={changePassword}
                    className="m-4 bg-blue-500 px-12 py-4 rounded-full text-white mt-8"
                >
                    Change password
                </button>
            </div>
            <div id="changePasswordMessage" className="text-2xl hidden mt-12">
                Your password has been changed
            </div>
        </div>
    );
}
