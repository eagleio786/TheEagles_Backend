const mongoose = require("mongoose");
const UserProfileSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String },
  profileImage: { type: String },
  email: { type: String, unique: false },
  description: { type: String },
  walletAddress: { type: String, required: true, unique: true },
  socialLinks: {
    facebook: { type: String },
    youtube: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    whatsapp: { type: String },
  },
});
const userSchema = new mongoose.Schema(
  {
    referrer: {
      type: String,
      required: true,
    },
    Personal: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    currentX1Level: {
      type: Number,
      // required: true,
    },
    currentX2Level: {
      type: Number,
      // required: true,
    },
    totalUSDTReceived: {
      type: String, // Supports large numbers
      default: 0,
    },
    TotalReferred: { type: [Number], default: [] }, // all childs
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
module.exports = { UserProfile, User };
