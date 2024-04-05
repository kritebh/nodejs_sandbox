const fs = require("node:fs/promises");

async function init() {
  let fileHandledRead = await fs.open("test.txt", "r");
  let fileHandleWrite = await fs.open("dest.txt", "w");

  const readStream = fileHandledRead.createReadStream({
    highWaterMark: 64 * 1024,
  }); //we can specify highWaterMark value
  const writeStream = fileHandleWrite.createWriteStream();

  readStream.on("data", (chunk) => {
    console.log("---------");
    console.log(chunk.length);
    if (!writeStream.write(chunk)) {
      readStream.pause();
    }
  });

  writeStream.on("drain", () => {
    readStream.resume();
  });
}

init();
