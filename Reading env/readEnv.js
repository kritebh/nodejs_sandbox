const fs = require('fs')
const readline = require("readline")

async function readEnv(filePath){
    let readStream = fs.createReadStream(filePath,'utf-8')
    
    let data = readline.createInterface({input:readStream,crlfDelay:Infinity})
    
    let allKey = {}
    
    for await (const line of data) {
        let tempLine = line.split("=")
    
        let key = tempLine[0].trim();
        let value = tempLine[1].trim();
        allKey[key] = value
      }

   return allKey
    
}

readEnv(".env").then(d=>console.log(d))