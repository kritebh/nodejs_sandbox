const emailTemplate = require("./template").email

// let finalHTMLstring = emailTemplate.replace("{{name}}","Cataloguer")
// finalHTMLstring = finalHTMLstring.replace("{{otp}}",6427)
// console.log(finalHTMLstring)

let mapObj = {
    "{{name}}":"John",
    "{{otp}}":6754
}



function replaceAll(str,mapObj){
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
}

console.log(replaceAll(emailTemplate,mapObj))