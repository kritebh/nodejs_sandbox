const cluster = require("node:cluster");
const os = require("node:os");

if (cluster.isPrimary) {
  console.log("Parent process");
  for (let i = 0; i < os.availableParallelism(); i++) {
    const worker = cluster.fork();
    console.log(`PID: ${worker.process.pid}`);
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(worker.process.pid, code, signal);
    cluster.fork();
  });
} else {
    require('./index.js');
//   console.log("Child process");
}
