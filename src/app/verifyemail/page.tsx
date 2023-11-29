"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import Image from "../../../node_modules/next/image";


export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <LoginPage />
      <SignupPage />
   
      <div className="flex flex-col items-center justify-center py-2">
        {verified && (
          <div className="text-center grid gap-4">
            <h1 className="font-bold text-4xl pb-4 pt-8">Hooray! 🎉</h1>
            <h2 className="text-xl text black dark:text-gray-100 pt-4">
              Your email has been verified, and you are ready to log in!
            </h2>
          </div>
        )}
        {error && (
          <div className="pt-4">
            <h1 className="font-bold text-4xl pb-4 pt-8">Oh no, looks like something went wrong ☹️</h1>
          </div>
        )}
      </div>
    </>
  );
}
