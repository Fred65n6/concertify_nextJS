"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";

export default function LoginPage() {
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
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

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Sucess");
            // Set a flag in localStorage to indicate a successful login
            localStorage.setItem("successfulLogin", "true");
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
        <div className="flex flex-col items-center justify-center pt-10 py-2">
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
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button
                onClick={onLogin}
                className="m-4 bg-blue-500 px-12 py-4 rounded-full text-white"
            >
                login
            </button>
            <Link href="/signup">Visit sign up page</Link>
        </div>
    );
}
