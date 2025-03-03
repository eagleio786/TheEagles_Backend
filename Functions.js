const { request } = require("express");
const { readFromContract, IdtoAdress } = require("./Worker");
const { UserProfile, User } = require("./Database");
const { v4: uuidv4 } = require("uuid");

const getCompleteReferralChain = async (req, res) => {
  const { ID } = req.params;

  try {
    const rootUser = await User.findOne({ id: ID }).select("-_id -__v");

    if (!rootUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const fetchReferralChain = async (userIds, chain = new Set()) => {
      if (!Array.isArray(userIds) || userIds.length === 0) {
        return [];
      }

      const referredUsers = await User.find({ id: { $in: userIds } }).select(
        "-_id -__v"
      );

      referredUsers.forEach((user) => {
        chain.add(user.id);
      });

      const nextLevelIds = referredUsers
        .filter((user) => Array.isArray(user.TotalReferred))
        .flatMap((user) => user.TotalReferred);

      await fetchReferralChain(nextLevelIds, chain);

      return Array.from(chain);
    };

    const referralChainIds = await fetchReferralChain(rootUser.TotalReferred);

    const referralChain = await User.find({
      id: { $in: referralChainIds },
    }).select("-_id -__v");

    res.status(200).json({
      message: "Complete referral chain fetched successfully",
      data: {
        user: rootUser,
        referralChain,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching referral chain", error: error.message });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const { walletAddress } = req.body; // Assuming walletAddress is unique

    // Check if the user profile exists
    const existingUser = await UserProfile.findOne({ walletAddress });
    let updatedProfile;
    if (!existingUser) {
      const newUser = await UserProfile.create({ walletAddress });


      console.log("newUser",newUser);
      
      updatedProfile = await UserProfile.findOneAndUpdate(
        { walletAddress:newUser.walletAddress },
        { $set: req.body }, // Update fields from request body
        { new: true } // Return the updated document
      );

      // return res.status(404).json({ message: "Profile not found!" });
    }

    // Update the user profile
    updatedProfile = await UserProfile.findOneAndUpdate(
      { walletAddress },
      { $set: req.body }, // Update fields from request body
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: "Profile updated successfully!",
      data: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};
const ProfileCreation = async (req, res) => {
  try {
    const existingUser = await UserProfile.findOne({
      walletAddress: req.body.walletAddress,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Profile already exists!",
        data: existingUser,
      });
    }
    const lastUser = await UserProfile.findOne().sort({ id: -1 });

    const newId = lastUser && lastUser.id ? Number(lastUser.id) + 1 : 1;

    const newUserProfile = new UserProfile({
      ...req.body,
      id: newId.toString(),
      walletAddress: req.body.walletAddress,
    });

    await newUserProfile.save();

    res.status(201).json({
      message: "User profile created successfully!",
      data: newUserProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error inserting data", error: error.message });
  }
};
const getSingleUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const userProfile = await UserProfile.findOne({ id: id }).select(
      "-_id -__v"
    );

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json({
      message: "User profile found successfully!",
      data: userProfile,
    });
  } catch (error) {
    res
      .status(500)

      .json({ message: "Error fetching data", error: error.message });
  }
};

const getUserByWalletAddress = async (req, res) => {
  const { walletAddress } = req.params;
  try {
    const user = await UserProfile.findOne({
      walletAddress: walletAddress,
    }).select("-_id -__v");

    console.log("kashif is a good boy", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // const contractData = await readFromContract(walletAddress);
    // console.log("contractData", contractData);

    res.status(200).json({
      message: "User found successfully",
      data: user,
      // contractData: contractData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
};

// const UserRefferalData = async (req, resp) => {
//   try {
//     const { ID } = req.params;
//     if (!ID) {
//       return resp.status(400).json({ message: "User ID is required" });
//     }

//     const Useradress = await IdtoAdress(ID);
//     const partners = await User.countDocuments({ referrer: Useradress });
//     console.log("Partners are ", partners);

//     const team = await User.findOne().sort({ id: -1 });
//     const TeamMembers = team.id - ID;

//     const user = await User.findOne({ id: ID });
//     if (!user) {
//       return resp.status(404).json({ message: "User not found" });
//     }

//     let val = user.referrer;
//     const Reffrer = await User.findOne({ referrer: val });
//     if (!Reffrer) {
//       return resp.status(404).json({
//         message: "Referrer not found",
//         Partner: partners,
//         Team: TeamMembers,
//         UplineAdress: null,
//       });
//     }

//     const UlineAdress = await User.findOne({ Personal: Reffrer.referrer });

//     return resp.status(200).json({
//       message: "User found successfully",
//       Partner: partners,
//       Team: TeamMembers,
//       UplineAdress: UlineAdress ? UlineAdress.Personal : null,
//     });

//   } catch (error) {
//     return resp.status(500).json({
//       message: "Error fetching user data",
//       error: error.message,
//     });
//   }
// };
const UserRefferalData = async (req, resp) => {
  try {
    const { ID } = req.params;
    if (!ID) {
      return resp.status(400).json({ message: "User ID is required" });
    }

    const Useradress = await IdtoAdress(ID);

    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    const totalPartners = await User.countDocuments({ referrer: Useradress });

    const last24hrsPartners = await User.countDocuments({
      referrer: Useradress,
      createdAt: { $gte: last24Hours },
    });

    console.log(
      "Total Partners:",
      totalPartners,
      "Last 24hrs Partners:",
      last24hrsPartners
    );

    const team = await User.findOne().sort({ id: -1 });
    const totalTeamMembers = team.id - ID;

    const last24hrsTeam = await User.countDocuments({
      id: { $gt: ID },
      createdAt: { $gte: last24Hours },
    });

    const user = await User.findOne({ id: ID });
    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }

    let val = user.referrer;
    const Reffrer = await User.findOne({ referrer: val });

    if (!Reffrer) {
      return resp.status(404).json({
        message: "Referrer not found",
        TotalPartners: totalPartners,
        Last24hrsPartners: last24hrsPartners,
        TotalTeamMembers: totalTeamMembers,
        Last24hrsTeamMembers: last24hrsTeam,
        UplineAdress: null,
      });
    }

    const UplineAdress = await User.findOne({ Personal: Reffrer.referrer });

    return resp.status(200).json({
      message: "User found successfully",
      TotalPartners: totalPartners,
      Last24hrsPartners: last24hrsPartners,
      TotalTeamMembers: totalTeamMembers,
      Last24hrsTeamMembers: last24hrsTeam,
      UplineAdress: UplineAdress ? UplineAdress.Personal : null,
    });
  } catch (error) {
    return resp.status(500).json({
      message: "Error fetching user data",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
};

const getUserByPersonalAddress = async (req, res) => {
  const { personalAddress } = req.params;
  try {
    const user = await User.findOne({ Personal: personalAddress });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
};

const TotalDataApi = async (req, res) => {
  const { ID } = req.params;
  try {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const totalUsers = await User.countDocuments();
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: last24Hours },
    });
    const team = await User.findOne().sort({ id: -1 });
    const TeamMembers = team ? team.id - ID : 0;
    const allUsers = await User.find(
      {},
      { totalUSDTReceived: 1, createdAt: 1 }
    );
    let totalUSDT = 0;
    let last24HoursUSDT = 0;
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      const amount = parseFloat(user.totalUSDTReceived.toString());
      totalUSDT += amount;
      if (user.createdAt >= last24Hours) {
        last24HoursUSDT += amount;
      }
    }
    return res.status(200).json({
      message: "User data fetched successfully",
      data: {
        totalUsers,
        recentUsers,
        totalUSDT,
        last24HoursUSDT,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user data",
      error: error.message,
    });
  }
};

const fetchReferredUsers = async (req, res) => {
  const { ID } = req.params;
  try {
    // Find the parent user
    const user = await User.findOne({ id: ID }).select("-_id -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const referredIds = user.TotalReferred;
    if (!Array.isArray(referredIds) || referredIds.length === 0) {
      return res.status(200).json({
        message: "User has no referrals",
        data: user,
        referredUsers: [],
      });
    }
    console.log("this si a data ", referredIds);

    const referredUsers = await User.find({ id: { $in: referredIds } }).select(
      "-_id -__v"
    );

    res.status(200).json({
      message: "User and referred users found successfully",
      data: user,
      referredUsers: referredUsers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
};

const getLast24HoursUSDT = async (req, res) => {
  // console.log("in function");

  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const usersLast24Hours = await User.find({
      updatedAt: { $gte: twentyFourHoursAgo },
    });

    const allUsers = await User.find();

    const totalUSDTLast24Hours = usersLast24Hours.reduce((sum, user) => {
      return sum + parseFloat(user.totalUSDTReceived.toString());
    }, 0);

    const totalUSDTAllTime = allUsers.reduce((sum, user) => {
      return sum + parseFloat(user.totalUSDTReceived.toString());
    }, 0);

    res.status(200).json({
      message: "Total USDT received statistics",
      totalUSDTReceivedLast24Hours: totalUSDTLast24Hours,
      totalUSDTReceivedAllTime: totalUSDTAllTime,
      totalUsers: allUsers.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const getUserEarningsLast24Hrs = async (req,res) => {
  const { userAddress } = req.params;
  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Find earnings of a specific user updated in the last 24 hours
    const user = await User.findOne({
      Personal: userAddress,
      updatedAt: { $gte: twentyFourHoursAgo },
    });

    const earnings = user ? user.totalUSDTReceived : 0;
    console.log(`User ${userAddress} Earnings in Last 24 Hours: ${earnings} USDT`);
    return earnings;
  } catch (error) {
    console.error("Error fetching user earnings:", error);
  }
};

module.exports = {
  ProfileCreation,
  getUserByWalletAddress,
  getSingleUserProfile,
  getLast24HoursUSDT,
  fetchReferredUsers,
  UserRefferalData,
  TotalDataApi,
  UpdateProfile,
  getCompleteReferralChain,
  getUserByPersonalAddress,
  getAllUsers,
  getUserEarningsLast24Hrs
};
