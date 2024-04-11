const http = require("node:http");

const server = http.createServer();

server.listen(9002, () => {
  console.log(`First Server is running on port 9002`);
});

server.on("request", (req, res) => {
    console.log("here 2")
    res.writeHead(200,{'Content-Type':"application/json"});
    res.write(JSON.stringify({message:"response from server 2"}));
    res.end()
});
