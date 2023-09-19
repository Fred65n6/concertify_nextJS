"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SingupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // Send information til API'en signup
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
            console.log("API signup failed", error);
        } finally {
            setLoading(false);
        }
    };

    //DISABLE SIGNUP KNAP, HVIS FELTER IKKE ER UDFYLDT

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    //TEMPLATE FOR SIGNUP

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-4 text-4xl">
                {loading ? "Processing" : "Sign Up"}
            </h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="m-2 p-2 rounded-md text-left text-black"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
            />
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
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button
                onClick={onSignup}
                className="m-4 bg-blue-500 px-12 py-4 rounded-full text-white"
            >
                {buttonDisabled ? "Missing fields" : "Sign up"}
            </button>
            <Link href="/login">Visit login</Link>
        </div>
    );
}
