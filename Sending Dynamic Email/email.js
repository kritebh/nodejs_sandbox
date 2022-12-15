const express = require("express");
const app = express();

const emailTemplate = require("./template").email

// let finalHTMLstring = emailTemplate.replace("{{name}}","Cataloguer")
// finalHTMLstring = finalHTMLstring.replace("{{otp}}",6427)
// console.log(finalHTMLstring)

// let mapObj = {
//     "{{name}}":"John",
//     "{{otp}}":6754
// }



function replaceAll(str,mapObj){
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
}


// /send?name=john
app.get("/send",(req,res)=>{
    console.log("Query => ",req.query.name)
    // let {name} = req.query.name

    let mapObj = {
        "{{name}}":req.query.name,
        "{{otp}}":Math.floor(1000+Math.random()*9000)
    }

    let emailToBeSend = replaceAll(emailTemplate,mapObj);

    res.send(emailToBeSend)

})

app.listen(5000,()=>{
    console.log("Server is running on 5000")
})