const http = require('node:http');

let server = http.createServer();

server.on('request',(req,res)=>{
    console.log('------METHOD:---------');
    console.log(req.method);
    console.log('-----------URL--------')
    console.log(req.url);
    console.log('---------HEADERS-------')
    console.log(req.headers);

    let data = '';

    req.on('data',(chunk)=>{
        // console.log(chunk)
        data+=chunk;
    })

    req.on('end',()=>{
        // res.setHeader("Content-Type":'application/json')
        res.writeHead(200,{'Content-Type':"application/json"});
        res.write(JSON.stringify({data}));
        res.end()
    })
})

server.listen(8000,()=>{
    console.log("Server is listening....")
})