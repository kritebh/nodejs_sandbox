const udp = require("node:dgram");

const client = udp.createSocket("udp4");

client.on("message", (message, remoteInfo) => {
  console.log(message.toString("utf-8"));
  console.log(`--------`);
  console.log(remoteInfo);
});

client.bind(3000, "127.0.0.1");

client.on("listening", () => {
  console.log(`Client listening..`);
});
