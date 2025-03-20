import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";
import MobileBar from "../components/Profile/MobileBar";

const Profile = () => {
  const [ProfileData, setProfileData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      history("/");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:7000/api/v1/getUserData",
            { headers }
          );
          console.log("API Response:", response.data); // ✅ Debug API Data
            // ✅ Console Clear
      setTimeout(() => console.clear(), 2000);
          setProfileData(response.data.data); // ✅ Ensure Correct Data Assignment
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, history]); // ✅ Dependency array added to prevent infinite calls

  return (
    <>
      {!ProfileData ? (
        /** ✅ Loader Centered on Screen */
        <div className="flex items-center justify-center min-h-screen bg-[#e3eaf0]">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen bg-[#e3eaf0] px-4 md:px-8 py-6 flex flex-col lg:flex-row gap-6 text-gray-900">
          {/* Sidebar */}
          <div className="h-auto lg:h-[80vh] w-full lg:w-1/5 bg-[#546a7e] text-white shadow-md border border-gray-400 rounded-md p-4">
            <Sidebar ProfileData={ProfileData} />
          </div>

          {/* Mobile Bar (Only visible in small screens) */}
          <div className="block lg:hidden">
            <MobileBar />
          </div>

          {/* Main Content Section */}
          <div className="h-auto w-full lg:w-4/5 bg-[#F2F5F9] shadow-md border border-gray-400 rounded-md p-6">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
