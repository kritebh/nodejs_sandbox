const http = require('node:http');

const agent = new http.Agent({keepAlive:true});

const request = http.request({
    agent:agent,
    hostname:"localhost",
    port:8000,
    method:'POST',
    path:'/create-post',
    headers:{
        "Content-Type":"application/json"
    }
});

request.on('response',(response)=>{

    console.log(response.statusCode);
    console.log(response.headers);

    response.on('data',(chunk)=>{
        console.log(JSON.parse(chunk.toString()))
    })
})

request.write(JSON.stringify('Hii there'))
request.write(JSON.stringify('Hii there again '))
request.write(JSON.stringify('Hii there there there there'))
request.end(JSON.stringify('This is last message'))