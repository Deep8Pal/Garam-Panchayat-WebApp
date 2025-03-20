import React, { useState } from "react";
import axios from "axios";

const AddSchemes = () => {
  const [formData, setFormData] = useState({ title: "", desc: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:7000/api/v1/add-application",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      setIsSuccess(true);
      alert("✅ " + response.data.message);

      setFormData({ title: "", desc: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error adding scheme.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 md:p-10">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
          Add New Scheme
        </h2>

        {/* Success / Error Message */}
        {message && (
          <div
            className={`p-3 mb-4 text-white rounded text-center transition-opacity duration-300 ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Scheme Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Scheme Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Scheme Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Scheme Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Scheme Description
            </label>
            <textarea
              name="desc"
              placeholder="Enter Scheme Description"
              value={formData.desc}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-32 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all disabled:bg-gray-400 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
                Adding...
              </>
            ) : (
              "Add Scheme"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchemes;
