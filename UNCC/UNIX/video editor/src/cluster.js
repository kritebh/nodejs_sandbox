const cluster = require("node:cluster");
const jobQueue = require("./utils/jobQueue");
if (cluster.isPrimary) {
  const jobs = new jobQueue();
  const coreCount = require("node:os").availableParallelism();

  for (let index = 0; index < coreCount; index++) {
    cluster.fork();
  }

  cluster.on("message", (worker,message) => {
    if (message.messageType === "new-resize") {
      const { videoId, width, height } = message.data;

      jobs.enqueue({
        type: "resize",
        videoId,
        width,
        height,
      });
    }
  });

  cluster.on('exit',(worker,code,signal)=>{
    console.log(`Worker ${worker.process.pid} died (${signal} | ${code}). Restarting...`);
    cluster.fork();

  })
} else {
  require("./index");
}
