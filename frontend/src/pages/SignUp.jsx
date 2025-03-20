import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevents page refresh

    try {
      if (!Data.username || !Data.email || !Data.password) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:7000/api/v1/sign-up",
        Data
      );

      alert(response.data.message);
      navigate("/LogIn"); // Navigate after successful signup
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-4xl">
        {/* Left Side - Image Placeholder */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
          <img
            loading="lazy"
            src="/signup.png" 
            alt="Signup Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Create an Account
          </h2>

          <form className="mt-6" onSubmit={submit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="username"
                value={Data.username}
                onChange={change}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                value={Data.email}
                onChange={change}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                value={Data.password}
                onChange={change}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md mt-6 hover:bg-blue-700 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?
            <Link
              to="/LogIn"
              className="text-blue-600 font-medium ml-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
