"use client";
import {useState, useEffect} from "react";
import axios from "axios";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Extract the token from the URL when the component mounts
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const urlToken = searchParams.get("token");

        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    const handlePasswordReset = async () => {
        try {
            const response = await axios.post("/api/users/resetPassword", {
                token: token,
                newPassword: password,
            });
            console.log(response);

            if (response.status === 200) {
                setMessage("Your password is now changed! Go to login.");
            } else {
                setError("Password reset failed.");
            }
        } catch (error) {
            setError("Password reset failed.");
        }
    };

    return (
        <>
        <LoginPage/>
        <SignupPage/>
        <div className="flex flex-col items-center m-8 gap-4">
            <h1 className="font-bold text-4xl">Reset Password</h1>
            <div className="grid gap-4">
                <label className="text-sm text-gray-600 dark:text-gray-100" htmlFor="email">
                    Enter your new password
                </label>
                <input
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full text-black"
                    type="password"
                    placeholder="Start typing..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                className="hidden"
                    readOnly={true}
                    type="token"
                    placeholder="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <button onClick={handlePasswordReset} className="brand_gradient text-white rounded-full py-4 px-8">Confirm</button>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
        
        </>
    );
}
