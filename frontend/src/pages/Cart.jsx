import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("⚠️ User not authenticated. Please log in.");

      const response = await axios.get(
        "http://localhost:7000/api/v1/get-user-cart",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplications(response.data.data || []);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Failed to fetch applications."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (applicationId) => {
    if (!applicationId) return;

    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:7000/api/v1/remove/${applicationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplications((prev) =>
        prev.filter((app) => app.applicationId._id !== applicationId)
      );

      alert(
        "✅ Application deleted successfully! You can re-apply it later if you want"
      );
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("❌ Error deleting application. Please try again.");
    }
  };

  const handleSubmitOrder = async () => {
    if (!applications.length) {
      alert("⚠️ No applications to submit.");
      return;
    }

    if (!window.confirm("Are you sure you want to submit all applications?"))
      return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:7000/api/v1/place-order",
        { order: applications.map((app) => ({ _id: app.applicationId._id })) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Order Response:", response.data);
      alert("✅ All applications submitted successfully!");
      await fetchApplications();

      setTimeout(() => {
        navigate("/profile/applications-history");
      }, 500);
    } catch (error) {
      console.error("❌ Error submitting applications:", error);
      alert(
        error.response?.data?.message || "❌ Error submitting applications."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleCardExpand = useCallback((id) => {
    setExpandedCard((prevId) => (prevId === id ? null : id));
  }, []);

  const ApplicationCard = React.memo(
    ({ app, onDelete, onToggleExpand, isExpanded }) => {
      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      };

      return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-md">
          {/* Simplified Header */}
          <div className="border-l-4 border-blue-500 px-4 py-3 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-800 truncate">
              {app.applicationId?.title || "Unknown Scheme"}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              ID: ...{app.applicationId?._id?.slice(-10)}
            </p>
          </div>

          {/* Main Content */}
          <div className="p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                <User size={16} />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{app.fullName}</p>
              </div>
            </div>

            {/* Expandable Content - More minimal */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm space-y-4">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500">Father's Name</p>
                    <p className="font-medium">{app.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Mother's Name</p>
                    <p className="font-medium">{app.motherName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formatDate(app.dateOfBirth)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium">{app.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Marital Status</p>
                    <p className="font-medium">{app.maritalStatus}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-500">Nationality</p>
                    <p className="font-medium">{app.nationality}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{app.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Alternate Contact</p>
                    <p className="font-medium">
                      {app.alternateContact || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Address Details */}
                <div className="mt-2">
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium">{app.address}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-500">Pin Code</p>
                    <p className="font-medium">{app.pinCode}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">District</p>
                    <p className="font-medium">{app.district}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">State</p>
                    <p className="font-medium">{app.state}</p>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="mt-4">
                  <h3 className="text-gray-700 font-semibold">
                    Verification Documents
                  </h3>
                  {app.verificationDocuments?.length > 0 ? (
                    <div className="mt-2 border rounded-lg p-3 bg-gray-50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {app.verificationDocuments.map((doc, index) => (
                          <div key={index} className="p-2 border-b">
                            <p className="text-gray-500">Document Type</p>
                            <p className="font-medium">{doc.documentType}</p>
                            <p className="text-gray-500 mt-1">
                              Document Number
                            </p>
                            <p className="font-medium">{doc.documentNumber}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-2">No Documents Provided</p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => onToggleExpand(app._id)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp size={16} className="mr-1" /> Less
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="mr-1" /> More
                  </>
                )}
              </button>

              <button
                onClick={() => onDelete(app.applicationId._id)}
                className="text-sm text-red-500 hover:text-red-700 flex items-center"
              >
                <Trash2 size={14} className="mr-1" /> Remove
              </button>
            </div>
          </div>
        </div>
      );
    }
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          My Applications Cart
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 px-4 py-3 text-sm text-red-600 rounded">
            {error}
          </div>
        ) : applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard
                key={app._id}
                app={app}
                onDelete={handleDelete}
                onToggleExpand={toggleCardExpand}
                isExpanded={expandedCard === app._id}
              />
            ))}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmitOrder}
                disabled={submitting}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-300 border-t-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Submit All"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded shadow-sm">
            <div className="text-gray-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="text-gray-600">No applications in cart</p>
            <p className="text-gray-400 text-sm mt-1">
              Add applications to continue
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
