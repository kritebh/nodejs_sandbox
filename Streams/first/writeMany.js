// const fs = require('fs/promises');

/*
//using Promises
// Time : 1:23.303 (m:ss.mmm)
*/
// (async ()=>{

//     console.time("start");
//     let file = await fs.open("test.txt",'w');

//     for(let i=0;i<1000000;i++){
//         file.write(`${i} `);
//     }
//     console.timeEnd("start");
// }
// )()

// const fs = require('fs');

/*
//using Promises
// Time : 0:10.570 (m:ss.mmm)
*/
// (async () => {
//   console.time("start");
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       fs.write(fd,`${i} `,()=>{})
//     }
//     console.timeEnd("start");
//   });
// })();

const fs = require("fs/promises");

(async () => {
  console.time("start");
  let file = await fs.open("test.txt", "w");
  const stream = file.createWriteStream();
  let buff;  
  for (let i = 0; i < 1000000; i++) {
    buff = Buffer.from(`${i} `,'utf-8');
          stream.write(buff)
    }
    console.timeEnd("start")

})();
