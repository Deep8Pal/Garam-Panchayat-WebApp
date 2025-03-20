import React, { useState } from "react";
import axios from "axios";

const ApplicationForm = ({ applicationId, onClose, setUserCart }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    nationality: "Indian",
    address: "",
    pinCode: "",
    district: "",
    state: "",
    phoneNumber: "",
    alternateContact: "",
    verificationDocuments: [{ documentType: "", documentNumber: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Handle Document Change
  const handleDocumentChange = (index, e) => {
    const updatedDocuments = [...formData.verificationDocuments];
    updatedDocuments[index][e.target.name] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      verificationDocuments: updatedDocuments,
    }));
  };

  // ✅ Add More Documents
  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      verificationDocuments: [
        ...prev.verificationDocuments,
        { documentType: "", documentNumber: "" },
      ],
    }));
  };

  // ✅ Remove Document
  const removeDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      verificationDocuments: prev.verificationDocuments.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // ✅ API Call for Submitting Application Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:7000/api/v1/apply-cart/${applicationId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      alert("Application Submitted Successfully!");

      // ✅ Backend se updated cart data update karo
      if (setUserCart && typeof setUserCart === "function") {
        setUserCart(response.data.updatedCart);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage(
        error.response?.data?.message || "Error submitting application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Apply for Scheme
        </h2>
        {message && <p className="text-center text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              value={formData.fatherName}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="motherName"
              placeholder="Mother's Name"
              value={formData.motherName}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Gender, Marital Status, Nationality */}
          <div className="grid grid-cols-3 gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Marital Status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              readOnly
              className="input bg-gray-100"
            />
          </div>

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="input"
          />
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="pinCode"
              placeholder="Pincode"
              value={formData.pinCode}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="alternateContact"
              placeholder="Alternate Contact (Optional)"
              value={formData.alternateContact}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Verification Documents */}
          <h3 className="text-lg font-semibold">Verification Documents</h3>
          {formData.verificationDocuments.map((doc, index) => (
            <div key={index} className="flex items-center gap-4">
              <select
                name="documentType"
                value={doc.documentType}
                onChange={(e) => handleDocumentChange(index, e)}
                required
                className="input"
              >
                <option value="">Select Document Type</option>
                <option>Aadhar Card</option>
                <option>Voter ID</option>
                <option>PAN Card</option>
                <option>Driving License</option>
                <option>Passport</option>
              </select>
              <input
                type="text"
                name="documentNumber"
                placeholder="Document Number"
                value={doc.documentNumber}
                onChange={(e) => handleDocumentChange(index, e)}
                required
                className="input"
              />
              <button
                type="button"
                onClick={() => removeDocument(index)}
                className="text-red-500"
              >
                ✖
              </button>
            </div>
          ))}
          <button type="button" onClick={addDocument} className="text-blue-500">
            + Add More
          </button>

          {/* Submit & Close Buttons */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
