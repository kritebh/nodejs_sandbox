const http = require("node:http");

const server = http.createServer();

const SERVER = [
  { host: "localhost", port: 9001 },
  { host: "localhost", port: 9002 },
  { host: "localhost", port: 9003 },
];

let round = 0;
server.on("request", (actualRequest, proxyResponse) => {
  //round robin
  const currentServer = SERVER[round];
  round = (round + 1) % SERVER.length;

  const proxyRequest = http.request({
    host: currentServer.host,
    port: currentServer.port,
    path: actualRequest.url,
    method: actualRequest.method,
    headers: actualRequest.headers,
  });

  proxyRequest.on("error", (err) => console.log(err));

  proxyRequest.on("response", (currentServerResponse) => {
    // proxyResponse.writeHead(
    //   currentServerResponse.headers,
    //   currentServerResponse.statusCode
    // );
    currentServerResponse.pipe(proxyResponse);
  });

  actualRequest.pipe(proxyRequest);
});

server.listen(9000, () => {
  console.log(`Proxy is running on PORT 9000`);
});
