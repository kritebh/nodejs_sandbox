const net = require('net');

const client = net.createConnection({
    port:5000,
})

client.on('data',(data)=>{
    console.log(data.toString())
})