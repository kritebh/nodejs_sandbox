const net = require("node:net");

const server = net.createServer();

let allClients = [];

server.listen(3000, "127.0.0.1", () => {
  console.log(`Opened server on http://127.0.0.1:3000`);
});

server.on("connection", (socket) => {
  console.log("A new connection to the server");
  const clientId = allClients.length + 1;

  allClients.map((client) => {
    client.socket.write(`User ${clientId} joined!`);
  });
  socket.write(`id-${clientId}`);

  socket.on("data", (message) => {
    let data = JSON.parse(message.toString("utf-8"));

    allClients.forEach((client) => {
      client.socket.write(`> User ${data.id}: ${data.message}`);
    });
    // socket.write(message)
    console.log(data.id, data.message);
  });


  socket.on("error", () => {
    allClients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  allClients.push({ id: clientId.toString(), socket });
});

server.on("error", (e) => {
  console.log(`Something went wrong ${e}`);
});
