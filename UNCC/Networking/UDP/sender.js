const udp = require("node:dgram");

const server = udp.createSocket('udp4');

server.send("This is message 2 from udp server",3000,"127.0.0.1")
