const { UserProfile, notifications } = require("./Database");
const { ethers } = require("ethers");
const rpcUrl = "https://bsc-mainnet.infura.io/v3/f5778e9c8b764c2eb60678ad73f25586";
const eventName = "FundsDistributed";
const { abi, contractAddress, X3DiamondAbi, X3DiamondAddress } = require("./exports");
const { Transaction } = require("ethers");
// const UpdateProfile = async (req, res) => {
//   try {
//     const { walletAddress } = req.body; // Assuming walletAddress is unique

//     // Check if the user profile exists
//     const existingUser = await UserProfile.findOne({ walletAddress });
//     let updatedProfile;
//     if (!existingUser) {
//       const newUser = await UserProfile.create({ walletAddress });

//       console.log("newUser", newUser);

//       updatedProfile = await UserProfile.findOneAndUpdate(
//         { walletAddress: newUser.walletAddress },
//         { $set: req.body }, // Update fields from request body
//         { new: true } // Return the updated document
//       );

//       // return res.status(404).json({ message: "Profile not found!" });
//     }
//     console.log("kashif ", req.body);

//     // Update the user profile
//     updatedProfile = await UserProfile.findOneAndUpdate(
//       { walletAddress },
//       { $set: req.body }, // Update fields from request body
//       { new: true } // Return the updated document
//     );

//     res.status(200).json({
//       message: "Profile updated successfully!",
//       data: updatedProfile,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating profile", error: error.message });
//   }
// };
// const ProfileCreation = async (req, res) => {
//   try {
//     const existingUser = await UserProfile.findOne({
//       walletAddress: req.body.walletAddress,
//     });
//     console.log("kashif ", req.body.Image);

//     if (existingUser) {
//       return res.status(400).json({
//         message: "Profile already exists!",
//         data: existingUser,
//       });
//     }
//     // const lastUser = await UserProfile.findOne().sort({ id: -1 });
//     const lastUser = await UserProfile.findOne()
//       .sort({ id: -1 })
//       .collation({ locale: "en", numericOrdering: true });

//     const newId = lastUser && lastUser.id ? Number(lastUser.id) + 1 : 1;
//     console.log("ID for new user is ", newId, lastUser);

//     const newUserProfile = new UserProfile({
//       ...req.body,
//       id: newId.toString(),
//       walletAddress: req.body.walletAddress,
//     });

//     await newUserProfile.save();

//     res.status(201).json({
//       message: "User profile created successfully!",
//       data: newUserProfile,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error inserting data", error: error.message });
//   }
// };
// const getSingleUserProfile = async (req, res) => {
//   const { walletAddress } = req.params;
//   console.log(walletAddress);
//   try {
//     const userProfile = await UserProfile.findOne({
//       walletAddress: walletAddress,
//     }).select("-_id -__v");

//     if (!userProfile) {
//       return res.status(404).json({ message: "User profile not found" });
//     }

//     res.status(200).json({
//       message: "User profile found successfully!",
//       data: userProfile,
//     });
//   } catch (error) {
//     res
//       .status(500)

//       .json({ message: "Error fetching data", error: error.message });
//   }
// };

const UpdateProfile = async (req, res) => {
  try {
    const { walletAddress, ...updateData } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ 
        message: "Wallet address is required" 
      });
    }

    console.log('Update request for wallet:', walletAddress);
    console.log('Update data:', updateData);

    // Check if the user profile exists
    const existingUser = await UserProfile.findOne({ walletAddress });

    if (!existingUser) {
      return res.status(404).json({ 
        message: "Profile not found. Please create a profile first." 
      });
    }

    // Update the user profile
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { walletAddress },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date() // Add timestamp
        }
      },
      { 
        new: true,
        runValidators: true // Run schema validators
      }
    );

    if (!updatedProfile) {
      return res.status(500).json({ 
        message: "Failed to update profile" 
      });
    }

    res.status(200).json({
      message: "Profile updated successfully!",
      data: updatedProfile,
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        error: error.message
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate entry error",
        error: "Profile with this wallet address already exists"
      });
    }

    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

