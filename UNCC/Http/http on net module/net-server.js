const net = require('node:net');

let server = net.createServer((socket)=>{
    socket.on('data',(data)=>{
        console.log(data.toString())
    })
})

server.listen(8000,"localhost",()=>{
    console.log('Server is running')
})