const Pool = require("./pool.js");

const numWorkers = 4;
const pool = new Pool(numWorkers);

pool.submit(
  "generatePrimes",
  {
    count: 20,
    start: 100000,
    format: true,
    log: false,
  },
  (primes) => {
    console.log("Primes generated:");
    console.log(primes);
    process.exit(0);
  }
);
