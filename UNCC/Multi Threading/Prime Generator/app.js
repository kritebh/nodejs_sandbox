const { Worker } = require("node:worker_threads");
const { performance } = require("node:perf_hooks");

let result = [];
const THREADS = 4;
const count = 200;
let completed = 0;

let start = performance.now();

for (let i = 0; i < THREADS; i++) {
  //spawning new thread
  const worker = new Worker("./calc.js", {
    workerData: {
      count: count / THREADS,
      //   start: 100_000_000_000_000 + i * 300,
      start: 100_000_000_000_000n + BigInt(i * 300),
    },
  });

  const threadId = worker.threadId;
  console.log(`Worker ${threadId} started.`);
  worker.on("message", (primes) => {
    result = result.concat(primes);
  });

  worker.on("error", (err) => {
    console.log(err);
  });

  worker.on("exit", (code) => {
    console.log(`Worker ${threadId} exited with ${code}`);
    completed++;

    if (completed === THREADS) {
      console.log(`Time taken: ${performance.now() - start} ms`);
      console.log(result.sort());
    }
  });
}
