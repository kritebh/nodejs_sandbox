// const fs = require('fs/promises')

// async function init(){
//     let file = await fs.open('test.txt','w')
//     console.time("start")
//     for(let i=0;i<1000000;i++){
//         await file.write(`${i} `)
//     }
//     console.timeEnd("start")
//     await file.close()
// }

// init()

/* callback version */

// const fs = require("fs");

// console.time("start");

// fs.open("test.txt", "w", (err, fd) => {
//   if (err) {
//     console.error("Error opening file:", err);
//     return;
//   }

//   for (let i = 0; i < 1000000; i++) {
//     fs.writeSync(fd, `${i} `);
//   }

//   fs.closeSync(fd);
//   console.timeEnd("start");
// });

/* USING STREAM*/

//memory usage is high in this method
// const fs = require("fs/promises");

// async function init() {
//   console.time("start");
//   const fileHandler = await fs.open("test2.txt", "w");
//   let stream = fileHandler.createWriteStream();
//   let buff;
//   for (let i = 0; i < 1000000; i++) {
//     buff = Buffer.from(`${i} `);
//     stream.write(buff);
//   }
//   console.timeEnd("start");
// }

// init()

//fixing memory usage
const fs = require("fs/promises");

async function init() {
  console.time("start");
  const fileHandler = await fs.open("test.txt", "w");
  let stream = fileHandler.createWriteStream();
  console.log(stream.writableHighWaterMark); //16384
  console.log(stream.writableLength); //0

  let buff;
  let i = 0;

  const writeMany = ()=>{
    while(i<1000000){
        buff = Buffer.from(`${i} `)
        if(i===999999){
            return stream.end(buff);
        }

        //stop the loop because internal buffer is full
        if(!stream.write(buff)) break;
        i++;
    }
  }

  writeMany()

  stream.on('drain',()=>{
    writeMany();
  })

  console.timeEnd("start");
}

init();
