const net = require("node:net");
const fs = require("node:fs/promises");
const path = require("node:path");

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let filePath = process.argv[2];
let fileName = path.basename(filePath);
console.log(); //to clear the console

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    socket.write(`filename: ${fileName}`);

    const fileHandle = await fs.open(filePath, "r");
    const fileStream = fileHandle.createReadStream(fileHandle);
    const fileSize = (await fileHandle.stat()).size;

    // upload progress
    let uploadedPercentage = 0;
    let bytesUploaded = 0;

    fileStream.on("data", async (data) => {
      if (!socket.write(data)) {
        fileStream.pause();
      }
      bytesUploaded += data.length;

      let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);

      if (newPercentage !== uploadedPercentage) {
        await moveCursor(0, -1);
        await clearLine(0);
        console.log(`Uploading... ${newPercentage} %`);
        uploadedPercentage = newPercentage;
      }
    });

    socket.on("drain", () => {
      fileStream.resume();
    });

    fileStream.on("end", () => {
      console.log("File uploaded successfully");
      socket.end();
    });
  }
);
