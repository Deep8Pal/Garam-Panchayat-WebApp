import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth"; 
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevents page refresh

    try {
      if (!Data.username || !Data.password) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:7000/api/v1/login",
        Data
      );

      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      // Store user data in localStorage
      localStorage.setItem("id", response.data._id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/profile"); // Navigate to profile after successful login
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
            src="/login.png" 
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Login
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
              onClick={submit}
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?
            <Link
              to="/SignUp"
              className="text-blue-600 font-medium ml-1 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
