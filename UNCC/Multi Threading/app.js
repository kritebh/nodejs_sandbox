const { Worker } = require("node:worker_threads");

let obj = { name: "john" };
console.log(obj.name);

new Worker("./calc.js", { workerData: obj });

console.log(obj.name);
