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
        confirmpassword: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // Send information til API'en signup
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            showMessage();
        } catch (error: any) {
            toast.error(error.message);
            console.log("API signup failed", error);
        } finally {
            setLoading(false);
        }
    };

    const showMessage = () => {
        const verifiedMessage = document.getElementById("verified_message");
        const signUpForm = document.getElementById("signup_form");
        if (verifiedMessage) {
            verifiedMessage.classList.remove("hidden");
            verifiedMessage.classList.add("block"); // Add the "grid" class to make it visible
            signUpForm?.classList.add("hidden");
        }
        console.log("showMessage");
    };

    //DISABLE SIGNUP KNAP, HVIS FELTER IKKE ER UDFYLDT

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0 &&
            user.confirmpassword.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    //TEMPLATE FOR SIGNUP

    return (
        <div className="">
            <div id="verified_message" className="hidden">
                <h1 className="text-2xl text-center mt-24">
                    We've send a link to your email, to verify your account.{" "}
                    <br />
                    Please click that link and login to your account
                </h1>
            </div>
            <div
                id="signup_form"
                className="flex flex-col items-center justify-center py-2"
            >
                <h1 className="mb-4 text-4xl pb-4">
                    {loading ? "Processing" : "Sign Up"}
                </h1>
                <hr />
                <label htmlFor="username">username</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) =>
                        setUser({...user, username: e.target.value})
                    }
                    placeholder="Username"
                />
                <label htmlFor="email">Email</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({...user, password: e.target.value})
                    }
                    placeholder="password"
                />
                <label htmlFor="confirmpassword">Confirm password</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="password"
                    id="confirmpassword"
                    value={user.confirmpassword}
                    onChange={(e) =>
                        setUser({...user, confirmpassword: e.target.value})
                    }
                    placeholder="Confirm your password"
                />
                <button
                    onClick={onSignup}
                    className="m-4 bg-blue-500 px-12 py-4 rounded-full text-white mt-8"
                >
                    {buttonDisabled ? "Missing fields" : "Sign up"}
                </button>
                <Link href="/login">Visit login</Link>
            </div>
        </div>
    );
}
