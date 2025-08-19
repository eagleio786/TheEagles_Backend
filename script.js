const { abi, contractAddress } = require("./exports.js");
const { ethers } = require("ethers");
const { User } = require("./Database.js");
const rpcUrl = "https://bsc-mainnet.infura.io/v3/f5778e9c8b764c2eb60678ad73f25586";


// -------------------- PROVIDER + CONTRACT --------------------
const provider = new ethers.JsonRpcProvider(
  "https://bsc-mainnet.infura.io/v3/ceed865512994f26b6e18fce575f85cd"
);
const contract = new ethers.Contract(contractAddress, abi, provider);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// -------------------- CONTRACT HELPERS --------------------
async function GetCurrentUsers() {
  try {
    return await contract.lastUserid(); // BigInt
  } catch (error) {
    throw new Error("Error reading from contract: " + error.message);
  }
}

async function usersfun(userAddress) {
  try {
    return await contract.users(userAddress);
  } catch (error) {
    console.log("error in users() for:", userAddress, error.message);
    return null;
  }
}

// -------------------- TRAVERSAL --------------------
const traverseUpliners = async (startAddress) => {
  let current = startAddress;
  let level = 0;

  while (current && current !== ZERO_ADDRESS) {
    const userData = await usersfun(current);
    if (!userData) break; // skip if error

    console.log(`Level ${level} => ${current}`);

    if (level === 0) {
      // only create if not exists
      await User.updateOne(
        { address: current },
        { $setOnInsert: { totalTeam: 0, partners: 0 } },
        { upsert: true }
      );
    } else if (level === 1) {
      await User.updateOne(
        { address: current },
        { $inc: { partners: 1, totalTeam: 1 } },
        { upsert: true }
      );
    } else {
      await User.updateOne(
        { address: current },
        { $inc: { totalTeam: 1 } },
        { upsert: true }
      );
    }

    // upliner is assumed at index 0
    current = userData[0];
    level++;
  }

  console.log("Traversal finished ✅");
};

// -------------------- MAIN SCRIPT --------------------
const Script = async () => {
  try {
    const totalUsers = await GetCurrentUsers();
    console.log("Total users on-chain:", totalUsers.toString());

    for (let i = 5969; i <= Number(totalUsers); i++) {
      const address = await contract.idToAddress(i);
      console.log(`\n--- Traversing upliners for user ${i}: ${address} ---`);

      await traverseUpliners(address);
    }

    console.log("All users processed successfully 🎉");
  } catch (error) {
    console.error("Script crashed:", error.message);
  }
};


//discord
function listenToRegisterEvent() {
  let isListening = false;
  const eventName = "UserRegistered";
  return async function (callback) {
    if (isListening) {
      console.log("⚠️ Already listening to contract event");
      return;
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
          await traverseUpliners(eventArgs[0]);

          console.log("✅ Event saved:");
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


module.exports = { Script,listenToRegisterEvent };
