require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const Function = require("./Functions");
const Worker = require("./Worker");
const mongoose = require("mongoose");
const errorHandler = require("./Error");
const MONGO_URL = process.env.MONGO_URL;
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// MongoDB connection
const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    console.log("Retrying connection to MongoDB...");
    setTimeout(connectToMongo, 5000);
  }
};

connectToMongo();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Blockchain User API!");
});
app.post("/api/profile", Function.ProfileCreation);
app.post('/profile-upgradation',Function.UpdateProfile)
app.get("/user/:walletAddress", Function.getUserByWalletAddress);
app.get("/user/profile/:id", Function.getSingleUserProfile);
app.get("/refferal/:ID", Function.UserRefferalData);
app.get("/getMembers/:ID", Function.TotalDataApi);
app.get("/getalldata/:ID", Function.fetchReferredUsers);
app.get("/get24hrsUSDT", Function.getLast24HoursUSDT);
app.get("/getCompleteReferralChain/:ID", Function.getCompleteReferralChain);
app.get(
  "/getUserByPersonalAddress/:personalAddress",
  Function.getUserByPersonalAddress
);

app.get("/getAllUsers", Function.getAllUsers);
// app.get("/testing24hrs/:userAddress",Function.getUserEarningsLast24Hrs)
// 1=getAllUsers




// Error-handling middleware
app.use(errorHandler); // Use the correct middleware function

// Worker function
setInterval(Worker.WorkerFun, 9000);
// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
