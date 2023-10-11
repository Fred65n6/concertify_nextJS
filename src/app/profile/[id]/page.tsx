"use client";

import axios from "axios";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function UserProfile({params}: any) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string>("");
    const [data, setData] = useState({
        username: "nothing",
        userId: null, // Initialize with null or a suitable default value
        userEmail: "",
    });
    const [user, setUser] = React.useState({
        newpassword: "",
        email: "",
        password: "",
        confirmpassword: "",
        newUsername: "",
    });

    // useEffect(() => {
    //     // Check if the 'successfulLogin' flag is present in localStorage
    //     const successfulLogin = localStorage.getItem("successfulLogin");

    //     if (successfulLogin === "true") {
    //         // Remove the flag to prevent future reloads
    //         localStorage.removeItem("successfulLogin");

    //         // Push the user to the "/profile" route
    //         router.push("/");
    //     }
    // }, []);

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
        getUserDetails();
    }, []);

    useEffect(() => {
        setUser({...user, email: data.userEmail});
    }, [data.userEmail]);

    const showChangePasswordForm = () => {
        const PasswordForm = document.getElementById("changePasswordForm");
        PasswordForm?.classList.remove("hidden");
        PasswordForm?.classList.add("grid");
    };

    const showChangeUsernamedForm = () => {
        const UsernameForm = document.getElementById("changeUsernameForm");
        UsernameForm?.classList.remove("hidden");
        UsernameForm?.classList.add("grid");
    };

    const changeUsername = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/changeUsername",
                user
            );
            console.log("username changed", response.data);
            showUsernameChangeMessage();
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
        }
    };

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
        }
    };

    const showUsernameChangeMessage = () => {
        const changeUsernameMessage = document.getElementById(
            "changeUsernameMessage"
        );
        const changeUsernameForm =
            document.getElementById("changeUsernameForm");
        changeUsernameMessage?.classList.remove("hidden");
        changeUsernameForm?.classList.add("hidden");
    };

    const showPasswordChangeMessage = () => {
        const changePasswordMessage = document.getElementById(
            "changePasswordMessage"
        );
        const changePasswordForm =
            document.getElementById("changePasswordForm");
        changePasswordMessage?.classList.remove("hidden");
        changePasswordForm?.classList.add("hidden");
    };

    return (
        <div className="grid pt-8">
            <h1 className="text-4xl my-8">Profile</h1>
            <hr />
            <div className="flex item-center justify-between pb-4 mt-8">
                <p className="text-xl pb-4">
                    Username:{" "}
                    <span className="brand_purple">{data.username}</span>
                </p>
                <button onClick={showChangeUsernamedForm}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        className="opacity-50"
                    >
                        <path
                            fill="currentColor"
                            d="M5 23.7q-.825 0-1.413-.587T3 21.7v-14q0-.825.588-1.413T5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.588 1.413T19 23.7H5Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-7.2 7.225H9v-4.25l7.175-7.175Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6t1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8l-2.475 2.475Z"
                        />
                    </svg>
                </button>
            </div>
            <div id="changeUsernameForm" className="w-72 hidden mb-12">
                {error && <div className="text-red-500">{error}</div>}
                <input
                    readOnly={true}
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200 hidden"
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder=""
                />
                <label htmlFor="newUsername">Type your new username</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="text"
                    id="newUsername"
                    value={user.newUsername}
                    onChange={(e) =>
                        setUser({...user, newUsername: e.target.value})
                    }
                    placeholder="Type new username"
                />
                <button
                    onClick={changeUsername}
                    className="m-4 brand_gradient px-12 py-4 rounded-full text-white mt-8"
                >
                    Change username
                </button>
            </div>

            <div
                id="changeUsernameMessage"
                className="text-2xl hidden mt-4 mb-12 brand_purple"
            >
                Your username has been changed
            </div>

            <div className="flex items-center justify-between mb-8">
                <p className="text-xl">
                    Password: <span className="brand_purple">********</span>
                </p>

                <button onClick={showChangePasswordForm}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        className="opacity-50"
                    >
                        <path
                            fill="currentColor"
                            d="M5 23.7q-.825 0-1.413-.587T3 21.7v-14q0-.825.588-1.413T5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.588 1.413T19 23.7H5Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-7.2 7.225H9v-4.25l7.175-7.175Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6t1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8l-2.475 2.475Z"
                        />
                    </svg>
                </button>
            </div>
            <div id="changePasswordForm" className="w-72 hidden">
                {error && <div className="text-red-500">{error}</div>}
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
                    placeholder="Type your old password"
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
                    placeholder="Type new password"
                />
                <label htmlFor="confirm_password">
                    Confirm your new password
                </label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="password"
                    id="confirm_password"
                    value={user.confirmpassword}
                    onChange={(e) =>
                        setUser({...user, confirmpassword: e.target.value})
                    }
                    placeholder="Confirm new password"
                />
                <button
                    onClick={changePassword}
                    className="m-4 brand_gradient px-12 py-4 rounded-full text-white mt-8"
                >
                    Change password
                </button>
            </div>
            <div
                id="changePasswordMessage"
                className="text-2xl hidden mt-4 mb-12 brand_purple"
            >
                Your password has been changed
            </div>

            <hr />

            <button
                onClick={logout}
                className="brand_gradient px-12 py-4 rounded-full text-white mt-8 mb-12 hover:brightness-75 w-72 m-auto"
            >
                Logout
            </button>
        </div>
    );
}
