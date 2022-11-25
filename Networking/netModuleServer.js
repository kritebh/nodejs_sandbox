const net = require('net')

const server = net.createServer();

server.listen({
    host:'localhost',
    port:5000,
})

server.on('connection',(client)=>{
    console.log("Client Connected")
    client.write("Hey John Doe")
})