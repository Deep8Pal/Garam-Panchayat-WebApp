const express = require("express");
const mongoose = require("mongoose"); // ✅ Ensure mongoose is imported
const router = express.Router();
const User = require("../models/user");
const Application = require("../models/applicationForm");
const Order = require("../models/applicationOrder");
const { authenticateToken } = require("./userAuth");

// 📌 ✅ Place Order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const { order } = req.body;

    if (!order || !Array.isArray(order)) {
      return res
        .status(400)
        .json({ status: "Error", message: "Invalid order data" });
    }

    // ✅ Naye Orders Save Karna & IDs Collect Karna
    const newOrders = await Promise.all(
      order.map(async (orderData) => {
        const newOrder = new Order({
          user: id,
          application: orderData._id,
          status: "Pending",
        });
        await newOrder.save();
        return newOrder._id; // ✅ Order ID return kar rahe hain
      })
    );

    // ✅ User ke applicationOrders Array me Orders Add Karna
    await User.findByIdAndUpdate(id, {
      $push: { applicationOrders: { $each: newOrders } }, // ✅ Orders push karna
      $set: { applicationCart: [] }, // ✅ Cart Empty Karna
    });

    return res.json({
      status: "Success",
      message: "Order Placed Successfully & Cart Cleared",
    });
  } catch (error) {
    console.error("❌ Order Placement Failed:", error.message);
    return res
      .status(500)
      .json({ status: "Error", message: "An error occurred" });
  }
});

// Get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user; // ✅ Extract user ID from authenticated token

    // ✅ Find user and populate their order history
    const userData = await User.findById(id).populate({
      path: "applicationOrders", // ✅ Ensure correct field name (was "orders")
      populate: { path: "application" }, // ✅ Ensure correct reference
    });

    if (!userData) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    const ordersData = userData.applicationOrders.reverse(); // ✅ Reverse orders for latest first

    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.error("❌ Error fetching order history:", error);
    return res.status(500).json({
      status: "Error",
      message: "An error occurred while fetching order history.",
    });
  }
});

// 📌 ✅ Get All Orders (Admin) With Full Details
router.get(
  "/get-all-application-orders",
  authenticateToken,
  async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("user", "fullName email") // ✅ Populate User details
        .populate({
          path: "application",
          select: "title desc", // ✅ Populate Application title & desc
        })
        .sort({ createdAt: -1 });

      return res.json({
        status: "Success",
        data: orders,
      });
    } catch (error) {
      console.log("❌ Error fetching orders:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }
);

// 📌 ✅ Update Order Status (Admin)
router.put(
  "/update-application-order-status/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      await Order.findByIdAndUpdate(id, { status: req.body.status });

      return res.json({
        status: "Success",
        message: "Application Order Status Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }
);

module.exports = router;
