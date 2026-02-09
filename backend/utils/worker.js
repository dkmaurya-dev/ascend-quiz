import { Worker, QueueScheduler } from "bullmq";
import { callDeepSeek } from "./deepseek.js";

const connection = { host: "127.0.0.1", port: 6379 };

new QueueScheduler("my-queue", { connection });

const worker = new Worker(
  "my-queue",
  async (job) => {
    console.log("Processing:", job.id, job.data);
    // const result = await callDeepSeek(job.data.prompt);
    return result;
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Worker: Job ${job.id} completed`);
});
