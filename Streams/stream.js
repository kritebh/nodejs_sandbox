const fs = require('fs')
const http= require('http')


const server = http.createServer((req,res)=>{
    const file = fs.createReadStream("../Networking/httpModule.js")
    file.pipe(res)
})

server.listen(5000,'localhost')










