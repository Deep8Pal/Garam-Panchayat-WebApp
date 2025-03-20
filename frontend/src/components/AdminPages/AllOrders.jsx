import React, { useEffect, useState } from "react";
import axios from "axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:7000/api/v1/get-all-application-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.data);
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:7000/api/v1/update-application-order-status/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: response.data.status }
            : order
        )
      );

      // Show a success alert message
      alert("Status updated successfully!");
    } catch (err) {
      setError("❌ Error updating status.");
      console.error("❌ Error updating status:", err);

      // Show an error alert message
      alert("Failed to update status.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        📜 All Application Orders
      </h2>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-bold">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                📄 {order.application?.title || "No Title"}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {order.application?.desc || "No Description Available"}
              </p>

              <div className="text-sm text-gray-500 mb-3">
                <p>
                  <span className="font-medium text-gray-700">User:</span>{" "}
                  {order.user?.fullName || "N/A"}
                  <span className="text-gray-400">
                    {" "}
                    ({order.user?.email || "No Email"})
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Application ID:
                  </span>{" "}
                  {order.application?._id || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Scheme ID:</span>{" "}
                  {order._id}
                </p>

                <p>
                  <span className="font-medium text-gray-700">Status:</span>
                  <select
                    className="ml-2 px-3 py-1 rounded text-black bg-gray-100 border"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </p>

                <p>
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
