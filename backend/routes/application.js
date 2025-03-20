const router = require("express").Router();
const Application = require("../models/application");
const { authenticateToken } = require("./userAuth");

// Create application -- Admin
router.post("/add-application", authenticateToken, async (req, res) => {
  try {
    const application = new Application({
      title: req.body.title,
      desc: req.body.desc,
    });

    await application.save();
    return res.json({
      status: "Success",
      message: "Application-Doc added successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Update application -- Admin
router.put("/update-application", authenticateToken, async (req, res) => {
  try {
    const { applicationid } = req.headers;

    if (!applicationid) {
      return res.status(400).json({ message: "Application ID is required" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationid,
      {
        title: req.body.title,
        desc: req.body.desc,
      },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.json({
      status: "Success",
      message: "Application-Doc updated successfully!",
      data: updatedApplication,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Delete application -- Admin
router.delete(
  "/delete-application/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params; // ✅ Correct way to get the ID from URL

      if (!id) {
        return res.status(400).json({ message: "Application ID is required" });
      }

      const deletedApplication = await Application.findByIdAndDelete(id);

      if (!deletedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }

      return res.json({
        status: "Success",
        message: "Application deleted successfully!",
      });
    } catch (error) {
      console.error("❌ Error deleting application:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }
);

// Get all applications
router.get("/get-all-applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: applications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Get recently added applications
router.get("/get-recent-applications", async (req, res) => {
  try {
    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .limit(4);
    return res.json({
      status: "Success",
      data: applications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Get application by ID
router.get("/get-application-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.json({
      status: "Success",
      data: application,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
