const mongoose = require("mongoose");

const applicationFormSchema = new mongoose.Schema(
  {
    // ✅ User details auto-fill honge (Login ke basis pe)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ Basic personal details
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }, // Format: YYYY-MM-DD
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },
    nationality: { type: String, default: "Indian", required: true },

    // ✅ Address details
    address: { type: String, required: true },
    pinCode: { type: String, required: true, match: /^[1-9][0-9]{5}$/ }, // Indian pincode format
    district: { type: String, required: true },
    state: { type: String, required: true },

    // ✅ Contact details
    phoneNumber: { type: String, required: true, match: /^[6-9]\d{9}$/ },
    alternateContact: { type: String, match: /^[6-9]\d{9}$/ },

    // ✅ Identification documents
    verificationDocuments: {
      type: [
        {
          documentType: {
            type: String,
            enum: [
              "Aadhar Card",
              "Voter ID",
              "PAN Card",
              "Driving License",
              "Passport",
              "Others",
            ],
            required: true,
          },
          documentNumber: { type: String, required: true },
          otherDocument: { type: String, default: "" },
        },
      ],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one verification document is required.",
      },
    },

    // ✅ Application details
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
  },
  { timestamps: true }
);

const ApplicationForm = mongoose.model(
  "ApplicationForm",
  applicationFormSchema
);
module.exports = ApplicationForm;
