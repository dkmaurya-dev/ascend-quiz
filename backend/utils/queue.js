import { Queue } from "bullmq";

const connection = { host: "127.0.0.1", port: 6379 };
const queue = new Queue("my-queue", { connection });

async function run() {
  const job = await queue.add("generate-question", {
    prompt: "Explain Node.js event loop"
  });

  console.log("Job added:", job.id);

  const result = await job.waitUntilFinished(queue.client);
  console.log("Job Completed, Result:", result);
}

run();
