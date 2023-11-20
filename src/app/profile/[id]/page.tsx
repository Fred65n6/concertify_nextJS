"use client";

import axios from "axios";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import ThemeSwitcher from "../../components/switchTheme/page";
import { RiEdit2Fill } from "react-icons/ri";


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


    const showChangePasswordModal = () => {
        const PasswordModal = document.getElementById("changePasswordModal");
        PasswordModal?.classList.remove("hidden");
        PasswordModal?.classList.add("grid");
    };

    const showChangeUsernamedForm = () => {
        const UsernameModal = document.getElementById("changeUsernameModal");
        UsernameModal?.classList.remove("hidden");
        UsernameModal?.classList.add("grid");
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
        const changeUsernameModal =
            document.getElementById("changeUsernameModal");
        changeUsernameMessage?.classList.remove("hidden");
        changeUsernameModal?.classList.add("hidden");
    };

    const showPasswordChangeMessage = () => {
        const changePasswordMessage = document.getElementById(
            "changePasswordMessage"
        );
        const changePasswordModal =
            document.getElementById("changePasswordModal");
        changePasswordMessage?.classList.remove("hidden");
        changePasswordModal?.classList.add("hidden");
    };

    return (
        <div className="grid pt-8">
            
            <h1 className="text-4xl my-8">Profile</h1>

            <div className="flex item-center justify-between pb-4 mt-8">
                <p className="text-xl pb-4">
                    Username:{" "}
                    <span className="brand_purple">{data.username}</span>
                </p>
                <button onClick={showChangeUsernamedForm}>
                <RiEdit2Fill/>
                </button>
            </div>


            <div className="flex items-center justify-between mb-8">
                <p className="text-xl">
                    Password: <span className="brand_purple">********</span>
                </p>

                <button onClick={showChangePasswordModal}>
                    <RiEdit2Fill/>
                </button>
            </div>


            {/* Theme Switcher */}
            <div className="flex items-center justify-between mb-8 md:hidden">
                <p className="text-xl">
                    Switch theme
                </p>

                <ThemeSwitcher/>
            </div>


            {/* Log out */}
            <button
                onClick={logout}
                className="brand_gradient px-12 py-4 rounded-full text-white mt-8 mb-12 hover:brightness-75 w-72 m-auto"
            >
                Log out
            </button>


            {/* Forms for changing user information */}
            <div id="changePasswordModal" className="w-72 hidden">
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

            {/* CHANGE USERNAME MODULE */}
            <div id="changeUsernameModal" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                    <div>
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
            </div>

            {/* CHANGE PASSWORD MODULE */}
            <div id="changePasswordModal" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                <div id="changePasswordModal" className="w-72 hidden">
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
            </div>




            {/* Sucess messages after changing user information */}
            <div  id="changePasswordMessage" className="text-2xl hidden mt-4 mb-12 brand_purple">
                <span>Your password has been changed</span>
            </div>

            <div id="changeUsernameMessage" className="text-2xl hidden mt-4 mb-12 brand_purple">
                <span>Your username has been changed</span>
            </div>

        </div>
    );
}
