import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
import { ClipboardPen, FilePenLine, FileX } from "lucide-react";

const ViewSchemesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/v1/get-application-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  // ✅ Delete Function
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scheme?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:7000/api/v1/delete-application/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Send token only
        }
      );

      alert("Application deleted successfully!");
      navigate("/all-schemes"); // ✅ Redirect after deletion
    } catch (error) {
      console.error("❌ Error deleting scheme:", error);
      alert(error.response?.data?.message || "Error deleting scheme.");
    }
  };

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Scheme Document Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header with blue accent */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
            {/* Header */}
            <div className="border-b px-6 py-4">
              <h1 className="text-xl font-medium text-gray-800">
                {data?.title}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Scheme ID: {id.substring(0, 35)}...
              </p>
            </div>
            <p className="mt-2 text-gray-600 leading-relaxed">{data.desc}</p>
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Scheme Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-3 px-2.5 py-1 rounded-full flex items-center justify-center mt-0.5">
                      Start
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-800">
                        {data.startDate || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-3 px-2.5 py-1 rounded-full flex items-center justify-center mt-0.5">
                      End
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-800">
                        {data.endDate || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-3 px-2.5 py-1 rounded-full flex items-center justify-center mt-0.5">
                      For
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">
                        Eligible Beneficiaries
                      </p>
                      <p className="font-medium text-gray-800">
                        {data.eligibility || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-3 px-2.5 py-1 rounded-full flex items-center justify-center mt-0.5">
                      Docs
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">
                        Required Documents
                      </p>
                      <p className="font-medium text-gray-800">
                        {data.documents || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Authority Section */}
          <div className="border-t border-gray-100 p-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-lg font-sign text-gray-800">Deep Pal .</p>
                <p className="text-sm text-gray-500">Authorized Signature</p>
              </div>

              {/* Official Stamp - Keeping the original image */}
              <div className="flex flex-col items-center">
                <img
                  loading="lazy"
                  src="https://imgs.search.brave.com/QCp6sGFI0U5gQYEiXT_M6zCPrczw5xgdGY_bG4o7ybY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzIxLzQ1LzM5/LzM2MF9GXzIxNDUz/OTU4X1JKMnZXbzBj/RnBoSHNuQ0VJaTJR/dDdpbk5pY3RSaUFp/LmpwZw"
                  alt="Official Stamp"
                  className="w-20 h-20 opacity-70"
                />
                <p className="text-xs text-gray-400 mt-1">Official Stamp</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isLoggedIn && (
            <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-center">
              {role === "user" && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                >
                  <ClipboardPen className="w-4 h-4" /> Apply Now
                </button>
              )}

              {role === "admin" && (
                <div className="flex gap-3">
                  <Link
                    to={`/updateschemes/${id}`}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    <FilePenLine className="w-4 h-4" /> Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    <FileX className="w-4 h-4" /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Application Form Modal */}
      {showForm && (
        <ApplicationForm
          applicationId={id}
          userId={userId}
          schemeTitle={data.title}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ViewSchemesDetails;
