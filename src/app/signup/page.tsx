"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Progress } from "flowbite-react";
import { SiFacebook, SiGoogle, SiApple } from "react-icons/si";

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
    const signupModule = document.getElementById("signup_module");
    signupModule?.classList.add("hidden");
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
      showWelcomePopup();
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

  const showWelcomePopup = () => {
    const welcomePopup = document.getElementById("welcome_popup");
    const signUpForm = document.getElementById("signup_form");
    if (welcomePopup) {
      welcomePopup.classList.remove("hidden");
      welcomePopup.classList.add("block");
      signUpForm?.classList.add("hidden");
    }
  };

  const showProfileGenres = () => {
    const profileGenres = document.getElementById("profile_genres");
    const welcomePopup = document.getElementById("welcome_popup");
    if (profileGenres) {
      profileGenres.classList.remove("hidden");
      profileGenres.classList.add("block");
      welcomePopup?.classList.add("hidden");
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
        className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen  items-center justify-center hidden backdrop-blur-sm z-50"
      >
        <div id="signup_form">
          <div className="flex flex-col items-center justify-center pt-4 py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
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
              className="m-2 mt-1 p-2 pl-4 rounded-full text-left text-black bg-slate-200 w-[350px] lg:w-[400px]"
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input
              className="m-2 mt-1 p-2 pl-4 rounded-full text-left text-black bg-slate-200 w-[350px] lg:w-[400px]"
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
              className="m-2 mt-1 p-2 pl-4 rounded-full text-left text-black bg-slate-200 w-[350px] lg:w-[400px]"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <label htmlFor="confirmpassword">Confirm password</label>
            <input
              className="m-2 mt-1 p-2 pl-4 rounded-full text-left text-black bg-slate-200 w-[350px] lg:w-[400px]"
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
                <SiGoogle
                  className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
                  id="google"
                />
              </Link>
              <Link href="/">
                <SiFacebook
                  className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
                  id="facebook"
                />
              </Link>
              <Link href="/">
                <SiApple
                  className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
                  id="apple"
                />
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
        {/* WELCOME POPUP */}
        <div id="welcome_popup" className="hidden">
          <div className="flex flex-col items-center justify-center py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <img className="my-10" src="../concertify_logo.svg" alt="" />
            <h1 className="my-4 text-3xl font-bold">
              Welcome {user.username}!
            </h1>
            <p className="mb-6 text-center mx-2">
              Great to have you on board! Lets personalize your experience in 2
              simple steps.
            </p>
            <button
              onClick={showProfileGenres}
              className="mb-4 mt-2 brand_gradient px-12 py-4 rounded-full text-white"
            >
              Get Started
            </button>
            <button
              onClick={showMessage}
              className="mb-4 mt-2 px-12 py-4 rounded-full text-purple-700 dark:text-[#8e0bf5]"
            >
              Skip to verification
            </button>
          </div>
        </div>
        {/* PROFILE GENRES MODUL */}
        <div id="profile_genres" className="hidden">
          <div className="flex flex-col items-center justify-center py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <div className="w-[300px] lg:w-[500px] mb-10">
              <Progress color="purple" progress={33} />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-center mx-6">
              What music genres do you like?
            </h1>
            <p className="mb-6 text-center mx-6">
              Get your own personalized recommendations
            </p>
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
          <div className="flex flex-col items-center justify-center py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <div className="w-[300px] lg:w-[500px] mb-10">
              <Progress color="purple" progress={66} />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-center mx-6">
              What music venues do you like?
            </h1>
            <p className="mb-6 text-center mx-6">
              Get your own personalized recommendations
            </p>
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
          <div className="flex flex-col items-center justify-center pt-4 py-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <div className="w-[300px] lg:w-[500px] mt-10">
              <Progress color="purple" progress={100} />
            </div>
            <h1 className="text-2xl text-center mx-6 mt-10">
              We've send a link to your email, to verify your account.
            </h1>
            <p className="mt-5 mb-10 text-center">
              Please click that link and login to your account to complete🎉🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
