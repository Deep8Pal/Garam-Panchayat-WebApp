const express = require("express");
const mongoose = require("mongoose");
const ApplicationForm = require("../models/applicationForm");
const User = require("../models/user");
const Application = require("../models/application");
const { authenticateToken } = require("./userAuth");

const router = express.Router();

/** ✅ Apply for an Application (PUT Request) */
router.put(
  "/apply-cart/:applicationId",
  authenticateToken,
  async (req, res) => {
    try {
      const { applicationId } = req.params;
      const userId = req.user.id;

      const {
        fullName,
        fatherName,
        motherName,
        dateOfBirth,
        gender,
        maritalStatus,
        nationality,
        address,
        pinCode,
        district,
        state,
        phoneNumber,
        alternateContact,
        verificationDocuments,
      } = req.body;

      // ✅ Check if application exists
      const application = await Application.findById(applicationId);
      if (!application) {
        return res
          .status(404)
          .json({ status: "Error", message: "Application not found" });
      }

      // ✅ Check if user has already applied
      const existingApplication = await ApplicationForm.findOne({
        userId,
        applicationId,
      });
      if (existingApplication) {
        return res.status(200).json({
          status: "Success",
          message: "You have already applied for this scheme.",
        });
      }

      // ✅ Create a new application form
      const applicationForm = new ApplicationForm({
        userId,
        fullName,
        fatherName,
        motherName,
        dateOfBirth,
        gender,
        maritalStatus,
        nationality,
        address,
        pinCode,
        district,
        state,
        phoneNumber,
        alternateContact,
        verificationDocuments,
        applicationId,
      });

      await applicationForm.save();

      // ✅ Add applicationForm ID to user's `applicationCart`
      const user = await User.findById(userId);
      user.applicationCart.push(applicationForm._id);
      await user.save(); // ✅ Save user after updating cart

      // ✅ Get updated cart data
      const updatedUser = await User.findById(userId).populate(
        "applicationCart"
      );

      res.status(201).json({
        status: "Success",
        message: "Application submitted successfully",
        applicationForm,
        updatedCart: updatedUser.applicationCart, // ✅ Return updated cart
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({
        status: "Error",
        message: "Error submitting application",
        error: error.message,
      });
    }
  }
);

/** ✅ Remove Application from Cart (DELETE Request) */
router.delete("/remove/:applicationId", authenticateToken, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const userId = req.user.id;

    // ✅ Find user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    // ✅ Find and delete the application form
    const applicationForm = await ApplicationForm.findOneAndDelete({
      userId,
      applicationId,
    });
    if (!applicationForm) {
      return res.status(404).json({
        status: "Error",
        message: "Application not found in your cart",
      });
    }

    // ✅ Remove from user's cart
    user.applicationCart = user.applicationCart.filter(
      (id) => id.toString() !== applicationForm._id.toString()
    );
    await user.save();

    res.status(200).json({
      status: "Success",
      message:
        "Application removed successfully. You can apply again if needed.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error removing application",
      error: error.message,
    });
  }
});

/** ✅ Get User Application Cart */
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ Find user and populate the applicationCart with application details
    const userData = await User.findById(userId).populate({
      path: "applicationCart",
      populate: {
        path: "applicationId", // Fetch application details
        select: "title description", // Only include title & description
      },
    });

    if (!userData) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    const cart = userData.applicationCart.reverse();

    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
