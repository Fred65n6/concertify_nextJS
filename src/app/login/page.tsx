"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";
import Link from "next/link";

export default function LoginPage() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState<string>("");
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const openSignupModule = () => {
    const signupModule = document.getElementById("signup_module");
    const loginModule = document.getElementById("login_module");
    loginModule?.classList.add("hidden");
    signupModule?.classList.remove("hidden");
    signupModule?.classList.add("grid");
  };

  const closeLoginModule = () => {
    const loginModule = document.getElementById("login_module");
    loginModule?.classList.add("hidden");
    loginModule?.classList.remove("grid");
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      window.location.reload();
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

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      id="login_module"
      className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen  items-center justify-center hidden backdrop-blur-sm z-50"
    >
      <div className="flex flex-col items-center justify-center pt-4 py-8 w-[600px] bg-white rounded-lg">
        <button
          type="button"
          onClick={closeLoginModule}
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
        <h1 className="mb-4 text-3xl font-bold dark:text-black">
          {loading ? "Processing" : "Login"}
        </h1>
        <p className="mb-6 dark:text-black">Login to continue exploring</p>

        <hr />
        {error && <div className="text-red-500">{error}</div>}
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
        <button
          onClick={onLogin}
          className="m-4 brand_gradient px-12 py-4 rounded-full text-white "
          disabled={buttonDisabled}
        >
          Login
        </button>
        <div className="grid gap-4 text-center mt-4">
          <button
            className="text-purple-700 hover:underline"
            onClick={openSignupModule}
          >
            Visit sign up page
          </button>
          <Link
            className="text-purple-700 hover:underline"
            href="/forgotPassword"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
