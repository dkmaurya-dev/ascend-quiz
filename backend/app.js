import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index.js";
import questionRouter from "./routes/question.js";
import http from "http";
import { initSocket } from "./socket.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// --------------------------
// 🔥 MongoDB
// --------------------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

// --------------------------
// 🔥 Routes
// --------------------------
app.get("/health", (_, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
app.use("/api/question", questionRouter);
app.use("/api", router);

// --------------------------
// 🔥 Socket Server
// --------------------------
const server = http.createServer(app);
export const io = initSocket(server);

// ❗ IMPORTANT: listen on `server`, not `app`
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Server + Socket running on port ${PORT}`));
