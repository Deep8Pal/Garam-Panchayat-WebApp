const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const User = require("../models/user");


// Sign-up Route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Username Validation
    if (username.length < 4) {
      return res.status(400).json({
        status: "Error",
        message: "Username must have at least 4 characters.",
      });
    }

    //  Email Validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: "Error", message: "Invalid email format." });
    }

    //  Password Validation
    if (password.length < 6) {
      return res.status(400).json({
        status: "Error",
        message: "Password must be at least 6 characters long.",
      });
    }

    // Check if user exists
    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });
    if (usernameExists || emailExists) {
      return res.status(400).json({
        status: "Error",
        message: usernameExists
          ? "Username already exists"
          : "Email already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    res.json({ status: "Success", message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});


//  Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find User
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ status: "Error", message: "Invalid Credentials" });
    }

    //  Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "Error", message: "Invalid Credentials" });
    }

    // Generate Token
    const token = jwt.sign({ id: user._id, role: user.role }, "garam123", {
      expiresIn: "30d",
    });

    res.json({ status: "Success", _id: user._id, role: user.role, token });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});


// Get User Profile
router.get("/getUserData", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from token

    const data = await User.findById(userId).select("-password"); // Hide password from response
    if (!data) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    res.status(200).json({ status: "Success", data });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "An error occurred" });
  }
});

module.exports = router;
