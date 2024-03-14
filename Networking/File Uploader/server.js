const net = require("node:net");
const fs = require("node:fs/promises");

const server = net.createServer(() => {});

server.listen(3000, "127.0.0.1", () => {
  console.log(`Server has started on http://127.0.0.1:3000`);
});

server.on("connection", async (socket) => {
  console.log("A new uploader");
  let fileHandle, fileStream, fileName;

  socket.on("data", async (data) => {
    //handling fileName
    if (data.toString("utf-8").includes("filename: ")) {
      fileName = data.toString("utf-8").split("filename: ")[1];
      //removing initial data from buffer
      data = data.subarray(data.length);
    }

    if (!fileHandle) {
      socket.pause();

      fileHandle = await fs.open(`storage/${fileName}`, "w");
      fileStream = fileHandle.createWriteStream();
      fileStream.write(data);

      socket.resume();
      fileStream.on("drain", () => {
        socket.resume();
      });
    } else {
      //handling backpressure
      if (!fileStream.write(data)) {
        socket.pause();
      }
    }
  });

  socket.on("error", () => {
    fileHandle.close();
  });

  socket.on("end", () => {
    console.log("Socket ended");
    fileHandle.close();
    fileHandle = null;
    fileStream = null;
  });
});
