// index.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const {Script}=require('./script')
const { UserProfile, notifications } = require("./Database");
const Function = require("./Functions");
const Worker = require("./Worker");
const errorHandler = require("./Error");

const app = express();
const server = http.createServer(app);

// ====== ENV ======
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URL = process.env.MONGO_URL;

// ====== REST CORS (allow wallet webviews & handle OPTIONS) ======
// Trust Wallet / some webviews send Origin: null or omit it entirely.
// Keep REST (HTTP) CORS separate from Socket.IO CORS.
const REST_ALLOWED = new Set([
  "https://theeagles.io",
  "https://reffaralmoney.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const corsForRest = {
  origin(origin, cb) {
    // allow curl/postman/no-origin and webviews using "null"
    if (!origin || origin === "null" || REST_ALLOWED.has(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: false, // your GETs don’t use cookies; keep simple
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ====== Global middleware ======
app.use((req, res, next) => {
  console.log(
    `[HTTP] ${req.method} ${req.originalUrl} | origin=${req.headers.origin || "none"} | ua=${req.headers["user-agent"] || "unknown"}`
  );
  next();
});

app.use(cors(corsForRest));
app.options("*", cors(corsForRest));

app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ====== Socket.IO (separate CORS; reflect origin) ======
const io = new Server(server, {
  cors: {
    origin(origin, callback) {
      // reflect whatever asked for it (or allow no-origin) — web sockets need this flexibility
      callback(null, origin || true);
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ====== Mongo Connection with Retry ======
async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connected");

    // Keep your existing contract listener
    const listen = await Function.listenToContractEvent();
    listen((params, event) => {
      console.log("🔔 Contract event callback:", params);
      // If needed later: io.to(params?.toAddress?.toLowerCase?.()).emit("contract_event", { params, event });
    });
     const  registeration= await Function.listenToRegisterEvent();
    registeration((params, event) => {
      console.log("🔔 Contract event callback:", params);
      // If needed later: io.to(params?.toAddress?.toLowerCase?.()).emit("contract_event", { params, event });
    });
  } catch (err) {
    console.error("❌ Mongo connect error:", err?.message || err);
    console.log("⏳ Retrying Mongo connection in 5s…");
    setTimeout(connectToMongo, 5000);
  }
}
connectToMongo();

// ====== Socket State ======
const lastSeenBySocket = new Map();
const intervalBySocket = new Map();

io.on("connection", (socket) => {
  const origin = socket.handshake.headers.origin || "unknown origin";
  console.log(`🟢 WS connected ${socket.id} from ${origin}`);

  io.engine.on("connection_error", (err) => {
    console.error("🚫 engine connection_error:", err.code, err.message);
  });

  socket.on("init_address", async (addressRaw) => {
    const address = String(addressRaw || "").trim();
    if (!address) {
      socket.emit("error", "Invalid address");
      return;
    }

    try {
      // Join a room by address (helps if you broadcast later)
      socket.join(address);
      console.log(`📩 ${socket.id} init_address: ${address}`);

      // Initial fetch
      const entries = await notifications
        .find({ to: address })
        .sort({ createdAt: -1 })
        .lean();

      lastSeenBySocket.set(socket.id, entries?.[0]?.createdAt || new Date(0));
      socket.emit("all_entries", entries);

      // Reset existing interval if any
      if (intervalBySocket.has(socket.id)) {
        clearInterval(intervalBySocket.get(socket.id));
        intervalBySocket.delete(socket.id);
      }

      // Poll for new entries
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

        if (newEntries.length) {
          lastSeenBySocket.set(socket.id, newEntries[newEntries.length - 1].createdAt);
          socket.emit("new_entries", newEntries);
          // Or: io.to(address).emit("new_entries", newEntries);
        }
      }, 5000);

      intervalBySocket.set(socket.id, interval);
    } catch (err) {
      console.error("init_address error:", err);
      socket.emit("error", "Failed to initialize address");
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`🔴 WS disconnected ${socket.id} (${reason})`);
    if (intervalBySocket.has(socket.id)) {
      clearInterval(intervalBySocket.get(socket.id));
      intervalBySocket.delete(socket.id);
    }
    lastSeenBySocket.delete(socket.id);
  });
});

// ====== Health (for TrustWallet diagnostics) ======
app.get("/__health", (req, res) => {
  res.status(200).json({
    ok: true,
    node: process.version,
    up: process.uptime(),
    db: mongoose.connection.readyState, // 1=connected
    time: new Date().toISOString(),
  });
});

// ====== Routes ======
app.get("/", (req, res) => {
  res.send("Welcome to the Blockchain User Sync !");
});

// If you need to normalize/validate wallet addresses BEFORE hitting your handlers,
// you can add a lightweight wrapper; otherwise leave as-is and handle inside Functions.
app.post("/api/profile/:walletAddress", Function.ProfileCreation);
app.post("/profile-upgradation", Function.UpdateProfile);
app.get("/user/profile/:walletAddress", Function.GetProfile);
app.get("/setTrue/:walletAddress", Function.updateByWallet);
app.get("/transaction-distribution", Function.getAllTrans);
app.get("/partnersTeam/:address",Function.getPartnerandTeam)

// ====== Error Handler ======
app.use(errorHandler);

// ====== Start & Graceful Shutdown ======
server.listen(PORT, () => {
  console.log("🚀 HTTP + Socket.IO on", PORT);
});

function shutdown(signal) {
  console.log(`\n🧹 Received ${signal}. Shutting down...`);
  server.close(() => {
    console.log("📴 HTTP server closed");
    mongoose.connection.close(false, () => {
      console.log("🗃️ Mongo connection closed");
      process.exit(0);
    });
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
