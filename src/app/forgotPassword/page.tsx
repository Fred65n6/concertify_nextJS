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
    const sendLink = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/forgotPassword",
                user
            );
            console.log("Signup success", response.data);
        } catch (error: any) {
            toast.error(error.message);
            console.log("API signup failed", error);
        } finally {
            setLoading(false);
        }
    };

    //DISABLE SIGNUP KNAP, HVIS FELTER IKKE ER UDFYLDT

    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    //TEMPLATE FOR SIGNUP

    return (
        <div className="">
            <div className="flex flex-col items-center justify-center py-2">
                <h1 className="mb-4 text-4xl pb-4">
                    {loading ? "Processing" : "Send password reset link"}
                </h1>
                <hr />
                <label htmlFor="email">email</label>
                <input
                    className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                />
                <label htmlFor="password">password</label>
                <button
                    onClick={sendLink}
                    className="m-4 bg-blue-500 px-12 py-4 rounded-full text-white mt-8"
                >
                    {buttonDisabled ? "Missing fields" : "Send reset link"}
                </button>
                <Link href="/login">Visit login</Link>
            </div>
        </div>
    );
}
