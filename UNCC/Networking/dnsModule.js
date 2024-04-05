const dns = require('dns')

dns.resolve("github.dev",(err,data)=>{
    if(err){
        console.log(err)
        return 
    }

    console.log("Resolved IP ",data)
})

dns.reverse("172.253.118.113",(err,data)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("Resolved Domain ",data)
})

dns.lookup("google.com",(err,data)=>{
    if(err){
        console.log(err)
        return 
    }

    console.log("Resolved IP ",data)
})