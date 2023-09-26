"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import LoginPage from "@/app/login/page";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Initialize as loading
    const [data, setData] = useState({
        username: "",
        userId: null,
    });

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/cookie_user");
            const userData = res.data.data;
            setData({
                username: userData.username,
                userId: userData._id,
            });
            setLoading(false); // Set loading to false after successful data retrieval
        } catch (error: any) {
            console.error(error.message);
            setLoading(false); // Set loading to false on error
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="grid ">
            {loading ? (
                <h1 className="text-4xl font-bold">Loading...</h1>
            ) : data.username ? (
                <h1 className="text-4xl font-bold">
                    Welcome back{" "}
                    <span className="brand_purple">{data.userId}</span>
                </h1>
            ) : (
                <h1 className="text-4xl font-bold">
                    Experience Copenhagen through live music
                </h1>
            )}
            <div className="">
                <LoginPage />
            </div>
        </div>
    );
}