const ProfileCreation = async (req, res) => {

  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  
  try {
  const {walletAddress}=req.params
    const {  ...profileData } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ 
        message: "Wallet address is required" 
      });
    }

    console.log('Create profile request for wallet:', walletAddress);
    console.log('Profile data:', profileData);

    // Check if profile already exists
    const existingUser = await UserProfile.findOne({ walletAddress });

    if (existingUser) {
      return res.status(400).json({
        message: "Profile already exists for this wallet address!",
        data: existingUser,
      });
    }

    // Get the next ID
    const lastUser = await UserProfile.findOne()
      .sort({ id: -1 })
      .collation({ locale: "en", numericOrdering: true });

    const newId = lastUser && lastUser.id ? Number(lastUser.id) + 1 : 1;
    console.log("New user ID:", newId);

    // Create new profile
    const newUserProfile = new UserProfile({
      ...profileData,
      id: newId.toString(),
      walletAddress,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedProfile = await newUserProfile.save();

    res.status(201).json({
      message: "User profile created successfully!",
      data: savedProfile,
    });

  } catch (error) {
    console.error('Error creating profile:', error);

    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        error: error.message
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Profile already exists for this wallet address!",
        error: "Duplicate wallet address"
      });
    }

    // Handle image size errors (if you're using express file upload middleware)
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        message: "Image file too large",
        error: "Please select an image under 1MB"
      });
    }

    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

// Optional: Get profile by wallet address
const GetProfile = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({ 
        message: "Wallet address is required" 
      });
    }

    const profile = await UserProfile.findOne({ walletAddress });

    if (!profile) {
      return res.status(404).json({ 
        message: "Profile not found" 
      });
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      data: profile
    });

  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};





let isListening = false;

function listenToContractEvent() {
  return async function (callback) {
    if (isListening) {
      console.log("⚠️ Already listening to contract event");
      return;
    }
 try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(X3DiamondAddress, X3DiamondAbi, provider);

      contract.on(eventName, async (...args) => {
        const eventObj = args[args.length - 1];
        const eventArgs = args.slice(0, -1);

        console.log(`📢 [${eventName}] Event emitted:`, eventArgs);
        console.log("event object", eventObj);

        try {
          const tx = await notifications.create({
            from: eventArgs[0],
            to: eventArgs[1],
            amount: Number(eventArgs[3]),
            level: Number(eventArgs[2]).toString(),
            seen: false,
          });
          console.log("✅ Event saved:", tx);
        } catch (saveErr) {
          console.error("❌ Error saving:", saveErr);
        }

        if (typeof callback === "function") {
          callback(eventArgs, eventObj);
        }
      });

      isListening = true;
    } catch (err) {
      console.error("❌ Error setting up listener for X3:", err);
    }
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(contractAddress, abi, provider);

      contract.on(eventName, async (...args) => {
        const eventObj = args[args.length - 1];
        const eventArgs = args.slice(0, -1);

        console.log(`📢 [${eventName}] Event emitted:`, eventArgs);
        console.log("event object", eventObj);

        try {
          const tx = await notifications.create({
            from: eventArgs[0],
            to: eventArgs[1],
            amount: Number(eventArgs[4]),
            matrix: Number(eventArgs[2]).toString(),
            level: Number(eventArgs[3]).toString(),
            seen: false,
          });
          console.log("✅ Event saved:", tx);
        } catch (saveErr) {
          console.error("❌ Error saving:", saveErr);
        }

        if (typeof callback === "function") {
          callback(eventArgs, eventObj);
        }
      });

      isListening = true;
    } catch (err) {
      console.error("❌ Error setting up listener for X1/X2:", err);
    }
  };
}
const updateByWallet = async (req, res) => {
  try {
    const { walletAddress } = req.params; 

    // Update all documents where "from" matches
    const result = await notifications.updateMany(
      { to: walletAddress },             // match condition
      { $set: { seen: true } }    // change field
    );

    res.json({
      message: "Updated successfully",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllTrans = async (req, resp) => {
 try {
  const entries = await notifications
    .find({})
    .sort({ createdAt: -1 }) // newest first
    .limit(20);              // only top 20

  resp.status(200).json(entries);
} catch (error) {
  console.error(error);
  resp.status(500).json({
    error: "Something went wrong while getting transactions",
  });
}

};



module.exports = {
    UpdateProfile,
  ProfileCreation,
  GetProfile,
  listenToContractEvent,
  getAllTrans,
  updateByWallet,
};
