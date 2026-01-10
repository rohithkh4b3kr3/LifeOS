const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// ---- RAZORPAY SUBSCRIPTION (India) ----
router.post("/subscribe/razorpay", auth, async (req, res) => {
  try {
    const { subscription_id, plan_id } = req.body;

    if (!subscription_id) {
      return res.status(400).json({ error: "Subscription ID required" });
    }

    // In production, verify with Razorpay API
    // For now, just save the subscription ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.razorpay_subscription_id = subscription_id;
    user.subscription_status = "active";
    user.subscription_expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await user.save();

    res.json({
      success: true,
      message: "Subscription activated",
      subscription_status: user.subscription_status,
    });
  } catch (err) {
    console.error("Razorpay subscription error:", err);
    res.status(500).json({ error: "Failed to process subscription" });
  }
});

// ---- STRIPE SUBSCRIPTION (US) ----
router.post("/subscribe/stripe", auth, async (req, res) => {
  try {
    const { subscription_id, plan_id } = req.body;

    if (!subscription_id) {
      return res.status(400).json({ error: "Subscription ID required" });
    }

    // In production, verify with Stripe API
    // For now, just save the subscription ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.stripe_subscription_id = subscription_id;
    user.subscription_status = "active";
    user.subscription_expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await user.save();

    res.json({
      success: true,
      message: "Subscription activated",
      subscription_status: user.subscription_status,
    });
  } catch (err) {
    console.error("Stripe subscription error:", err);
    res.status(500).json({ error: "Failed to process subscription" });
  }
});

// ---- CHECK SUBSCRIPTION STATUS ----
router.get("/status", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if subscription expired
    if (
      user.subscription_status === "active" &&
      user.subscription_expires_at &&
      new Date() > user.subscription_expires_at
    ) {
      user.subscription_status = "expired";
      await user.save();
    }

    res.json({
      subscription_status: user.subscription_status,
      expires_at: user.subscription_expires_at,
      is_premium: user.subscription_status === "active",
    });
  } catch (err) {
    console.error("Subscription status error:", err);
    res.status(500).json({ error: "Failed to check subscription" });
  }
});

// ---- CANCEL SUBSCRIPTION ----
router.post("/cancel", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.subscription_status = "cancelled";
    await user.save();

    res.json({
      success: true,
      message: "Subscription cancelled",
      subscription_status: user.subscription_status,
    });
  } catch (err) {
    console.error("Cancel subscription error:", err);
    res.status(500).json({ error: "Failed to cancel subscription" });
  }
});

module.exports = router;

