"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    confirmpassword: "",
  });

  const openLoginModule = () => {
    const loginModule = document.getElementById("login_module");
    loginModule?.classList.remove("hidden");
    loginModule?.classList.add("grid");
  };

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  const closeSignupModule = () => {
    const signupModule = document.getElementById("signup_module");
    signupModule?.classList.add("hidden");
    signupModule?.classList.remove("grid");
  };

  // Send information til API'en signup
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      showProfileGenres();
      // showMessage();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred during signup.");
      }
      console.log("API signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  const showProfileGenres = () => {
    const profileGenres = document.getElementById("profile_genres");
    const signUpForm = document.getElementById("signup_form");
    if (profileGenres) {
      profileGenres.classList.remove("hidden");
      profileGenres.classList.add("block");
      signUpForm?.classList.add("hidden");
    }
  };

  const showProfileVenues = () => {
    const profileVenues = document.getElementById("profile_venues");
    const profileGenres = document.getElementById("profile_genres");
    if (profileVenues) {
      profileVenues.classList.remove("hidden");
      profileVenues.classList.add("block");
      profileGenres?.classList.add("hidden");
    }
  };
  const showMessage = () => {
    const verifiedMessage = document.getElementById("verified_message");
    const signUpForm = document.getElementById("signup_form");
    const profileGenres = document.getElementById("profile_genres");
    const profileVenues = document.getElementById("profile_venues");
    if (verifiedMessage) {
      verifiedMessage.classList.remove("hidden");
      verifiedMessage.classList.add("block"); // Add the "grid" class to make it visible
      signUpForm?.classList.add("hidden");
      profileGenres?.classList.add("hidden");
      profileVenues?.classList.add("hidden");
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
      <div
        id="signup_module"
        className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen  items-center justify-center hidden backdrop-blur-sm"
      >
        <div id="signup_form">
          <div className="flex flex-col items-center justify-center pt-4 py-8 bg-white w-[800px] dark:bg-slate-900 dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <button
              type="button"
              onClick={closeSignupModule}
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
            <h1 className="mb-4 text-3xl font-bold">
              {loading ? "Processing" : "Signup..."}
            </h1>
            <p className="mb-6">To get personalized recommendations</p>
            <hr />
            {error && <div className="text-red-500">{error}</div>}
            <label htmlFor="username">Username</label>
            <input
              className="m-2 mt-1 p-2 pl-4 rounded-full text-left text-black bg-slate-200 w-[400px]"
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input
              className="m-2 mt-1 p-2 pl-4 rounded-full text-left text-black bg-slate-200 w-[400px]"
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
              className="m-2 mt-1 p-2 pl-4 rounded-full text-left text-black bg-slate-200 w-[400px]"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <label htmlFor="confirmpassword">Confirm password</label>
            <input
              className="m-2 mt-1 p-2 pl-4 rounded-full text-left text-black bg-slate-200 w-[400px]"
              type="password"
              id="confirmpassword"
              value={user.confirmpassword}
              onChange={(e) =>
                setUser({ ...user, confirmpassword: e.target.value })
              }
              placeholder="Confirm your password"
            />
            <button
              onClick={onSignup}
              className="mb-4 mt-2 brand_gradient px-12 py-4 rounded-full text-white"
            >
              {buttonDisabled ? "Missing fields" : "Sign up"}
            </button>
            <div className="flex">
              <Link href="/">
                <img src="../google_login.svg" alt="telefon" />
              </Link>
              <Link href="/">
                <img
                  className="px-14"
                  src="../facebook_login.svg"
                  alt="telefon"
                />
              </Link>
              <Link href="/">
                <img src="../apple_login.svg" alt="telefon" />
              </Link>
            </div>
            <div className="grid gap-4 text-center mt-4">
              <p>
                Already have an account?
                <button
                  type="button"
                  className="text-purple-700 hover:underline pl-1"
                  onClick={openLoginModule}
                >
                  Go to login
                </button>
              </p>
            </div>
          </div>
        </div>
        {/* PROFILE GENRES MODUL */}
        <div id="profile_genres" className="hidden">
          <div className="flex flex-col items-center justify-center py-8 bg-white w-[800px] dark:bg-slate-900 dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <h1 className="mb-4 text-3xl font-bold">
              What music genres do you like?
            </h1>
            <p className="mb-6">Get your own personalized recommendations</p>
            <button
              onClick={showProfileVenues}
              className="mb-4 mt-2 brand_gradient px-12 py-4 rounded-full text-white"
            >
              Submit
            </button>
            <button
              onClick={showMessage}
              className="mb-4 mt-2 px-12 py-4 rounded-full text-purple-700"
            >
              Skip
            </button>
          </div>
        </div>
        {/* PROFILE VENUES MODUL */}
        <div id="profile_venues" className="hidden">
          <div className="flex flex-col items-center justify-center py-8 bg-white w-[800px] dark:bg-slate-900 dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <h1 className="mb-4 text-3xl font-bold">
              What music venues do you like?
            </h1>
            <p className="mb-6">Get your own personalized recommendations</p>
            <button
              onClick={showMessage}
              className="mb-4 mt-2 brand_gradient px-12 py-4 rounded-full text-white"
            >
              Submit
            </button>
            <button
              onClick={showMessage}
              className="mb-4 mt-2 px-12 py-4 rounded-full text-purple-700"
            >
              Skip
            </button>
          </div>
        </div>
        <div id="verified_message" className="hidden">
          <div className="flex flex-col items-center justify-center pt-4 py-8 bg-white w-[800px] dark:bg-slate-900 dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <h1 className="text-2xl text-center my-10">
              We've send a link to your email, to verify your account. <br />
              Please click that link and login to your account🎉🎉
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
