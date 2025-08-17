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

const transactionSchema = new mongoose.Schema(
  {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    amount: {
      type: Number,
      min: 0,
    },
    matrix: {
      type: Number,
      min: 0,
    },
    level: {
      type: Number,
      min: 0,
    },
    seen: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);


const userSchema = new mongoose.Schema({
  address: { type: String, unique: true, required: true }, // Ethereum address
  totalTeam: {
    type: Number,
    default: 0,
  },
  partners: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });  


const User = mongoose.models.User || mongoose.model("User", userSchema);


transactionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });
const notifications = mongoose.model("Transaction", transactionSchema);
// const User = mongoose.model("User", userSchema);
const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
module.exports = { UserProfile, User, notifications };
