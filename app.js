 // index.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const { UserProfile, notifications } = require("./Database");
const Function = require("./Functions");
const Worker = require("./Worker");
const errorHandler = require("./Error");

const app = express();
const server = http.createServer(app);

// ====== ENV ======
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URL = process.env.MONGO_URL;
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// Always allow typical local dev origins in addition to CLIENT_ORIGINS
const ALLOWED_ORIGINS = Array.from(
  new Set([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://reffaralmoney.com",
    "https://www.theeagles.io",
    ...CLIENT_ORIGINS,
  ])
);

// ====== Socket.IO (don’t force transports; let it upgrade) ======
// const io = new Server(server, {
//   cors: {
//     origin: ALLOWED_ORIGINS,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });



const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true); // allow this origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// ====== Express Middleware ======
app.use(bodyParser.json());
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ====== Mongo Connection with Retry ======
async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URL, {
      // keep defaults simple; adjust if you need poolSize, etc.
    });
    console.log("✅ MongoDB connected");

    // If you rely on contract events, keep your existing listener
    const listen = await Function.listenToContractEvent();
    listen((params, event) => {
      console.log("🔔 Contract event callback:", params);
      // You *could* emit to rooms based on params if relevant:
      // io.to(params.toAddress.toLowerCase()).emit("contract_event", { params, event });
    });
  } catch (err) {
    console.error("❌ Mongo connect error:", err?.message || err);
    console.log("⏳ Retrying Mongo connection in 5s…");
    setTimeout(connectToMongo, 5000);
  }
}
connectToMongo();

// ====== Socket State ======
/**
 * lastSeenBySocket: tracks last timestamp sent per socket
 * intervalBySocket: tracks polling interval so we can clear it on disconnect
 */
const lastSeenBySocket = new Map();
const intervalBySocket = new Map();

io.on("connection", (socket) => {
  const origin = socket.handshake.headers.origin || "unknown origin";
  console.log(`🟢 Client connected ${socket.id} from ${origin}`);

  // Helpful for diagnosing handshake failures
  // (this fires only on Engine.IO connection-level errors)
  io.engine.on("connection_error", (err) => {
    console.error("🚫 engine connection_error:", err.code, err.message);
  });

  /**
   * Client sends wallet address they care about.
   * We:
   *  1) join a room for that address
   *  2) send initial entries
   *  3) start polling for new entries
   */
  socket.on("init_address", async (addressRaw) => {
    const address = addressRaw 
    if (!address) {
      socket.emit("error", "Invalid address");
      return;
    }

    try {
      // Join a room for targeted emits in future (optional but handy)
      socket.join(address);

      console.log(`📩 ${socket.id} init_address: ${address}`);

      // Get initial entries (most recent first as you had)
      const entries = await notifications
        .find({ to: address })
        .sort({ createdAt: -1 })
        .lean();

      // Save last seen timestamp for this socket
      lastSeenBySocket.set(socket.id, entries?.[0]?.createdAt || new Date(0));

      // Send initial payload
      socket.emit("all_entries", entries);

      // Kill any previous interval for this socket (safety if they re-init)
      if (intervalBySocket.has(socket.id)) {
        clearInterval(intervalBySocket.get(socket.id));
        intervalBySocket.delete(socket.id);
      }

      // Start polling for new entries
      const interval = setInterval(async () => {
        if (socket.disconnected) {
          clearInterval(interval);
          intervalBySocket.delete(socket.id);
          return;
        }

        const lastTs = lastSeenBySocket.get(socket.id) || new Date(0);

        const newEntries = await notifications
          .find({ to: address, createdAt: { $gt: lastTs } })
          .sort({ createdAt: 1 })
          .lean();

        if (newEntries.length > 0) {
          lastSeenBySocket.set(
            socket.id,
            newEntries[newEntries.length - 1].createdAt
          );
          socket.emit("new_entries", newEntries);
          // Or broadcast to room if multiple sockets use same address:
          // io.to(address).emit("new_entries", newEntries);
        }
      }, 5000);

      intervalBySocket.set(socket.id, interval);
    } catch (err) {
      console.error("init_address error:", err);
      socket.emit("error", "Failed to initialize address");
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`🔴 Client disconnected ${socket.id} (${reason})`);
    if (intervalBySocket.has(socket.id)) {
      clearInterval(intervalBySocket.get(socket.id));
      intervalBySocket.delete(socket.id);
    }
    lastSeenBySocket.delete(socket.id);
  });
});

// ====== Routes (unchanged from your file) ======
app.get("/", (req, res) => {
  res.send("Welcome to the kashif test User Sync !");
});
app.post("/api/profile/:walletAddress", Function.ProfileCreation);
app.post("/profile-upgradation", Function.UpdateProfile);
app.get("/user/profile/:walletAddress", Function.GetProfile);
app.get("/setTrue/:walletAddress",Function.updateByWallet)
app.get("/transaction-distribution",Function.getAllTrans)
// ====== Error Handler ======
app.use(errorHandler);

// ====== Start & Graceful Shutdown ======
server.listen(PORT, () => {
  console.log("🚀 Server + Socket.IO listening on port", PORT);
  console.log("🔓 CORS allowed origins:", ALLOWED_ORIGINS.join(", "));
});

function shutdown(signal) {
  console.log(`\n🧹 Received ${signal}. Shutting down...`);
  server.close(() => {
    console.log("📴 HTTP server closed");
    mongoose.connection.close(false, () => {
      console.log("🗃️  Mongo connection closed");
      process.exit(0);
    });
  });

  // Force-exit if it hangs
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
