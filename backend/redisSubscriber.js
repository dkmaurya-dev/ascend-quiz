import Redis from "ioredis";
import { io } from "./app.js";

const redisSub = new Redis();

redisSub.subscribe("assessment-status");

redisSub.on("message", (channel, message) => {
  const payload = JSON.parse(message);
  console.log("📡 Assessment update:", payload);

  io.to(payload.assessmentCode).emit("assessment-status", payload);
});
