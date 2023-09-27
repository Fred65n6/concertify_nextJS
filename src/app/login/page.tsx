"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";
import Link from "next/link";

export default function LoginPage() {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const closeLoginModule = () => {
        const loginModule = document.getElementById("login_module");
        loginModule?.classList.add("hidden");
        loginModule?.classList.remove("grid");
    };

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            window.location.reload();
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div
            id="login_module"
            className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen  items-center justify-center hidden backdrop-blur-sm"
        >
            <div className="flex flex-col items-center justify-center pt-4 py-8 bg-white w-[400px] rounded-lg">
                <button
                    type="button"
                    onClick={closeLoginModule}
                    className="cursor-pointer ml-[75%]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m7 7l10 10M7 17L17 7"
                        />
                    </svg>
                </button>
                <h1 className="mb-4 text-4xl">
                    {loading ? "Processing" : "Login"}
                </h1>
                <label htmlFor="email">email</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black"
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                />
                <label htmlFor="password">password</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({...user, password: e.target.value})
                    }
                    placeholder="password"
                />
                <button
                    onClick={onLogin}
                    className="m-4 bg-blue-500 px-12 py-4 rounded-full text-white"
                    disabled={buttonDisabled}
                >
                    login
                </button>
                <Link href="/signup">Visit sign up page</Link>
            </div>
        </div>
    );
}
