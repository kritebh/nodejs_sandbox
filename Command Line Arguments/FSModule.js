const fs = require('fs')


// File
const data = fs.readFileSync("./OSModule.js");
console.log(data.toString())

fs.writeFileSync("test.txt","FS Module")

fs.appendFileSync("test.txt"," Appending More Words")

fs.copyFileSync("test.txt","test.old.txt");

fs.renameSync("test.old.txt","test.copy.txt");

fs.unlinkSync("test.copy.txt");


// Directory 
// const dir = fs.readdirSync(__dirname);
// console.log(dir)

// fs.mkdirSync('file-system'); // Create folder
// fs.renameSync("test.txt",'file-system/test.txt');
// fs.watchFile("file-system/test.txt",()=>{
//     console.log("Test File Changed")
// })