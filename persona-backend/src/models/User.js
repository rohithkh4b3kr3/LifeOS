const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    pushToken: String,
    razorpay_subscription_id: String,
    stripe_subscription_id: String,
    subscription_status: {
        type: String,
        enum: ["free", "active", "cancelled", "expired"],
        default: "free",
    },
    subscription_expires_at: Date,
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);