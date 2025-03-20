import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplicationsHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("⚠️ User not authenticated. Please log in.");

      const response = await axios.get(
        "http://localhost:7000/api/v1/get-order-history",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(response.data.data || []);
      setUserName(response.data.userName || "User");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Failed to fetch order history."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border border-green-300";
      case "Pending":
        return "bg-yellow-50 text-yellow-800 border border-yellow-300";
      case "Under Review":
        return "bg-blue-50 text-blue-800 border border-blue-300";
      case "Rejected":
        return "bg-red-50 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-600 hover:text-blue-700">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-blue-700">Application History</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Application History
              </h2>
              <p className="text-gray-600 mt-1">Welcome, {userName}</p>
            </div>
            <button
              onClick={fetchOrderHistory}
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition flex items-center text-sm"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-700 rounded-full animate-spin"></div>
              <p className="text-gray-600">Loading your applications...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-center p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Error
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={fetchOrderHistory}
                  className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-700">
                Your Recent Applications
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <th className="py-3 px-6 border-b border-gray-200">#</th>
                    <th className="py-3 px-6 border-b border-gray-200">
                      Application Name
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200">
                      Application ID
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200">
                      Status
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200">
                      Submitted On
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-blue-700">
                          {order.application?.title || "Unknown Application"}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700 font-mono">
                          {order.application?._id.slice(-10)}
                        </div>
                      </td>
                      <td
                        className="py-4 px-6 relative"
                        onMouseEnter={() => setHoveredId(order._id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <span
                          className={`px-3 py-2 text-xs font-medium rounded-full text-center block break-words whitespace-normal ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                        {/* ✅ Tooltip */}
                        {hoveredId === order._id &&
                          order.status === "Approved" && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-800 text-sm px-4 py-3 rounded-lg shadow-lg border border-gray-200 z-50 w-64 max-w-xs">
                              <div className="flex flex-col items-center space-y-2">
                                <div className="bg-green-100 w-full text-center py-2 rounded-md">
                                  <span className="font-bold text-green-700 flex items-center justify-center gap-2">
                                    <span className="bg-green-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                      ✓
                                    </span>
                                    Approved / स्वीकृत
                                  </span>
                                </div>
                                <div className="text-xs flex flex-col space-y-2 pt-1 w-full">
                                  <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
                                    <span className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-700">
                                      1
                                    </span>
                                    <span>
                                      Visit your nearest Gram Panchayat office
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
                                    <span className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-700">
                                      2
                                    </span>
                                    <span>Show your Username & Email ID</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-700">
                                      3
                                    </span>
                                    <span>Get your official document!</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </td>

                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mb-4">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Applications Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                You haven't submitted any applications yet. Start by applying
                for a government service.
              </p>
              <button className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                Apply Now
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Contact Support</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Call us at 1800-XXX-XXXX for assistance
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">FAQs</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Find answers to commonly asked questions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Live Chat</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Chat with our support team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-700">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-700">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-700">
                Contact Us
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-700">
                FAQs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApplicationsHistory;
