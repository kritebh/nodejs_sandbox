const http = require("node:http");

const server = http.createServer();

server.listen(9001, () => {
  console.log(`First Server is running on port 9001`);
});

server.on("request", (req, res) => {
    console.log("here")
    res.writeHead(200,{'Content-Type':"application/json"});
    res.write(JSON.stringify({message:"response from server 1"}));
    res.end()
});
