const http = require('http')
const { resourceLimits } = require('worker_threads')

const server = http.createServer((req,res)=>{

    res.writeHead(200,{'Content-Type':'text/html'})
    res.end('<h1>Hello Client !</h1>')

})

server.listen(5000,'localhost')