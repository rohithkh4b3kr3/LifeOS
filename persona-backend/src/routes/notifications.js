const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/register", auth, async (req, res) => {
  try {
    const { pushToken } = req.body;
    if (!pushToken) {
      return res.status(400).json({ error: "Push token required" });
    }

    // Find or create user by ID from auth middleware
    let user = await User.findById(req.user.id);
    if (!user) {
      user = await User.create({ _id: req.user.id, pushToken });
    } else {
      user.pushToken = pushToken;
      await user.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Notification registration error:", err);
    res.status(500).json({ error: "Failed to register push token" });
  }
});

module.exports = router;
