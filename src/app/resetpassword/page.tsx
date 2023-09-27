"use client";
import {useState, useEffect} from "react";
import axios from "axios";

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
                setMessage("Password reset successfully!");
            } else {
                setError("Password reset failed.");
            }
        } catch (error) {
            setError("Password reset failed.");
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <p>Enter your new password below:</p>
            <div className="grid gap-4">
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="token"
                    placeholder="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <button onClick={handlePasswordReset}>Reset Password</button>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}
