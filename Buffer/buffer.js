// const {Buffer} = require('buffer')

const buff = Buffer.alloc(8)  //Allocate a buffer of fixed length, actually Buffer is fixed length size

buff.write("s","utf-8") //<Buffer 73 00 00 00 00 00 00 00> It stores number in hexadecimal
buff.write("str","utf-8") //<Buffer 73 74 00 00 00 00 00 00>

console.log(buff);
console.log(buff.length)
console.log(buff[2])  // 114 -> return in decimal value



const buff2 = Buffer.from("string","utf-8") //automatically allocate the buffer size
console.log(buff2) //<Buffer 73 74 72 69 6e 67>
console.log(buff2.toJSON()) //{ type: 'Buffer', data: [ 115, 116, 114, 105, 110, 103 ] }


const buff3 = Buffer.from([115,116,117],'hex');
console.log(buff3.toString("utf-8")) // s
console.log(buff3.toString("utf-16le")) // 瑳 different encoding changes the result

const buff4 = Buffer.from("E4BDA0","hex")
console.log(buff4.toString('utf-8')) // 你
