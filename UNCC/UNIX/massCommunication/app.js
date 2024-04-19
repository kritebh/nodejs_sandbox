const {} = require("node:process");
const { spawn } = require("node:child_process");
const fs = require("node:fs/promises");

const outDest = "./dest.txt";

const numberFormatter = spawn("./number_formatter", [outDest, "$", ","]);

numberFormatter.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

numberFormatter.stderr.on("data", (err) => {
  console.log(`stderr : ${err}`);
});

numberFormatter.on("close", (code) => {
  if (code === 0) {
    console.log("File read and processed successfully");
  } else {
    console.log("Something wrong happened");
  }
});

(async ()=>{
    const fileHandle = await fs.open('./src.txt','r');
    const fileStream = fileHandle.createReadStream();
    fileStream.pipe(numberFormatter.stdin);
})()
