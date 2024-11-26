"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie library
import useDropDownDataStore from "../../store/dropDownDataStore";

const Page = () => {
  const {fetchDropDownData}=useDropDownDataStore()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token to cookies
        Cookies.set("token", data.token, {
          expires: rememberMe ? 7 : undefined, // Set expiration if 'Remember me' is checked
          secure: true,
          sameSite: "Strict",
        });
        localStorage.setItem('role',JSON.stringify(data.role))
        // Redirect to a secure route, e.g., /dashboard
        window.location.href = "/";
      } else {
        // Handle errors (wrong credentials, etc.)
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

 

  return (
    <div className="bg-black text-white h-screen fixed top-0 start-0 z-40 w-full flex justify-center items-center">
      <div className="w-1/3 h-[500px] bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <div className="mt-6">
             <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
