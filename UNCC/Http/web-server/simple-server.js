const http = require("node:http");
const fs = require("node:fs/promises");
const server = http.createServer();

server.on("request", async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    let fileHandle = await fs.open("./public/index.html");
    let fileStream = fileHandle.createReadStream();
    res.setHeader("Content-Type", "text/html");
    fileStream.pipe(res);
  }

  if (req.url === "/style.css" && req.method === "GET") {
    let fileHandle = await fs.open("./public/style.css");
    let fileStream = fileHandle.createReadStream();
    res.setHeader("Content-Type", "text/css");
    fileStream.pipe(res);
  }

  if (req.url === "/script.js" && req.method === "GET") {
    let fileHandle = await fs.open("./public/script.js");
    let stat = await fileHandle.stat();
    let fileStream = fileHandle.createReadStream();

    res.setHeader("Content-Type", "text/javascript");
    res.setHeader("Content-Length", stat.size);

    fileStream.pipe(res);
  }

  if (req.url === "/upload" && req.method === "POST") {
    const fileHandle = await fs.open("./uploads/image.jpg", "w");
    let fileStream = fileHandle.createWriteStream();
    req.pipe(fileStream);
    req.on("end", () => {
      res.end(JSON.stringify({ message: "File uploaded successfully" }));
    });
  }
});

server.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
