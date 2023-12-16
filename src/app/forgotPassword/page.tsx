"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";

const ForgotPassword = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // -- Send information to API'en 
    const sendLink = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/forgotPassword",
                user
            );
            console.log("Mail sent with forgotPassword link", response.data);
        } catch (error: any) {
            toast.error(error.message);
            console.log("API forgotPassword failed", error);
        } finally {
            setLoading(false);
        }
    };

    const showMessage = () => {
        const mailSendMessage = document.getElementById("mailSendMessage");
        const forgotForm = document.getElementById("forgotForm");
        mailSendMessage?.classList.remove("hidden");
        mailSendMessage?.classList.add("block"); 
        forgotForm?.classList.add("hidden");
        console.log("showMessage");
    };


    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="">
            <LoginPage/>
            <SignupPage/>
            <div className="flex flex-col items-center justify-center py-2 mt-24">
                <div className="hidden" id="mailSendMessage">
                    <h2 className="text-2xl">
                        We've send a message to your email with a password reset
                        link.
                    </h2>
                </div>
            </div>

            <div
                className="flex flex-col items-center justify-center py-2 gap-8"
                id="forgotForm"
            >
            <h1 className="font-bold text-4xl">
                {loading ? "Processing" : "Forgot you password?"}
            </h1>
            <h2 className="text-md pb-4">
                {loading ? "Please wait" : "Don't worry. Enter your email and we'll send you a link to reset your password."}
            </h2>

                <div className="grid gap-2 items-center">
                    <label className="text-sm text-gray-600 dark:text-gray-100" htmlFor="email">
                        Your email
                    </label>
                    <input
                        className="input_field"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({...user, email: e.target.value})
                        }
                        placeholder="Start typing..."
                    />
                    <button
                        onClick={sendLink}
                        className="primary_btn"
                    >
                        {buttonDisabled ? "Please enter your email" : "Send reset link"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
